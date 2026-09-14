require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Seller = require("./models/Seller");
const GiftBox = require("./models/GiftBox");
const Wrapping = require("./models/Wrapping");
const GreetingCard = require("./models/GreetingCard");
const Coupon = require("./models/Coupon");

const sellers = [
  { name: "Sweet Delights", description: "Premium chocolates and confectionery", rating: 4.8, reviews: 156, productsCount: 12 },
  { name: "Nature's Basket", description: "Organic dry fruits and health foods", rating: 4.6, reviews: 98, productsCount: 8 },
  { name: "GiftGuru", description: "Curated gift hampers for every occasion", rating: 4.7, reviews: 210, productsCount: 15 },
  { name: "Wellness Hub", description: "Self-care and wellness products", rating: 4.5, reviews: 75, productsCount: 6 },
  { name: "Coffee House", description: "Premium coffee and tea collections", rating: 4.4, reviews: 62, productsCount: 5 },
];

const products = [
  {
    title: "Luxury Chocolate Hamper",
    description: "Indulge in a premium selection of handcrafted chocolates, truffles, and cocoa delights beautifully arranged in an elegant gift box. Perfect for chocolate lovers on special occasions.",
    price: 1299,
    originalPrice: 1799,
    image: ["/images/h1.png"],
    stock: 25,
    features: ["12 premium chocolates", "Handcrafted truffles", "Belgian cocoa", "Elegant gift box", "Personalized message card"],
    tags: ["chocolate", "luxury", "gift", "premium"],
    mainCategory: "Occasion",
    subCategory: "birthday",
    giftTypes: ["chocolate"],
    isFeatured: true,
    customizable: true,
    sellerName: "Sweet Delights",
    rating: 4.8,
    reviews: 45,
    reviewsData: [
      { name: "Priya S.", rating: 5, title: "Amazing quality!", comment: "The chocolates were fresh and beautifully packaged. Perfect gift for my mom.", date: "2024-12-18" },
      { name: "Rahul M.", rating: 5, title: "Excellent!", comment: "Best chocolate hamper I've ever ordered. Will buy again.", date: "2024-12-15" },
    ],
  },
  {
    title: "Dry Fruit Delight Box",
    description: "A healthy and luxurious assortment of premium dry fruits including almonds, cashews, pistachios, and raisins sourced from the finest orchards.",
    price: 899,
    originalPrice: 1199,
    image: ["/images/h2.png"],
    stock: 30,
    features: ["Premium almonds", "Cashews", "Pistachios", "Raisins", "Air-tight packaging"],
    tags: ["dry fruits", "healthy", "premium"],
    mainCategory: "GiftType",
    subCategory: "dry-fruits",
    giftTypes: ["dry-fruits"],
    isFeatured: true,
    sellerName: "Nature's Basket",
    rating: 4.6,
    reviews: 32,
    reviewsData: [
      { name: "Anita K.", rating: 4, title: "Good quality", comment: "Fresh dry fruits, well packed. Slightly expensive but worth it.", date: "2024-12-10" },
    ],
  },
  {
    title: "Birthday Surprise Hamper",
    description: "Make their birthday unforgettable with this fun-filled hamper containing chocolates, party accessories, a small toy, and a personalized birthday card.",
    price: 1599,
    originalPrice: 2099,
    image: ["/images/h3.png"],
    stock: 15,
    features: ["Birthday decorations", "Chocolates", "Party hat", "Personalized card", "Balloon set"],
    tags: ["birthday", "party", "celebration"],
    mainCategory: "Occasion",
    subCategory: "birthday",
    giftTypes: ["personalized"],
    isFeatured: true,
    sellerName: "GiftGuru",
    rating: 4.7,
    reviews: 58,
    reviewsData: [
      { name: "Vikram R.", rating: 5, title: "Perfect birthday gift!", comment: "My friend loved it! Great variety and quality.", date: "2024-12-12" },
    ],
  },
  {
    title: "Wellness Self-Care Kit",
    description: "A thoughtfully curated wellness kit featuring aromatherapy candles, bath salts, essential oils, herbal tea, and a jade roller for complete relaxation.",
    price: 999,
    originalPrice: 1399,
    image: ["/images/h1.png"],
    stock: 20,
    features: ["Aromatherapy candle", "Bath salts", "Essential oil set", "Herbal tea", "Jade roller"],
    tags: ["wellness", "self-care", "relaxation"],
    mainCategory: "GiftType",
    subCategory: "self-care",
    giftTypes: ["self-care", "wellness"],
    isFeatured: false,
    sellerName: "Wellness Hub",
    rating: 4.5,
    reviews: 28,
    reviewsData: [],
  },
  {
    title: "Gourmet Coffee Hamper",
    description: "For the coffee connoisseur — premium Arabica beans, artisanal coffee blends, a French press, and gourmet biscuits all in a rustic gift basket.",
    price: 1499,
    originalPrice: 1899,
    image: ["/images/h2.png"],
    stock: 18,
    features: ["Arabica beans", "Artisanal blend", "French press", "Gourmet biscuits", "Coffee mug"],
    tags: ["coffee", "gourmet", "luxury"],
    mainCategory: "GiftType",
    subCategory: "coffee-tea",
    giftTypes: ["coffee-tea"],
    isFeatured: true,
    sellerName: "Coffee House",
    rating: 4.4,
    reviews: 22,
    reviewsData: [],
  },
  {
    title: "Premium Dry Fruit Box",
    description: "An opulent box of imported dry fruits including macadamia nuts, Brazil nuts, dried cranberries, and premium pistachios from Kashmir.",
    price: 2199,
    originalPrice: 2599,
    image: ["/images/h3.png"],
    stock: 12,
    features: ["Macadamia nuts", "Brazil nuts", "Dried cranberries", "Kashmir pistachios", "Velvet box"],
    tags: ["dry fruits", "premium", "luxury"],
    mainCategory: "GiftType",
    subCategory: "dry-fruits",
    giftTypes: ["dry-fruits", "luxury"],
    isFeatured: true,
    sellerName: "Nature's Basket",
    rating: 4.7,
    reviews: 15,
    reviewsData: [],
  },
  {
    title: "Anniversary Special Hamper",
    description: "Celebrate love with this romantic hamper featuring scented candles, rose petals, a heart-shaped chocolate box, and a love note journal.",
    price: 1899,
    originalPrice: 2499,
    image: ["/images/h1.png"],
    stock: 10,
    features: ["Scented candles", "Rose petals", "Heart-shaped chocolates", "Love note journal", "Silk ribbon"],
    tags: ["anniversary", "romantic", "love"],
    mainCategory: "Occasion",
    subCategory: "anniversary",
    giftTypes: ["personalized"],
    isFeatured: true,
    sellerName: "GiftGuru",
    rating: 4.9,
    reviews: 42,
    reviewsData: [],
  },
  {
    title: "Kids Gift Basket",
    description: "A fun and colorful gift basket packed with candies, a stuffed toy, coloring books, stickers, and a surprise mini game.",
    price: 699,
    originalPrice: 999,
    image: ["/images/h2.png"],
    stock: 35,
    features: ["Assorted candies", "Stuffed toy", "Coloring book", "Sticker sheet", "Mini game"],
    tags: ["kids", "fun", "colorful"],
    mainCategory: "Recipient",
    subCategory: "kids",
    giftTypes: ["snacks"],
    isFeatured: false,
    sellerName: "GiftGuru",
    rating: 4.3,
    reviews: 18,
    reviewsData: [],
  },
];

