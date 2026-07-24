import { useContext, useEffect, useState } from "react";
import API from "../../services/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import { CartContext } from "../../context/CartContext";
import "./Home.css";

function Home() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");

	useEffect(() => {
		getProducts();
		getCategories();
	}, []);

	async function getProducts() {
		const res = await API.get("/products");
		setProducts(res.data);
	}

	async function getCategories() {
		const res = await API.get("/products/categories");
		setCategories(res.data);
	}

	const filteredProducts = products.filter((product) => {
		const matchSearch = product.title
			.toLowerCase()
			.includes(search.toLowerCase());

		const matchCategory =
			selectedCategory === "all" || product.category === selectedCategory;

		return matchSearch && matchCategory;
	});

	return (
		<div className="home">
			<SearchBar search={search} setSearch={setSearch} />

			<CategoryFilter
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>

			<div className="product-grid">
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default Home;
