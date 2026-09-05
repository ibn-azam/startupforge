import { MongoClient, ObjectId } from "mongodb";
import { stripe } from "@/lib/stripe";

const globalForMongo = globalThis;
const client =
  globalForMongo.__startupforgeMongoClient ||
  new MongoClient(process.env.MONGODB_URI);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__startupforgeMongoClient = client;
}

async function getDatabase() {
  await client.connect();
  return client.db(process.env.MONGO_DB_COLLECTION);
}

async function getUsersCollection() {
  return (await getDatabase()).collection("user");
}

async function getStartupsCollection() {
  const database = await getDatabase();
  const collections = await database.listCollections().toArray();
  const collectionNames = new Set(collections.map((collection) => collection.name));
  const collectionName = ["startups", "startup"].find((name) =>
    collectionNames.has(name),
  );

  if (!collectionName) {
    throw new Error("Startup collection was not found in the configured database.");
  }

  return database.collection(collectionName);
}

const idFilter = (id) =>
  ObjectId.isValid(id)
    ? { $or: [{ _id: new ObjectId(id) }, { _id: id }] }
    : { _id: id };

export async function getAdminUserStats() {
  const users = await getUsersCollection();
  const [totalUsers, premiumUsers, founders, collaborators] = await Promise.all([
    users.countDocuments(),
    users.countDocuments({ isPremium: true }),
    users.countDocuments({ role: "founder" }),
    users.countDocuments({ role: "collaborator" }),
  ]);

  return { totalUsers, premiumUsers, founders, collaborators };
}

export async function getAdminUsers() {
  const users = await getUsersCollection();
  const records = await users
    .find({}, {
      projection: {
        name: 1, email: 1, role: 1, image: 1, isPremium: 1,
        isBlocked: 1, createdAt: 1,
      },
    })
    .sort({ createdAt: -1 })
    .toArray();

  return records.map((user) => ({ ...user, _id: user._id.toString() }));
}

export async function setAdminUserBlocked(userId, isBlocked) {
  const result = await (await getUsersCollection()).updateOne(
    idFilter(userId),
    { $set: { isBlocked } },
  );

  if (result.matchedCount === 0) throw new Error("User not found.");
  return { _id: userId, isBlocked };
}

export async function getAdminStartups() {
  const records = await (await getStartupsCollection())
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return records.map((startup) => ({ ...startup, _id: startup._id.toString() }));
}

export async function approveAdminStartup(startupId) {
  const result = await (await getStartupsCollection()).updateOne(
    idFilter(startupId),
    { $set: { status: "active" } },
  );

  if (result.matchedCount === 0) throw new Error("Startup not found.");
  return { _id: startupId, status: "active" };
}

export async function removeAdminStartup(startupId) {
  const result = await (await getStartupsCollection()).deleteOne(idFilter(startupId));

  if (result.deletedCount === 0) throw new Error("Startup not found.");
  return { _id: startupId };
}

export async function getAdminTransactions() {
  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    expand: ["data.line_items"],
  });

  return sessions.data.map((session) => ({
    id: session.id,
    email: session.customer_details?.email || session.customer_email || "-",
    amount: session.amount_total || 0,
    currency: session.currency || "usd",
    status: session.payment_status || session.status || "unknown",
    createdAt: session.created ? new Date(session.created * 1000).toISOString() : null,
  }));
}