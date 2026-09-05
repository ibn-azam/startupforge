import { roleValidator } from '@/lib/session';


const AdminLayout = async({children}) => {
  await roleValidator("admin")
  return children;
};

export default AdminLayout;