import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import { CartContext } from "../../context/CartContext";
import "./ProductDetails.css";
import { Slide, toast, Zoom } from "react-toastify";

function ProductDetails() {
	const { id } = useParams();

	const [product, setProduct] = useState(null);

	const { cart, addToCart, removeFromCart } = useContext(CartContext);

	useEffect(() => {
		getProduct();
	}, [id]);

	async function getProduct() {
		const res = await API.get(`/products/${id}`);
		setProduct(res.data);
	}

	if (!product) return <h2 className="loading">Loading...</h2>;

	const isInCart = cart.some((item) => item.id === product.id);

	return (
		<div className="details-container">
			<div className="image-box">
				<img src={product.image} alt={product.title} />
			</div>

			<div className="details-info">
				<span className="category">{product.category}</span>

				<h2>{product.title}</h2>

				<div className="rating">
					⭐ {product.rating.rate}
					<span> ({product.rating.count} Reviews)</span>
				</div>

				<h3>$ {product.price}</h3>

				<p>{product.description}</p>

				<div className="button-group">
					{isInCart ? (
						<button
							className="remove-btn"
							onClick={() => {
								removeFromCart(product.id);

								toast("🛒 Product removed successfully.", {
									transition: Zoom,
									icon: "🛒",
								});
							}}
						>
							🗑 Remove From Cart
						</button>
					) : (
						<button
							className="add-btn"
							onClick={() => {
								addToCart(product);

								toast("🛒 Product added successfully.", {
									transition: Slide,
									icon: "🛒",
								});
							}}
						>
							🛒 Add To Cart
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;
