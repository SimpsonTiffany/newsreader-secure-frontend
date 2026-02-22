import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS = [
    { username: "tiffany", password: "password123", role: "regular" },
    { username: "admin", password: "admin123", role: "admin" },
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const isAuthenticated = useMemo(() => !!user, [user]);

    function login(username, password) {
        const found = USERS.find(
            (u) => u.username === username && u.password === password
        );
        if (!found) return { ok: false, message: "Invalid username or password" };
        setUser({ username: found.username, role: found.role });
        return { ok: true };
    }

    function logout() {
        setUser(null);
    }

    function isAdmin() {
        return user?.role === "admin";
    }

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        isAdmin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}