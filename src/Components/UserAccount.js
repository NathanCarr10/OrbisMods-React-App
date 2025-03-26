import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen for user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/LoginPage"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <h2>User Account</h2>

      {user ? (
        <div>
          <p><strong>Name:</strong> {user.displayName || "Not Provided"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.uid}</p>

          {/* Link to Order History Page */}
          <Link to="/OrderHistory">View Order History</Link>

          <br /><br />
          {/* Logout Button */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You are not logged in. <Link to="/LoginPage">Login here</Link></p>
      )}
    </div>
  );
};

export default UserAccount;
