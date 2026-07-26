import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import API from "../../services/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

const PRODUCTS_PER_PAGE = 8;

function Home() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedPriceRange, setSelectedPriceRange] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		async function loadCatalog() {
			const [productsResponse, categoriesResponse] = await Promise.all([
				API.get("/products"),
				API.get("/products/categories"),
			]);

			setProducts(productsResponse.data);
			setCategories(categoriesResponse.data);
		}

		loadCatalog();
	}, []);

	const filteredProducts = products.filter((product) => {
		const matchSearch = product.title
			.toLowerCase()
			.includes(search.toLowerCase());

		const matchCategory =
			selectedCategory === "all" || product.category === selectedCategory;
		const matchPrice =
			selectedPriceRange === "all" ||
			(selectedPriceRange === "under-50" && product.price < 50) ||
			(selectedPriceRange === "50-100" &&
				product.price >= 50 &&
				product.price <= 100) ||
			(selectedPriceRange === "100-500" &&
				product.price > 100 &&
				product.price <= 500) ||
			(selectedPriceRange === "over-500" && product.price > 500);

		return matchSearch && matchCategory && matchPrice;
	});

	const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
	const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
	const paginatedProducts = filteredProducts.slice(
		startIndex,
		startIndex + PRODUCTS_PER_PAGE,
	);

	function handleSearchChange(value) {
		setSearch(value);
		setCurrentPage(1);
	}

	function handleCategoryChange(category) {
		setSelectedCategory(category);
		setCurrentPage(1);
	}

	function handlePriceRangeChange(priceRange) {
		setSelectedPriceRange(priceRange);
		setCurrentPage(1);
	}

	function goToPage(page) {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	const firstProduct = filteredProducts.length === 0 ? 0 : startIndex + 1;
	const lastProduct = Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length);

	return (
		<div className="home">
			<SearchBar search={search} setSearch={handleSearchChange} />

			<CategoryFilter
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={handleCategoryChange}
				selectedPriceRange={selectedPriceRange}
				setSelectedPriceRange={handlePriceRangeChange}
			/>

			{filteredProducts.length > 0 ? (
				<>
					<div className="product-results">
						<p>
							Showing <strong>{firstProduct}–{lastProduct}</strong> of{" "}
							<strong>{filteredProducts.length}</strong> products
						</p>
						<p>Page {currentPage} of {totalPages}</p>
					</div>

					<div className="product-grid">
						{paginatedProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>

					{totalPages > 1 && (
						<nav className="pagination" aria-label="Product pages">
							<button
								type="button"
								className="pagination-arrow"
								onClick={() => goToPage(currentPage - 1)}
								disabled={currentPage === 1}
								aria-label="Previous page"
							>
								<FaChevronLeft />
							</button>

							<div className="pagination-pages">
								{Array.from({ length: totalPages }, (_, index) => index + 1).map(
									(page) => (
										<button
											key={page}
											type="button"
											className={page === currentPage ? "active" : ""}
											onClick={() => goToPage(page)}
											aria-label={`Page ${page}`}
											aria-current={page === currentPage ? "page" : undefined}
										>
											{page}
										</button>
									),
								)}
							</div>

							<button
								type="button"
								className="pagination-arrow"
								onClick={() => goToPage(currentPage + 1)}
								disabled={currentPage === totalPages}
								aria-label="Next page"
							>
								<FaChevronRight />
							</button>
						</nav>
					)}
				</>
			) : (
				<section className="no-products" aria-live="polite">
					<h2>No products found</h2>
					<p>Try another search term or choose a different category.</p>
				</section>
			)}
		</div>
	);
}

export default Home;
