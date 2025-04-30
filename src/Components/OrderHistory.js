// React imports for state and lifecycle
import { useEffect, useState } from "react";

// Firebase Firestore imports
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";

// Firebase auth import
import { auth } from "../firebase";

// OrderHistory component displays a logged-in user's past orders
const OrderHistory = () => {
  // State to store orders and loading status
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Async function to fetch user's orders from Firestore
    const fetchOrders = async () => {
      const db = getFirestore(); // Get Firestore instance
      const user = auth.currentUser; // Get currently authenticated user

      // If no user is logged in, exit early
      if (!user) {
        console.warn("No user logged in.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching orders for UID:", user.uid);

        // Firestore query: Get orders by user ID, ordered by timestamp (latest first)
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        );

        // Execute query and format the data
        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Orders fetched:", fetchedOrders);
        setOrders(fetchedOrders); // Update state with fetched orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchOrders(); // Run on component mount
  }, []);

  // Show loading message while fetching data
  if (loading) {
    return <p style={{ padding: "20px" }}>Loading order history...</p>;
  }

  // If user is not logged in (double-check), show message
  if (!auth.currentUser) {
    return <p style={{ padding: "20px" }}>You must be logged in to view your order history.</p>;
  }

  // Render order list
  return (
    <div style={{ padding: "40px" }}>
      <h2>Order History</h2>

      {/* Show message if no orders found */}
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Loop through each order and display its details */}
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h4>Order ID: {order.id}</h4>
              <p><strong>Total:</strong> €{order.amount.toFixed(2)}</p>
              <p><strong>Date:</strong> {order.timestamp?.toDate().toLocaleString()}</p>

              {/* List all items within this order */}
              <ul style={{ marginTop: "10px" }}>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} – €{item.price.toFixed(2)} (Qty: {item.quantity || 1})
                  </li>
                ))}
              </ul>

              {/* Display shipping info if available */}
              {order.shippingInfo && (
                <div style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
                  <strong>Shipping Information:</strong>
                  <p>{order.shippingInfo.fullName}</p>
                  <p>{order.shippingInfo.address}, {order.shippingInfo.city}</p>
                  <p>{order.shippingInfo.postcode}, {order.shippingInfo.country}</p>
                  <p>Phone: {order.shippingInfo.phone}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
