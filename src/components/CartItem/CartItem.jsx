import "./CartItem.css";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { formatCurrency } from "../../utils/currency";

function CartItem({ item, increaseQty, decreaseQty, removeFromCart }) {
	return (
		<article className="cart-item">
			<div className="cart-image-wrap">
				<img src={item.image} alt={item.title} />
			</div>

			<div className="cart-item-details">
				<div>
					<h3>{item.title}</h3>
					<p className="cart-unit-price">{formatCurrency(item.price)} each</p>
				</div>

				<div className="qty-box" aria-label={`Quantity for ${item.title}`}>
					<button
						type="button"
						onClick={() => decreaseQty(item.id)}
						disabled={item.quantity === 1}
						aria-label={`Decrease quantity of ${item.title}`}
						title="Decrease quantity"
					>
						<FaMinus />
					</button>

					<span aria-live="polite">{item.quantity}</span>

					<button
						type="button"
						onClick={() => increaseQty(item.id)}
						aria-label={`Increase quantity of ${item.title}`}
						title="Increase quantity"
					>
						<FaPlus />
					</button>
				</div>
			</div>

			<div className="cart-item-total">
				<p>Item total</p>
				<strong>{formatCurrency(item.price * item.quantity)}</strong>
				<button
					type="button"
					className="cart-remove-btn"
					onClick={() => removeFromCart(item.id)}
					aria-label={`Remove ${item.title} from cart`}
					title="Remove from cart"
				>
					<FaTrash />
				</button>
			</div>
		</article>
	);
}

export default CartItem;
