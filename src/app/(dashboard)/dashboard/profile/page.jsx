import DashboardHeader from "../../../../components/dashboard/DashboardHeader";
import MyProfile from "./MyProfile";
export const metadata = {
  title: "Profile | Roktoneer",
};  
const ProfilePage = () => {
  return <div>
    <DashboardHeader title="My Profile"></DashboardHeader>
    <MyProfile></MyProfile>
  </div>;
};

export default ProfilePage;
