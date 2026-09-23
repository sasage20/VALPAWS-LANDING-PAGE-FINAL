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
  ChevronDown,
  ArrowLeft,
  Check,
  Download,
  BookOpen,
  Smartphone,
  ShieldCheck
} from "lucide-react";

// @ts-ignore
import confetti from "canvas-confetti";

// Using Vite's relative path resolution
// @ts-ignore
import valpawsIcon from "../imports/valpaws_icon.png";
// @ts-ignore
import valpawsLettermark from "../imports/valpaws_lettermark.png";
// @ts-ignore
import favicon from "../imports/valpaws_icon.png";
// @ts-ignore
import asset1 from "../imports/placeholder_image.png";
// @ts-ignore
import dashboardImage from "../imports/valpaws_dashboard.png";
// @ts-ignore
import redAsset from "../imports/placeholder_image.png";
// @ts-ignore
import yellowAsset from "../imports/placeholder_image.png";
// @ts-ignore
import valpawsBgPng from "../imports/valpaws_background.png";

// Interactive dashboard features metadata
const dashboardFeatures = [
  {
    id: 1,
    title: "Overview & Statistics",
    badge: "Overview Panel",
    icon: LayoutDashboard,
    description: "Monitor city-wide pet registration activity, active missing/found reports, recent NFC tag assignments, and overall metrics at a glance.",
    benefits: ["Real-time pet population stats", "Instant missing reports count", "Recent activity audit trail"],
    position: { top: "13.90%", left: "30.06%" },
    boxPosition: { left: "1.11%", top: "2.57%", width: "31.90%", height: "15.08%" },
    target: { top: "38.0%", left: "32.5%" },
  },
  {
    id: 2,
    title: "NFC Tag Assignment",
    badge: "NFC Integration",
    icon: Sparkles,
    description: "Assign physical NFC collar tags to registered pets. Easily pair, review, or unlink tag UIDs from pet profiles using the secure admin scanner.",
    benefits: ["One-to-one unique tag pairing", "Prevention of duplicate tag assignment", "Instant pet profile lookup on tag scan"],
    position: { top: "13.90%", left: "63.08%" },
    boxPosition: { left: "33.92%", top: "2.57%", width: "31.97%", height: "15.08%" },
    target: { top: "38.0%", left: "49.0%" },
  },
  {
    id: 3,
    title: "Lost & Found Reports Management",
    badge: "Community Reports",
    icon: AlertTriangle,
    description: "Manage lost and found reports submitted by users and guests. Review pet details, photos, locations, and coordinate recovery.",
    benefits: ["Full status lifecycle tracking", "Add admin notes and custom status updates", "Integrated contact details of reporters"],
    position: { top: "13.63%", left: "96.15%" },
    boxPosition: { left: "66.99%", top: "2.57%", width: "31.90%", height: "15.08%" },
    target: { top: "31.0%", left: "68.0%" },
  },
  {
    id: 4,
    title: "User & Role Management",
    badge: "Access Control",
    icon: Users,
    description: "Supervise all registered pet owner accounts in Valenzuela City. Assign administrative roles and manage account accessibility.",
    benefits: ["Role-based permission controls", "Detailed user lookup by email and phone", "Active/Inactive account status toggle"],
    position: { top: "95.09%", left: "30.29%" },
    boxPosition: { left: "1.11%", top: "82.95%", width: "31.90%", height: "15.76%" },
    target: { top: "51.0%", left: "32.5%" },
  },
  {
    id: 5,
    title: "System Audit Logs",
    badge: "Activity Auditing",
    icon: Clock,
    description: "Keep track of all actions performed by administrators, such as report updates, announcement posts, and tag assignments for complete transparency.",
    benefits: ["Fully searchable and filterable log list", "Timestamped event records", "Secure data trace trails"],
    position: { top: "95.05%", left: "63.26%" },
    boxPosition: { left: "33.92%", top: "82.95%", width: "31.97%", height: "15.76%" },
    target: { top: "58.0%", left: "45.0%" },
  },
  {
    id: 6,
    title: "Community Announcements",
    badge: "Broadcast Hub",
    icon: Send,
    description: "Publish and broadcast city-wide announcements, vaccination drives, and safety alerts directly to the ValPaws mobile home screen.",
    benefits: ["Instantly syncs with the mobile app", "Filter by category (Advisory, Event)", "Promotes community-wide awareness"],
    position: { top: "94.79%", left: "96.16%" },
    boxPosition: { left: "66.99%", top: "82.95%", width: "31.90%", height: "15.76%" },
    target: { top: "49.0%", left: "60.0%" },
  },
];

const faqCategories = [
  { id: "general", title: "General FAQs", icon: HelpCircle },
  { id: "owner", title: "Pet Owners", icon: Users },
  { id: "finder", title: "Finders & Guests", icon: Search },
  { id: "adoption", title: "Pound & Adoption", icon: Calendar },
  { id: "security", title: "Privacy & Safety", icon: AlertTriangle },
];

