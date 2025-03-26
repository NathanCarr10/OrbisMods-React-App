import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/LoginPage"); // Redirect to login page
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Account</h2>

      {user ? (
        <div>
          <p><strong>Name:</strong> {user.displayName || "Not Provided"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.uid}</p>

          {/* Order History Link */}
          <Link to="/OrderHistory">View Order History</Link>

          <br /><br />
          {/* Logout Button */}
          <button onClick={handleLogout} style={{ background: "red", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      ) : (
        <p>You are not logged in. <Link to="/LoginPage">Login here</Link></p>
      )}
    </div>
  );
};

export default UserAccount;
