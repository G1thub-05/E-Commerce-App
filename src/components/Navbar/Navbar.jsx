import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/auth";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
	const { totalItems } = useContext(CartContext);
	const { user, logout } = useContext(AuthContext);

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

				<li className="account-nav-item">
					{user ? (
						<div className="account-menu">
							<span className="account-name" title={user.email}>
								<FaUserCircle />
								{user.name}
							</span>
							<button className="logout-btn" type="button" onClick={logout}>
								<FaSignOutAlt />
								<span>Log out</span>
							</button>
						</div>
					) : (
						<Link to="/login" className="login-link">
							<FaSignInAlt />
							<span>Sign in</span>
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
