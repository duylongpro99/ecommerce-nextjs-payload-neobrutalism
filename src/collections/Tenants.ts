import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store name",
      admin: {
        description: "N ame of store",
      },
    },

    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      access: {
        create: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: "Subdomain of the store",
      },
    },

    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },

    {
      name: "paymentAccountId",
      type: "text",
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        readOnly: true,
        description: "Stripe AccountId associated with your shop",
      },
    },

    {
      name: "paymentDetailsSubmitted",
      type: "checkbox",
      admin: {
        readOnly: true,
        description: "Please submi Payment details before create products",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
  ],
};
