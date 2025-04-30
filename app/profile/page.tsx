import LoggedLayout from "../loggedLayout";
import UserInfo from "../../components/UserInfo";

export default function ProfilePage() {
  return (
    <LoggedLayout>
      <div>
        <h1>Profile Page</h1>
        <UserInfo />
      </div>
    </LoggedLayout>
  );
}