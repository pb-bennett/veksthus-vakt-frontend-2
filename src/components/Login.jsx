import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

import { useData } from "../hooks/useData";
import { useExpanded } from "../hooks/useExpanded";
import { useSelected } from "../hooks/useSelected";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const { setUser } = useData();
  const { setExpanded, setEnabled } = useExpanded();
  const { setSelected } = useSelected();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      const { token } = data.data;
      localStorage.setItem("token", token);

      const validateTokenResponse = await fetch(
        `${apiUrl}/auth/validate-token`,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!validateTokenResponse.ok) {
        const validateTokenError = await validateTokenResponse.json();
        throw new Error(
          validateTokenError.message || "Token validation failed",
        );
      }

      const validateTokenData = await validateTokenResponse.json();

      setEmail("");
      setPassword("");
      setUser(validateTokenData.data);
      setSelected("Overview");
      setExpanded(true);
      setEnabled(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex min-h-screen items-center justify-center text-stone-600">
          <div className="flex flex-col items-center justify-center gap-1 py-2">
            <form
              onSubmit={handleLogin}
              className="flex w-full flex-col items-center gap-2 rounded-md bg-stone-100 p-4 shadow"
            >
              <input
                className="w-full rounded-md border p-2 text-stone-600 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={loading}
              />
              <input
                className="w-full rounded-md border bg-stone-100 p-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-36 self-start rounded-md border px-2 py-1 hover:bg-emerald-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
