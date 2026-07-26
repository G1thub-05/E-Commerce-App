import "./CategoryFilter.css";

function CategoryFilter({
	categories,
	selectedCategory,
	setSelectedCategory,
	selectedPriceRange,
	setSelectedPriceRange,
}) {
	return (
		<div className="filter-toolbar">
			<div className="category-container" aria-label="Product categories">
				<button
					className={selectedCategory === "all" ? "active" : ""}
					onClick={() => setSelectedCategory("all")}
				>
					All
				</button>

				{categories.map((category) => (
					<button
						key={category}
						className={selectedCategory === category ? "active" : ""}
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</button>
				))}
			</div>

			<label className="price-filter" htmlFor="price-range">
				<span>Price</span>
				<select
					id="price-range"
					value={selectedPriceRange}
					onChange={(event) => setSelectedPriceRange(event.target.value)}
				>
					<option value="all">All prices</option>
					<option value="under-50">Under Rs. 50</option>
					<option value="50-100">Rs. 50 – Rs. 100</option>
					<option value="100-500">Rs. 100 – Rs. 500</option>
					<option value="over-500">Over Rs. 500</option>
				</select>
			</label>
		</div>
	);
}

export default CategoryFilter;