const giftBoxes = [
  { name: "Classic Box", price: 0, description: "Standard kraft gift box", features: ["Kraft paper box", "Ribbon tie", "Gift tag"] },
  { name: "Premium Velvet Box", price: 149, description: "Luxurious velvet-finish box", features: ["Velvet finish", "Magnetic closure", "Satin lining"] },
  { name: "Wooden Crate", price: 249, description: "Handcrafted wooden crate", features: ["Natural wood", "Reusable", "Rustic charm"] },
  { name: "Eco-Friendly Box", price: 99, description: "Sustainable recycled box", features: ["100% recycled", "Biodegradable", "Plantable seed tag"] },
];

const wrappings = [
  { name: "Classic Red Wrap", price: 49, description: "Traditional red wrapping paper", features: ["Red matte paper", "Gold ribbon", "Bow"] },
  { name: "Floral Elegance", price: 79, description: "Beautiful floral pattern wrap", features: ["Floral print", "Satin ribbon", "Dried flower accent"] },
  { name: "Minimalist Kraft", price: 39, description: "Clean kraft paper wrap", features: ["Natural kraft", "Twine string", "Wax seal"] },
  { name: "Luxury Gold", price: 129, description: "Premium gold foil wrapping", features: ["Gold foil paper", "Velvet ribbon", "Gift charm"] },
  { name: "Pastel Dream", price: 69, description: "Soft pastel-colored wrap", features: ["Pastel palette", "Organza ribbon", "Sticker seal"] },
  { name: "Transparent Window", price: 59, description: "Clear wrap with decorative border", features: ["Clear cellophane", "Decorative border", "Peek-through design"] },
];

const greetingCards = [
  { name: "Happy Birthday", price: 49, description: "Colorful birthday card with cake illustration", defaultMessage: "Wishing you a wonderful birthday filled with joy!" },
  { name: "Thank You", price: 39, description: "Elegant thank you card", defaultMessage: "Thank you for being so wonderful!" },
  { name: "Congratulations", price: 49, description: "Celebration themed card", defaultMessage: "Congratulations on your achievement!" },
  { name: "With Love", price: 49, description: "Romantic love card", defaultMessage: "Sending you all my love and warm wishes." },
  { name: "Best Wishes", price: 39, description: "General best wishes card", defaultMessage: "Wishing you all the best in everything!" },
];

const coupons = [
  { code: "WELCOME10", title: "10% Off", description: "Get 10% off on your first order", type: "percentage", value: 10, minAmount: 500, maxDiscount: 200, usageLimit: 1000 },
  { code: "FLAT100", title: "Flat ₹100 Off", description: "Flat ₹100 off on orders above ₹999", type: "flat", value: 100, minAmount: 999, usageLimit: 500 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    await Seller.deleteMany({});
    await GiftBox.deleteMany({});
    await Wrapping.deleteMany({});
    await GreetingCard.deleteMany({});
    await Coupon.deleteMany({});

    const createdSellers = await Seller.insertMany(sellers);
    console.log(`${createdSellers.length} sellers seeded`);

    const productsWithSellers = products.map((p) => {
      const seller = createdSellers.find((s) => s.name === p.sellerName);
      return { ...p, sellerId: seller ? seller._id : null };
    });
    const createdProducts = await Product.insertMany(productsWithSellers);
    console.log(`${createdProducts.length} products seeded`);

    const createdGiftBoxes = await GiftBox.insertMany(giftBoxes);
    console.log(`${createdGiftBoxes.length} gift boxes seeded`);

    const createdWrappings = await Wrapping.insertMany(wrappings);
    console.log(`${createdWrappings.length} wrappings seeded`);

    const createdCards = await GreetingCard.insertMany(greetingCards);
    console.log(`${createdCards.length} greeting cards seeded`);

    const createdCoupons = await Coupon.insertMany(coupons);
    console.log(`${createdCoupons.length} coupons seeded`);

    console.log("Seed complete!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
