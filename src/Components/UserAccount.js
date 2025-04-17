// React and Firebase imports
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Navigation hook

const UserAccount = () => {
  // Track the authenticated user
  const [user, setUser] = useState(null);

  // Track editable profile fields
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
  });

  const db = getFirestore(); // Initialize Firestore
  const navigate = useNavigate(); // Initialize navigate hook

  // Fetch user auth state and profile data from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser); // Set authenticated user

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Profile exists — populate form
          setProfile(userSnap.data());
        } else {
          // No profile exists — create one with default fields
          const defaultProfile = {
            fullName: "",
            phone: "",
            address: "",
            city: "",
            postcode: "",
            country: "",
          };
          await setDoc(userRef, defaultProfile); // Create new user document
          setProfile(defaultProfile); // Set state with default
          toast.info("Welcome! Your profile has been initialized.");
        }
      }
    });

    return () => unsubscribe(); // Clean up auth listener
  }, [db]);

  // Update profile state when form fields change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Save updated profile to Firestore
  const handleSave = async () => {
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), profile, { merge: true }); // Merge with existing user doc
      toast.success("Profile updated!"); // Show success toast
      navigate("/ProfileSummary"); // Redirect to Profile Summary
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile."); // Show error toast
    }
  };

  // Render login prompt if user not authenticated
  if (!user) {
    return <p style={{ padding: "20px" }}>You are not logged in.</p>;
  }

  // Render profile form
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>My Account</h2>

      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Email (read-only) */}
        <input value={user.email} disabled />

        {/* Editable profile fields */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={profile.fullName}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={profile.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={profile.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="postcode"
          placeholder="Postcode"
          value={profile.postcode}
          onChange={handleChange}
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={profile.country}
          onChange={handleChange}
        />

        {/* Save Profile Button */}
        <button
          onClick={handleSave}
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
          Save Profile
        </button>

        {/* Navigate to Order History Button */}
        <button
          onClick={() => navigate("/OrderHistory")}
          style={{
            marginTop: "10px",
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
      </div>
    </div>
  );
};

export default UserAccount;
