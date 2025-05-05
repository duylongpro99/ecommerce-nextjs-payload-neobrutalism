import config from "@payload-config";
import { getPayload } from "payload";

type Subcategory = {
  name: string;
  slug: string;
};

type Category = {
  name: string;
  slug: string;
  color?: string;
  subcategories?: Subcategory[];
};

const categories: Category[] = [
  {
    name: "All Products",
    slug: "all-products",
  },
  {
    name: "Fashion & Apparel",
    color: "#FFB347",
    slug: "fashion-apparel",
    subcategories: [
      { name: "Men's Clothing", slug: "mens-clothing" },
      {
        name: "Women's Clothing",
        slug: "womens-clothing",
      },
      { name: "Kids & Baby", slug: "kids-baby" },
      { name: "Shoes & Footwear", slug: "shoes-footwear" },
      { name: "Jewelry & Accessories", slug: "jewelry-accessories" },
      {
        name: "Bags & Luggage",
        slug: "bags-luggage",
      },
      { name: "Athletic & Sportswear", slug: "athletic-sportswear" },
      { name: "Seasonal Collections", slug: "seasonal-collections" },
      { name: "Designer Brands", slug: "designer-brands" },
    ],
  },
  {
    name: "Electronics & Gadgets",
    color: "#7EC8E3",
    slug: "electronics-gadgets",
    subcategories: [
      { name: "Smartphones & Accessories", slug: "smartphones-accessories" },
      { name: "Laptops & Computers", slug: "laptops-computers" },
      { name: "Audio & Headphones", slug: "audio-headphones" },
      { name: "Gaming & Consoles", slug: "gaming-consoles" },
      { name: "Smart Home Devices", slug: "smart-home-devices" },
    ],
  },
  {
    name: "Home & Kitchen",
    color: "#D8B5FF",
    slug: "home-kitchen",
    subcategories: [
      { name: "Furniture", slug: "furniture" },
      { name: "Kitchen Appliances", slug: "kitchen-appliances" },
      { name: "Bedding & Linens", slug: "bedding-linens" },
      { name: "Home Decor", slug: "home-decor" },
      { name: "Storage & Organization", slug: "storage-organization" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
  {
    name: "Food & Grocery",
    color: "#FFE066",
    slug: "food-grocery",
    subcategories: [
      { name: "Fresh Produce", slug: "fresh-produce" },
      { name: "Bakery & Bread", slug: "bakery-bread" },
      { name: "Dairy & Eggs", slug: "dairy-eggs" },
      { name: "Meat & Seafood", slug: "meat-seafood" },
    ],
  },
  {
    name: "Beauty & Personal Care",
    color: "#96E6B3",
    slug: "beauty-personal-care",
    subcategories: [
      { name: "Skincare", slug: "skincare" },
      { name: "Makeup", slug: "makeup" },
      { name: "Haircare", slug: "haircare" },
      { name: "Fragrances", slug: "fragrances" },
    ],
  },
  {
    name: "Sports & Outdoors",
    color: "#FF9AA2",
    slug: "sports-outdoors",
    subcategories: [
      { name: "Exercise Equipment", slug: "exercise-equipment" },
      { name: "Outdoor Recreation", slug: "outdoor-recreation" },
      { name: "Team Sports", slug: "team-sports" },
      { name: "Camping Gear", slug: "camping-gear" },
    ],
  },
  {
    name: "Toys & Games",
    color: "#B5B9FF",
    slug: "toys-games",
    subcategories: [
      { name: "Action Figures", slug: "action-figures" },
      { name: "Board Games", slug: "board-games" },
      { name: "Educational Toys", slug: "educational-toys" },
      { name: "Outdoor Play", slug: "outdoor-play" },
    ],
  },
  {
    name: "Books & Media",
    color: "#FFCAB0",
    slug: "books-media",
    subcategories: [
      { name: "Fiction Books", slug: "fiction-books" },
      { name: "Non-Fiction Books", slug: "non-fiction-books" },
      { name: "eBooks", slug: "ebooks" },
      { name: "Audiobooks", slug: "audiobooks" },
      { name: "Magazines", slug: "magazines" },
    ],
  },
  {
    name: "Automotive",
    color: "#FFD700",
    slug: "automotive",
    subcategories: [
      { name: "Car Accessories", slug: "car-accessories" },
      { name: "Tools & Equipment", slug: "tools-equipment" },
      { name: "Car Care", slug: "car-care" },
      { name: "Motorcycle Gear", slug: "motorcycle-gear" },
    ],
  },
  {
    name: "Pet Supplies",
    color: "#FF6B6B",
    slug: "pet-supplies",
    subcategories: [
      { name: "Dog Supplies", slug: "dog-supplies" },
      { name: "Cat Supplies", slug: "cat-supplies" },
      { name: "Fish & Aquarium", slug: "fish-aquarium" },
      { name: "Small Pet Supplies", slug: "small-pet-supplies" },
      { name: "Bird Supplies", slug: "bird-supplies" },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });
  for (const cat of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: cat.name,
        slug: cat.slug,
        color: cat.color,
        parent: null,
      },
    });

    for (const subCat of cat.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCat.name,
          slug: subCat.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.info("Seeding done sucessfully");
} catch (error) {
  console.error(error);
} finally {
  process.exit(0);
}
