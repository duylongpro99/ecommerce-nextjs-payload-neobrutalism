import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
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
      admin: {
        readOnly: true,
      },
    },

    {
      name: "paymentDetailsSubmitted",
      type: "checkbox",
      admin: {
        readOnly: true,
        description: "Please submi Payment details before create products",
      },
    },
  ],
};
