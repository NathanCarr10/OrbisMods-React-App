// React hooks for component state
import { useState } from "react";

// Firebase auth functions for creating user and signing in with Google
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

// React Router hook for navigation after signup
import { useNavigate } from "react-router-dom";

// Toastify for user notifications
import { toast } from "react-toastify";

// Signup component handles new user registration
const Signup = () => {
  // State to store form input and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize navigation hook

  // Handles signup using email and password
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Create new user account in Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!"); // Show success toast
      navigate("/UserAccount"); // Redirect to user account page after signup
    } catch (err) {
      // Display any signup error
      setError(err.message);
      toast.error("Signup failed: " + err.message); // Show error toast
    }
  };

  // Handles signup using Google account
  const handleGoogleSignup = async () => {
    try {
      // Trigger Google sign-in popup and register user
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed up with Google!"); // Show success toast
      navigate("/UserAccount"); // Redirect to user account page after signup
    } catch (err) {
      // Display any Google signup error
      setError(err.message);
      toast.error("Google signup failed: " + err.message); // Show error toast
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

      {/* Display error message if it exists */}
      {error && <p>{error}</p>}

      {/* Signup form for email and password */}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {/* Google sign-up option */}
      <button onClick={handleGoogleSignup}>Sign Up with Google</button>
    </div>
  );
};

export default Signup;
