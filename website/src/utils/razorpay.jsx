import axios from "axios";

const initiateRazorpayPayment = async (order, user) => {
  const options = {
    key: order.key,
    amount: order.razorpayOrder.amount,
    currency: "INR",
    name: "My E-Commerce",
    description: "Payment for your order",
    order_id: order.razorpayOrder.id,
    handler: async function (response) {
      const verifyRes = await axios.post(
        "http://localhost:5000/api/orders/verify",
        response,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert(verifyRes.data.message);
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: "9999999999",
    },
    theme: {
      color: "#3399cc",
    },
  };
  const razor = new window.Razorpay(options);
  razor.open();
};

export default initiateRazorpayPayment;
