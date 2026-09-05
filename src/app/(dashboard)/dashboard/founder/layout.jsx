import { roleValidator } from "@/lib/session"

const FounderLayout = async({children})=>{
await roleValidator("founder")
return children
};
export default FounderLayout;