


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGO_DB_COLLECTION);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
   emailAndPassword: { 
    enabled: true, 
  },
  user:{
    additionalFields:{
      role: {
        defaultValue:  "collaborator",
      },
      isPremium: {
        defaultValue: false,
      },  
    }
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    }
});