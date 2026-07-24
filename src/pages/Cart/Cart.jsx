import { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { formatCurrency } from "../../utils/currency";
import "./Cart.css";

function Cart() {
	const {
		cart,
		increaseQty,
		decreaseQty,
		removeFromCart,
		placeOrder,
		cartTotal,
		totalItems,
	} = useContext(CartContext);

	function handlePlaceOrder() {
		const orderTotal = formatCurrency(cartTotal);
		const itemCount = totalItems;

		placeOrder();
		toast(
			`🛒 Order placed for ${itemCount} ${itemCount === 1 ? "item" : "items"} — ₹ ${orderTotal}`,
			{ icon: "🛒" },
		);
	}

	return (
		<div className="cart-page">
			<header className="cart-header">
				<div>
					<p className="cart-eyebrow">Your bag</p>
					<h2>Shopping cart</h2>
					{cart.length > 0 && (
						<p className="cart-count">
							{totalItems} {totalItems === 1 ? "item" : "items"} ready to order
						</p>
					)}
				</div>
				<Link to="/" className="continue-shopping">
					<FaArrowLeft />
					Continue shopping
				</Link>
			</header>

			{cart.length === 0 ? (
				<section className="empty-cart">
					<div className="empty-cart-icon">
						<FaShoppingBag />
					</div>
					<h3>Your cart is waiting</h3>
					<p>Find something you love and it will appear right here.</p>
					<Link to="/" className="browse-products-btn">
						Browse products
						<FaArrowRight />
					</Link>
				</section>
			) : (
				<div className="cart-layout">
					<section className="cart-items" aria-label="Cart items">
						{cart.map((item) => (
							<CartItem
								key={item.id}
								item={item}
								increaseQty={increaseQty}
								decreaseQty={decreaseQty}
								removeFromCart={removeFromCart}
							/>
						))}
					</section>

					<aside className="cart-summary">
						<div className="summary-heading">
							<h3>Order summary</h3>
							<span>
								{totalItems} {totalItems === 1 ? "item" : "items"}
							</span>
						</div>
						<div className="summary-row">
							<span>Subtotal</span>
							<strong>{formatCurrency(cartTotal)}</strong>
						</div>
						<div className="summary-divider" />
						<div className="summary-total">
							<span>Total</span>
							<strong>{formatCurrency(cartTotal)}</strong>
						</div>
						<button
							className="place-order-btn"
							type="button"
							onClick={handlePlaceOrder}
						>
							Place order
							<FaArrowRight />
						</button>
						<p className="checkout-note">
							You’ll receive an order confirmation right away.
						</p>
					</aside>
				</div>
			)}
		</div>
	);
}

export default Cart;
