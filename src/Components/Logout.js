// Import Firebase signOut method and the configured auth instance
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

// Import toast for user notifications
import { toast } from "react-toastify";

// Logout component handles user sign-out functionality
const Logout = () => {
  // Function to handle logout process
  const handleLogout = async () => {
    try {
      // Sign out the current user from Firebase Authentication
      await signOut(auth);
      toast.info("Logged out successfully!"); // Show toast notification
    } catch (err) {
      // Log any errors that occur during sign-out
      console.error(err.message);
      toast.error("Logout failed: " + err.message); // Show toast error
    }
  };

  // Render a logout button that triggers handleLogout
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
