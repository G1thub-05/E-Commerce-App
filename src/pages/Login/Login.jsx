import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash, FaLock, FaShoppingBag } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth";
import "./Login.css";

function Login() {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");

	function handleSubmit(event) {
		event.preventDefault();

		if (!email.trim() || !password.trim()) {
			setError("Enter both your email and password to continue.");
			return;
		}

		if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
			setError("Enter a valid email address to continue.");
			return;
		}

		login({ email: email.trim() });
		toast(" 👤 Welcome back to ShopEasy!", { icon: "🛒" });
		navigate(location.state?.from?.pathname || "/", { replace: true });
	}

	return (
		<main className="login-page">
			<section className="login-card" aria-labelledby="login-heading">
				<div className="login-intro">
					<div className="login-icon" aria-hidden="true">
						<FaShoppingBag />
					</div>
					<p className="login-eyebrow">Shop with ease</p>
					<h1 id="login-heading">Welcome back</h1>
					<p>Sign in to view your cart and place your order.</p>
				</div>

				<form className="login-form" onSubmit={handleSubmit} noValidate>
					<label htmlFor="email">Email address</label>
					<input
						id="email"
						type="email"
						autoComplete="email"
						placeholder="you@example.com"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
							setError("");
						}}
					/>

					<label htmlFor="password">Password</label>
					<div className="password-field">
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							autoComplete="current-password"
							placeholder="Enter your password"
							value={password}
							onChange={(event) => {
								setPassword(event.target.value);
								setError("");
							}}
						/>
						<button
							type="button"
							className="password-toggle"
							onClick={() => setShowPassword((visible) => !visible)}
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>

					{error && <p className="login-error" role="alert">{error}</p>}

					<button className="login-submit" type="submit">
						<FaLock />
						Sign in securely
					</button>
				</form>

				<Link to="/" className="back-to-store">
					<FaArrowLeft />
					Continue shopping as guest
				</Link>
			</section>
		</main>
	);
}

export default Login;
