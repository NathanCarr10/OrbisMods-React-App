// React imports
import { useEffect, useState } from "react";

// Firebase authentication imports
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// React Router imports for navigation and linking
import { Link, useNavigate } from "react-router-dom";

// UserAccount component displays account info for the currently authenticated user
const UserAccount = () => {
  const [user, setUser] = useState(null); // State to store the logged-in user
  const navigate = useNavigate(); // Hook to programmatically navigate between pages

  // UseEffect to listen for auth state changes (login/logout)
  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update state when user changes
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Logout function to sign the user out and redirect to login
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      navigate("/LoginPage"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Account</h2>

      {/* If user is logged in, display their info */}
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.displayName || "Not Provided"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.uid}</p>

          {/* Link to order history page */}
          <Link to="/OrderHistory">View Order History</Link>

          <br /><br />

          {/* Logout button */}
          <button
            onClick={handleLogout}
            style={{
              background: "red",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        // If no user is logged in, show message with login link
        <p>You are not logged in. <Link to="/LoginPage">Login here</Link></p>
      )}
    </div>
  );
};

export default UserAccount;
