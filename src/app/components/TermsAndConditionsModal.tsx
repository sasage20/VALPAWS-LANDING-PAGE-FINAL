import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  X,
  Scale,
  Printer,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Check,
  ArrowRight,
  RotateCcw,
  ExternalLink
} from "lucide-react";

// @ts-ignore
import confetti from "canvas-confetti";
// @ts-ignore
import valpawsIcon from "../../imports/valpaws_icon.png";

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export const TERMS_STORAGE_KEY = "valpaws_terms_accepted_v1";
export const TERMS_DATE_KEY = "valpaws_terms_accepted_date_v1";

export default function TermsAndConditionsModal({
  isOpen,
  onClose,
  onAccept,
}: TermsAndConditionsModalProps) {
  const [hasAcceptedLocally, setHasAcceptedLocally] = useState<boolean>(false);
  const [acceptedDate, setAcceptedDate] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("sec-1");
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check saved acceptance status on mount or when opening
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(TERMS_STORAGE_KEY);
      const dateStored = localStorage.getItem(TERMS_DATE_KEY);
      if (stored === "true") {
        setHasAcceptedLocally(true);
        setAcceptedDate(dateStored || "Recorded");
        setIsChecked(true);
      } else {
        setHasAcceptedLocally(false);
        setIsChecked(false);
        setShowSuccessScreen(false);
      }
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target && scrollContainerRef.current) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAcceptAndProceed = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    localStorage.setItem(TERMS_STORAGE_KEY, "true");
    localStorage.setItem(TERMS_DATE_KEY, formattedDate);
    setHasAcceptedLocally(true);
    setAcceptedDate(formattedDate);
    setShowSuccessScreen(true);

    // Fire celebratory confetti
    try {
      // @ts-ignore
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#15803d", "#166534", "#ffbc00", "#10b981", "#22c55e"],
      });
    } catch {
      // ignore
    }

    if (onAccept) {
      onAccept();
    }
  };

  const handleReturnToApp = () => {
    // Attempt to close window or redirect to app deep link if embedded
    try {
      window.location.href = "valpaws://terms-accepted";
    } catch {}
    try {
      window.close();
    } catch {}
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border-2 border-[#15803d]/30 flex flex-col overflow-hidden text-slate-800 transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95"
        style={{ fontFamily: "'Inter', sans-serif" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= MODAL HEADER ================= */}
        <div className="bg-[#15803d] text-white px-5 py-4 sm:px-7 sm:py-5 flex items-center justify-between border-b-2 border-emerald-600 shadow-md shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 p-1.5 flex items-center justify-center border border-white/20 shadow-sm shrink-0">
              <img
                src={valpawsIcon}
                alt="ValPaws Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-300/30">
                  ValPaws Legal Agreement
                </span>
                {hasAcceptedLocally && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-200 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-400/40">
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                    Accepted
                  </span>
                )}
              </div>
              <h2
                id="terms-modal-title"
                className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight font-serif tracking-tight mt-0.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Terms and Conditions & Data Privacy Notice
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              title="Print document"
              className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-all cursor-pointer hidden md:flex items-center justify-center"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#15803d] flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-sm active:scale-95"
              title="Close modal"
              aria-label="Close"
            >
              <X className="w-5 h-5 font-bold" />
            </button>
          </div>
        </div>

        {/* ================= SUCCESS CONFIRMATION VIEW ================= */}
        {showSuccessScreen ? (
          <div className="flex-grow p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 overflow-y-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-[#15803d] flex items-center justify-center text-[#15803d] shadow-lg animate-bounce">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <div className="space-y-2 max-w-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-[#15803d] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Consent Confirmed
              </span>
              <h3
                className="text-2xl sm:text-3xl font-black text-slate-900 font-serif"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Terms & Conditions Accepted
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                Thank you for reviewing and accepting the ValPaws Terms and Conditions and Data Privacy Notice.
                Your electronic consent has been legally recorded under Philippine Republic Act No. 8792 (E-Commerce Act) and Republic Act No. 10173 (Data Privacy Act of 2012).
              </p>
              {acceptedDate && (
                <p className="text-xs font-semibold text-emerald-800 bg-emerald-50 py-2 px-4 rounded-xl border border-emerald-200 inline-block mt-2">
                  ✓ Recorded on: {acceptedDate}
                </p>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
              <button
                type="button"
                onClick={handleReturnToApp}
                className="w-full sm:w-auto bg-[#15803d] hover:bg-[#166534] text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Return to ValPaws Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowSuccessScreen(false)}
                className="w-full sm:w-auto text-xs font-semibold text-slate-500 hover:text-slate-800 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Review Terms Again</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ================= NOTICE BANNER ================= */}
            <div className="bg-emerald-50/80 border-b border-emerald-200 px-5 py-3 sm:px-7 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-950 font-medium shrink-0">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#15803d] shrink-0" />
                <span>
                  Please review and click <strong>Accept to Proceed</strong> to continue with the ValPaws application.
                </span>
              </div>
              <span className="hidden md:inline-block text-[11px] font-semibold text-emerald-800 bg-white px-2.5 py-1 rounded-md border border-emerald-200">
                Scroll to accept
              </span>
            </div>

            {/* ================= SUB-BAR: JUMP SELECTOR & COMPLIANCE BADGE ================= */}
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-2.5 sm:px-7 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs text-slate-600">
              {/* Quick Jump Selector */}
              <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
                <Scale className="w-4 h-4 text-[#15803d] shrink-0" />
                <span className="font-bold text-slate-700">Jump to section:</span>
                <select
                  value={activeSection}
                  onChange={(e) => scrollToSection(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#15803d] cursor-pointer shadow-sm"
                >
                  <option value="sec-1">1. About ValPaws and These Terms</option>
                  <option value="sec-2">2. Who Can Use ValPaws</option>
                  <option value="sec-3">3. Your Account</option>
                  <option value="sec-4">4. What ValPaws Does and Does Not Do</option>
                  <option value="sec-5">5. Your Content, Including Photos</option>
                  <option value="sec-6">6. Lost and Found Reports</option>
                  <option value="sec-7">7. Acceptable Use</option>
                  <option value="sec-8">8. Personal Data We Collect (Table)</option>
                  <option value="sec-9">9. Why We Use Your Data</option>
                  <option value="sec-10">10. AI Photo Comparison (Search by Photo)</option>
                  <option value="sec-11">11. Who We Share Data With</option>
                  <option value="sec-12">12. Storage, Security, and Retention</option>
                  <option value="sec-13">13. Your Rights Under Data Privacy Act</option>
                  <option value="sec-14">14. Data Breach</option>
                  <option value="sec-15">15. Children</option>
                  <option value="sec-16">16. Responsible Pet Ownership</option>
                  <option value="sec-17">17. Disclaimers & Limitation of Liability</option>
                  <option value="sec-18">18. Suspension and Termination</option>
                  <option value="sec-19">19. Changes to These Terms</option>
                  <option value="sec-20">20. Governing Law and Disputes</option>
                  <option value="sec-21">21. Contact & Animal Pound Information</option>
                </select>
              </div>

              {/* Document Status Meta */}
              <div className="flex items-center gap-3 ml-auto text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Effective: 2026
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  R.A. 10173 & R.A. 8792 Compliant
                </span>
              </div>
            </div>

            {/* ================= MODAL BODY: DOCUMENT CONTENT ================= */}
            <div
              ref={scrollContainerRef}
              className="flex-grow overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 space-y-8 text-slate-700 text-sm leading-relaxed select-text"
              style={{ scrollBehavior: "smooth" }}
            >
              {/* Document Title Banner */}
              <div className="text-center pb-6 border-b border-slate-200 space-y-2">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#15803d] font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-[#15803d]" />
                  Official System Document
                </div>
                <h1
                  className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  ValPaws Terms and Conditions and Data Privacy Notice
                </h1>
                <p className="text-xs text-slate-500 font-medium max-w-xl mx-auto">
                  City Government of Valenzuela · City Veterinary Office & Animal Pound · Pamantasan ng Lungsod ng Valenzuela (PLV)
                </p>
              </div>

              {/* Section 1 */}
              <section id="sec-1" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    About ValPaws and These Terms
                  </h3>
                </div>
                <p>
                  ValPaws is a mobile app and web system for Valenzuela City that lets pet owners register their pets, link them to NFC collar tags, and lets the community report and help find lost or found pets. ValPaws is operated by the ValPaws Project Team in collaboration with Valenzuela City, Pamantasan ng Lungsod ng Valenzuela, and partner offices (“we”, “us”, “our”).
                </p>
                <p>
                  By creating an account, tapping “Help a Pet” as a guest, scanning a tag, or submitting a report, you agree to these Terms and Conditions and to the Data Privacy Notice in Sections 8 to 15. If you do not agree, please do not use ValPaws.
                </p>
                <div className="bg-emerald-50 border-l-4 border-[#15803d] p-3 rounded-r-xl text-xs font-semibold text-emerald-900">
                  Under the Electronic Commerce Act (Republic Act No. 8792), your electronic acceptance of these Terms is valid, legally binding, and enforceable.
                </div>
              </section>

              {/* Section 2 */}
              <section id="sec-2" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Who Can Use ValPaws
                  </h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong>Age Requirement:</strong> You must be at least 18 years old to create an account. If you are under 18, a parent or legal guardian must review these Terms and consent on your behalf, and must supervise your use of the app.
                  </li>
                  <li>
                    <strong>Guest Access:</strong> Guests (users without an account) may scan tags and submit found or missing reports, and must provide accurate contact details (name, phone number, and email) when doing so.
                  </li>
                  <li>
                    <strong>Information Accuracy:</strong> You must be able to give accurate information about yourself and the pets you register or report.
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="sec-3" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Your Account
                  </h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Provide accurate and current details, including a working contact number and email address. Verification of your email is required.</li>
                  <li>Keep your password confidential. You are responsible for all activities and reports submitted under your account.</li>
                  <li>Tell us promptly if you believe your account has been compromised or accessed without permission.</li>
                  <li>We may update your role or restrict your account where needed to operate the service (for example, administrator roles for authorized City Pound or project staff).</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="sec-4" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    4
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    What ValPaws Does and Does Not Do
                  </h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong>Identification Aid:</strong> ValPaws helps identify pets and connect finders with owners. It does not guarantee that any pet will be found, returned, claimed, or adopted.
                  </li>
                  <li>
                    <strong>Ownership Proof:</strong> An NFC tag or a registered profile is an identification aid. It is not, by itself, legal proof of ownership.
                  </li>
                  <li>
                    <strong>Not Veterinary Advice:</strong> ValPaws is not a veterinary service. Vaccination records and medical documents you upload are for record-keeping and identification, and do not replace advice from a licensed veterinarian.
                  </li>
                  <li>
                    <strong>City Pound Procedures:</strong> Claiming, adoption, and impound procedures are handled by the Valenzuela City Pound or the responsible city office under their own rules. Requirements shown in the app are for guidance and may change.
                  </li>
                  <li>
                    <strong>Administrative Statuses:</strong> Status updates on reports (for example, being processed, to be claimed, up for adoption, resolved) are set by authorized administrators.
                  </li>
                  <li>
                    <strong>AI Suggestions:</strong> Matching suggestions from Search by Photo are only automated suggestions (see Section 10).
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="sec-5" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    5
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Your Content, Including Photos
                  </h3>
                </div>
                <p>
                  <strong>“Content”</strong> means anything you submit, including pet photos, report photos, medical or vaccination documents (PDF), descriptions, locations, and contact details.
                </p>
                <p>
                  <strong>Ownership:</strong> You keep ownership of your Content.
                </p>
                <p>
                  <strong>License to Us:</strong> You give us a non-exclusive, royalty-free permission to store, display, process, and share your Content within ValPaws, only as needed to operate the features described in these Terms (identifying pets, showing reports, notifying owners, running Search by Photo, and administration). Under the Intellectual Property Code (Republic Act No. 8293), this permission does not transfer ownership to us, and it ends when your Content is deleted, subject to the retention rules in Section 12.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                    Your Promises About Content:
                  </span>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                    <li>You took the photo or have the legal right to upload it;</li>
                    <li>It shows the pet concerned and is not misleading;</li>
                    <li>You will avoid including people in photos, especially children. Where people are unavoidably visible, you have their consent or the photo is taken in a way that does not identify them;</li>
                    <li>You will not upload anything unlawful, obscene, defamatory, or that violates someone else’s privacy;</li>
                    <li>Uploaded documents do not contain unrelated sensitive personal information (such as government ID numbers or financial details).</li>
                  </ul>
                </div>
                <p className="text-xs text-slate-500 italic">
                  We may remove Content that breaks these rules or that we reasonably believe is unlawful or harmful.
                </p>
              </section>

              {/* Section 6 */}
              <section id="sec-6" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    6
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Lost and Found Reports
                  </h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong>Good Faith:</strong> Reports must be truthful and made in good faith. Do not file false, duplicate, or prank reports.
                  </li>
                  <li>
                    <strong>Pet Handling:</strong> If you report a found pet, you are responsible for the pet’s safe handling until it is turned over or claimed, and you should follow guidance shown in the app and from the City Pound.
                  </li>
                  <li>
                    <strong>Visibility:</strong> When you submit a report, the report details, photo, general location, and the way to contact you may be shown to other users so the pet’s owner can reach you. A “Contact Reporter” option is hidden from the reporter’s own view.
                  </li>
                  <li>
                    <strong>Resolution:</strong> Resolved reports remain visible in the mobile app for a limited time (currently 7 days) and may be kept in our records afterwards for audit trails.
                  </li>
                  <li>
                    <strong>Public Safety:</strong> If you act on information from a report (for example, claiming a pet), you do so at your own responsibility. Meet in safe, public places and follow the City Pound’s claiming requirements.
                  </li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="sec-7" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    7
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Acceptable Use
                  </h3>
                </div>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
                  <li>Impersonate another person or register pets you do not own or have authority over;</li>
                  <li>Harass, threaten, or discriminate against other users, owners, or finders;</li>
                  <li>Use contact details obtained through ValPaws for anything other than reuniting, claiming, or adopting a pet;</li>
                  <li>Scan, copy, clone, or tamper with NFC tags that are not yours, or assign a tag to a pet that is not yours;</li>
                  <li>Access or attempt to access other users’ data, probe or attack the system, scrape the service, or overload it;</li>
                  <li>Upload malware, ransomware, or interfere with service operations.</li>
                </ul>
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-xl text-xs font-semibold text-red-900">
                  Acts such as illegal access, data interference, and computer-related fraud are punishable under the Cybercrime Prevention Act of 2012 (Republic Act No. 10175). We will report unlawful activity to the Philippine National Police Anti-Cybercrime Group (PNP-ACG) and proper authorities.
                </div>
              </section>

              {/* Section 8 */}
              <section id="sec-8" className="space-y-4 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    8
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Personal Data We Collect (Data Privacy Notice)
                  </h3>
                </div>
                <p>
                  We collect and process only what is needed to run ValPaws. Depending on how you use the app, this includes:
                </p>

                {/* Structured Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#15803d] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 border-b border-emerald-600 w-1/4">Category</th>
                        <th className="py-3 px-4 border-b border-emerald-600 w-1/2">Examples</th>
                        <th className="py-3 px-4 border-b border-emerald-600 w-1/4">When Collected</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">Account details</td>
                        <td className="py-3 px-4 text-slate-600">Full name, email address, mobile number, password (stored securely by our authentication provider), role</td>
                        <td className="py-3 px-4 text-slate-500">Registration and profile editing</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">Pet information</td>
                        <td className="py-3 px-4 text-slate-600">Pet name, species, breed, color and markings, photo, status, NFC tag ID, vaccination records, medical document (PDF)</td>
                        <td className="py-3 px-4 text-slate-500">Pet registration and updates</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">Report information</td>
                        <td className="py-3 px-4 text-slate-600">Report type, description, photo, location, date, contact details, status history</td>
                        <td className="py-3 px-4 text-slate-500">Creating or updating reports</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">Guest information</td>
                        <td className="py-3 px-4 text-slate-600">Name, phone number, and email for a guest report or scan-related contact</td>
                        <td className="py-3 px-4 text-slate-500">Guest flow</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">Location data</td>
                        <td className="py-3 px-4 text-slate-600">Device location at the time of a tag scan or a found report, and addresses you enter</td>
                        <td className="py-3 px-4 text-slate-500">When you scan, report, or grant location permission</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">Device and notification data</td>
                        <td className="py-3 px-4 text-slate-600">Push notification token, app version, basic technical logs</td>
                        <td className="py-3 px-4 text-slate-500">When you allow notifications</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">Search by Photo inputs</td>
                        <td className="py-3 px-4 text-slate-600">The photo you upload, selected species, and any optional color or description details</td>
                        <td className="py-3 px-4 text-slate-500">When you use Search by Photo</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">Administrative records</td>
                        <td className="py-3 px-4 text-slate-600">Actions performed by administrators (audit logs), NFC tag assignment history</td>
                        <td className="py-3 px-4 text-slate-500">Operation and accountability of the service</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-slate-500">
                  Photos may sometimes contain personal information (for example, a person or a home in the background). Please avoid this where possible. We do not knowingly collect “sensitive personal information” as defined in the Data Privacy Act (such as government-issued ID numbers, health records of individuals, or financial data). Please do not upload such information.
                </p>
              </section>

              {/* Section 9 */}
              <section id="sec-9" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    9
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Why We Use Your Data
                  </h3>
                </div>
                <p>
                  Under the Data Privacy Act of 2012 (Republic Act No. 10173), its Implementing Rules and Regulations, and issuances of the National Privacy Commission (NPC), we process your personal data only for declared, specified, and legitimate purposes, and only to the extent necessary (transparency, legitimate purpose, and proportionality). Our purposes are:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
                  <li>Creating and managing your account and verifying your email;</li>
                  <li>Registering pets and linking them to NFC tags;</li>
                  <li>Showing a pet’s profile when its tag is scanned, and notifying the owner;</li>
                  <li>Creating, displaying, and managing lost and found reports, and enabling contact between owners and finders;</li>
                  <li>Sending in-app and push notifications about scans, reports, and status changes;</li>
                  <li>Running the Search by Photo feature;</li>
                  <li>Helping the City Pound and authorized administrators manage reports, claims, and adoptions;</li>
                  <li>Keeping the service secure, preventing abuse, and keeping audit records;</li>
                  <li>Complying with legal obligations.</li>
                </ul>
                <p className="text-xs text-slate-600 bg-slate-100 p-3 rounded-xl border border-slate-200">
                  Our basis for processing is mainly your <strong>consent</strong>, given when you accept these Terms and when you submit photos, location, and contact details. Some processing is also necessary to provide the service you asked for or to meet legal obligations. We do not sell your personal data and we do not use it for advertising.
                </p>
              </section>

              {/* Section 10 */}
              <section id="sec-10" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    10
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    AI Photo Comparison (Search by Photo)
                  </h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Search by Photo lets a registered user upload a photo of their missing pet and compare it against active found reports of the same species (dog or cat).</li>
                  <li>To do this, the photo you upload and the photos attached to the active found reports being compared are sent through our backend to a third-party AI service, currently Google’s Gemini API, which returns a confidence rating (Unlikely, Possible, Likely, Very Likely) with a short reasoning.</li>
                  <li><strong>Automated suggestions only:</strong> The results are suggestions only. They can be wrong. A person (you, the finder, or the City Pound) must make the final decision before any pet is claimed or released. No legal decision is made solely by automated means.</li>
                  <li>By using Search by Photo, you consent to this transfer and processing. Please do not upload photos containing people.</li>
                  <li>Search by Photo requires an account. Guests cannot use it.</li>
                </ul>
              </section>

              {/* Section 11 */}
              <section id="sec-11" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    11
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Who We Share Data With
                  </h3>
                </div>
                <p>
                  <strong>Visible to other people through the app:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
                  <li>When a registered NFC tag is scanned (including by a guest), the public pet profile is shown (pet name, photo, breed, vaccination status badge, and a way to contact the owner).</li>
                  <li>Found and missing reports (and the photo, location, and a way to contact the reporter) can be seen by other users as described in Section 6.</li>
                  <li>The location captured at the time of a scan is recorded in the pet’s scan history so the owner can see where the pet was seen.</li>
                </ul>
                <p className="mt-3">
                  <strong>Shared with service providers (personal information processors) acting on our instructions:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1 text-slate-700">
                  <li><strong>Supabase:</strong> Database, authentication, file storage, and realtime messaging;</li>
                  <li><strong>Google:</strong> Gemini API for Search by Photo; Firebase Cloud Messaging for push notifications;</li>
                  <li><strong>Expo:</strong> Push notification delivery and app updates;</li>
                  <li><strong>Vercel:</strong> Hosting of the administrator web dashboard.</li>
                </ul>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  Where data is transferred abroad, we remain accountable for it and require our providers to protect it appropriately, consistent with the Data Privacy Act. We do not share your data with anyone else without a lawful basis or your consent.
                </p>
              </section>

              {/* Section 12 */}
              <section id="sec-12" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    12
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Storage, Security, and Retention
                  </h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>We apply reasonable organizational, physical, and technical safeguards, including account authentication, access controls limiting data to authorized users, role-based administrator access, and encrypted connections.</li>
                  <li>No system is completely secure. You are responsible for protecting your device and password.</li>
                  <li>We keep your personal data only as long as needed for the purposes in Section 9 or as required by law. As a guide: account and pet data are kept while your account is active; reports are kept for the period needed to process them and for record-keeping; audit logs and tag assignment history are kept for accountability.</li>
                  <li>When you delete a pet profile or request deletion of your account, we will delete or anonymize your related personal data within a reasonable period, except for records we must or reasonably need to keep.</li>
                </ul>
              </section>

              {/* Section 13 */}
              <section id="sec-13" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    13
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Your Rights Under the Data Privacy Act
                  </h3>
                </div>
                <p>Under the Philippine Data Privacy Act of 2012, you have the right to:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    { n: "1", title: "Be Informed", desc: "About how your data is collected and used (this notice);" },
                    { n: "2", title: "Access", desc: "Your personal data held in our systems;" },
                    { n: "3", title: "Object", desc: "To processing, including withdrawing consent;" },
                    { n: "4", title: "Rectify", desc: "Inaccurate or outdated data (you can edit most in your Profile);" },
                    { n: "5", title: "Erase or Block", desc: "Your data in the cases permitted by law;" },
                    { n: "6", title: "Data Portability", desc: "To obtain a copy in a commonly used format;" },
                    { n: "7", title: "Claim Damages", desc: "If you suffer harm from unlawful or inaccurate use;" },
                    { n: "8", title: "File a Complaint", desc: "With the National Privacy Commission (www.privacy.gov.ph)." }
                  ].map((item) => (
                    <div key={item.n} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {item.n}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                        <p className="text-[11px] text-slate-600 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 pt-1">
                  To exercise these rights, contact our Data Protection Officer using the details in Section 21. We will respond within a reasonable time and may need to verify your identity first.
                </p>
              </section>

              {/* Section 14 */}
              <section id="sec-14" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    14
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Data Breach
                  </h3>
                </div>
                <p>
                  If a personal data breach occurs that is likely to put you at real risk of serious harm, we will notify the National Privacy Commission and affected users within the period required by law (currently 72 hours from knowledge of the breach under NPC rules), and take steps to contain and fix it.
                </p>
              </section>

              {/* Section 15 */}
              <section id="sec-15" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    15
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Children
                  </h3>
                </div>
                <p>
                  ValPaws is intended for adults. We do not knowingly create accounts for children under 18 without the consent and supervision of a parent or guardian. If you believe a child’s data was submitted without that consent, contact us and we will take appropriate steps, including deletion.
                </p>
              </section>

              {/* Section 16 */}
              <section id="sec-16" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    16
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Responsible Pet Ownership
                  </h3>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl space-y-2">
                  <p className="text-xs text-amber-950 font-medium leading-relaxed">
                    ValPaws supports, and does not replace, your legal duties as a pet owner. Philippine law, including the <strong>Animal Welfare Act (Republic Act No. 8485, as amended by Republic Act No. 10631)</strong> and the <strong>Anti-Rabies Act of 2007 (Republic Act No. 9482)</strong>, requires owners to treat animals humanely and to keep dogs and cats vaccinated and registered with the proper local authorities.
                  </p>
                  <p className="text-xs text-amber-900 font-semibold">
                    Using ValPaws or recording vaccinations in the app does not satisfy those legal obligations by itself. Cruelty to animals, abandonment, or using ValPaws to harm or take an animal unlawfully is prohibited and will be reported to the authorities.
                  </p>
                </div>
              </section>

              {/* Section 17 */}
              <section id="sec-17" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    17
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Disclaimers and Limitation of Liability
                  </h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>ValPaws is provided “as is” and “as available.” We try to keep it accurate and running, but we do not promise uninterrupted or error-free service, accurate matches, or that notifications will always be delivered.</li>
                  <li>We are not responsible for what users submit, for disputes between users over a pet, or for any outcome of meeting or handing over a pet.</li>
                  <li>To the extent permitted by law, we are not liable for indirect or consequential losses arising from the use of, or inability to use, ValPaws. Nothing in these Terms limits any right you have under Philippine law that cannot be waived.</li>
                  <li>You are responsible for the data and mobile plan charges you incur and for keeping the app updated.</li>
                </ul>
              </section>

              {/* Section 18 */}
              <section id="sec-18" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    18
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Suspension and Termination
                  </h3>
                </div>
                <p>
                  We may suspend or end access if you break these Terms, submit false or harmful reports, misuse contact information, or endanger the system or others. You may stop using ValPaws at any time and may request deletion of your account under Section 13.
                </p>
              </section>

              {/* Section 19 */}
              <section id="sec-19" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    19
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Changes to These Terms
                  </h3>
                </div>
                <p>
                  We may update these Terms and the Data Privacy Notice from time to time. We will show the updated date and, for important changes, notify you in the app. Continued use after changes take effect means you accept them. If a change requires new consent under the law, we will ask for it.
                </p>
              </section>

              {/* Section 20 */}
              <section id="sec-20" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    20
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Governing Law and Disputes
                  </h3>
                </div>
                <p>
                  These Terms are governed by the laws of the Republic of the Philippines. We encourage you to contact us first to resolve any concern. Any dispute that cannot be settled amicably will be brought before the proper courts of <strong>Valenzuela City</strong>, to the exclusion of other venues, unless the law provides otherwise.
                </p>
              </section>

              {/* Section 21 */}
              <section id="sec-21" className="space-y-3 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    21
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Contact Information
                  </h3>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-[#15803d]">
                      Operator & Data Protection Officer
                    </div>
                    <div className="text-slate-700">
                      <p className="font-semibold">ValPaws Project Team / PLV</p>
                      <p className="text-slate-500">Data Protection Officer</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Mail className="w-4 h-4 text-[#15803d]" />
                      <span>bbsison@valenzuela.gov.ph</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Phone className="w-4 h-4 text-[#15803d]" />
                      <span>+63 8352-2000 loc 2111</span>
                    </div>
                  </div>

                  <div className="space-y-2 sm:border-l sm:border-slate-200 sm:pl-4">
                    <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-[#15803d]">
                      Animal Control & City Pound
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
                      <span>Rubber Master Road, Barangay Lingunan, Valenzuela City, Metro Manila</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      For lost and found animal matters, claiming impounded pets, or adoption inquiries, you can directly reach the Valenzuela City Pound at <strong>+63 8352-2000 (ext. 2111)</strong>.
                    </p>
                  </div>
                </div>
              </section>

              {/* Formal Electronic Consent Statement */}
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-[#15803d]/30 text-emerald-950 text-xs font-semibold leading-relaxed">
                By tapping “Accept to Proceed” (or by continuing to use ValPaws), you confirm that you have read and understood these Terms and Conditions and the Data Privacy Notice, and you give your explicit consent to the processing of your personal data as described above.
              </div>
            </div>

            {/* ================= MODAL FOOTER & ACCEPTANCE CONTROLS ================= */}
            <div className="bg-slate-50 border-t-2 border-slate-200 px-5 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-inner">
              {/* Acceptance Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none text-left w-full sm:w-auto">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-[#15803d] focus:ring-[#15803d] accent-[#15803d] mt-0.5 shrink-0 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                  I have read, understood, and accept the{" "}
                  <strong className="text-slate-900">ValPaws Terms & Conditions</strong> and{" "}
                  <strong className="text-slate-900">Data Privacy Notice</strong>.
                </span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-slate-300 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Close
                </button>
                <button
                  type="button"
                  id="accept-terms-button"
                  disabled={!isChecked}
                  onClick={handleAcceptAndProceed}
                  className={`px-7 py-2.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    isChecked
                      ? "bg-[#15803d] hover:bg-[#166534] text-white hover:shadow-lg hover:scale-105 active:scale-95"
                      : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-70"
                  }`}
                >
                  <Check className="w-4 h-4 font-black" />
                  Accept to Proceed
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