const faqData: Record<string, Array<{ q: string; a: string }>> = {
  general: [
    { q: "What is ValPaws?", a: "ValPaws is a digital pet identification and community reporting system designed for Valenzuela City. It utilizes NFC-enabled collar tags linked to digital pet profiles, enabling quick identification and real-time notification to owners when their pet is scanned." },
    { q: "How does NFC pet identification work?", a: "When someone finds a lost pet wearing a ValPaws collar, they scan the NFC tag with an NFC-enabled Android smartphone. The system immediately retrieves the pet's public profile and triggers a real-time notification with location coordinates to the registered owner." },
    { q: "Do I need to download an app to scan a pet collar?", a: "No! Anyone who scans a ValPaws NFC collar tag is redirected to a public web profile of the pet in guest mode. However, pet owners must download the ValPaws mobile application to register their pets, link tags, and receive notifications." },
    { q: "Is the system free for residents?", a: "Yes. The ValPaws mobile application, pet registration, and community reporting systems are entirely free for pet owners and residents of Valenzuela City." }
  ],
  owner: [
    { q: "How do I register my pet in ValPaws?", a: "Download the ValPaws app, create an account using your phone number, and go to 'Add Pet'. Fill in pet details (name, breed, markings, age) and upload a photo and medical documents or vaccination cards." },
    { q: "How do I get an NFC collar tag for my pet?", a: "Once your pet is registered, schedule a tag distribution appointment via our booking calendar. You can pick up and link your physical tag at the Valenzuela City Veterinary Office or your Barangay Hall." },
    { q: "Can I upload multiple vaccination records?", a: "Yes. ValPaws supports uploading structured vaccination entries with dates and clinics, along with PDF proof documents to keep your pet's digital health record updated." },
    { q: "What should I do if my pet goes missing?", a: "Open your pet's profile in the app and toggle their status to 'Missing'. The system will automatically generate a missing report on the public feed and alert nearby users." },
    { q: "How are location details sent to me during an NFC scan?", a: "When a finder scans your pet's collar, the phone requests GPS permissions. If approved, the scan location is recorded and sent to you instantly via in-app push notifications." }
  ],
  finder: [
    { q: "What should I do if I find a stray pet with a ValPaws collar?", a: "Hold your NFC-enabled smartphone close to the pet's collar tag. Tap the screen to scan. The pet's public profile will display, showing contact details or a button to notify the owner that the pet has been found." },
    { q: "What if I find a lost pet that doesn't have an NFC tag?", a: "You can use the guest mode in the app to submit a found pet report. Fill in the species, breed, custom marks, last seen location, and upload a photo. This report will be published on the active community feed." },
    { q: "What if the finder doesn't have an NFC-capable phone?", a: "Finders can still access the ValPaws app or web platform in guest mode to submit a manual found pet report with the pet's photo and location details." },
    { q: "Is my contact information visible when I submit a report?", a: "For privacy reasons, guest contact information is only visible to the pet owner or administrators to coordinate recovery, and is hidden from other public guest users." }
  ],
  adoption: [
    { q: "How can I claim an impounded pet from the City Pound?", a: "Access the 'To Claim' tab in the reports feed, check the claiming guidelines, bring a valid ID for ownership verification, and visit the Animal City Pound facility." },
    { q: "What is the procedure to adopt a pet?", a: "Review pets listed under the 'Adoption' tab, view their details, check requirements, download the official adoption request form PDF from the app, and submit it to the City Veterinary Office." },
    { q: "What are the requirements for pet adoption?", a: "Adopters must submit a Letter Request, valid ID, Barangay Certificate of Residency, and a photo of the location where the pet will be kept to ensure a safe environment." },
    { q: "Are all pets in the City Pound up for adoption?", a: "Pets are held in the facility for reclamation first. If unclaimed after the mandatory holding period, they are transitioned to 'Up for Adoption' status." }
  ],
  security: [
    { q: "Is my personal location tracked at all times?", a: "No. ValPaws only logs the location at the exact moment a finder scans your pet's NFC collar tag. There is no background tracking or active GPS drain on the pet." },
    { q: "How is my private contact information protected?", a: "Your full phone number and email are hidden from the public guest page. Finders can click 'Contact Owner' to send alerts, but your direct contact details are kept secure until you choose to share them." },
    { q: "Can anyone modify my pet's registry details?", a: "No. Only you (the verified owner) and authorized system administrators can update pet details, medical documents, or report statuses." }
  ]
};

