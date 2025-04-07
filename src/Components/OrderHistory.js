import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth } from "../firebase";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.warn("No user logged in.");
        setLoading(false);
        return;
      }

      try {
        console.log("🔍 Fetching orders for UID:", user.uid);

        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("📦 Orders fetched:", fetchedOrders);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading order history...</p>;
  }

  if (!auth.currentUser) {
    return <p style={{ padding: "20px" }}>You must be logged in to view your order history.</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
              <p><strong>Total:</strong> ${order.amount.toFixed(2)}</p>
              <p><strong>Date:</strong> {order.timestamp?.toDate().toLocaleString()}</p>

              <ul style={{ marginTop: "10px" }}>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} – ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
