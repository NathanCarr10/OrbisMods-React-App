// Import Firebase signOut method and the configured auth instance
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

// Logout component handles user sign-out functionality
const Logout = () => {
  // Function to handle logout process
  const handleLogout = async () => {
    try {
      // Sign out the current user from Firebase Authentication
      await signOut(auth);
      alert("Logged out successfully!"); // Notify user of successful logout
    } catch (err) {
      // Log any errors that occur during sign-out
      console.error(err.message);
    }
  };

  // Render a logout button that triggers handleLogout
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
