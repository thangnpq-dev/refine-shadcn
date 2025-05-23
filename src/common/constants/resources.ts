import { IResourceItem } from "@refinedev/core";

export const APP_RESOURCES: IResourceItem[] = [
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
    name: "test",
    list: "/test",
    meta: {
      label: "Test",
      canDelete: false,
    },
  },
];
