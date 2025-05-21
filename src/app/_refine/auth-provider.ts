// Refine auth provider

import { AuthBindings } from "@refinedev/core";

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    // Implement your authentication logic here
    if (email && password) {
      localStorage.setItem("auth", JSON.stringify({ email }));
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid credentials",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
