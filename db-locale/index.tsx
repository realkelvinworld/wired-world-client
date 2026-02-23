import * as Icon from "@phosphor-icons/react";
import { routes } from "@/routes";

/**
 * brandLogos
 * Array of featured brand objects for display (e.g. homepage, brand carousel).
 * Each object contains:
 * - name: Brand name
 * - logo: Path to logo image
 * - description: Short tagline/description
 */
export const brandLogos = [
  {
    name: "LG",
    logo: "/logos/LG-LOGO.svg",
    description: "Premium home electronics & appliances",
  },
  {
    name: "Sony",
    logo: "/logos/SONY-LOGO.png",
    description: "Entertainment, gaming & audio systems",
  },
  {
    name: "Samsung",
    logo: "/logos/SAMSUNG-LOGO.avif",
    description: "Smart devices & home innovation",
  },
  {
    name: "Midea",
    logo: "/logos/MIDEA-LOGO.png",
    description: "Affordable home & kitchen appliances",
  },
  {
    name: "Nasco",
    logo: "/logos/NASCO-LOGO.png",
    description: "Reliable everyday electronics",
  },
  {
    name: "TCL",
    logo: "/logos/TCL-LOGO.png",
    description: "Smart TVs & display technology",
  },
];

/**
 * categories
 * Main product categories for navigation menus and filtering.
 * Each category contains:
 * - name: Category name
 * - description: Short description
 * - icon: Phosphor icon component
 * - items: Array of subcategory objects (name, href)
 */
export const categories = [
  {
    name: "Televisions",
    description: "Smart TVs & displays",
    icon: Icon.MonitorIcon,
    items: [
      { name: "UHD 4K TVs", href: "#" },
      { name: "QHD TVs", href: "#" },
      { name: "OLED TVs", href: "#" },
      { name: "Smart TVs", href: "#" },
      { name: "LED TVs", href: "#" },
    ],
  },
  {
    name: "Home Appliances",
    description: "Fridges, washers & more",
    icon: Icon.HouseIcon,
    items: [
      { name: "Refrigerators", href: "#" },
      { name: "Washing Machines", href: "#" },
      { name: "Dryers", href: "#" },
      { name: "Vacuum Cleaners", href: "#" },
      { name: "Irons", href: "#" },
    ],
  },
  {
    name: "Audio & Sound",
    description: "Speakers & headphones",
    icon: Icon.SpeakerHighIcon,
    items: [
      { name: "Soundbars", href: "#" },
      { name: "Headphones", href: "#" },
      { name: "Bluetooth Speakers", href: "#" },
      { name: "Home Theater Systems", href: "#" },
      { name: "Earbuds", href: "#" },
    ],
  },
  {
    name: "Kitchen",
    description: "Cooking & kitchen electronics",
    icon: Icon.CookingPotIcon,
    items: [
      { name: "Microwaves", href: "#" },
      { name: "Blenders", href: "#" },
      { name: "Air Fryers", href: "#" },
      { name: "Electric Kettles", href: "#" },
      { name: "Rice Cookers", href: "#" },
    ],
  },
  {
    name: "Air Conditioning",
    description: "ACs, fans & cooling",
    icon: Icon.WindIcon,
    items: [
      { name: "Split ACs", href: "#" },
      { name: "Portable ACs", href: "#" },
      { name: "Standing Fans", href: "#" },
      { name: "Ceiling Fans", href: "#" },
      { name: "Air Purifiers", href: "#" },
    ],
  },
  {
    name: "Computing",
    description: "Laptops, monitors & accessories",
    icon: Icon.LaptopIcon,
    items: [
      { name: "Laptops", href: "#" },
      { name: "Monitors", href: "#" },
      { name: "Printers", href: "#" },
      { name: "Keyboards & Mice", href: "#" },
      { name: "Storage Devices", href: "#" },
    ],
  },
];

/**
 * quicknavlinks
 * Used for quick navigation sections (e.g. homepage shortcuts).
 * Each link contains:
 * - name: Category name
 * - description: Short description
 * - icon: Phosphor icon component
 * - url: Route to filtered shop page for the category
 */
export const quicknavlinks = [
  {
    name: "Televisions",
    description: "Smart TVs & displays",
    icon: Icon.MonitorIcon,
    url: routes.shop + "?category=televisions",
  },
  {
    name: "Home Appliances",
    description: "Fridges, washers & more",
    icon: Icon.HouseIcon,
    url: routes.shop + "?category=home-appliances",
  },
  {
    name: "Audio & Sound",
    description: "Speakers & headphones",
    icon: Icon.SpeakerHighIcon,
    url: routes.shop + "?category=audio-sound",
  },
  {
    name: "Kitchen",
    description: "Cooking & kitchen electronics",
    icon: Icon.CookingPotIcon,
    url: routes.shop + "?category=kitchen",
  },
  {
    name: "Air Conditioning",
    description: "ACs, fans & cooling",
    icon: Icon.WindIcon,
    url: routes.shop + "?category=air-conditioning",
  },
  {
    name: "Computing",
    description: "Laptops, monitors & accessories",
    icon: Icon.LaptopIcon,
    url: routes.shop + "?category=computing",
  },
];

/**
 * mobileLinks
 * Navigation links for mobile menu/drawer.
 * Each link contains:
 * - label: Display text
 * - href: Route from routes object
 */
export const mobileLinks = [
  { label: "Home", href: routes.home },
  { label: "Shop", href: routes.shop.shop },
  { label: "Showrooms", href: routes.showrooms },
  { label: "Contact", href: routes.contact },
];

/**
 * socialLinks
 * Social media links for footer/header.
 * Each link contains:
 * - label: Platform name
 * - href: External URL (currently "#")
 * - icon: Phosphor icon component for the platform
 */
export const socialLinks = [
  { label: "Twitter", href: "#", icon: Icon.XLogoIcon },
  { label: "Instagram", href: "#", icon: Icon.InstagramLogoIcon },
  { label: "LinkedIn", href: "#", icon: Icon.LinkedinLogoIcon },
  { label: "YouTube", href: "#", icon: Icon.YoutubeLogoIcon },
];
