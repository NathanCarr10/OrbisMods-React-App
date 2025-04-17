// React and Firebase imports
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileSummary = () => {
  // Track the authenticated user
  const [user, setUser] = useState(null);

  // Track profile details from Firestore
  const [profile, setProfile] = useState(null);

  const db = getFirestore(); // Initialize Firestore
  const navigate = useNavigate(); // React Router navigation

  // Fetch user and profile on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfile(userSnap.data()); // Load profile details
        } else {
          toast.error("Profile not found.");
          navigate("/UserAccount"); // Redirect if no profile
        }
      }
    });

    return () => unsubscribe(); // Clean up auth listener
  }, [db, navigate]);

  // Handle logout action
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/LoginPage");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out.");
    }
  };

  // Show loading or unauthenticated state
  if (!user || !profile) {
    return <p style={{ padding: "20px" }}>Loading profile...</p>;
  }

  // Render profile summary
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Profile Summary</h2>

      {/* Display user info in read-only format */}
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <input value={user.email} disabled />
        <input value={profile.fullName || ""} disabled />
        <input value={profile.phone || ""} disabled />
        <input value={profile.address || ""} disabled />
        <input value={profile.city || ""} disabled />
        <input value={profile.postcode || ""} disabled />
        <input value={profile.country || ""} disabled />

        {/* Edit profile button */}
        <button
          onClick={() => navigate("/UserAccount")}
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Edit Profile
        </button>

        {/* View orders button */}
        <button
          onClick={() => navigate("/OrderHistory")}
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          View Order History
        </button>

        {/* Log out button */}
        <button
          onClick={handleLogout}
          style={{
            padding: "10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSummary;
