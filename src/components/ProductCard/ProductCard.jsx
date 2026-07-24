import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Slide, toast, Zoom } from "react-toastify";
import "./ProductCard.css";

function ProductCard({ product }) {
	const { cart, addToCart, removeFromCart } = useContext(CartContext);

	const isInCart = cart.some((item) => item.id === product.id);

	function handleAddToCart() {
		addToCart(product);
		toast("🛒 Product added successfully.", {
			transition: Slide,
			icon: "🛒",
		});
	}

	function handleRemoveFromCart() {
		removeFromCart(product.id);
		toast("🛒 Product removed successfully.", {
			transition: Zoom,
			icon: "🛒",
		});
	}

	return (
		<div className="product-card">
			<div className="image-box">
				<img src={product.image} alt={product.title} />
			</div>

			<span className="category">{product.category}</span>

			<h3>{product.title}</h3>

			<div className="rating">
				⭐ {product.rating?.rate || 0}
				<span> ({product.rating?.count || 0})</span>
			</div>

			<h2>
				${product.price.toFixed(2)}
				<span>${(product.price * 1.2).toFixed(2)}</span>
			</h2>

			<div className="buttons">
				<Link to={`/product/${product.id}`} className="details-btn">
					Details
				</Link>

				{isInCart ? (
					<button className="remove-btn" onClick={handleRemoveFromCart}>
						Remove
					</button>
				) : (
					<button className="cart-btn" onClick={handleAddToCart}>
						Add Cart
					</button>
				)}
			</div>
		</div>
	);
}

export default ProductCard;
