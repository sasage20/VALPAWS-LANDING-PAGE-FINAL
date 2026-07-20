import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  LayoutDashboard,
  TrendingUp,
  UserCheck,
  LogOut,
  ShoppingBag,
  PieChart,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Store,
  Users,
  DollarSign,
  AlertTriangle,
  MessageSquare,
  Search,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Send,
  Bot,
  Clock,
  Globe,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Check
} from "lucide-react";

// @ts-ignore
import confetti from "canvas-confetti";

// Using Vite's relative path resolution
// @ts-ignore
import logoPlaceholder from "../imports/foodify_logo.png";
// @ts-ignore
import favicon from "../imports/foodify_transparent_logo.png";
// @ts-ignore
import asset1 from "../imports/placeholder_image.png";
// @ts-ignore
import dashboardImage from "../imports/foodify_dashboard.png";
// @ts-ignore
import redAsset from "../imports/red_asset.jpg";
// @ts-ignore
import yellowAsset from "../imports/yellow_asset.jpg";

// Interactive dashboard features metadata
const dashboardFeatures = [
  {
    id: 1,
    title: "Unified Sidebar Navigation",
    badge: "Navigation",
    icon: LayoutDashboard,
    description: "Easily navigate through Orders, Customers, Menu customization, Coupons, Reports, and Settings from a single, clean sidebar.",
    benefits: ["One-click access to all store modules", "Collapsible layout for optimized workspace", "Real-time badge notifications for new events"],
    position: { top: "13.90%", left: "30.06%" },
    boxPosition: { left: "1.11%", top: "2.57%", width: "31.90%", height: "15.08%" },
    target: { top: "38.0%", left: "32.5%" },
  },
  {
    id: 2,
    title: "Key Performance Metrics",
    badge: "Metrics Overview",
    icon: TrendingUp,
    description: "Track your business health at a glance with real-time stats for Total Orders, Revenue, Average Order Value, and Pending Orders.",
    benefits: ["Live revenue counters updating instantly", "Percentage comparisons vs the previous week", "Color-coded indicators for high priority items"],
    position: { top: "13.90%", left: "63.08%" },
    boxPosition: { left: "33.92%", top: "2.57%", width: "31.97%", height: "15.08%" },
    target: { top: "38.0%", left: "49.0%" },
  },
  {
    id: 3,
    title: "Admin Settings & Profile",
    badge: "Supplier Console",
    icon: UserCheck,
    description: "Manage your supplier account settings, view notifications, and access quick configurations directly from the header.",
    benefits: ["Quick profile customization", "Direct access to help center & live chat", "Instant status toggles (Online/Offline)"],
    position: { top: "13.63%", left: "96.15%" },
    boxPosition: { left: "66.99%", top: "2.57%", width: "31.90%", height: "15.08%" },
    target: { top: "31.0%", left: "68.0%" },
  },
  {
    id: 4,
    title: "Secure Session Management",
    badge: "Security",
    icon: LogOut,
    description: "Securely sign out of your account with one click to keep your store, financial wallet, and transaction history safe.",
    benefits: ["Instant local session clearing", "Protection for shared devices", "Auto-lock functionality on inactivity"],
    position: { top: "95.09%", left: "30.29%" },
    boxPosition: { left: "1.11%", top: "82.95%", width: "31.90%", height: "15.76%" },
    target: { top: "51.0%", left: "32.5%" },
  },
  {
    id: 5,
    title: "Order Fulfillment Center",
    badge: "Order Details",
    icon: ShoppingBag,
    description: "Monitor incoming reseller orders, check customer details, view ordered food items with images, and track order totals in real-time.",
    benefits: ["Prepaid order confirmation via secure wallet", "Direct integration with shipping providers", "Instant status updates sent to resellers"],
    position: { top: "95.05%", left: "63.26%" },
    boxPosition: { left: "33.92%", top: "82.95%", width: "31.97%", height: "15.76%" },
    target: { top: "58.0%", left: "45.0%" },
  },
  {
    id: 6,
    title: "Visual Status Analytics",
    badge: "Order Insights",
    icon: PieChart,
    description: "A dynamic visual breakdown of order statuses (Delivered, Pending, Preparing, Cancelled) to optimize prep time and logistics.",
    benefits: ["Interactive charts that update on hover", "Visual tracking of delivery efficiency", "Historical status trends to reduce cancellations"],
    position: { top: "94.79%", left: "96.16%" },
    boxPosition: { left: "66.99%", top: "82.95%", width: "31.90%", height: "15.76%" },
    target: { top: "49.0%", left: "60.0%" },
  },
];

const faqCategories = [
  { id: "general", title: "General FAQs", icon: HelpCircle },
  { id: "merchant", title: "Merchant FAQs", icon: Store },
  { id: "reseller", title: "Reseller FAQs", icon: Users },
  { id: "payment", title: "Payments & Fees", icon: DollarSign },
  { id: "concerns", title: "Concerns & Objections", icon: AlertTriangle },
];

const faqData: Record<string, Array<{ q: string; a: string }>> = {
  general: [
    { q: "What is Foodify?", a: "Foodify is a sales and commerce system that connects local food merchants with a network of online resellers who market and sell products to their networks." },
    { q: "Is Foodify a food delivery app?", a: "No. Foodify is a B2B2C sales system. We don't have a public customer marketplace; instead, resellers market your items and place orders through the dashboard." },
    { q: "How is Foodify different from GrabFood or Foodpanda?", a: "While food apps wait for customers to browse, Foodify resellers actively pitch your menu to group chats, offices, and social circles, creating active demand." },
    { q: "Is Foodify an MLM or networking business?", a: "No. Foodify has zero recruitment fees, downlines, or points systems. It is a pure retail commerce platform where resellers make money solely from product sales margins." },
    { q: "Who can join Foodify?", a: "Both home cooks and established restaurants can join as merchants. Anyone looking to earn extra income from home can register as a reseller." },
    { q: "Are sales guaranteed?", a: "While we can't guarantee a specific volume, putting your products in front of thousands of eager resellers dramatically increases your sales exposure." },
    { q: "How does Foodify earn?", a: "Foodify charges a small flat platform fee per successful order to cover secure payment processing, server hosting, and merchant dashboard maintenance." }
  ],
  merchant: [
    { q: "How can Foodify help my food business?", a: "We give you an instant sales force. Thousands of resellers promote your food, meaning you focus on cooking while they handle marketing and customer acquisition." },
    { q: "Do we need to find our own resellers?", a: "No. Once you list your items, they instantly become available on the shared reseller catalog, and any registered Foodify reseller can start selling them." },
    { q: "What is the process for merchants?", a: "1. Reseller makes a sale and prepays via wallet. 2. You receive the order on your dashboard. 3. You prepare the food. 4. Rider picks it up and delivers." },
    { q: "Who prepares the food?", a: "You do. As a Foodify merchant, you are responsible for maintaining food quality, preparation, packaging, and food safety standard protocols." },
    { q: "Who handles the delivery?", a: "Deliveries are handled by Foodify's integrated courier network (Grab, Lalamove, Borzo) or by your own delivery staff if you prefer." },
    { q: "Can we set our own cut-off time?", a: "Yes. You can customize active preparation hours, order cut-offs, prep times, and menu availability directly on your dashboard settings." },
    { q: "How are merchants protected from fake orders?", a: "All orders are prepaid by the reseller's digital wallet before they reach your kitchen. There is zero risk of fake orders or unpaid food waste." },
    { q: "Are the orders Cash on Delivery?", a: "Resellers can collect COD from their end-customers, but the order placed in the Foodify system is always prepaid, protecting the merchant fully." },
    { q: "Is there a fee to join as a merchant?", a: "Onboarding is free. There are no signup costs or monthly subscription fees. We only charge a small platform fee when you successfully make a sale." },
    { q: "Does Foodify charge merchants a commission?", a: "No. You set your wholesale supplier price. The reseller adds their markup, and Foodify only takes a small flat processing fee per order." },
    { q: "When will merchants receive their payouts?", a: "Payouts are processed daily. Your earnings accumulate in your digital wallet and can be transferred to your bank account or e-wallet instantly." },
    { q: "What are the requirements for merchants?", a: "You need a clean cooking space, food preparation permit/barangay clearance, a smartphone to manage orders, and photos of your food items." },
    { q: "Can home-based food businesses join?", a: "Yes! Home kitchens, commissary spaces, and micro-restaurants are all welcome, provided they meet our quality and hygiene standards." },
    { q: "What is the merchant onboarding process?", a: "Sign up, upload your menu with photos, set your supplier prices, submit basic barangay or business permits, and get approved within 48 hours." }
  ],
  reseller: [
    { q: "How can I earn as a reseller?", a: "You earn by selling merchant products. You add a markup to the merchant's wholesale price, and that entire markup is your profit." },
    { q: "Is there a commission charged to resellers?", a: "No. Foodify is completely free for resellers. You keep 100% of the markup profit you set on the food products you sell." },
    { q: "Do I need to cook?", a: "No. The merchant cooks and packs the food. Your only job is to promote the products, take orders, and submit them in the app." },
    { q: "Do I need to keep inventory?", a: "No. Foodify operates on a dropshipping model. Food is prepared fresh to order by the merchant, so you never hold any inventory." },
    { q: "Where can I sell the products?", a: "Anywhere! You can sell to neighbors, coworkers, family, or online via Facebook, Viber groups, Instagram, TikTok, and WhatsApp." },
    { q: "Do I need to have many followers?", a: "No. Most resellers start by selling directly to close social circles, offices, local communities, and Viber groups, which requires no huge social following." },
    { q: "Do I need capital?", a: "Only enough to fund your digital wallet to prepay the merchant. Since you collect customer payment first, you can use their money as capital!" },
    { q: "How does the Foodify wallet work?", a: "You top up your digital wallet via GCash, Maya, or bank transfer. When you place an order, the wallet pays the merchant's wholesale price." },
    { q: "Can customers pay through Cash on Delivery?", a: "Yes. You can offer COD to your customers. Once the rider collects the cash, the delivery partner remits it directly to your wallet." },
    { q: "Who delivers the order to the customer?", a: "Deliveries are carried out by Foodify's integrated logistics riders. The system auto-books the courier from the merchant to the customer." },
    { q: "Is training provided to resellers?", a: "Yes! We provide free guides, digital sales tips, onboarding webinars, and product marketing training to help you maximize your sales." },
    { q: "Are ready-made marketing materials provided to resellers?", a: "Yes. Merchants upload high-quality food photos, promotional graphics, menus, and copy templates which you can copy and post instantly." },
    { q: "How much does it cost to join as a reseller?", a: "Absolutely free. There are no registration fees, monthly subscription costs, or hidden licensing charges to become a reseller." }
  ],
  payment: [
    { q: "What is the merchant fee?", a: "Foodify charges merchants a flat platform processing fee (typically 3-5% depending on volume) per successful completed order." },
    { q: "What is the reseller commission?", a: "There is no fixed limit. You decide your own commission by setting the retail price. Typical markups range between 15% to 30%." },
    { q: "When are payouts released?", a: "Earnings are available in your wallet as soon as the order is marked Delivered. You can request a bank transfer withdrawal at any time daily." },
    { q: "Is there a listing fee for merchants?", a: "No. You can list as many menu items, packages, and seasonal variations as you want on our catalog for free." },
    { q: "Are there any hidden charges?", a: "None. We are fully transparent: merchants pay a flat processing fee per order, and resellers enjoy 100% free catalog access." },
    { q: "Who pays the delivery fee?", a: "The delivery fee is calculated by distance and is paid by the end-customer, which is added to their final checkout invoice." }
  ],
  concerns: [
    { q: "What if Foodify is a scam?", a: "Foodify is a registered tech corporation. All payments go through SEC-compliant gateways, and your wallet balance can be withdrawn at any time." },
    { q: "What if this is a networking business?", a: "It is not. You earn solely from selling actual food products. There are no recruiting bonuses, team referrals, or multi-level matrix structures." },
    { q: "What happens if there are no orders?", a: "Nothing. Since onboarding is free, there are no ongoing costs. You can optimize your menu, adjust pricing, or try new listings anytime." },
    { q: "Why not just run advertisements?", a: "Advertisements require upfront budgets with no guaranteed sales. Resellers cost nothing until they actually make a sale for you." },
    { q: "Why not just open another branch?", a: "Opening a physical branch costs hundreds of thousands. Foodify lets you expand your sales reach virtually using your existing kitchen." },
    { q: "What if I do not know how to use the system?", a: "Our user interface is designed for simplicity. We also provide step-by-step video tutorials and 24/7 chat support to guide you." },
    { q: "Is there a contract?", a: "There are no lock-in contracts. You can close your account, suspend listings, or stop selling whenever you wish without penalty." },
    { q: "When can we start?", a: "Immediately! Registration takes 5 minutes. Merchants can be active within 48 hours, and resellers can start sharing menus instantly." }
  ]
};

