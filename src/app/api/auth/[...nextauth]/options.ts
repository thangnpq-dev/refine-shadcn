import KeycloakProvider from "next-auth/providers/keycloak";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  // Configure multiple authentication providers
  providers: [
    // Keycloak provider (SSO)
    KeycloakProvider({
      clientId: `refine-demo`,
      clientSecret: `refine`,
      issuer: `https://lemur-0.cloud-iam.com/auth/realms/refine`,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
          image: `https://faces-img.xcdn.link/thumb-lorem-face-6312_thumb.jpg`,
        };
      },
    }),
    // Credentials provider (username/password)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "demo@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you would typically verify credentials against a database
        // For demo purposes, we'll just use a hardcoded user
        if (credentials?.username === "admin" && credentials?.password === "admin") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            image: "https://faces-img.xcdn.link/thumb-lorem-face-6312_thumb.jpg",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to the token if it exists
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user info to the session if it exists in the token
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
  secret: `UItTuD1HcGXIj8ZfHUswhYdNd40Lc325R8VlxQPUoR0=`,
};

export default authOptions;
