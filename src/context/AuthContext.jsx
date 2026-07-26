import { useEffect, useState } from "react";
import { AuthContext } from "./auth";

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("shopEasyUser");
		return savedUser ? JSON.parse(savedUser) : null;
	});

	useEffect(() => {
		if (user) {
			localStorage.setItem("shopEasyUser", JSON.stringify(user));
		} else {
			localStorage.removeItem("shopEasyUser");
		}
	}, [user]);

	function login({ email }) {
		const name = email.split("@")[0].replace(/[._-]/g, " ");
		const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

		setUser({ email, name: formattedName });
	}

	function logout() {
		setUser(null);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
