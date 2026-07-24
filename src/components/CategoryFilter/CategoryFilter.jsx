import "./CategoryFilter.css";

function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
	return (
		<div className="category-container">
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
	);
}

export default CategoryFilter;
