import { Login } from "./Login";
import { Logout } from "./Logout";
import { Signup } from "./Signup";
import { UserInformation } from "./UserInformation";

export function Content() {


  return (
    <div>
      <h1>Content here</h1>
      <Signup />
      <Login />
      <Logout />
      <UserInformation />
    </div>
  )
}