export default function App() {
  const [activeId, setActiveId] = useState(1);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoSrcType, setVideoSrcType] = useState<'youtube' | 'sample'>('youtube');
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplashText, setFadeSplashText] = useState(false);
  const [slideSplashPanel, setSlideSplashPanel] = useState(false);
  const [onboardingVisible, setOnboardingVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const headerLogoRef = useRef<HTMLAnchorElement>(null);

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
                  <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-white text-[#15803d] text-[10px] font-black shrink-0 mt-0.5 shadow-sm">{match[1]}</span>
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
              <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-white text-[#15803d] text-[10px] font-black shrink-0 mt-0.5 shadow-sm">{idx + 1}</span>
              <span className="flex-grow first-letter:uppercase">{step}</span>
            </div>
          ))}
        </div>
      );
    }

    return <p className="leading-relaxed text-xs">{text}</p>;
  };


  // Dynamically set the favicon using your logo and ensure the page starts at #home on refresh
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.type = "image/png";
    link.href = favicon;

    // Reset scroll restoration to manual so the browser doesn't automatically restore scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Force the hash to be #home and scroll to top immediately
    window.scrollTo(0, 0);
    if (window.location.hash !== "#home") {
      window.location.hash = "#home";
    }
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
    if (!showSplash) {
      const timer = setTimeout(() => {
        setIsPlayingVideo(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = "https://www.youtube-nocookie.com/favicon.ico?" + new Date().getTime();
    const timeout = setTimeout(() => {
      img.src = "";
      setVideoSrcType('sample');
    }, 2500);
    img.onload = () => {
      clearTimeout(timeout);
      setVideoSrcType('youtube');
    };
    img.onerror = () => {
      clearTimeout(timeout);
      setVideoSrcType('sample');
    };
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
  const leftClasses = `relative overflow-hidden transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col items-center justify-center min-h-[480px] text-white group ${activeForm === 'split'
    ? "flex-1 hover:flex-[1.4] bg-[#15803d] cursor-pointer hover:shadow-2xl p-6"
    : activeForm === 'merchant'
      ? "flex-[99] bg-[#15803d] cursor-default p-0"
      : "flex-[0] opacity-0 pointer-events-none p-0 min-h-0 w-0 max-w-0 overflow-hidden"
    }`;

  const rightClasses = `relative overflow-hidden transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col items-center justify-center min-h-[480px] text-black group ${activeForm === 'split'
    ? "flex-1 hover:flex-[1.4] bg-[#ffbc00] cursor-pointer hover:shadow-2xl p-6"
    : activeForm === 'reseller'
      ? "flex-[99] bg-[#ffbc00] cursor-default p-0"
      : "flex-[0] opacity-0 pointer-events-none p-0 min-h-0 w-0 max-w-0 overflow-hidden"
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
            {/* Logo Icon on Top (Wrapper for sync transition-out with zoom-out) */}
            <div
              className={`transition-all duration-[1000ms] cubic-bezier(0.4, 0, 0.2, 1) transform ${fadeSplashText ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
            >
              <img
                src={valpawsIcon}
                alt="ValPaws Logo Icon"
                className="w-16 h-16 md:w-24 md:h-24 object-contain rounded-2xl animate-[ascend_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                style={{ animationDelay: "50ms", opacity: 0 }}
              />
            </div>

            {/* Tagline Text below Logo */}
            <div
              className={`transition-opacity duration-[1200ms] ease-out ${fadeSplashText ? "opacity-0" : "opacity-100"
                }`}
            >
              <h1
                className="text-4xl md:text-6xl font-bold tracking-tight text-[#15803d] font-serif italic flex flex-wrap justify-center gap-x-[0.25em]"
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
                  Scan.
                </span>
                <span
                  className="inline-block text-black not-italic font-sans animate-[ascend_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  style={{ animationDelay: "450ms", opacity: 0 }}
                >
                  Every
                </span>
                <span
                  className="inline-block text-black not-italic font-sans animate-[ascend_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  style={{ animationDelay: "600ms", opacity: 0 }}
                >
                  Paw
                </span>
                <span
                  className="inline-block text-black not-italic font-sans animate-[ascend_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  style={{ animationDelay: "750ms", opacity: 0 }}
                >
                  Protected.
                </span>
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* HEADER WITH SMALLER PADDING, THINNER BORDER, AND COMPACT BRAND SIZES */}
      <header className={`fixed top-0 left-0 right-0 w-full px-6 py-4 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-[#15803d] bg-white z-40 transition-opacity duration-500 ease-out ${slideSplashPanel ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>

        {/* 1:1 Logo and Text Group */}
        <a
          href="#home"
          ref={headerLogoRef}
          className="flex items-center gap-1 md:gap-1.5 shrink-0 cursor-pointer hover:opacity-90 transition-opacity duration-150"
          style={{ opacity: slideSplashPanel ? 1 : 0, transition: slideSplashPanel ? "opacity 0.15s ease-out" : "opacity 0.3s ease-out" }}
        >
          <img
            src={valpawsIcon}
            alt="ValPaws Logo Icon"
            className={`h-9 w-9 md:h-12 md:w-12 object-contain transition-all duration-[1000ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${slideSplashPanel ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
          />
          <div
            className={`overflow-hidden flex items-center transition-all duration-[1000ms] ease-out ${slideSplashPanel ? "max-w-[300px] opacity-100 translate-x-0" : "max-w-0 opacity-0 -translate-x-6"
              }`}
          >
            <img
              src={valpawsLettermark}
              alt="ValPaws Lettermark"
              className="h-7 md:h-9 w-auto object-contain"
            />
          </div>
        </a>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8">
          <nav className="flex flex-wrap justify-center items-center gap-4 lg:gap-6 font-semibold text-gray-800 text-sm tracking-wide uppercase">
            <a href="#home" className={`hover:text-[#15803d] transition-all duration-150 ease-out transform ${slideSplashPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`} style={{ transitionDelay: slideSplashPanel ? '0ms' : '80ms' }}>Home</a>
            <a href="#about" className={`hover:text-[#15803d] transition-all duration-150 ease-out transform ${slideSplashPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`} style={{ transitionDelay: slideSplashPanel ? '0ms' : '160ms' }}>About Us</a>
            <a href="#overview" className={`hover:text-[#15803d] transition-all duration-150 ease-out transform ${slideSplashPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`} style={{ transitionDelay: slideSplashPanel ? '0ms' : '240ms' }}>Overview</a>
            <a href="#faqs" className={`hover:text-[#15803d] transition-all duration-150 ease-out transform ${slideSplashPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`} style={{ transitionDelay: slideSplashPanel ? '0ms' : '320ms' }}>FAQs</a>

            {/* Login Button */}
            <a
              href="https://valpaws-admin.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-2 px-6 py-2 rounded-full bg-[#15803d] text-white font-semibold text-sm tracking-wide uppercase shadow-md hover:bg-black transition-all duration-150 ease-out transform hover:scale-105 active:scale-95 cursor-pointer ${slideSplashPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              style={{ transitionDelay: slideSplashPanel ? '0ms' : '400ms' }}
            >
              Admin Portal
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col pt-32 md:pt-24">
        {/* HERO SECTION */}
        <div
          className="w-full relative overflow-hidden bg-white"
        >
          <section id="home" className="px-6 py-16 md:px-12 lg:px-8 xl:px-10 w-full max-w-[84rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-12 items-center text-left relative z-10">

            {/* Left Column: Text & Buttons (Now 6/12 Width) */}
            <div className="lg:col-span-6 flex flex-col items-start gap-6 animate-fade-in-up z-10">

              {/* Main Headings */}
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-5xl md:text-7xl font-bold text-[#15803d] uppercase leading-tight py-1 flex flex-wrap gap-x-[0.25em]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {"VALPAWS REGISTRY.".split(" ").map((word, wordIndex, wordsArray) => {
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
                <h3 className="text-4xl md:text-5xl text-[#15803d] italic leading-tight py-1 flex flex-wrap gap-x-[0.25em]" style={{ fontFamily: "'Playfair Display', serif" }}>
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
                <h4 className="text-2xl font-bold text-[#15803d] uppercase tracking-wider">
                  Welcome!
                </h4>
                <p className="text-lg text-zinc-700 leading-relaxed font-medium">
                  ValPaws is a digital pet identification and community reporting system for Valenzuela City. Register your pets, assign NFC collar tags, and locate missing pets in real-time.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-start gap-4 w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
                <a
                  href="https://github.com/sasage20/VALPAWS-APK/releases/latest/download/21.Sep.2026.ValPaws.apk"
                  download="21.Sep.2026.ValPaws.apk"
                  className="bg-[#15803d] text-white px-8 py-4 rounded-full font-bold tracking-wide transition-all border-2 border-[#15803d] hover:bg-white hover:text-[#15803d] flex items-center justify-center cursor-pointer gap-2 shadow-sm hover:shadow-md"
                >
                  <Download className="w-5 h-5" />
                  DOWNLOAD APP APK
                </a>
                <button
                  onClick={() => {
                    setActiveForm('merchant');
                    document.getElementById('onboarding-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-[#15803d] px-8 py-4 rounded-full font-bold tracking-wide transition-all border-2 border-[#15803d] hover:bg-[#15803d] hover:text-white flex items-center justify-center cursor-pointer gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  INSTALLATION GUIDE
                </button>
              </div>

            </div>

            {/* Right Column: Playable Video Player (Now 6/12 Width) */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end animate-fade-in-up delay-200 w-full relative">
              <div className="w-full aspect-[3/2] rounded-[3rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] hover:shadow-[0_30px_70px_-10px_rgba(21,128,61,0.25)] transition-all duration-500 bg-black relative group cursor-pointer">
                {isPlayingVideo && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setVideoSrcType(videoSrcType === 'youtube' ? 'sample' : 'youtube');
                    }}
                    className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/90 text-white/90 hover:text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all select-none backdrop-blur-sm shadow-md cursor-pointer"
                  >
                    {videoSrcType === 'youtube' ? '🔌 Switch to Offline Sample' : '📺 Switch to YouTube'}
                  </button>
                )}

                {!isPlayingVideo ? (
                  <div
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    onClick={() => setIsPlayingVideo(true)}
                  >
                    {/* Thumbnail Image */}
                    <img
                      src="https://img.youtube.com/vi/Om4hdkUWYeg/maxresdefault.jpg"
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = asset1;
                      }}
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    {/* Premium Glow Play Button */}
                    <div className="absolute flex items-center justify-center w-20 h-20 bg-[#15803d] text-white rounded-full shadow-[0_10px_30px_rgba(21,128,61,0.5)] transform group-hover:scale-110 active:scale-95 transition-all duration-300">
                      <svg
                        className="w-8 h-8 fill-current translate-x-0.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 bg-black/75 px-3 py-1 rounded-md text-xs font-semibold text-white">
                      18:28
                    </div>
                  </div>
                ) : videoSrcType === 'youtube' ? (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/Om4hdkUWYeg?start=772&autoplay=1"
                    title="ValPaws NFC Pet Identification Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ border: 0 }}
                  ></iframe>
                ) : (
                  <video
                    className="w-full h-full object-cover"
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                    controls
                    autoPlay
                  />
                )}
              </div>
            </div>

          </section>
        </div>

        {/* ABOUT US SECTION WITH BACKGROUND GIF */}
        <section
          id="about"
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white px-6 py-20 md:px-12 lg:px-24 w-full transition-all duration-500"
          style={{ backgroundImage: `url(${valpawsBgPng})` }}
        >
          {/* Brand-green semi-transparent overlay for text contrast and premium look */}
          <div className="absolute inset-0 bg-[#15803d]/80 backdrop-blur-[1px]" />

          <div className="max-w-4xl mx-auto flex flex-col gap-8 text-center md:text-left relative z-10">
            <h2 className="reveal-wipe-left text-3xl md:text-4xl font-bold border-b border-white/30 pb-4 inline-block w-fit mx-auto md:mx-0">
              About Us
            </h2>
            <p className="reveal-fade-up text-xl md:text-2xl leading-relaxed font-medium">
              ValPaws is a mobile and web-based pet identification and community recovery platform developed for Valenzuela City. By combining NFC-enabled smart collars, cloud registry records, and automated community alerts, we empower pet owners and animal control personnel to ensure pet safety and accelerate the recovery of lost pets.
            </p>

            {/* Expanded Content Container */}
            <div
              className={`transition-all duration-700 ease-in-out overflow-hidden ${isAboutExpanded ? "max-h-[1200px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Card 1: Our Mission */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold font-serif">Our Mission</h3>
                  </div>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    We aim to promote responsible pet ownership and secure domestic animals in Valenzuela City by providing a contactless digital registry and real-time scanning notifications, removing traditional recovery delays.
                  </p>
                </div>

                {/* Card 2: Who We Serve */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Users className="w-6 h-6 text-sky-300" />
                    </div>
                    <h3 className="text-xl font-bold font-serif">Who We Serve</h3>
                  </div>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    We serve the pet owners of Valenzuela City, local finders/guests, animal control officers, and the Valenzuela City Veterinary Pound to enable seamless coordination during missing pet incidents.
                  </p>
                </div>

                {/* Card 3: Why Choose Us */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                    </div>
                    <h3 className="text-xl font-bold font-serif">Why Choose Us</h3>
                  </div>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    By replacing static, easily damaged engraved tags with durable, rewriteable NTAG213 NFC collars, we ensure that pet identification is secure, modern, and instantly readable by any smartphone.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsAboutExpanded(!isAboutExpanded)}
              className="px-6 py-3 border border-white/40 bg-white/10 hover:bg-white text-white hover:text-[#15803d] font-semibold rounded-full shadow-md active:scale-95 transition-all duration-300 flex items-center gap-2 mx-auto md:mx-0 w-fit cursor-pointer"
            >
              <span>{isAboutExpanded ? "See Less" : "See More"}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-500 ease-in-out ${isAboutExpanded ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>
        </section>

        {/* INTERACTIVE DASHBOARD SECTION */}
        <section id="overview" className="px-6 py-20 md:px-12 lg:px-24 w-full bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-gray-100 pb-8">
              <div className="flex flex-col gap-3">
                <h2 className="reveal-wipe-left text-4xl md:text-5xl font-bold text-gray-900 leading-tight uppercase font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                  How ValPaws Works?
                </h2>
                <p className="reveal-fade-up text-lg text-gray-600 max-w-2xl font-sans">
                  Explore how ValPaws integrates mobile NFC collar scanning, secure pet profile registry, and real-time community notifications to find lost pets.
                </p>
              </div>

              {/* Reset/Control Tip */}
              <div className="text-sm font-semibold text-[#15803d] bg-[#15803d]/5 px-4 py-2 rounded-full border border-[#15803d]/10 shrink-0 w-fit font-sans">
                💡 Select a feature tab to explore capabilities
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Full Image Diagram inside green card container (7/12 width) */}
              <div className="reveal-scale-in lg:col-span-7 flex items-center justify-center bg-[#15803d] p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-xl select-none w-full relative">
                <div className="relative w-full overflow-hidden rounded-xl shadow-md flex items-center justify-center">
                  <img
                    src={dashboardImage}
                    alt="ValPaws Merchant Dashboard Diagram"
                    className="w-full h-auto object-cover object-center -my-[11%] relative z-10"
                  />
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
                          ? "bg-white text-[#15803d] shadow-md border-l-4 border-[#15803d]"
                          : "text-gray-600 hover:bg-white/50 hover:text-[#15803d]"
                          }`}
                      >
                        <span className={`flex items-center justify-center w-6 h-6 rounded-md shrink-0 transition-colors ${isActive ? "bg-[#15803d]/10 text-[#15803d]" : "bg-gray-200/60 text-gray-500"
                          }`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </span>
                        <span className="truncate">{feature.title}</span>
                        <span className={`ml-auto text-[10px] font-extrabold px-1.5 py-0.5 rounded transition-colors ${isActive ? "bg-[#15803d]/10 text-[#15803d]" : "bg-gray-200 text-gray-500"
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
                      <div className="absolute top-0 left-0 right-0 h-2 bg-[#15803d]"></div>

                      {/* Transition wrapper for smooth content changes */}
                      <div key={activeId} className="flex flex-col gap-6 animate-[fadeIn_0.35s_ease-out_forwards]">
                        {/* Title & Badge */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#15803d]/10 flex items-center justify-center text-[#15803d] shrink-0 shadow-inner">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-[#15803d] uppercase tracking-wider font-sans">
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

        {/* THE VALPAWS NETWORK SECTION (NOW INTERACTIVE CHAT FAQS) */}
        <section id="faqs" className="bg-gradient-to-br from-[#ffbc00] to-[#ffcd38] text-black px-4 py-12 md:px-12 lg:px-24 w-full relative overflow-hidden border-t-2 border-b-2 border-amber-400/20">
          {/* Subtle warm decorative glowing highlights */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#15803d]/10 rounded-full blur-[80px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

          <div className="max-w-5xl mx-auto flex flex-col gap-6 relative z-10">

            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
              <span className="text-[10px] md:text-xs font-black tracking-widest text-[#15803d] bg-[#15803d]/10 border border-[#15803d]/20 px-3 py-1 rounded-full w-fit mx-auto uppercase">
                Interactive Support Chat
              </span>
              <h2 className="reveal-wipe-left text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Frequently Asked Questions
              </h2>
              <p className="reveal-fade-up text-sm font-bold text-gray-800/80" style={{ transitionDelay: "200ms" }}>
                Have questions? Choose a category on the left, type keywords to search, or ask the ValPaws Assistant.
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
                      className="w-full text-xs font-bold bg-gray-50 text-gray-800 placeholder-gray-450 border border-gray-200 focus:border-[#15803d] focus:ring-1 focus:ring-[#15803d]/20 rounded-xl py-2.5 pl-10 pr-9 transition-all duration-200 outline-none shadow-inner"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 p-1 rounded-md text-gray-400 hover:text-[#15803d] hover:bg-gray-150 transition-colors cursor-pointer text-[10px] font-bold"
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
                        className="text-[9px] font-extrabold text-[#15803d] hover:underline cursor-pointer"
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
                            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-gray-50 text-gray-800 hover:text-[#15803d] border border-gray-150 hover:border-gray-200 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] group flex flex-col gap-1.5"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform duration-200 text-left leading-snug">{faq.q}</span>
                            <span className="text-[8px] font-black tracking-widest text-[#15803d] uppercase bg-[#15803d]/5 border border-[#15803d]/10 px-2 py-0.5 rounded w-fit">
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
                                ? "bg-white text-[#15803d] shadow-sm border-l-4 border-[#15803d]"
                                : "text-gray-600 hover:bg-white/50 hover:text-[#15803d]"
                                }`}
                            >
                              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#15803d]" : "text-gray-400"}`} />
                              <span className="truncate flex-grow">{cat.title}</span>
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
                            className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold bg-white hover:bg-gray-50 text-gray-800 hover:text-[#15803d] border border-gray-100 hover:border-gray-200 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] group"
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
                      <div className="w-8 h-8 rounded-lg bg-[#15803d] flex items-center justify-center text-white shadow-md">
                        <Bot className="w-4.5 h-4.5 text-white" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black tracking-tight text-gray-900 font-sans">ValPaws Assistant</span>
                        <span className="text-[9px] font-extrabold text-[#15803d] bg-[#15803d]/5 border border-[#15803d]/10 px-1.5 py-0.25 rounded-md">BOT</span>
                      </div>
                      <span className="text-[9px] font-bold text-gray-400">Replies instantly</span>
                    </div>
                  </div>
                  <button
                    onClick={clearChat}
                    disabled={chatMessages.length === 0}
                    className="text-[10px] font-bold text-gray-500 hover:text-[#15803d] px-2.5 py-1.5 rounded-md hover:bg-[#15803d]/5 border border-transparent hover:border-[#15803d]/10 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none bg-white shadow-sm flex items-center gap-1 text-center justify-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    CLEAR
                  </button>
                </div>

                {/* Message Log */}
                <div className="flex-grow overflow-y-auto flex flex-col gap-3.5 pr-1 scrollbar-thin scrollbar-track-transparent scroll-smooth" id="chat-box">
                  {/* System Greeting */}
                  <div className="flex flex-col gap-1 max-w-[85%] self-start text-left items-start animate-fade-in-up">
                    <span className="text-[8px] font-bold text-gray-400">ValPaws Assistant</span>
                    <div className="bg-white text-gray-750 px-3.5 py-2.5 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm text-xs font-semibold leading-relaxed">
                      Hi there! I'm ValPaws' assistant. Click on any question on the left and I'll tell you more about our platform, onboarding process, reseller commissions, and features!
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
                          {isUser ? "You" : "ValPaws Assistant"}
                        </span>
                        <div className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold leading-relaxed border ${isUser
                          ? "bg-white text-gray-800 rounded-tr-none border-gray-200 shadow-sm"
                          : "bg-[#15803d] text-white rounded-tl-none border-[#15803d]/20 shadow-md shadow-[#15803d]/10"
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
                              className={`p-1 rounded hover:bg-gray-200/60 transition-colors text-gray-400 cursor-pointer ${msg.rating === 'down' ? 'text-[#15803d] bg-[#15803d]/5' : 'hover:text-[#15803d]'}`}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                            {msg.rating && (
                              <span className="text-[9px] font-black text-[#15803d] animate-pulse ml-1 animate-fade-in">
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
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] animate-bounce" style={{ animationDelay: '150ms' }}></span>
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
                      href="mailto:support@valpaws.ph"
                      className="bg-white hover:bg-gray-50 text-gray-700 hover:text-[#15803d] px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-gray-200 hover:border-gray-300 transition-all flex items-center gap-1.5 shadow-sm animate-pulse-subtle"
                    >
                      <Mail className="w-3.5 h-3.5 text-gray-450" />
                      EMAIL SUPPORT
                    </a>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("merchant");
                      }}
                      className="bg-white hover:bg-gray-50 text-gray-700 hover:text-[#15803d] px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-gray-200 hover:border-gray-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
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
        <section id="onboarding-section" className="w-full bg-white pt-10 pb-0 border-t-4 border-white relative">

          {/* Section Header */}
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-1.5 mb-8">
            <h2 className="reveal-wipe-left text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-gray-900 font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get Started with ValPaws!
            </h2>
            <p className="reveal-fade-up text-sm md:text-base font-bold text-gray-650 max-w-2xl font-sans" style={{ transitionDelay: '100ms' }}>
              Follow our step-by-step installation guide to set up the ValPaws Android application on your device, or directly download the official APK.
            </p>
          </div>

          <div className="w-full flex flex-col lg:flex-row min-h-[480px] overflow-hidden select-none relative">

            {/* LEFT PANEL: INSTALLATION GUIDE */}
            <div
              onClick={() => activeForm === 'split' && setActiveForm('merchant')}
              className={leftClasses}
              style={{
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
                  <BookOpen
                    className={`w-16 h-16 mb-4 text-white transition-transform duration-300 group-hover:rotate-6 transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                      }`}
                    style={{ transitionDelay: onboardingVisible ? "800ms" : "0ms" }}
                  />
                  <h3
                    className={`text-3xl font-black uppercase tracking-wider mb-2 transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                      }`}
                    style={{ transitionDelay: onboardingVisible ? "900ms" : "0ms", fontFamily: "'Playfair Display', serif" }}
                  >
                    Installation Guide
                  </h3>
                  <p
                    className={`text-sm font-medium opacity-90 mb-6 font-sans transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                      }`}
                    style={{ transitionDelay: onboardingVisible ? "1050ms" : "0ms" }}
                  >
                    Follow our simple step-by-step guide to download, enable permissions, and install the ValPaws Android app on your smartphone.
                  </p>
                  <button
                    className={`px-8 py-3 rounded-full border-2 border-white font-extrabold uppercase tracking-widest text-xs transition-all duration-300 bg-transparent text-white group-hover:bg-white group-hover:text-[#15803d] shadow-sm cursor-pointer transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                      }`}
                    style={{ transitionDelay: onboardingVisible ? "1200ms" : "0ms" }}
                  >
                    View Installation Guide
                  </button>
                </div>
              )}

              {activeForm === 'merchant' && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetForms();
                    }}
                    className="absolute right-6 top-28 w-12 h-12 rounded-full bg-[#ffbc00] text-black shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer z-50 border-2 border-black hover:bg-[#15803d] hover:text-white hover:border-[#15803d] animate-[fadeIn_0.5s_ease-out_forwards]"
                    title="Back to options"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div className="w-full py-6 md:py-10 px-4 flex justify-center items-center select-text z-10" onClick={(e) => e.stopPropagation()}>
                    <div
                      className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row text-slate-800"
                      style={{ height: '480px' }}
                    >
                      {/* Left Info Panel */}
                      <div className="w-full md:w-64 shrink-0 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/80 bg-slate-50">
                        <div className="flex flex-col text-left">
                          <img src={favicon} alt="ValPaws Logo" className="w-14 h-14 object-contain mb-4" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">ValPaws Guide</span>
                          <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 font-sans">App Installation Steps</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed font-sans mb-4">
                            Quick guide to install the ValPaws Android application (.apk) on your mobile device smoothly.
                          </p>
                          <div className="bg-[#15803d]/10 p-3 rounded-xl border border-[#15803d]/20 text-[11px] font-semibold text-[#15803d]">
                            💡 Tip: Make sure NFC is enabled on your phone for tag reading!
                          </div>
                        </div>
                      </div>

                      {/* Right Panel: Step by Step Guide */}
                      <div className="flex-grow p-6 flex flex-col justify-between bg-white overflow-y-auto font-sans text-left">
                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-4">4-Step Quick Setup</h4>

                        <div className="grid gap-3">
                          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-150">
                            <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                            <div>
                              <h5 className="text-xs font-bold text-slate-900 uppercase">Download APK Package</h5>
                              <p className="text-[11px] text-slate-600 font-medium">Click the button below to download the latest <code>21.Sep.2026.ValPaws.apk</code> file.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-150">
                            <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                            <div>
                              <h5 className="text-xs font-bold text-slate-900 uppercase">Allow Unknown Sources</h5>
                              <p className="text-[11px] text-slate-600 font-medium">When prompted by Android, tap <strong>Settings</strong> and enable <em>"Allow from this source"</em>.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-150">
                            <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                            <div>
                              <h5 className="text-xs font-bold text-slate-900 uppercase">Install the App</h5>
                              <p className="text-[11px] text-slate-600 font-medium">Open your <strong>Downloads</strong> folder, tap the downloaded APK file, and select <strong>Install</strong>.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-150">
                            <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                            <div>
                              <h5 className="text-xs font-bold text-slate-900 uppercase">Launch & Scan NFC Tags</h5>
                              <p className="text-[11px] text-slate-600 font-medium">Open ValPaws, sign in or register your pet details, and scan NFC collar tags!</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                          <a
                            href="https://github.com/sasage20/VALPAWS-APK/releases/latest/download/21.Sep.2026.ValPaws.apk"
                            download="21.Sep.2026.ValPaws.apk"
                            className="bg-[#15803d] text-white px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider hover:bg-[#166534] transition-all flex items-center gap-2 shadow-sm"
                          >
                            <Download className="w-4 h-4" />
                            Download APK File Now
                          </a>
                          <button
                            onClick={() => setActiveForm('reseller')}
                            className="text-xs font-bold text-[#15803d] hover:underline cursor-pointer"
                          >
                            Go to APK Download Details →
                          </button>
                        </div>
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
                  <Smartphone
                    className={`w-16 h-16 mb-4 text-black transition-transform duration-300 group-hover:-rotate-6 transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                      }`}
                    style={{ transitionDelay: onboardingVisible ? "800ms" : "0ms" }}
                  />
                  <h3
                    className={`text-3xl font-black uppercase tracking-wider mb-2 text-black transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                      }`}
                    style={{ transitionDelay: onboardingVisible ? "900ms" : "0ms", fontFamily: "'Playfair Display', serif" }}
                  >
                    Download APK
                  </h3>
                  <p
                    className={`text-sm font-medium text-black/90 mb-6 font-sans transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                      }`}
                    style={{ transitionDelay: onboardingVisible ? "1050ms" : "0ms" }}
                  >
                    Directly download the official ValPaws Android application package (.apk) file to install on your mobile device.
                  </p>
                  <button
                    className={`px-8 py-3 rounded-full border-2 border-black font-extrabold uppercase tracking-widest text-xs transition-all duration-300 bg-transparent text-black group-hover:bg-black group-hover:text-[#ffbc00] shadow-sm cursor-pointer transition-opacity duration-[500ms] ease-out ${onboardingVisible ? "opacity-100" : "opacity-0"
                      }`}
                    style={{ transitionDelay: onboardingVisible ? "1200ms" : "0ms" }}
                  >
                    Download APK Now
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
                    className="absolute left-6 top-28 w-12 h-12 rounded-full bg-[#15803d] text-white shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer z-50 border-2 border-[#15803d] hover:bg-[#ffbc00] hover:text-black hover:border-black animate-[fadeIn_0.5s_ease-out_forwards]"
                    title="Back to options"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>

                  {/* APK Download two-column card container */}
                  <div className="w-full py-6 md:py-10 px-4 flex justify-center items-center select-text z-10 animate-[fadeIn_0.5s_ease-out_forwards]" onClick={(e) => e.stopPropagation()}>
                    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row text-slate-800" style={{ height: '480px' }}>

                      {/* Left Info Panel */}
                      <div className="w-full md:w-64 shrink-0 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/80 bg-slate-900 text-white">
                        <div className="flex flex-col text-left">
                          <img src={favicon} alt="ValPaws Logo" className="w-14 h-14 object-contain mb-4 bg-white/10 p-2 rounded-2xl" />
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1.5 font-sans">Official Release</span>
                          <h3 className="text-2xl font-black leading-tight mb-4 font-sans text-white">ValPaws App (.apk)</h3>
                          <div className="space-y-2 text-xs font-medium text-slate-300 font-sans mb-4">
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                              <span className="text-slate-400">Filename:</span>
                              <span className="font-mono text-[11px] text-emerald-400 font-bold">21.Sep.2026.ValPaws.apk</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                              <span className="text-slate-400">File Size:</span>
                              <span className="font-bold text-white">117 MB</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                              <span className="text-slate-400">OS Required:</span>
                              <span className="font-bold text-white">Android 8.0+</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                              <span className="text-slate-400">Build Date:</span>
                              <span className="font-bold text-white">Sept 21, 2026</span>
                            </div>
                          </div>
                          <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
                            ⚡ Direct & safe release download hosted on GitHub.
                          </div>
                        </div>
                      </div>

                      {/* Right Download Panel */}
                      <div className="flex-grow p-6 flex flex-col justify-between bg-white text-left font-sans">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-200">
                              Latest Version
                            </span>
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-amber-200">
                              Android Build
                            </span>
                          </div>

                          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">ValPaws Mobile Package</h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                            Install the official ValPaws Android application to enable instant NFC tag scanning, manage pet health records, and receive emergency location alerts.
                          </p>

                          <div className="space-y-2.5 my-4">
                            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-150 text-xs font-bold text-slate-800">
                              <ShieldCheck className="w-5 h-5 text-[#15803d] shrink-0" />
                              <span>Verified, malware-safe official APK release</span>
                            </div>
                            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-150 text-xs font-bold text-slate-800">
                              <Smartphone className="w-5 h-5 text-[#15803d] shrink-0" />
                              <span>Full support for NFC-enabled Android smartphones</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <a
                            href="https://github.com/sasage20/VALPAWS-APK/releases/latest/download/21.Sep.2026.ValPaws.apk"
                            download="21.Sep.2026.ValPaws.apk"
                            className="w-full sm:w-auto bg-[#15803d] hover:bg-[#166534] text-white px-7 py-3 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            Download APK (117 MB)
                          </a>
                          <button
                            type="button"
                            onClick={() => setActiveForm('merchant')}
                            className="text-xs font-bold text-[#15803d] hover:underline cursor-pointer"
                          >
                            View Installation Guide →
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER & CONTACT */}
      <footer className="w-full bg-black text-white select-none">
        {/* Main Footer Area */}
        <div className="max-w-6xl mx-auto px-6 pt-8 pb-12 flex flex-col items-center justify-center gap-8 text-center">

          {/* Contact Us Title */}
          <div className="reveal-wipe-left text-3xl md:text-4xl font-bold uppercase tracking-wider text-center">
            Connect With Us!
          </div>

          {/* Contact Details */}
          <ul className="list-none p-0 m-0 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 font-sans w-full">
            {/* Phone */}
            <li className="reveal-fade-up flex items-center gap-3.5 text-sm md:text-base font-bold" style={{ transitionDelay: '100ms' }}>
              <a href="tel:(02) 8352-2000 (ext. 2111)" className="flex items-center gap-3.5 hover:text-[#15803d] transition-colors group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white group-hover:border-[#15803d] shrink-0 transition-colors">
                  <Phone className="w-4 h-4 text-white group-hover:text-[#15803d] fill-transparent transition-colors" />
                </div>
                <span className="leading-snug">(02) 8352-2000 (ext. 2111)</span>
              </a>
            </li>

            {/* Email */}
            <li className="reveal-fade-up flex items-center gap-3.5 text-sm md:text-base font-bold" style={{ transitionDelay: '200ms' }}>
              <a href="mailto:marketing@valpaws.ph" className="flex items-center gap-3.5 hover:text-[#15803d] transition-colors group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white group-hover:border-[#15803d] shrink-0 transition-colors">
                  <Mail className="w-4 h-4 text-white group-hover:text-[#15803d] fill-transparent transition-colors" />
                </div>
                <span className="leading-snug">marketing@valpaws.ph</span>
              </a>
            </li>

            {/* Address */}
            <li className="reveal-fade-up flex items-center gap-3.5 text-sm md:text-base font-bold" style={{ transitionDelay: '300ms' }}>
              <a href="https://www.google.com/maps/search/?api=1&query=62+G.+Lazaro+Rd,+Dalandanan,+Valenzuela+City,+1444" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 hover:text-[#15803d] transition-colors group text-center md:text-left">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white group-hover:border-[#15803d] shrink-0 transition-colors">
                  <MapPin className="w-4 h-4 text-white group-hover:text-[#15803d] fill-transparent transition-colors" />
                </div>
                <span className="leading-snug text-center">
                  62 G. Lazaro Rd, Dalandanan, Valenzuela City, 1444
                </span>
              </a>
            </li>
          </ul>

          {/* Social Media Links */}
          <div className="flex justify-center items-center gap-6 mt-4">
            <a href="https://www.facebook.com/profile.php?id=61577545713907" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#15803d] hover:bg-white hover:border-white transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer">
              <ion-icon name="logo-facebook" style={{ fontSize: '20px' }}></ion-icon>
            </a>
            <a href="https://www.instagram.com/valpaws.ph/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#15803d] hover:bg-white hover:border-white transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer">
              <ion-icon name="logo-instagram" style={{ fontSize: '20px' }}></ion-icon>
            </a>
            <a href="https://www.youtube.com/@ValPawsPH" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#15803d] hover:bg-white hover:border-white transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer">
              <ion-icon name="logo-youtube" style={{ fontSize: '20px' }}></ion-icon>
            </a>
            <a href="https://www.tiktok.com/@valpaws_ph" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#15803d] hover:bg-white hover:border-white transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer">
              <ion-icon name="logo-tiktok" style={{ fontSize: '20px' }}></ion-icon>
            </a>
            <a href="https://www.linkedin.com/company/valpaws/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#15803d] hover:bg-white hover:border-white transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer">
              <ion-icon name="logo-linkedin" style={{ fontSize: '20px' }}></ion-icon>
            </a>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="bg-black border-t border-white/10 py-5 text-center text-sm font-normal tracking-wide text-white/60">
          &copy; 2025 ValPaws. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}