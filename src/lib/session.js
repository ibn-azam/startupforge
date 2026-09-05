import { headers } from "next/headers"
import { auth } from "./auth"
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    return session?.user || null;
}

export const roleValidator = async(role)=>{
    const user = await getUserSession();
    if(!user || user.role !== role){
        redirect('/unauthorized')
    }
} 