export default function App() {
  const [activeId, setActiveId] = useState(1);
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplashText, setFadeSplashText] = useState(false);
  const [slideSplashPanel, setSlideSplashPanel] = useState(false);
  const [onboardingVisible, setOnboardingVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const headerLogoRef = useRef<HTMLDivElement>(null);

  // Form split state
  const [activeForm, setActiveForm] = useState<'split' | 'merchant' | 'reseller'>('split');

  // Merchant Form States
  const [merchantData, setMerchantData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    category: "Home Kitchen",
    address: "",
    permitId: ""
  });
  const [merchantSubmitted, setMerchantSubmitted] = useState(false);

  // New Booking & Scheduler States
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null); // day number (1-31)
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // e.g. "11:00 AM"
  const [timezone, setTimezone] = useState<string>("Asia/Manila");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");

  // Set default month to July 2026 (6 is July in 0-indexed format)
  const [currentMonth, setCurrentMonth] = useState<number>(6);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  // Flag picker state
  const [showFlagDropdown, setShowFlagDropdown] = useState(false);

  // New Supplier form details state
  const [supplierFormData, setSupplierFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+63",
    businessName: "",
    location: "",
    foodProducts: "",
    acceptOnline: ""
  });

  const countries = [
    { code: "+63", flag: "🇵🇭", name: "Philippines", placeholder: "905 123 4567" },
    { code: "+1", flag: "🇺🇸", name: "United States", placeholder: "202 555 0143" },
    { code: "+65", flag: "🇸🇬", name: "Singapore", placeholder: "8123 4567" },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom", placeholder: "7911 123456" },
  ];

  const currentCountry = countries.find(c => c.code === supplierFormData.countryCode) || countries[0];

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    while (days.length < 42) {
      days.push(null);
    }
    return days;
  };

  const isDateAvailable = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay(); // 0 = Sun, 3 = Wed, 5 = Fri

    // Available days are Wednesdays (3) and Fridays (5)
    if (dayOfWeek !== 3 && dayOfWeek !== 5) return false;

    // Only current or future dates relative to July 20, 2026
    const minDate = new Date(2026, 6, 20); // July 20, 2026
    return date >= minDate;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep(1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep(1);
  };

  const getTimeSlotRange = (time: string, format: "12h" | "24h") => {
    if (time === "11:00 AM") {
      return format === "12h" ? "11:00am - 12:00pm" : "11:00 - 12:00";
    } else if (time === "03:00 PM") {
      return format === "12h" ? "3:00pm - 4:00pm" : "15:00 - 16:00";
    }
    return time;
  };

  const handleSupplierBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep(4);
    // @ts-ignore
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Reseller Form States
  const [resellerData, setResellerData] = useState({
    fullName: "",
    email: "",
    phone: "",
    socialLink: "",
    cashoutMethod: "GCash",
    accountNumber: ""
  });
  const [resellerSubmitted, setResellerSubmitted] = useState(false);

  const handleMerchantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMerchantSubmitted(true);
    // @ts-ignore
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleResellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResellerSubmitted(true);
    // @ts-ignore
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const resetForms = () => {
    setActiveForm('split');
    setMerchantSubmitted(false);
    setResellerSubmitted(false);
    setBookingStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setSupplierFormData({
      name: "",
      email: "",
      phone: "",
      countryCode: "+63",
      businessName: "",
      location: "",
      foodProducts: "",
      acceptOnline: ""
    });
    setMerchantData({
      businessName: "",
      contactName: "",
      phone: "",
      category: "Home Kitchen",
      address: "",
      permitId: ""
    });
    setResellerData({
      fullName: "",
      email: "",
      phone: "",
      socialLink: "",
      cashoutMethod: "GCash",
      accountNumber: ""
    });
  };

  // Chat FAQs States & Handlers
  const [activeCategory, setActiveCategory] = useState("general");
  const [chatMessages, setChatMessages] = useState<Array<{
    sender: 'user' | 'assistant';
    text: string;
    timestamp: string;
    rating?: 'up' | 'down';
  }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: Array<{ q: string; a: string; categoryId: string; categoryTitle: string }> = [];

    Object.keys(faqData).forEach((catId) => {
      const category = faqCategories.find(c => c.id === catId);
      const categoryTitle = category ? category.title : "";
      faqData[catId].forEach((item) => {
        if (item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query)) {
          results.push({ ...item, categoryId: catId, categoryTitle });
        }
      });
    });

    return results;
  }, [searchQuery]);

  const handleQuestionClick = (question: string, answer: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (chatMessages.length > 0 && chatMessages[chatMessages.length - 1].text === question) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: question, timestamp: timeStr }]);

    setIsTyping(true);
    const delay = Math.min(800, Math.max(400, answer.length * 3));
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [...prev, { sender: 'assistant', text: answer, timestamp: timeStr }]);

      setTimeout(() => {
        const chatBox = document.getElementById("chat-box");
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      }, 50);
    }, delay);
  };

  const handleFeedback = (idx: number, ratingType: 'up' | 'down') => {
    setChatMessages((prev) =>
      prev.map((msg, i) => (i === idx ? { ...msg, rating: ratingType } : msg))
    );
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const formatMessageText = (text: string) => {
    if (text.includes("1. ") && text.includes("2. ")) {
      const parts = text.split(/(?=\d+\.\s+)/);
      return (
        <div className="flex flex-col gap-2 my-1.5">
          {parts.map((part, idx) => {
            const match = part.match(/^(\d+)\.\s+(.*)$/);
            if (match) {
              return (
                <div key={idx} className="flex gap-2.5 items-start leading-relaxed text-xs">
                  <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-white text-[#d00504] text-[10px] font-black shrink-0 mt-0.5 shadow-sm">{match[1]}</span>
                  <span className="flex-grow">{match[2]}</span>
                </div>
              );
            }
            return <p key={idx} className="leading-relaxed text-xs">{part}</p>;
          })}
        </div>
      );
    }

    if (text.includes("Sign up, upload your menu")) {
      const steps = text.split(", ");
      return (
        <div className="flex flex-col gap-2 my-1.5">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-2.5 items-start leading-relaxed text-xs">
              <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-white text-[#d00504] text-[10px] font-black shrink-0 mt-0.5 shadow-sm">{idx + 1}</span>
              <span className="flex-grow first-letter:uppercase">{step}</span>
            </div>
          ))}
        </div>
      );
    }

    return <p className="leading-relaxed text-xs">{text}</p>;
  };


  // Dynamically set the favicon using your logo
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.type = "image/png";
    link.href = favicon;
  }, []);

  useEffect(() => {
    // 1. Fade out the splash text after 2.5 seconds (allowing 1.1s readability after ascend completes)
    const textTimer = setTimeout(() => {
      setFadeSplashText(true);
    }, 2500);

    // 2. Slide up the splash panel after 3.8 seconds
    const panelTimer = setTimeout(() => {
      setSlideSplashPanel(true);
    }, 3800);

    // 3. Unmount splash component completely after transition completes (5.5 seconds)
    const unmountTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(panelTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (showSplash) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
      ".reveal-wipe-left, .reveal-fade-up, .reveal-scale-in, .reveal-blur, .reveal-fade-in, .reveal-fade-left"
    );
    revealElements.forEach((el) => observer.observe(el));

    const onboardingSection = document.getElementById("onboarding-section");
    let onboardingObserver: IntersectionObserver | null = null;
    if (onboardingSection) {
      onboardingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOnboardingVisible(true);
            onboardingObserver?.unobserve(entry.target);
          }
        });
      }, observerOptions);
      onboardingObserver.observe(onboardingSection);
    }

    return () => {
      observer.disconnect();
      if (onboardingObserver) onboardingObserver.disconnect();
    };
  }, [showSplash]);

  // Dynamic CSS classes for Left (Merchant) and Right (Reseller) panels
  const leftClasses = `relative overflow-hidden transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col items-center justify-center min-h-[480px] p-6 text-white group ${activeForm === 'split'
    ? "flex-1 hover:flex-[1.4] bg-[#d00504] cursor-pointer hover:shadow-2xl"
    : activeForm === 'merchant'
      ? "flex-[99] bg-[#d00504] cursor-default"
      : "flex-[0] opacity-0 pointer-events-none p-0 min-h-0"
    }`;

  const rightClasses = `relative overflow-hidden transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col items-center justify-center min-h-[480px] p-6 text-black group ${activeForm === 'split'
    ? "flex-1 hover:flex-[1.4] bg-[#ffbc00] cursor-pointer hover:shadow-2xl"
    : activeForm === 'reseller'
      ? "flex-[99] bg-[#ffbc00] cursor-default"
      : "flex-[0] opacity-0 pointer-events-none p-0 min-h-0"
    }`;

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-white text-black" style={{ fontFamily: "'Syne', sans-serif" }}>

      {/* SPLASH SCREEN */}
      {showSplash && (
        <div
          className="fixed inset-0 bg-white z-50 select-none"
          style={{
            opacity: slideSplashPanel ? 0 : 1,
            transform: slideSplashPanel ? "scale(0.95)" : "scale(1.0)",
            transition: "all 2000ms ease-out",
            pointerEvents: slideSplashPanel ? "none" : "auto",
          }}
        >
          {/* Centered logo and tagline container */}
          <div
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 60,
              pointerEvents: "none",
            }}
            className="flex flex-col items-center justify-center gap-8 text-center px-6 shrink-0 w-full"
          >
            {/* Logo Icon on Top (Wrapper for sync transition-out) */}
            <div
              className={`transition-opacity duration-[1200ms] ease-out ${fadeSplashText ? "opacity-0" : "opacity-100"
                }`}
            >
              <img
                src={logoPlaceholder}
                alt="Foodify Logo Icon"
                className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-2xl animate-[ascend_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                style={{ animationDelay: "50ms", opacity: 0 }}
              />
            </div>

            {/* Tagline Text below Logo */}
            <div
              className={`transition-opacity duration-[1200ms] ease-out ${fadeSplashText ? "opacity-0" : "opacity-100"
                }`}
            >
              <h1
                className="text-4xl md:text-6xl font-bold tracking-tight text-[#d00504] font-serif italic flex flex-wrap justify-center gap-x-[0.25em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <span
                  className="inline-block animate-[ascend_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  style={{ animationDelay: "150ms", opacity: 0 }}
                >
                  One
                </span>
                <span
                  className="inline-block animate-[ascend_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  style={{ animationDelay: "300ms", opacity: 0 }}
                >
                  Platform.
                </span>
                <span
                  className="inline-block text-black not-italic font-sans animate-[ascend_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  style={{ animationDelay: "450ms", opacity: 0 }}
                >
                  Many
                </span>
                <span
                  className="inline-block text-black not-italic font-sans animate-[ascend_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  style={{ animationDelay: "600ms", opacity: 0 }}
                >
                  Opportunities.
                </span>
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* HEADER WITH SMALLER PADDING, THINNER BORDER, AND COMPACT BRAND SIZES */}
      <header className={`fixed top-0 left-0 right-0 w-full px-6 py-4 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-[#d00504] bg-white z-40 transition-opacity duration-500 ease-out ${slideSplashPanel ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>

        {/* 1:1 Logo and Text Group */}
        <div
          ref={headerLogoRef}
          className="flex items-center gap-3 shrink-0"
          style={{ opacity: slideSplashPanel ? 1 : 0, transition: "opacity 0.3s ease-out" }}
        >
          <img
            src={logoPlaceholder}
            alt="Foodify Logo Icon"
            className={`w-12 h-12 md:w-16 md:h-16 object-cover rounded-xl transition-all duration-[1000ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${slideSplashPanel ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
          />
          <div
            className={`overflow-hidden transition-all duration-[1000ms] ease-out ${slideSplashPanel ? "max-w-[300px] opacity-100 translate-x-0" : "max-w-0 opacity-0 -translate-x-6"
              }`}
          >
            <h1
              className="text-4xl md:text-5xl font-bold tracking-tight leading-none whitespace-nowrap"
              style={{ fontFamily: "'Akzidenz-Grotesk', 'Helvetica Neue', Arial, sans-serif" }}
            >
              <span className="text-[#d00504]">foodify</span>
              <span className="text-black">.ph</span>
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8">
          <nav className="flex flex-wrap justify-center gap-4 lg:gap-6 font-semibold text-gray-800 text-sm tracking-wide uppercase">
            <a href="#home" className={`hover:text-[#d00504] transition-all duration-[500ms] ease-out transform ${slideSplashPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`} style={{ transitionDelay: '80ms' }}>Home</a>
            <a href="#about" className={`hover:text-[#d00504] transition-all duration-[500ms] ease-out transform ${slideSplashPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`} style={{ transitionDelay: '160ms' }}>About Us</a>
            <a href="#onboarding-section" className={`hover:text-[#d00504] transition-all duration-[500ms] ease-out transform ${slideSplashPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`} style={{ transitionDelay: '240ms' }}>Become a Partner</a>
            <a href="#faqs" className={`hover:text-[#d00504] transition-all duration-[500ms] ease-out transform ${slideSplashPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`} style={{ transitionDelay: '320ms' }}>FAQs</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col pt-32 md:pt-24">
        {/* HERO SECTION - WIDER LAYOUT TO PREVENT CRAMPING */}
        <section id="home" className="px-6 py-16 md:px-12 lg:px-24 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center text-left">

          {/* Left Column: Text & Buttons (Now 6/12 Width) */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 animate-fade-in-up z-10">

            {/* Main Headings */}
            <div className="flex flex-col gap-2 w-full">
              <h2 className="text-5xl md:text-7xl font-bold text-[#d00504] uppercase leading-tight py-1 flex flex-wrap gap-x-[0.25em]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {"ONE PLATFORM.".split(" ").map((word, wordIndex, wordsArray) => {
                  const previousWords = wordsArray.slice(0, wordIndex);
                  const charOffset = previousWords.reduce((sum, w) => sum + w.length + 1, 0);
                  return (
                    <span key={wordIndex} className="inline-block whitespace-nowrap">
                      {word.split("").map((char, charIndex) => (
                        <span
                          key={charIndex}
                          className="inline-block animate-[ascend_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                          style={{
                            animationDelay: `${(charOffset + charIndex) * 45}ms`,
                            opacity: 0
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </h2>
              <h3 className="text-4xl md:text-5xl text-[#d00504] italic leading-tight py-1 flex flex-wrap gap-x-[0.25em]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {"Many Opportunities.".split(" ").map((word, index) => (
                  <span
                    key={index}
                    className="inline-block animate-[burst_0.75s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
                    style={{
                      animationDelay: `${index * 180 + 650}ms`,
                      opacity: 0,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h3>
            </div>

            {/* Description Card */}
            <div className="mt-4 flex flex-col gap-3 max-w-xl">
              <h4 className="text-2xl font-bold text-[#d00504] uppercase tracking-wider">
                Welcome!
              </h4>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Foodify connects food businesses with a network of resellers who sell your food across social media every order prepaid through a secure wallet. This is not a food app. It's a sales system.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-start gap-4 w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
              <button
                onClick={() => {
                  setActiveForm('merchant');
                  document.getElementById('onboarding-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#d00504] text-white px-8 py-4 rounded-full font-bold tracking-wide transition-all border-2 border-[#d00504] hover:bg-white hover:text-[#d00504] flex items-center justify-center cursor-pointer"
              >
                BOOK A FREE DEMO
              </button>
              <button
                onClick={() => {
                  setActiveForm('reseller');
                  document.getElementById('onboarding-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-[#d00504] px-8 py-4 rounded-full font-bold tracking-wide transition-all border-2 border-[#d00504] hover:bg-[#d00504] hover:text-white flex items-center justify-center cursor-pointer"
              >
                BECOME A RESELLER
              </button>
            </div>

          </div>

          {/* Right Column: Showcase Image (Now 6/12 Width) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end animate-fade-in-up delay-200 relative">
            <img
              src={asset1}
              alt="Foodify Showcase"
              className="w-[120%] lg:w-[145%] xl:w-[120%] max-w-none h-auto object-contain transform lg:translate-x-12"
            />
          </div>

        </section>

        {/* ABOUT US SECTION */}
        <section id="about" className="bg-[#d00504] text-white px-6 py-20 md:px-12 lg:px-24 w-full">
          <div className="max-w-4xl mx-auto flex flex-col gap-8 text-center md:text-left">
            <h2 className="reveal-wipe-left text-3xl md:text-4xl font-bold border-b border-white/30 pb-4 inline-block w-fit mx-auto md:mx-0">
              About Us
            </h2>
            <p className="reveal-fade-up text-xl md:text-2xl leading-relaxed font-medium">
              Foodify is a food commerce platform that empowers aspiring food entrepreneurs, home-based cooks, and local businesses to sell their products online with ease. Whether you're starting without your own kitchen or expanding an existing food business, Foodify provides the tools to manage orders, payments, and deliveries in one convenient platform.
            </p>
          </div>
        </section>

        {/* INTERACTIVE DASHBOARD SECTION */}
        <section className="px-6 py-20 md:px-12 lg:px-24 w-full bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-gray-100 pb-8">
              <div className="flex flex-col gap-3">
                <h2 className="reveal-wipe-left text-4xl md:text-5xl font-bold text-gray-900 leading-tight uppercase font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Interactive Dashboard Walkthrough
                </h2>
                <p className="reveal-fade-up text-lg text-gray-600 max-w-2xl font-sans">
                  Explore how Foodify simplifies supply chain operations, manages orders, tracks revenue, and helps resellers grow your food brand.
                </p>
              </div>

              {/* Reset/Control Tip */}
              <div className="text-sm font-semibold text-[#d00504] bg-[#d00504]/5 px-4 py-2 rounded-full border border-[#d00504]/10 shrink-0 w-fit font-sans">
                💡 Select a feature tab to explore capabilities
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Full Annotated Image Diagram inside a red card container (7/12 width) */}
              <div className="reveal-scale-in lg:col-span-7 flex items-center justify-center bg-[#d00504] p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-xl select-none w-full relative">
                <div className="relative w-full overflow-visible">
                  <img
                    src={dashboardImage}
                    alt="Foodify Merchant Dashboard Diagram"
                    className="w-full h-auto object-contain relative z-10"
                  />

                  {/* Hotspots mapped over the printed card rectangles in the diagram */}
                  {dashboardFeatures.map((feature) => {
                    const isActive = activeId === feature.id;
                    return (
                      <button
                        key={feature.id}
                        onClick={() => setActiveId(feature.id)}
                        onMouseEnter={() => setActiveId(feature.id)}
                        aria-label={`Select feature ${feature.id}`}
                        style={{
                          top: feature.boxPosition.top,
                          left: feature.boxPosition.left,
                          width: feature.boxPosition.width,
                          height: feature.boxPosition.height,
                        }}
                        className={`absolute z-20 rounded-[0.55rem] md:rounded-[0.75rem] cursor-pointer focus:outline-none transition-all duration-300 flex items-center justify-center group active:scale-[0.98] ${isActive
                          ? "bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                          : "bg-transparent hover:bg-white/5"
                          }`}
                      >
                        {/* Glowing white border ring around the card rectangle */}
                        <span className={`absolute inset-0 rounded-[0.55rem] md:rounded-[0.75rem] border-2 md:border-3 transition-all duration-300 ${isActive
                          ? "border-white scale-[1.02] shadow-[inset_0_0_10px_rgba(255,255,255,0.4)] animate-pulse"
                          : "border-transparent group-hover:border-white/50 group-hover:scale-[1.01]"
                          }`} />

                        {/* Ping ring for active state */}
                        {isActive && (
                          <span className="absolute inset-0 rounded-[0.55rem] md:rounded-[0.75rem] border-2 border-white animate-ping opacity-60 pointer-events-none" style={{ animationDuration: "2s" }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Interactive Menu & Feature Detail Card (5/12 width) */}
              <div className="reveal-fade-left lg:col-span-5 flex flex-col gap-6 w-full lg:sticky lg:top-24">

                {/* Feature Selector Tabs */}
                <div className="flex flex-col gap-2 bg-gray-100 p-2 rounded-2xl border border-gray-100 shadow-sm">
                  {dashboardFeatures.map((feature) => {
                    const isActive = activeId === feature.id;
                    const IconComponent = feature.icon;
                    return (
                      <button
                        key={feature.id}
                        onClick={() => setActiveId(feature.id)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-left transition-all duration-200 cursor-pointer w-full font-sans ${isActive
                          ? "bg-white text-[#d00504] shadow-md border-l-4 border-[#d00504]"
                          : "text-gray-600 hover:bg-white/50 hover:text-[#d00504]"
                          }`}
                      >
                        <span className={`flex items-center justify-center w-6 h-6 rounded-md shrink-0 transition-colors ${isActive ? "bg-[#d00504]/10 text-[#d00504]" : "bg-gray-200/60 text-gray-500"
                          }`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </span>
                        <span className="truncate">{feature.title}</span>
                        <span className={`ml-auto text-[10px] font-extrabold px-1.5 py-0.5 rounded transition-colors ${isActive ? "bg-[#d00504]/10 text-[#d00504]" : "bg-gray-200 text-gray-500"
                          }`}>
                          #{feature.id}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Highlighted Feature Detail Display */}
                {(() => {
                  const activeFeature = dashboardFeatures.find(f => f.id === activeId) || dashboardFeatures[0];
                  const Icon = activeFeature.icon;
                  return (
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl flex flex-col gap-6 relative overflow-hidden transition-all duration-300 transform">

                      {/* Accent highlight strip */}
                      <div className="absolute top-0 left-0 right-0 h-2 bg-[#d00504]"></div>

                      {/* Transition wrapper for smooth content changes */}
                      <div key={activeId} className="flex flex-col gap-6 animate-[fadeIn_0.35s_ease-out_forwards]">
                        {/* Title & Badge */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#d00504]/10 flex items-center justify-center text-[#d00504] shrink-0 shadow-inner">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-[#d00504] uppercase tracking-wider font-sans">
                              {activeFeature.badge}
                            </span>
                            <h3 className="text-2xl font-extrabold text-gray-900 font-sans tracking-tight">
                              {activeFeature.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-base leading-relaxed text-left font-sans">
                          {activeFeature.description}
                        </p>

                        {/* Benefits / Highlights */}
                        <div className="flex flex-col gap-3 pt-2 text-left">
                          <h4 className="text-xs font-extrabold tracking-wider text-gray-400 uppercase font-sans">
                            Key Capabilities
                          </h4>
                          <ul className="flex flex-col gap-2.5">
                            {activeFeature.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start gap-3 text-sm text-gray-700 font-medium font-sans">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  );
                })()}
              </div>

            </div>

          </div>
        </section>

        {/* THE FOODIFY NETWORK SECTION (NOW INTERACTIVE CHAT FAQS) */}
        <section id="faqs" className="bg-gradient-to-br from-[#ffbc00] to-[#ffcd38] text-black px-4 py-12 md:px-12 lg:px-24 w-full relative overflow-hidden border-t-2 border-b-2 border-amber-400/20">
          {/* Subtle warm decorative glowing highlights */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#d00504]/10 rounded-full blur-[80px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

          <div className="max-w-5xl mx-auto flex flex-col gap-6 relative z-10">

            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
              <span className="text-[10px] md:text-xs font-black tracking-widest text-[#d00504] bg-[#d00504]/10 border border-[#d00504]/20 px-3 py-1 rounded-full w-fit mx-auto uppercase">
                Interactive Support Chat
              </span>
              <h2 className="reveal-wipe-left text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Frequently Asked Questions
              </h2>
              <p className="reveal-fade-up text-sm font-bold text-gray-800/80" style={{ transitionDelay: "200ms" }}>
                Have questions? Choose a category on the left, type keywords to search, or ask the Foodify Assistant.
              </p>
            </div>

            {/* Main Console Container */}
            <div className="reveal-scale-in grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white text-gray-900 rounded-3xl p-5 md:p-6 shadow-2xl border border-amber-200/50 w-full overflow-hidden" style={{ transitionDelay: "400ms" }}>

              {/* Left Column: Selector Panel (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col gap-4 h-full justify-between min-h-[420px]">

                {/* Search Input Box */}
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-1">Search Help Center</span>
                  <div className="relative flex items-center">
                    <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Type keywords (e.g. payout, reseller...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs font-bold bg-gray-50 text-gray-800 placeholder-gray-450 border border-gray-200 focus:border-[#d00504] focus:ring-1 focus:ring-[#d00504]/20 rounded-xl py-2.5 pl-10 pr-9 transition-all duration-200 outline-none shadow-inner"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 p-1 rounded-md text-gray-400 hover:text-[#d00504] hover:bg-gray-150 transition-colors cursor-pointer text-[10px] font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Search Results vs Category Views */}
                {searchQuery.trim() ? (
                  /* Search Results View */
                  <div className="flex flex-col gap-1.5 flex-grow text-left">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                        Search Results ({searchResults.length})
                      </span>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-[9px] font-extrabold text-[#d00504] hover:underline cursor-pointer"
                      >
                        Clear Search
                      </button>
                    </div>
                    <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1 bg-gray-50/80 p-2 rounded-xl border border-gray-100 shadow-inner scrollbar-thin">
                      {searchResults.length > 0 ? (
                        searchResults.map((faq, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuestionClick(faq.q, faq.a)}
                            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-gray-50 text-gray-800 hover:text-[#d00504] border border-gray-150 hover:border-gray-200 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] group flex flex-col gap-1.5"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform duration-200 text-left leading-snug">{faq.q}</span>
                            <span className="text-[8px] font-black tracking-widest text-[#d00504] uppercase bg-[#d00504]/5 border border-[#d00504]/10 px-2 py-0.5 rounded w-fit">
                              {faq.categoryTitle}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 px-4 text-center gap-2">
                          <span className="text-2xl">🔍</span>
                          <p className="text-xs font-bold text-slate-400">No matching questions found.</p>
                          <p className="text-[10px] text-slate-500">Try searching other keywords like "wallet", "rider" or "payout".</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Standard Categories & FAQ View */
                  <>
                    {/* Category Tabs */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-1">Select Category</span>
                      <div className="flex flex-col gap-1 bg-gray-100 p-1.5 rounded-xl border border-gray-200/80 shadow-inner">
                        {faqCategories.map((cat) => {
                          const isActive = activeCategory === cat.id;
                          const Icon = cat.icon;
                          const count = faqData[cat.id]?.length || 0;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => setActiveCategory(cat.id)}
                              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-bold text-xs text-left transition-all duration-200 cursor-pointer w-full ${isActive
                                ? "bg-white text-[#d00504] shadow-sm border-l-4 border-[#d00504]"
                                : "text-gray-600 hover:bg-white/50 hover:text-[#d00504]"
                                }`}
                            >
                              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#d00504]" : "text-gray-400"}`} />
                              <span className="truncate flex-grow">{cat.title}</span>
                              <span className={`text-[9px] font-extrabold px-1.5 rounded ${isActive ? "bg-[#d00504]/10 text-[#d00504]" : "bg-gray-200 text-gray-450"}`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Question Selector List */}
                    <div className="flex flex-col gap-1.5 flex-grow text-left">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-1">Select Question</span>
                      <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1 bg-gray-50/80 p-1.5 rounded-xl border border-gray-100 shadow-inner scrollbar-thin">
                        {faqData[activeCategory].map((faq, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuestionClick(faq.q, faq.a)}
                            className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold bg-white hover:bg-gray-50 text-gray-800 hover:text-[#d00504] border border-gray-100 hover:border-gray-200 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] group"
                          >
                            <span className="block group-hover:translate-x-0.5 transition-transform duration-200 leading-snug">{faq.q}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* User Status Card */}
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center justify-between shadow-inner">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Platform Support</span>
                    <span className="text-xs font-bold text-gray-700">Live Agent Console</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20 relative">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    ONLINE
                  </div>
                </div>

              </div>

              {/* Right Column: Chat Console (lg:col-span-7) */}
              <div className="lg:col-span-7 flex flex-col bg-gray-50 rounded-2xl border border-gray-200/60 p-4 h-[420px] justify-between overflow-hidden relative shadow-inner">

                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-lg bg-[#d00504] flex items-center justify-center text-white shadow-md">
                        <Bot className="w-4.5 h-4.5 text-white" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black tracking-tight text-gray-900 font-sans">Foodify Assistant</span>
                        <span className="text-[9px] font-extrabold text-[#d00504] bg-[#d00504]/5 border border-[#d00504]/10 px-1.5 py-0.25 rounded-md">BOT</span>
                      </div>
                      <span className="text-[9px] font-bold text-gray-400">Replies instantly</span>
                    </div>
                  </div>
                  <button
                    onClick={clearChat}
                    disabled={chatMessages.length === 0}
                    className="text-[10px] font-bold text-gray-500 hover:text-[#d00504] px-2.5 py-1.5 rounded-md hover:bg-[#d00504]/5 border border-transparent hover:border-[#d00504]/10 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none bg-white shadow-sm flex items-center gap-1 text-center justify-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    CLEAR
                  </button>
                </div>

                {/* Message Log */}
                <div className="flex-grow overflow-y-auto flex flex-col gap-3.5 pr-1 scrollbar-thin scrollbar-track-transparent scroll-smooth" id="chat-box">
                  {/* System Greeting */}
                  <div className="flex flex-col gap-1 max-w-[85%] self-start text-left items-start animate-fade-in-up">
                    <span className="text-[8px] font-bold text-gray-400">Foodify Assistant</span>
                    <div className="bg-white text-gray-750 px-3.5 py-2.5 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm text-xs font-semibold leading-relaxed">
                      Hi there! I'm Foodify's assistant. Click on any question on the left and I'll tell you more about our platform, onboarding process, reseller commissions, and features!
                    </div>
                    <span className="text-[8px] font-bold text-gray-400 px-1">04:32 PM</span>
                  </div>

                  {chatMessages.map((msg, idx) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col gap-1 max-w-[85%] ${isUser ? "self-end items-end animate-fade-in" : "self-start items-start text-left animate-fade-in-up"
                          }`}
                      >
                        <span className="text-[8px] font-bold text-gray-400 font-sans">
                          {isUser ? "You" : "Foodify Assistant"}
                        </span>
                        <div className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold leading-relaxed border ${isUser
                          ? "bg-white text-gray-800 rounded-tr-none border-gray-200 shadow-sm"
                          : "bg-[#d00504] text-white rounded-tl-none border-[#d00504]/20 shadow-md shadow-[#d00504]/10"
                          }`}>
                          {isUser ? msg.text : formatMessageText(msg.text)}
                        </div>

                        {/* Feedback ratings */}
                        {!isUser && (
                          <div className="flex items-center gap-2 mt-0.5 px-1 bg-white/10 rounded-md py-0.5">
                            <span className="text-[9px] font-bold text-gray-400">Was this helpful?</span>
                            <button
                              onClick={() => handleFeedback(idx, 'up')}
                              disabled={msg.rating !== undefined}
                              className={`p-1 rounded hover:bg-gray-200/60 transition-colors text-gray-400 cursor-pointer ${msg.rating === 'up' ? 'text-emerald-600 bg-emerald-500/10' : 'hover:text-emerald-500'}`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleFeedback(idx, 'down')}
                              disabled={msg.rating !== undefined}
                              className={`p-1 rounded hover:bg-gray-200/60 transition-colors text-gray-400 cursor-pointer ${msg.rating === 'down' ? 'text-[#d00504] bg-[#d00504]/5' : 'hover:text-[#d00504]'}`}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                            {msg.rating && (
                              <span className="text-[9px] font-black text-[#d00504] animate-pulse ml-1 animate-fade-in">
                                Thank you!
                              </span>
                            )}
                          </div>
                        )}

                        <span className="text-[8px] font-bold text-gray-400 px-1">{msg.timestamp}</span>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex flex-col gap-1 items-start max-w-[70px] self-start animate-fade-in">
                      <span className="text-[8px] font-bold text-gray-400">Typing...</span>
                      <div className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-2 rounded-xl rounded-tl-none shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffbc00] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d00504] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Links / Action Footer */}
                <div className="border-t border-gray-200 pt-3 mt-3 flex items-center justify-between flex-wrap gap-2 shrink-0">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-left">Quick Actions</span>
                  <div className="flex gap-1.5">
                    <a
                      href="mailto:support@foodify.com"
                      className="bg-white hover:bg-gray-50 text-gray-700 hover:text-[#d00504] px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-gray-200 hover:border-gray-300 transition-all flex items-center gap-1.5 shadow-sm animate-pulse-subtle"
                    >
                      <Mail className="w-3.5 h-3.5 text-gray-450" />
                      EMAIL SUPPORT
                    </a>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("merchant");
                      }}
                      className="bg-white hover:bg-gray-50 text-gray-700 hover:text-[#d00504] px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-gray-200 hover:border-gray-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Store className="w-3.5 h-3.5 text-gray-450" />
                      MERCHANT FAQS
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* DUAL WIPE ONBOARDING FORMS SECTION */}
        <section id="onboarding-section" className="w-full flex flex-col lg:flex-row min-h-[480px] overflow-hidden border-t-4 border-b-4 border-white bg-white select-none relative">

          {/* LEFT PANEL: MERCHANT ONBOARDING */}
          <div
            onClick={() => activeForm === 'split' && setActiveForm('merchant')}
            className={leftClasses}
            style={{
              backgroundImage: activeForm !== 'reseller' ? `url(${redAsset})` : undefined,
              backgroundSize: activeForm !== 'reseller' ? "cover" : undefined,
              backgroundPosition: activeForm !== 'reseller' ? "center" : undefined,
              transform: prefersReducedMotion
                ? "none"
                : activeForm !== "split"
                  ? "none"
                  : onboardingVisible
                    ? "translateX(0)"
                    : "translateX(-100%)",
              transition: prefersReducedMotion
                ? "none"
                : activeForm !== "split"
                  ? "flex 800ms cubic-bezier(0.16, 1, 0.3, 1)"
                  : "transform 800ms cubic-bezier(0.25, 1, 0.5, 1), flex 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {activeForm === 'split' && (
              <div className="flex flex-col items-center text-center max-w-sm transition-all duration-300 transform group-hover:scale-105">
                <Store
                  className={`w-16 h-16 mb-4 text-white transition-transform duration-300 group-hover:rotate-6 transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ transitionDelay: onboardingVisible ? "800ms" : "0ms" }}
                />
                <h3
                  className={`text-3xl font-black uppercase tracking-wider mb-2 transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ transitionDelay: onboardingVisible ? "900ms" : "0ms", fontFamily: "'Playfair Display', serif" }}
                >
                  Become a Supplier
                </h3>
                <p
                  className={`text-sm font-medium opacity-90 mb-6 font-sans transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ transitionDelay: onboardingVisible ? "1050ms" : "0ms" }}
                >
                  List your food menu items and let thousands of resellers pitch and market them daily.
                </p>
                <button
                  className={`px-8 py-3 rounded-full border-2 border-white font-extrabold uppercase tracking-widest text-xs transition-all duration-300 bg-transparent text-white group-hover:bg-white group-hover:text-[#d00504] shadow-sm cursor-pointer transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ transitionDelay: onboardingVisible ? "1200ms" : "0ms" }}
                >
                  Register Kitchen
                </button>
              </div>
            )}

            {activeForm === 'merchant' && (
              <>
                {bookingStep !== 4 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetForms();
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#ffbc00] text-black shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer z-50 border-2 border-black hover:bg-[#d00504] hover:text-white hover:border-[#d00504] animate-[fadeIn_0.5s_ease-out_forwards]"
                    title="Back to options"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                )}
                <div className="w-full py-6 md:py-10 px-4 flex justify-center items-center select-text z-10" onClick={(e) => e.stopPropagation()}>
                  <div
                    className={`w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row text-slate-800 transition-all duration-500 ease-in-out ${bookingStep === 4 ? 'max-w-xl' : 'max-w-4xl'
                      }`}
                    style={{ height: '480px' }}
                  >
                    {/* Left Column (Info Panel) - Hidden in Success step for better focus */}
                    {bookingStep !== 4 && (
                      <div className="w-full md:w-60 shrink-0 p-5 md:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/80 bg-white">
                        <div className="flex flex-col text-left">

                          <img src={favicon} alt="Foodify Logo" className="w-14 h-14 object-contain mb-4" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Foodify</span>
                          <h3 className="text-2xl font-black text-slate-900 leading-tight mb-6 font-sans">Book a FREE Webinar with Foodify!</h3>

                          <div className="flex flex-col gap-3.5 font-sans">
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-650">
                              <Clock className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                              <span>60 Minutes</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-650">
                              <MapPin className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                              <span className="capitalize">foodify webinar</span>
                            </div>

                            {/* Selected time details */}
                            {selectedDate !== null && selectedTime !== null && (
                              <div className="flex items-center gap-3 text-sm font-semibold text-slate-655 animate-[fadeIn_0.3s_ease-out_forwards]">
                                <Calendar className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                                <span>{getTimeSlotRange(selectedTime, timeFormat)}, {MONTH_NAMES[currentMonth]} {selectedDate}, {currentYear}</span>
                              </div>
                            )}

                            {selectedDate !== null && selectedTime !== null && (
                              <div className="flex items-center gap-3 text-sm font-semibold text-slate-655 animate-[fadeIn_0.3s_ease-out_forwards]">
                                <Globe className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                                <span>{timezone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Right Column (Interactive Panel) */}
                    <div className="flex-grow p-5 flex flex-col justify-center bg-white overflow-y-auto md:overflow-y-visible">
                      {/* Step 1 & 2: Calendar & Time Picker */}
                      {bookingStep <= 2 && (
                        <div className="flex flex-col md:flex-row gap-4 md:gap-5 h-full items-stretch">
                          {/* Calendar Core */}
                          <div className="flex-grow flex flex-col text-left justify-between">
                            <div>
                              {/* Month Navigation */}
                              <div className="flex items-center justify-between mb-6">
                                <h4 className="text-lg font-black text-slate-800 font-sans">
                                  {MONTH_NAMES[currentMonth]} {currentYear}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={handlePrevMonth}
                                    className="p-2 border border-slate-200 hover:bg-slate-50 hover:border-[#d00504] hover:text-[#d00504] rounded-full transition-all cursor-pointer text-slate-600"
                                  >
                                    <ChevronLeft className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleNextMonth}
                                    className="p-2 border border-slate-200 hover:bg-slate-50 hover:border-[#d00504] hover:text-[#d00504] rounded-full transition-all cursor-pointer text-slate-600"
                                  >
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Weekday headers */}
                              <div className="grid grid-cols-7 gap-0.5 text-center text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 font-sans">
                                <div>Sun</div>
                                <div>Mon</div>
                                <div>Tue</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                              </div>

                              {/* Grid of Days */}
                              <div className="grid grid-cols-7 gap-0.5 text-center text-xs font-bold font-sans">
                                {getDaysInMonth(currentYear, currentMonth).map((day, idx) => {
                                  if (day === null) {
                                    return <div key={`empty-${idx}`} className="h-8 md:h-9 w-full" />;
                                  }

                                  const isSelected = selectedDate === day;
                                  const isAvailable = isDateAvailable(currentYear, currentMonth, day);
                                  const isToday = day === 20 && currentMonth === 6 && currentYear === 2026; // July 20, 2026

                                  let cellClass = "h-8 md:h-9 w-full flex items-center justify-center rounded-xl select-none relative font-sans text-xs transition-all font-bold ";
                                  let onClickHandler = undefined;

                                  if (isSelected) {
                                    cellClass += "bg-[#d00504] text-white font-bold cursor-pointer shadow-md shadow-[#d00504]/20";
                                    onClickHandler = () => {
                                      setSelectedDate(null);
                                      setSelectedTime(null);
                                      setBookingStep(1);
                                    };
                                  } else if (isAvailable) {
                                    cellClass += "bg-slate-100 text-slate-850 hover:bg-[#d00504]/10 hover:text-[#d00504] cursor-pointer";
                                    onClickHandler = () => {
                                      setSelectedDate(day);
                                      setSelectedTime(null);
                                      setBookingStep(2);
                                    };
                                  } else {
                                    cellClass += "text-slate-350 opacity-40 pointer-events-none";
                                  }

                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={onClickHandler}
                                      disabled={!isAvailable && !isSelected}
                                      className={cellClass}
                                    >
                                      <span>{day}</span>
                                      {/* Small dots */}
                                      {isSelected && (
                                        <span className="absolute bottom-1 w-1 h-1 bg-white rounded-full animate-fade-in" />
                                      )}
                                      {isToday && !isSelected && (
                                        <span className="absolute bottom-1 w-1 h-1 bg-[#d00504] rounded-full animate-pulse" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Timezone Selector */}
                            <div className="mt-3 flex flex-col gap-1 border-t border-slate-100 pt-2.5">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Timezone</label>
                              <div className="relative">
                                <select
                                  value={timezone}
                                  onChange={(e) => setTimezone(e.target.value)}
                                  className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-[#d00504] rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none transition-all shadow-sm cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%25234A5568%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[position:right_12px_center] bg-no-repeat pr-8"
                                >
                                  <option value="Asia/Manila">Asia/Manila</option>
                                  <option value="Asia/Singapore">Asia/Singapore</option>
                                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                                  <option value="America/New_York">America/New_York (EST)</option>
                                  <option value="Europe/London">Europe/London (GMT)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          {/* Step 2: Time Slot Picker Column */}
                          {bookingStep === 2 && selectedDate !== null && (
                            <div className="w-full md:w-40 shrink-0 md:border-l border-slate-200/80 md:pl-4 flex flex-col text-left font-sans animate-[fadeIn_0.3s_ease-out_forwards]">
                              {/* Date Header & Toggle */}
                              <div className="flex items-center justify-between mb-4 border-b border-slate-150 pb-2.5">
                                <span className="text-xs font-black text-slate-800 uppercase tracking-tight">
                                  {MONTH_NAMES[currentMonth].substring(0, 3)} {selectedDate}
                                </span>

                                {/* 12h/24h toggle */}
                                <div className="bg-slate-100 p-0.5 rounded-lg flex items-center border border-slate-150">
                                  <button
                                    type="button"
                                    onClick={() => setTimeFormat("12h")}
                                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded transition-all cursor-pointer ${timeFormat === "12h" ? "bg-white text-[#d00504] shadow-sm" : "text-slate-500 hover:text-slate-700"
                                      }`}
                                  >
                                    12h
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setTimeFormat("24h")}
                                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded transition-all cursor-pointer ${timeFormat === "24h" ? "bg-white text-[#d00504] shadow-sm" : "text-slate-500 hover:text-slate-700"
                                      }`}
                                  >
                                    24h
                                  </button>
                                </div>
                              </div>

                              {/* Available Slot Cards */}
                              <div className="flex flex-col gap-2.5">
                                {["11:00 AM", "03:00 PM"].map((time, idx) => {
                                  const timeText = timeFormat === "12h" ? time : (time === "11:00 AM" ? "11:00" : "15:00");
                                  const isTimeSelected = selectedTime === time;

                                  return (
                                    <div key={idx} className="flex flex-col gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => setSelectedTime(time)}
                                        className={`w-full py-2.5 px-3 border text-center rounded-lg font-bold text-xs transition-all cursor-pointer ${isTimeSelected
                                          ? "bg-[#d00504] text-white border-[#d00504] shadow-md shadow-[#d00504]/10"
                                          : "border-[#d00504]/20 bg-[#d00504]/5 text-[#d00504] hover:border-[#d00504] hover:bg-[#d00504]/10"
                                          }`}
                                      >
                                        {timeText}
                                      </button>
                                      {isTimeSelected && (
                                        <button
                                          type="button"
                                          onClick={() => setBookingStep(3)}
                                          className="w-full py-2 px-3 bg-[#d00504] text-white rounded-lg font-black text-[10px] uppercase tracking-wider shadow-md hover:bg-red-700 transition-colors animate-[ascend_0.2s_ease-out_forwards] cursor-pointer text-center"
                                        >
                                          Confirm
                                        </button>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 3: Entering details */}
                      {bookingStep === 3 && (
                        <div className="flex-grow flex flex-col text-left animate-[fadeIn_0.4s_ease-out_forwards]">
                          {/* Header with circular back button */}
                          <div className="flex items-center gap-3.5 mb-6">
                            <button
                              type="button"
                              onClick={() => setBookingStep(2)}
                              className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer shrink-0"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <h4 className="text-xl font-black text-slate-800 uppercase tracking-wide font-sans">Enter Details</h4>
                          </div>

                          {/* Registration Form */}
                          <form onSubmit={handleSupplierBookingSubmit} className="flex flex-col gap-3 font-sans max-h-[360px] overflow-y-auto pr-1">
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Your Name *</label>
                              <input
                                type="text"
                                required
                                value={supplierFormData.name}
                                onChange={(e) => setSupplierFormData({ ...supplierFormData, name: e.target.value })}
                                placeholder="Your Name"
                                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#d00504] focus:outline-none transition-all shadow-sm"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Your Email *</label>
                              <input
                                type="email"
                                required
                                value={supplierFormData.email}
                                onChange={(e) => setSupplierFormData({ ...supplierFormData, email: e.target.value })}
                                placeholder="Your Email"
                                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#d00504] focus:outline-none transition-all shadow-sm"
                              />
                            </div>

                            {/* Country select & Telephone input combo */}
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Active Mobile Number *</label>
                              <div className="flex relative items-stretch">
                                {/* Country Code Toggle */}
                                <button
                                  type="button"
                                  onClick={() => setShowFlagDropdown(!showFlagDropdown)}
                                  className="bg-slate-50 border border-slate-200 border-r-0 rounded-l-lg px-2.5 flex items-center gap-1 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer select-none"
                                >
                                  <span className="text-base leading-none">{currentCountry.flag}</span>
                                  <span>{currentCountry.code}</span>
                                  <span className="text-[8px] text-slate-400">▼</span>
                                </button>

                                {/* Flag Dropdown List */}
                                {showFlagDropdown && (
                                  <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5 w-48 text-left animate-[fadeIn_0.15s_ease-out_forwards]">
                                    {countries.map((c) => (
                                      <button
                                        key={c.code}
                                        type="button"
                                        onClick={() => {
                                          setSupplierFormData({ ...supplierFormData, countryCode: c.code });
                                          setShowFlagDropdown(false);
                                        }}
                                        className="w-full px-2.5 py-1.5 text-[10px] font-bold text-slate-750 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors"
                                      >
                                        <span className="text-sm">{c.flag}</span>
                                        <span className="text-slate-400 font-semibold">{c.code}</span>
                                        <span className="truncate">{c.name}</span>
                                      </button>
                                    ))}
                                  </div>
                                )}

                                {/* input */}
                                <input
                                  type="tel"
                                  required
                                  value={supplierFormData.phone}
                                  onChange={(e) => setSupplierFormData({ ...supplierFormData, phone: e.target.value })}
                                  placeholder={currentCountry.placeholder}
                                  className="border border-slate-200 rounded-r-lg px-3 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400/80 focus:border-[#d00504] focus:outline-none flex-grow shadow-sm bg-white"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Business Name *</label>
                              <input
                                type="text"
                                required
                                value={supplierFormData.businessName}
                                onChange={(e) => setSupplierFormData({ ...supplierFormData, businessName: e.target.value })}
                                placeholder="Business Name"
                                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#d00504] focus:outline-none transition-all shadow-sm"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Location / Branch Area *</label>
                              <input
                                type="text"
                                required
                                value={supplierFormData.location}
                                onChange={(e) => setSupplierFormData({ ...supplierFormData, location: e.target.value })}
                                placeholder="Location / Branch Area"
                                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#d00504] focus:outline-none transition-all shadow-sm"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">What food products do you sell? *</label>
                              <input
                                type="text"
                                required
                                value={supplierFormData.foodProducts}
                                onChange={(e) => setSupplierFormData({ ...supplierFormData, foodProducts: e.target.value })}
                                placeholder="What food products do you sell?"
                                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#d00504] focus:outline-none transition-all shadow-sm"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Do you currently accept online orders? *</label>
                              <div className="relative">
                                <select
                                  required
                                  value={supplierFormData.acceptOnline}
                                  onChange={(e) => setSupplierFormData({ ...supplierFormData, acceptOnline: e.target.value })}
                                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#d00504] focus:outline-none transition-all shadow-sm cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%25234A5568%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[position:right_12px_center] bg-no-repeat pr-8"
                                >
                                  <option value="" disabled hidden>Select option</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="bg-[#d00504] text-white py-2.5 px-5 rounded-lg font-black uppercase tracking-wider text-xs hover:bg-red-700 transition-colors shadow-md cursor-pointer text-center self-end mt-2"
                            >
                              Schedule Meeting
                            </button>
                          </form>
                        </div>
                      )}

                      {/* Step 4: Success state */}
                      {bookingStep === 4 && (
                        <div className="flex flex-col items-center text-center gap-4 py-8 px-4 animate-[fadeIn_0.5s_ease-out_forwards]">
                          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                            <Check className="w-8 h-8" />
                          </div>
                          <h3 className="text-3.5xl font-black uppercase text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>Webinar Booked!</h3>
                          <p className="text-sm font-semibold text-slate-650 max-w-md font-sans leading-relaxed">
                            Thank you, <strong>{supplierFormData.name}</strong>! Your supplier onboarding webinar has been scheduled.
                          </p>

                          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 w-full max-w-sm text-left my-2 font-sans flex flex-col gap-2.5">
                            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-150 pb-2">
                              <span>Meeting Details</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-850">
                              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                              <span>{MONTH_NAMES[currentMonth]} {selectedDate}, {currentYear}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-855">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                              <span>{getTimeSlotRange(selectedTime || "", timeFormat)}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-855">
                              <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                              <span>{timezone}</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-500 font-medium">
                            A confirmation email has been sent to <strong>{supplierFormData.email}</strong>.
                          </p>

                          <button
                            onClick={() => resetForms()}
                            className="mt-4 px-10 py-3 bg-[#d00504] text-white font-black rounded-full uppercase tracking-wider text-xs hover:bg-[#ffbc00] hover:text-black transition-colors cursor-pointer shadow-md"
                          >
                            Return Home
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* RIGHT PANEL: RESELLER ONBOARDING */}
          <div
            onClick={() => activeForm === 'split' && setActiveForm('reseller')}
            className={rightClasses}
            style={{
              backgroundImage: activeForm !== 'merchant' ? `url(${yellowAsset})` : undefined,
              backgroundSize: activeForm !== 'merchant' ? "cover" : undefined,
              backgroundPosition: activeForm !== 'merchant' ? "center" : undefined,
              transform: prefersReducedMotion
                ? "none"
                : activeForm !== "split"
                  ? "none"
                  : onboardingVisible
                    ? "translateX(0)"
                    : "translateX(100%)",
              transition: prefersReducedMotion
                ? "none"
                : activeForm !== "split"
                  ? "flex 800ms cubic-bezier(0.16, 1, 0.3, 1)"
                  : "transform 800ms cubic-bezier(0.25, 1, 0.5, 1), flex 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {activeForm === 'split' && (
              <div className="flex flex-col items-center text-center max-w-sm transition-all duration-300 transform group-hover:scale-105">
                <Users
                  className={`w-16 h-16 mb-4 text-black transition-transform duration-300 group-hover:-rotate-6 transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ transitionDelay: onboardingVisible ? "800ms" : "0ms" }}
                />
                <h3
                  className={`text-3xl font-black uppercase tracking-wider mb-2 text-black transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ transitionDelay: onboardingVisible ? "900ms" : "0ms", fontFamily: "'Playfair Display', serif" }}
                >
                  Become a Reseller
                </h3>
                <p
                  className={`text-sm font-medium text-black/90 mb-6 font-sans transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ transitionDelay: onboardingVisible ? "1050ms" : "0ms" }}
                >
                  Start earning online commissions from local food items with 100% free signup.
                </p>
                <button
                  className={`px-8 py-3 rounded-full border-2 border-black font-extrabold uppercase tracking-widest text-xs transition-all duration-300 bg-transparent text-black group-hover:bg-black group-hover:text-[#ffbc00] shadow-sm cursor-pointer transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ transitionDelay: onboardingVisible ? "1200ms" : "0ms" }}
                >
                  Sign Up Free
                </button>
              </div>
            )}

            {activeForm === 'reseller' && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetForms();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#d00504] text-white shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer z-50 border-2 border-[#d00504] hover:bg-[#ffbc00] hover:text-black hover:border-black animate-[fadeIn_0.5s_ease-out_forwards]"
                  title="Back to options"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                {/* Reseller two-column card container */}
                <div className="w-full py-6 md:py-10 px-4 flex justify-center items-center select-text z-10 animate-[fadeIn_0.5s_ease-out_forwards]" onClick={(e) => e.stopPropagation()}>
                  <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row text-slate-800" style={{ height: '480px' }}>

                    {/* Left Info Panel */}
                    {!resellerSubmitted && (
                      <div className="w-full md:w-60 shrink-0 p-5 md:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/80 bg-white">
                        <div className="flex flex-col text-left">
                          <img src={favicon} alt="Foodify Logo" className="w-14 h-14 object-contain mb-4" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Foodify</span>
                          <h3 className="text-2xl font-black text-slate-900 leading-tight mb-6 font-sans">Sign Up to Become a Reseller with Foodify!</h3>
                          <div className="flex flex-col gap-3.5 font-sans">
                            <div className="flex items-start gap-3 text-sm font-semibold text-slate-650">
                              <Users className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span>Free signup — no fees</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm font-semibold text-slate-650">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span>Sell local food online</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm font-semibold text-slate-650">
                              <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span>Commission-based earnings</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Right Form Panel */}
                    <div className="flex-grow p-5 flex flex-col justify-center bg-white">
                      {!resellerSubmitted && (
                        <form onSubmit={handleResellerSubmit} className="flex flex-col gap-3 font-sans max-h-[360px] overflow-y-auto pr-1">
                          <div>
                            <h4 className="text-xl font-black text-slate-800 uppercase tracking-wide font-sans">Reseller Sign Up</h4>
                            <p className="text-xs font-semibold text-slate-500 mt-0.5 font-sans">Get free access to our merchant catalog and start selling instantly.</p>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Full Name *</label>
                            <input
                              type="text"
                              required
                              value={resellerData.fullName}
                              onChange={(e) => setResellerData({ ...resellerData, fullName: e.target.value })}
                              placeholder="Full Name"
                              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-[#d00504] focus:outline-none transition-all shadow-sm"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Email Address *</label>
                            <input
                              type="email"
                              required
                              value={resellerData.email}
                              onChange={(e) => setResellerData({ ...resellerData, email: e.target.value })}
                              placeholder="Email Address"
                              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-[#d00504] focus:outline-none transition-all shadow-sm"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Mobile Number *</label>
                            <input
                              type="tel"
                              required
                              value={resellerData.phone}
                              onChange={(e) => setResellerData({ ...resellerData, phone: e.target.value })}
                              placeholder="Mobile Number"
                              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-[#d00504] focus:outline-none transition-all shadow-sm"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Social Media Link (FB/IG) *</label>
                            <input
                              type="url"
                              required
                              value={resellerData.socialLink}
                              onChange={(e) => setResellerData({ ...resellerData, socialLink: e.target.value })}
                              placeholder="Social Media Link (FB / IG)"
                              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-[#d00504] focus:outline-none transition-all shadow-sm"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Preferred Cashout Channel *</label>
                            <div className="relative">
                              <select
                                value={resellerData.cashoutMethod}
                                onChange={(e) => setResellerData({ ...resellerData, cashoutMethod: e.target.value })}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#d00504] focus:outline-none transition-all shadow-sm cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%25234A5568%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[position:right_12px_center] bg-no-repeat pr-8"
                              >
                                <option value="GCash">GCash</option>
                                <option value="Maya">Maya Wallet</option>
                                <option value="Bank">Bank Transfer</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-700">Cashout Wallet Mobile Number *</label>
                            <input
                              type="text"
                              required
                              value={resellerData.accountNumber}
                              onChange={(e) => setResellerData({ ...resellerData, accountNumber: e.target.value })}
                              placeholder="Cashout Wallet Number"
                              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-[#d00504] focus:outline-none transition-all shadow-sm"
                            />
                          </div>

                          <button
                            type="submit"
                            className="bg-black text-[#ffbc00] py-2.5 rounded-lg font-black uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-colors duration-300 text-xs mt-1 shadow-md cursor-pointer text-center"
                          >
                            Start Reselling
                          </button>
                        </form>
                      )}

                      {resellerSubmitted && (
                        <div className="flex flex-col items-center text-center gap-4 py-12 animate-[fadeIn_0.5s_ease-out_forwards]">
                          <span className="text-6xl animate-bounce">🚀</span>
                          <h3 className="text-3.5xl font-black uppercase text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>Account Created!</h3>
                          <p className="text-sm font-semibold text-slate-600 max-w-lg font-sans leading-relaxed">
                            Welcome, <strong>{resellerData.fullName}</strong>! We've set up your reseller panel. Check <strong>{resellerData.email}</strong> for your temporary passcode and training catalogs.
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              resetForms();
                            }}
                            className="mt-4 px-10 py-3.5 bg-black text-[#ffbc00] font-black border-2 border-black rounded-full uppercase tracking-wider text-xs hover:bg-white hover:text-black transition-colors cursor-pointer shadow-md"
                          >
                            Return Home
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

      </main>

      {/* FOOTER & CONTACT */}
      <footer className="w-full bg-[#c00000] text-white select-none">
        {/* Main Footer Area */}
        <div className="max-w-6xl mx-auto px-6 py-10 md:px-12 flex flex-col md:flex-row justify-end items-center gap-8 md:gap-12">

          {/* Contact Us Title */}
          <div className="reveal-wipe-left text-4xl md:text-[2.5rem] font-bold leading-[1.1] text-center md:text-right">
            Contact<br className="hidden md:inline" /> Us
          </div>

          {/* Contact Details */}
          <ul className="list-none p-0 m-0 flex flex-col gap-3 font-sans">
            {/* Phone */}
            <li className="reveal-fade-up flex items-center gap-4 text-sm md:text-[0.95rem] font-bold" style={{ transitionDelay: '100ms' }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shrink-0">
                <Phone className="w-4 h-4 text-white fill-transparent" />
              </div>
              <span className="leading-snug">091234556788</span>
            </li>

            {/* Email */}
            <li className="reveal-fade-up flex items-center gap-4 text-sm md:text-[0.95rem] font-bold" style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shrink-0">
                <Mail className="w-4 h-4 text-white fill-transparent" />
              </div>
              <span className="leading-snug">support@foodify.com</span>
            </li>

            {/* Address */}
            <li className="reveal-fade-up flex items-center gap-4 text-sm md:text-[0.95rem] font-bold" style={{ transitionDelay: '300ms' }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shrink-0">
                <MapPin className="w-4 h-4 text-white fill-transparent" />
              </div>
              <span className="leading-snug text-left">
                62 G. Lazaro Rd, Dalandanan,<br />Valenzuela City, 1444,
              </span>
            </li>
          </ul>

        </div>

        {/* Copyright Bar */}
        <div className="bg-[#c00000] border-t-4 border-white py-4 text-center text-sm font-normal tracking-wide">
          &copy; 2026 Foodify. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}