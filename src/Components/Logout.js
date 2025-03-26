import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
