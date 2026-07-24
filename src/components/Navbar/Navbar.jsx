import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
	const { totalItems } = useContext(CartContext);

	return (
		<nav className="navbar">
			<div className="logo">
				<Link to="/">ShopEasy</Link>
			</div>

			<ul className="nav-links">
				<li>
					<Link to="/" className="home-link">
						<FaHome />
						<span>Home</span>
					</Link>
				</li>

				<li>
					<Link to="/cart" className="cart-link">
						<FaShoppingCart />
						<span>Cart ({totalItems})</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
