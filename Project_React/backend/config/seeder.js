import Product from "../models/Product.js";

const defaultProducts = [
  {
    name: "Paneer Butter Masala",
    price: 220,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80",
    category: "veg",
  },
  {
    name: "Veg Biryani",
    price: 180,
    image: "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=600&q=80",
    category: "veg",
  },
  {
    name: "Palak Paneer",
    price: 210,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    category: "veg",
  },
  {
    name: "Masala Dosa",
    price: 120,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80",
    category: "veg",
  },
  {
    name: "Dal Makhani",
    price: 160,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
    category: "veg",
  },
  {
    name: "Chole Bhature",
    price: 140,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80",
    category: "veg",
  },
  {
    name: "Veg Fried Rice",
    price: 150,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
    category: "veg",
  },
  {
    name: "Aloo Paratha",
    price: 100,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    category: "veg",
  },
  {
    name: "Paneer Tikka",
    price: 250,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
    category: "veg",
  },
  {
    name: "Chicken Biryani",
    price: 280,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&q=80",
    category: "nonveg",
  },
  {
    name: "Mutton Curry",
    price: 350,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80",
    category: "nonveg",
  },
  {
    name: "Fish Fry",
    price: 300,
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&q=80",
    category: "nonveg",
  },
  {
    name: "Butter Chicken",
    price: 320,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
    category: "nonveg",
  },
  {
    name: "Chicken Tikka",
    price: 290,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    category: "nonveg",
  },
  {
    name: "Prawn Masala",
    price: 380,
    image: "https://images.unsplash.com/photo-1625938145744-533a7b7c1de5?w=600&q=80",
    category: "nonveg",
  },
  {
    name: "Egg Curry",
    price: 180,
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80",
    category: "nonveg",
  },
  {
    name: "Chicken 65",
    price: 260,
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&q=80",
    category: "nonveg",
  },
  {
    name: "Mutton Biryani",
    price: 400,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    category: "nonveg",
  }
];

export const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("No products found in database. Seeding initial products...");
      await Product.insertMany(defaultProducts);
      console.log("Database seeded successfully with 18 default products!");
    } else {
      console.log(`Database already has ${count} products. Seeding skipped.`);
    }
  } catch (error) {
    console.error("Error seeding the database:", error.message);
  }
};
