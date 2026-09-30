import { useReducer, useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, emoji: "🎧" },
  { id: 2, name: "Smart Watch", price: 2299, emoji: "⌚" },
  { id: 3, name: "Running Shoes", price: 1799, emoji: "👟" },
  { id: 4, name: "Backpack", price: 999, emoji: "🎒" },
  { id: 5, name: "Bluetooth Speaker", price: 1299, emoji: "🔊" },
  { id: 6, name: "Sunglasses", price: 699, emoji: "🕶️" },
];

function cartReducer(cart, action) {
  switch (action.type) {
    case "ADD": {
      const existing = cart.find(
        (item) => item.id === action.product.id
      );

      if (existing) {
        return cart.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...cart, { ...action.product, quantity: 1 }];
    }

    case "INCREASE":
      return cart.map((item) =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE":
      return cart
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "REMOVE":
      return cart.filter((item) => item.id !== action.id);

    default:
      return cart;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [message, setMessage] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = discountApplied ? subtotal * 0.10 : 0;
  const gst = (subtotal - discount) * 0.18;
  const grandTotal = subtotal - discount + gst;

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setDiscountApplied(true);
      setMessage("Coupon applied! You saved 10%.");
    } else {
      setDiscountApplied(false);
      setMessage("Invalid coupon. Try SAVE10.");
    }
  }

  return (
    <main className="container">
      <header className="header">
        <div>
          <h1>🛍️ ShopEase</h1>
          <p>Your favourite products, all in one place.</p>
        </div>
        <div className="cart-badge">
          🛒 {cart.reduce((sum, item) => sum + item.quantity, 0)} items
        </div>
      </header>

      <h2>Our Products</h2>

      <section className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image">{product.emoji}</div>
            <h3>{product.name}</h3>
            <p className="price">₹{product.price.toLocaleString("en-IN")}</p>
            <button
              onClick={() => {
                dispatch({ type: "ADD", product });
                setMessage("");
              }}
            >
              Add to Cart
            </button>
          </article>
        ))}
      </section>

      <section className="cart-section">
        <h2>🛒 Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Add some products!</p>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-product">
                    <span className="cart-emoji">{item.emoji}</span>
                    <div>
                      <h3>{item.name}</h3>
                      <p>₹{item.price.toLocaleString("en-IN")} each</p>
                    </div>
                  </div>

                  <div className="quantity">
                    <button
                      className="quantity-btn"
                      aria-label={`Decrease ${item.name}`}
                      onClick={() =>
                        dispatch({ type: "DECREASE", id: item.id })
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      aria-label={`Increase ${item.name}`}
                      onClick={() =>
                        dispatch({ type: "INCREASE", id: item.id })
                      }
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </strong>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      dispatch({ type: "REMOVE", id: item.id })
                    }
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>

            <div className="coupon-box">
              <label htmlFor="coupon">Coupon code</label>
              <div className="coupon-input">
                <input
                  id="coupon"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setDiscountApplied(false);
                    setMessage("");
                  }}
                  placeholder="Enter SAVE10"
                />
                <button className="coupon-btn" onClick={applyCoupon}>
                  Apply
                </button>
              </div>
              {message && <p className="coupon-message">{message}</p>}
            </div>

            <div className="summary">
              <h3>Order Summary</h3>
              <div>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div>
                <span>Discount (10%)</span>
                <span>− ₹{discount.toFixed(2)}</span>
              </div>
              <div>
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="grand-total">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
              <p className="tax-note">
                Demo calculation: 18% GST is applied after the coupon discount.
              </p>
            </div>
          </>
        )}
      </section>

      <footer>© 2026 ShopEase | React Shopping Cart Assignment</footer>
    </main>
  );
}

export default App;