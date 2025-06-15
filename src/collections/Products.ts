import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true,
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;
      // const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
      // return Boolean(tenant?.paymentDetailsSubmitted);
      return true;
    },
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
    description: "You must verify your account before creating products",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },

    {
      name: "description",
      type: "richText",
    },

    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "USD",
      },
    },

    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },

    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },

    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },

    {
      name: "refundPolicy",
      type: "select",
      options: ["30-days", "14-days", "7-days", "3-days", "1-day", "no-refund"],
      defaultValue: "30-days",
    },

    {
      name: "content",
      type: "richText",
      admin: {
        description:
          "Protected content only visible to customers after purchase. Add product documentation, download files, getting started guides, and bonus materials. Supports makrdown formatting",
      },
    },

    {
      name: "isArchived",
      label: "Archived",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description: "Check if you want to hide this product",
      },
    },

    {
      name: "isPrivated",
      label: "Private",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "If checked, this product will not be shown on the public storefront",
      },
    },
  ],
};
