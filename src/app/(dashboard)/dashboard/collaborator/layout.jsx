import { roleValidator } from "@/lib/session"

const CollaboratorLayout = async ({children}) =>{
    await roleValidator("collaborator")
    return children
}
export default CollaboratorLayout;