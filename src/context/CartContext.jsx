import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
export function CartProvider({ children }) {
	const [cart, setCart] = useState(() => {
		const data = localStorage.getItem("cart");
		return data ? JSON.parse(data) : [];
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	function addToCart(product) {
		const exist = cart.find((item) => item.id === product.id);

		if (exist) {
			increaseQty(product.id);
		} else {
			setCart([
				...cart,
				{
					...product,
					quantity: 1,
				},
			]);
		}
	}

	function removeFromCart(id) {
		setCart(cart.filter((item) => item.id !== id));
	}

	function increaseQty(id) {
		setCart(
			cart.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
			),
		);
	}

	function decreaseQty(id) {
		setCart(
			cart
				.map((item) =>
					item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
				)
				.filter((item) => item.quantity > 0),
		);
	}

	function placeOrder() {
		setCart([]);
	}

	const totalItems = cart.reduce(
		(sum, item) => sum + item.quantity,

		0,
	);

	const cartTotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,

		0,
	);

	return (
		<CartContext.Provider
			value={{
				cart,

				addToCart,

				removeFromCart,

				increaseQty,

				decreaseQty,

				placeOrder,

				totalItems,

				cartTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
