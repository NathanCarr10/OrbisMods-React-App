import { Link } from "react-router-dom";

const OrderHistory = () => {
  return (
    <div>
      <h2>Order History</h2>
      <p>Here you will see a list of your past orders.</p>
      
      {/* Back to Account Page */}
      <Link to="/UserAccount">Back to Account</Link>
    </div>
  );
};

export default OrderHistory;
