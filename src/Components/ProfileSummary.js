// React and Firebase imports
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProfileSummary = () => {
  const [profile, setProfile] = useState(null);
  const db = getFirestore();
  const navigate = useNavigate();

  // Fetch the user's profile info from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };

    fetchProfile();
  }, [db]);

  // Show loading while data is being fetched
  if (!profile) {
    return <p style={{ padding: "20px" }}>Loading profile...</p>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Profile Summary</h2>

      {/* Display user's profile info */}
      <div style={{ lineHeight: "2", fontSize: "16px", marginBottom: "30px" }}>
        <p><strong>Full Name:</strong> {profile.fullName || "N/A"}</p>
        <p><strong>Email:</strong> {auth.currentUser?.email}</p>
        <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
        <p><strong>Address:</strong> {profile.address || "N/A"}</p>
        <p><strong>City:</strong> {profile.city || "N/A"}</p>
        <p><strong>Postcode:</strong> {profile.postcode || "N/A"}</p>
        <p><strong>Country:</strong> {profile.country || "N/A"}</p>
      </div>

      {/* Button to go back and edit profile */}
      <button
        onClick={() => navigate("/UserAccount")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileSummary;
