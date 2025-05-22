"use client";

import { Refine, type AuthProvider } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { dataProvider } from "@providers/data-provider";
import "@styles/global.css";

type RefineContextProps = {};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

type AppProps = {};

const App = (props: React.PropsWithChildren<AppProps>) => {
  const { data, status } = useSession();
  const to = usePathname();

  if (status === "loading") {
    return <span>loading...</span>;
  }

  const authProvider: AuthProvider = {
    login: async (params) => {
      // Skip Keycloak if the user is already authenticated via credentials
      // This check prevents automatic redirection to Keycloak after credential login
      if (status === "authenticated") {
        return {
          success: true,
          redirectTo: "/",
        };
      }

      // If we're explicitly using credentials, don't redirect to Keycloak
      if (params?.providerName === "credentials") {
        // The actual authentication is handled by the login form using NextAuth
        return {
          success: true,
          redirectTo: "/",
        };
      }

      // Default to Keycloak for SSO login
      signIn("keycloak", {
        callbackUrl: to ? to.toString() : "/",
        redirect: true,
      });

      return {
        success: true,
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: false,
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
        };
      }

      return null;
    },
  };

  return (
    <>
      <RefineKbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider}
          authProvider={authProvider}
          resources={[
            {
              name: "blog_posts",
              list: "/blog-posts",
              create: "/blog-posts/create",
              edit: "/blog-posts/edit/:id",
              show: "/blog-posts/show/:id",
              meta: {
                canDelete: true,
              },
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                canDelete: true,
              },
            },
            {
              name: "trial_table",
              list: "/trial-table",
              meta: {
                label: "Trial Table",
                canDelete: false,
              },
            },
            {
              name: "test",
              list: "/test",
              meta: {
                label: "Test",
                canDelete: false,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
          }}
        >
          {props.children}
          <RefineKbar />
        </Refine>
      </RefineKbarProvider>
    </>
  );
};
