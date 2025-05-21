"use client";

import { useLogin } from "@refinedev/core";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const { mutate: login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("credentials"); // "credentials" or "keycloak"

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError("Login failed. Please check your credentials.");
      } else {
        // Redirect will be handled by Refine
        // Pass providerName to let authProvider know this is a credentials login
        login({ providerName: "credentials" });
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeycloakLogin = () => {
    login({});
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 bg-slate-50 px-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg border bg-card p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">Sign in to continue to your account</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-2 font-medium ${
              activeTab === "credentials" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("credentials")}
          >
            Username/Password
          </button>
          <button
            className={`flex-1 py-2 font-medium ${
              activeTab === "keycloak" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("keycloak")}
          >
            Keycloak SSO
          </button>
        </div>

        {/* Credentials Login Form */}
        {activeTab === "credentials" && (
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              <p>Demo credentials: admin / admin</p>
            </div>
          </form>
        )}

        {/* Keycloak Login */}
        {activeTab === "keycloak" && (
          <div className="space-y-4">
            <Button
              className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90"
              onClick={handleKeycloakLogin}
            >
              Sign in with Keycloak
            </Button>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <span>Powered by</span>
              <img
                className="h-5 w-5"
                alt="Keycloak"
                src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fkeycloak.svg"
              />
              <span>Keycloak</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
