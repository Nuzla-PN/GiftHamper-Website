import {
  Cake,
  Heart,
  Sparkles,
  Baby,
  GraduationCap,
  Home as HomeIcon,
  Briefcase,
  Users,
  PartyPopper,
  Flower2,
  TreePine,
  Zap,
  Cookie,
  Grape,
  Coffee,
  Crown,
  Type,
  Leaf,
  IndianRupee,
} from "lucide-react";

export const categoryConfig = {
  Occasion: {
    name: "Occasion",
    items: [
      {
        id: "birthday",
        title: "Birthday",
        icon: Cake,
        image:
          "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400",
      },
      {
        id: "anniversary",
        title: "Anniversary",
        icon: Heart,
        image:
          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      },
      {
        id: "wedding",
        title: "Wedding",
        icon: Sparkles,
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      },
      {
        id: "baby-shower",
        title: "Baby Shower",
        icon: Baby,
        image:
          "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
      },
      {
        id: "graduation",
        title: "Graduation",
        icon: GraduationCap,
        image:
          "https://images.unsplash.com/photo-1623461487986-9400110de28e",
      },
      {
        id: "housewarming",
        title: "Housewarming",
        icon: HomeIcon,
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      },
    ],
  },

  Recipient: {
    name: "Recipient",
    items: [
      { id: "for him", title: "For Him", icon: Users ,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'},
      { id: "for her", title: "For Her", icon: Users, image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'  },
      { id: "kids", title: "For Kids", icon: Baby, image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400'  },
      { id: "parents", title: "For Parents", icon: Users ,image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400'},
      { id: "couples", title: "For Couples", icon: Heart, image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400' },
      { id: "corporate", title: "Corporate", icon: Briefcase,image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' },
    ],
  },

  Festival: {
    name: "Festival",
    items: [
      { id: "christmas", title: "Christmas", icon: TreePine,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
      { id: "diwali", title: "Diwali", icon: Zap,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
      { id: "new-year", title: "New Year", icon: PartyPopper,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
      { id: "valentines", title: "Valentine's Day", icon: Heart,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
      { id: "mothers-day", title: "Mother's Day", icon: Heart,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'},
      { id: "fathers-day", title: "Father's Day", icon: Users,image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400'},
    ],
  },

  GiftType: {
    name: "Gift Type",
    items: [
      { id: "luxury", title: "Luxury", icon: Crown },
      { id: "handmade", title: "Handmade", icon: Sparkles },
      { id: "chocolate", title: "Chocolate Hamper", icon: Cookie },
      { id: "snacks", title: "Snack Hamper", icon: Cookie },
      { id: "dry-fruits", title: "Dry Fruit Hamper", icon: Grape },
      { id: "coffee-tea", title: "Coffee & Tea", icon: Coffee },
      { id: "self-care", title: "Self Care", icon: Sparkles },
      { id: "personalized", title: "Personalized", icon: Type },
      { id: "wellness", title: "Wellness", icon: Leaf },
    ],
  },
};

export const priceConfig = [
  { title: "Under ₹500", value: "0-500", icon: IndianRupee },
  { title: "₹500 - ₹1,000", value: "500-1000", icon: IndianRupee },
  { title: "₹1,000 - ₹2,000", value: "1000-2000", icon: IndianRupee },
  { title: "₹2,000 - ₹5,000", value: "2000-5000", icon: Crown },
  { title: "Above ₹5,000", value: "5000-plus", icon: Crown },
];