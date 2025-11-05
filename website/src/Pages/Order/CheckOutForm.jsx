import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ShowToast, Severity } from "../../utils/toast";

const CheckOutForm = () => {
  const { createOrder, user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems = [] } = location.state || {};

  useEffect(() => {
    if (!user || cartItems.length === 0) {
      navigate("/cart");
    }
  }, [user, cartItems, navigate]);

  const [fullName, setFullName] = useState(user?.name || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Instamojo");

  // 🧮 Calculate Prices
  const itemsPrice = cartItems.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    const discount = item.productId?.discount || 0;
    const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;
    return sum + finalPrice * item.quantity;
  }, 0);

  const taxPrice = parseFloat((itemsPrice * 0.05).toFixed(2));
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const totalPrice = parseFloat(
    (itemsPrice + taxPrice + shippingPrice).toFixed(2)
  );

  // 🛒 Place Order
  const handlePlaceOrder = async () => {
    if (!fullName || !address || !city || !region || !zipCode) {
      alert("Please fill all address fields");
      return;
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        _id: item.productId._id,
        name: item.productId.name,
        image: item.productId.imageUrl,
        qty: item.quantity,
        price: item.productId.price,
      })),
      shippingAddress: {
        fullName,
        address,
        city,
        state: region,
        postalCode: zipCode,
        country: "India",
      },
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      email: user?.email || "test@example.com",
      phone: user?.phone || "9999999999",
    };

    try {
      const response = await createOrder(orderData);

      if (response?.success && response?.paymentUrl) {
        // 💳 Redirect to Instamojo
        window.location.href = response.paymentUrl;
      } else {
        ShowToast("Order successfully!", "success");
        navigate("/allOrder");
      }
    } catch (error) {
      ShowToast("Order error", Severity.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Shipping Address
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="State"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
          Payment Method
        </h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="Instamojo">Instamojo</option>
          <option value="COD">Cash on Delivery</option>
        </select>

        <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
          <p>Items Price: ₹{itemsPrice.toFixed(2)}</p>
          <p>Tax (5%): ₹{taxPrice.toFixed(2)}</p>
          <p>Shipping: ₹{shippingPrice.toFixed(2)}</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            Total: ₹{totalPrice.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold transition disabled:opacity-50"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOutForm;
