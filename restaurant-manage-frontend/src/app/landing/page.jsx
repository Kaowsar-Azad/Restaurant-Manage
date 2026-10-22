"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function RestronitiLandingPage() {
  useEffect(() => {
    const translations = {
      bn: {
        navPlatform: "প্ল্যাটফর্ম",
        navWorkflow: "কীভাবে কাজ করে",
        navPricing: "প্ল্যান",
        navFAQ: "প্রশ্নোত্তর",
        navLogin: "লগইন",
        navCTA: "প্রোডাক্ট দেখুন",
        heroEyebrow: "বাংলাদেশের রেস্টুরেন্টের জন্য একটি নতুন অভিজ্ঞতা",
        heroTitle: '<span class="title-line">রেস্টুরেন্টের প্রতিটি কাজ,</span><span class="title-line"><span class="accent">এক জায়গায়, সহজ নিয়ন্ত্রণে।</span></span>',
        heroDescription: "অর্ডার নেওয়া, টেবিল ও কিচেন সামলানো, স্টক দেখা এবং দিনের বিক্রির হিসাব—সবকিছুর জন্য একটি সহজ রেস্টুরেন্ট ম্যানেজমেন্ট প্ল্যাটফর্ম।",
        heroCTA1: "লগইন / ড্যাশবোর্ড",
        heroCTA2: "প্যাকেজগুলো দেখুন",
        heroNote: "Restaurant management, made clearer. · প্রোডাক্ট ডিজাইন প্রিভিউ",
        cap1: "অর্ডার ও বিলিং",
        cap2: "কিচেন ও স্টক",
        cap3: "বিক্রির রিপোর্ট",
        scrollHint: "SCROLL TO EXPLORE",
        storyTop: "প্রতিদিনের কাজের তিনটি ধাপ",
        storyMobileLabel: "একটি আরও সহজ রেস্টুরেন্ট ওয়ার্কফ্লো",
        story1Title: "প্রতিটি অর্ডার,<br><span>আরও সহজে।</span>",
        story1Text: "টেবিল ও টেকঅ্যাওয়ে অর্ডার নিন একটি পরিষ্কার, দ্রুত ব্যবহারযোগ্য স্ক্রিনে।",
        story2Title: "অর্ডার থেকে কিচেন,<br><span>একই ছন্দে।</span>",
        story2Text: "কোন অর্ডার তৈরি হচ্ছে, কোনটি প্রস্তুত—টিমের সবার কাছে স্পষ্ট রাখুন।",
        story3Title: "দিনশেষের হিসাব,<br><span>আপনার হাতেই।</span>",
        story3Text: "বিক্রি, জনপ্রিয় আইটেম এবং গুরুত্বপূর্ণ তথ্য দেখুন, যাতে সিদ্ধান্ত নেওয়া সহজ হয়।",
        introKicker: "BUILT FOR REAL SERVICE",
        introTitle: "ব্যস্ত রেস্টুরেন্টের জন্য, শান্ত ও পরিষ্কার একটি সিস্টেম।",
        introText: "রেস্টুরেন্ট চালাতে প্রতিদিন অনেক কিছু একসঙ্গে সামলাতে হয়। Restroniti-র লক্ষ্য হলো অর্ডার নেওয়া থেকে কিচেন, টেবিল, স্টক ও রিপোর্টের কাজগুলোকে একটি সহজ ওয়ার্কফ্লোতে আনা।",
        introLink: "প্রোডাক্টটি দেখুন",
        productKicker: "THE PLATFORM",
        productTitle: "যা দরকার, সেটাই সামনে।",
        productSub: "অপ্রয়োজনীয় জটিলতা নয়—ব্যবহারযোগ্য, গোছানো স্ক্রিনে গুরুত্বপূর্ণ তথ্য।",
        showKicker: "OWNER VIEW",
        showTitle: "দিনের গুরুত্বপূর্ণ সংখ্যাগুলো, এক নজরে।",
        showText: "সারাদিনের বিক্রি, অর্ডারের সংখ্যা ও কাজের অবস্থা—মালিক এবং ম্যানেজারের জন্য সহজে বোঝার মতো করে সাজানো।",
        workflowKicker: "BUILT AROUND YOUR DAY",
        workflowTitle: "কাজের প্রতিটি ধাপ, একই প্রবাহে।",
        work1Title: "অর্ডার নিন",
        work1Text: "টেবিল বা কাউন্টারে দ্রুত অর্ডার তৈরি, আইটেম সিলেক্ট এবং বিলিংয়ের ব্যবস্থা।",
        work2Title: "কিচেনে পাঠান",
        work2Text: "কিচেন টিকিট ও অর্ডারের অবস্থা আপডেট করার একটি গোছানো প্রক্রিয়া।",
        work3Title: "দিনের হিসাব দেখুন",
        work3Text: "বিক্রির সারাংশ, পেমেন্ট এবং স্টকের গুরুত্বপূর্ণ তথ্য এক জায়গায়।",
        priceKicker: "SIMPLE PLANS",
        priceTitle: "আপনার প্রয়োজন অনুযায়ী প্ল্যান।",
        priceSub: "প্রোডাক্ট ডকুমেন্টের প্রস্তাবিত মূল্য; বাজার যাচাইয়ের পর পরিবর্তিত হতে পারে।",
        billMonthly: "Monthly",
        billYearly: "Yearly",
        billSave: "−20%",
        perMonth: " /mo",
        freeDesc: "ছোট পরিসরে শুরু করার জন্য।",
        freeBilling: "No subscription fee",
        free1: "১টি ব্রাঞ্চ, ২ জন ইউজার",
        free2: "১০টি টেবিল, ৩০টি মেনু আইটেম",
        free3: "মাসে ১৫০টি অর্ডার",
        starterDesc: "ছোট ও মাঝারি রেস্টুরেন্টের দৈনন্দিন কাজ।",
        starter1: "৫ জন ইউজার, ২৫টি টেবিল",
        starter2: "মাসে ২,০০০টি অর্ডার",
        starter3: "বেসিক রিপোর্ট ও ইনভেন্টরি",
        proDesc: "বর্ধিত অর্ডার ও কিচেন ম্যানেজমেন্টের জন্য।",
        pro1: "১৫ জন ইউজার, ১০০টি টেবিল",
        pro2: "মাসে ১৫,০০০টি অর্ডার",
        pro3: "কিচেন ডিসপ্লে ও উন্নত রিপোর্ট",
        planPopular: "FEATURED",
        planExplore: "শুরু করুন (লগইন)",
        priceMonthlyNote: "Monthly billing",
        businessTitle: "Business · ৳3,499 / মাস",
        businessDesc: "মাল্টি-ব্রাঞ্চ ও বড় রেস্টুরেন্ট টিমের জন্য প্রস্তাবিত প্ল্যান।",
        businessCTA: "সব প্ল্যান বুঝে নিন",
        priceDisclaimer: "সব মূল্য, ফিচার ও সীমা প্রস্তাবিত; এটি কোনো চালু Subscription Checkout নয়।",
        faqHeading: "শুরুর আগে যা জানতে চান।",
        faqSub: "এই প্রিভিউতে বাস্তব Account, Payment বা Booking সক্রিয় নেই।",
        q1: "Restroniti কী ধরনের সফটওয়্যার?",
        a1: "এটি রেস্টুরেন্টের অর্ডার, টেবিল, কিচেন, স্টক ও সেলস রিপোর্ট পরিচালনার উদ্দেশ্যে পরিকল্পিত একটি SaaS প্ল্যাটফর্ম।",
        q2: "এটি কি ছোট রেস্টুরেন্টেও ব্যবহার করা যাবে?",
        a2: "প্রস্তাবিত প্ল্যান অনুযায়ী ছোট রেস্টুরেন্টের জন্যও ব্যবস্থা আছে। বাস্তব পাইলটে বিভিন্ন রেস্টুরেন্টের চাহিদা যাচাই করা হবে।",
        q3: "মোবাইল ও কম্পিউটারে চলবে?",
        a3: "ডিজাইনটি মোবাইল, ট্যাবলেট ও ডেস্কটপকে লক্ষ্য করে তৈরি। প্রোডাকশন ফিচারগুলো বাস্তবে পরীক্ষা করে নিশ্চিত করতে হবে।",
        q4: "মূল্য কি চূড়ান্ত?",
        a4: "না। এখানে দেখানো প্ল্যান ও মূল্য প্রজেক্ট ডকুমেন্টের প্রস্তাব; বাস্তব বাজার যাচাইয়ের পর পরিবর্তিত হতে পারে।",
        closingTitle: "রেস্টুরেন্ট পরিচালনা হোক একটু সহজ।",
        closingText: "প্রতিটি অর্ডার থেকে দিনশেষের রিপোর্ট—একটি পরিষ্কার ও ব্যবহারযোগ্য অভিজ্ঞতার দিকে।",
        closingCTA: "লগইন করে শুরু করুন",
        footerDesc: "Restaurant operations, thoughtfully simplified.",
        footerNote: "ডেমো ডেটা · লাইভ অ্যাকাউন্ট বা পেমেন্ট যুক্ত নয়",
      },
      en: {
        navPlatform: "Platform",
        navWorkflow: "How it works",
        navPricing: "Pricing",
        navFAQ: "FAQ",
        navLogin: "Login",
        navCTA: "Explore Restroniti",
        heroEyebrow: "RESTAURANT OPERATIONS, THOUGHTFULLY SIMPLIFIED",
        heroTitle: '<span class="title-line">Every part of your restaurant.</span><span class="title-line"><span class="accent">One clearer way to run it.</span></span>',
        heroDescription: "Orders, tables, kitchen coordination, stock and daily sales—bring everyday restaurant operations into one thoughtful workspace.",
        heroCTA1: "Sign In / Dashboard",
        heroCTA2: "Explore plans",
        heroNote: "Built for modern restaurant teams · Product concept preview",
        cap1: "Orders & billing",
        cap2: "Kitchen & stock",
        cap3: "Sales insights",
        scrollHint: "SCROLL TO EXPLORE",
        storyTop: "THREE MOMENTS THAT MATTER",
        storyMobileLabel: "A SIMPLER RESTAURANT WORKFLOW",
        story1Title: "Take every order.<br><span>With less friction.</span>",
        story1Text: "Keep dine-in and takeaway orders moving with a straightforward workflow.",
        story2Title: "From front of house<br><span>to the kitchen.</span>",
        story2Text: "Make preparation and ready statuses clear to the whole team.",
        story3Title: "See how the day went.<br><span>At a glance.</span>",
        story3Text: "Understand sales, popular dishes and important stock information without digging.",
        introKicker: "BUILT FOR REAL SERVICE",
        introTitle: "For busy restaurants. A calmer way to work.",
        introText: "Restaurant teams handle dozens of details every day. Restroniti is designed to bring ordering, kitchen coordination, tables, stock and reports into a simpler daily workflow.",
        introLink: "Explore the platform",
        productKicker: "THE PLATFORM",
        productTitle: "What matters, right in front of you.",
        productSub: "Useful, well-organized information—without an overwhelming interface.",
        showKicker: "OWNER VIEW",
        showTitle: "The day’s important numbers, together.",
        showText: "Daily sales, order volume and operational updates—presented in a clear interface for owners and managers.",
        workflowKicker: "BUILT AROUND YOUR DAY",
        workflowTitle: "One connected flow from start to finish.",
        work1Title: "Take the order",
        work1Text: "Create table or counter orders with quick item selection and billing.",
        work2Title: "Send to kitchen",
        work2Text: "A clear process for kitchen tickets and preparation updates.",
        work3Title: "Understand the day",
        work3Text: "Review sales summaries, payment breakdowns and key stock information.",
        priceKicker: "SIMPLE PLANS",
        priceTitle: "A plan for where you are today.",
        priceSub: "Indicative pricing from the product proposal; subject to real market validation.",
        billMonthly: "Monthly",
        billYearly: "Yearly",
        billSave: "−20%",
        perMonth: " /mo",
        freeDesc: "A simple way to explore the essentials.",
        freeBilling: "No subscription fee",
        free1: "1 branch, 2 users",
        free2: "10 tables, 30 menu items",
        free3: "150 orders per month",
        starterDesc: "Everyday operations for smaller teams.",
        starter1: "5 users, 25 tables",
        starter2: "2,000 orders per month",
        starter3: "Basic reports and inventory",
        proDesc: "For growing service and kitchen operations.",
        pro1: "15 users, 100 tables",
        pro2: "15,000 orders per month",
        pro3: "Kitchen display and deeper reports",
        planPopular: "FEATURED",
        planExplore: "Get Started (Login)",
        priceMonthlyNote: "Monthly billing",
        businessTitle: "Business · ৳3,499 / month",
        businessDesc: "Indicative plan for multi-branch restaurants and larger teams.",
        businessCTA: "See plan questions",
        priceDisclaimer: "All plans, prices and limits are proposed. No live subscription checkout is connected.",
        faqHeading: "A few things worth knowing.",
        faqSub: "This is a frontend concept. Accounts, payments and booking are not live.",
        q1: "What is Restroniti?",
        a1: "Restroniti is a planned SaaS platform for restaurant orders, tables, kitchen workflow, inventory and sales reporting.",
        q2: "Is it intended for small restaurants?",
        a2: "The proposed plans include smaller restaurants. Actual needs and willingness to pay still need testing with pilot customers.",
        q3: "Will it work on phones and computers?",
        a3: "The experience is being designed for mobile, tablet and desktop. Production capabilities require live testing.",
        q4: "Are these prices final?",
        a4: "No. The displayed prices come from the current product proposal and may change following market validation.",
        closingTitle: "A little less chaos. A lot more clarity.",
        closingText: "From the first order to the final report—give your restaurant a clearer daily workflow.",
        closingCTA: "Login to start",
        footerDesc: "Restaurant operations, thoughtfully simplified.",
        footerNote: "Concept data · No live accounts or payments connected",
      },
    };

    let locale = "bn";
    let billing = "monthly";
    const byId = (id) => document.getElementById(id);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    function i18n(lang) {
      locale = lang;
      document.documentElement.lang = lang;
      document.body.classList.toggle("lang-en", lang === "en");
      document.querySelectorAll("[data-t]").forEach((el) => {
        const s = translations[lang][el.dataset.t];
        if (s !== undefined) el.textContent = s;
      });
      document.querySelectorAll("[data-html]").forEach((el) => {
        const s = translations[lang][el.dataset.html];
        if (s !== undefined) el.innerHTML = s;
      });
      const langLabel = byId("languageLabel");
      if (langLabel) langLabel.textContent = lang === "bn" ? "EN" : "বাংলা";
      const langToggle = byId("languageToggle");
      if (langToggle) langToggle.setAttribute("aria-label", lang === "bn" ? "Switch to English" : "বাংলায় পরিবর্তন করুন");
      updatePrices();
      updateSearchLocale();
    }

    const langToggleBtn = byId("languageToggle");
    if (langToggleBtn) {
      langToggleBtn.onclick = () => i18n(locale === "bn" ? "en" : "bn");
    }

    function updatePrices() {
      document.querySelectorAll("[data-price]").forEach((el) => {
        const base = Number(el.dataset.price);
        const value = billing === "yearly" ? Math.round(base * 0.8) : base;
        el.innerHTML = "৳" + value.toLocaleString("en-US") + "<small> /mo</small>";
      });
      document.querySelectorAll("[data-billed]").forEach((el) => {
        const name = el.dataset.billed;
        if (name === "free") {
          el.textContent = translations[locale].freeBilling;
          return;
        }
        const base = name === "starter" ? 599 : 1499;
        el.textContent =
          billing === "yearly"
            ? (locale === "bn" ? "১২ মাসের বিল: " : "Billed annually: ") +
              "৳" +
              Math.round(base * 12 * 0.8).toLocaleString("en-US")
            : translations[locale].priceMonthlyNote;
      });
      const monthlyBtn = byId("monthly");
      const yearlyBtn = byId("yearly");
      if (monthlyBtn && yearlyBtn) {
        monthlyBtn.classList.toggle("active", billing === "monthly");
        yearlyBtn.classList.toggle("active", billing === "yearly");
        monthlyBtn.setAttribute("aria-pressed", String(billing === "monthly"));
        yearlyBtn.setAttribute("aria-pressed", String(billing === "yearly"));
      }
    }

    const mBtn = byId("monthly");
    const yBtn = byId("yearly");
    if (mBtn) mBtn.onclick = () => { billing = "monthly"; updatePrices(); };
    if (yBtn) yBtn.onclick = () => { billing = "yearly"; updatePrices(); };

    const menu = byId("mobileNavigation");
    const menuBtn = byId("menuButton");
    function closeMenu() {
      if (menu && menuBtn) {
        menu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        const icon = byId("menuIcon");
        if (icon) icon.setAttribute("href", "#i-menu");
      }
    }

    if (menuBtn) {
      menuBtn.onclick = () => {
        if (!menu) return;
        const open = menu.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
        const icon = byId("menuIcon");
        if (icon) icon.setAttribute("href", open ? "#i-x" : "#i-menu");
      };
    }
    if (menu) {
      menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    }

    const appear = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            appear.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px 40px 0px" }
    );
    document.querySelectorAll("[data-appear]").forEach((e) => appear.observe(e));
    document.querySelectorAll(".hero [data-appear]").forEach((e) => e.classList.add("visible"));

    const story = byId("story");
    const slides = [...document.querySelectorAll(".story-slide")];
    const steps = [...document.querySelectorAll(".story-progress span")];
    const nav = byId("navigation");
    const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
    let ticking = false;

    function resetStory() {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === 0 ? "1" : "0";
        slide.style.visibility = i === 0 ? "visible" : "hidden";
        slide.style.transform = "translateY(-50%)";
        slide.classList.toggle("active", i === 0);
        slide.setAttribute("aria-hidden", String(i !== 0));
      });
      steps.forEach((step, i) => {
        step.classList.toggle("active", i === 0);
        step.style.setProperty("--progress", i === 0 ? "100%" : "0%");
      });
    }

    function renderStory() {
      if (!story || window.innerWidth <= 960 || mq.matches) {
        resetStory();
        return;
      }
      const rect = story.getBoundingClientRect();
      const distance = Math.max(1, story.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / distance, 0, 1);
      const exact = progress * 3;
      const idx = Math.min(2, Math.floor(exact));
      const phase = idx === 2 ? clamp(exact - 2, 0, 1) : clamp(exact - idx, 0, 1);
      const fadeIn = idx === 0 ? 1 : clamp(phase / 0.09, 0, 1);
      const fadeOut = idx === 2 ? 1 : clamp((1 - phase) / 0.09, 0, 1);
      const opacity = fadeIn * fadeOut;

      slides.forEach((slide, i) => {
        const active = i === idx;
        slide.classList.toggle("active", active);
        slide.style.visibility = active ? "visible" : "hidden";
        slide.style.opacity = active ? String(opacity) : "0";
        slide.style.transform = active
          ? `translateY(calc(-50% + ${(1 - opacity) * 12}px))`
          : "translateY(-50%)";
        slide.setAttribute("aria-hidden", String(!active));
      });
      steps.forEach((step, i) => {
        step.classList.toggle("active", i === idx);
        const amount = i < idx ? 100 : i === idx ? Math.max(8, phase * 100) : 0;
        step.style.setProperty("--progress", `${amount}%`);
      });
    }

    function updateNav() {
      if (!nav) return;
      nav.classList.toggle("scrolled", window.scrollY > 16);
      const anchors = [...document.querySelectorAll(".nav-links a, .mobile-nav a:not(.mobile-cta)")];
      const activeSection = ["faq", "pricing", "workflow", "platform"].find((id) => {
        const el = byId(id);
        if (!el) return false;
        const box = el.getBoundingClientRect();
        return box.top <= window.innerHeight * 0.33 && box.bottom > 140;
      });
      anchors.forEach((a) => {
        const active = activeSection && a.getAttribute("href") === "#" + activeSection;
        a.classList.toggle("active", Boolean(active));
        if (active) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateNav();
        renderStory();
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const siteSearch = byId("siteSearch");
    const siteSearchForm = byId("siteSearchForm");
    const searchResults = byId("searchResults");
    const siteSearchEntries = [
      { id: "platform", bn: "প্ল্যাটফর্ম", en: "Platform", words: "প্ল্যাটফর্ম ড্যাশবোর্ড রেস্টুরেন্ট বিক্রি অর্ডার স্টক রিপোর্ট dashboard inventory sales platform insights" },
      { id: "story", bn: "কীভাবে কাজ করে", en: "How it works", words: "অর্ডার কিচেন রান্নাঘর workflow story orders kitchen flow process" },
      { id: "workflow", bn: "অর্ডার ও ওয়ার্কফ্লো", en: "Orders & workflow", words: "অর্ডার নেওয়া কিচেনে পাঠান দিনের হিসাব order billing kitchen workflow" },
      { id: "pricing", bn: "প্ল্যান ও মূল্য", en: "Plans & pricing", words: "প্ল্যান প্যাকেজ দাম মূল্য ফ্রি starter pro business monthly yearly price plans pricing subscription" },
      { id: "faq", bn: "প্রশ্নোত্তর", en: "Frequently asked questions", words: "প্রশ্নোত্তর সাহায্য মোবাইল কম্পিউটার FAQ questions support mobile tablet pricing" },
      { id: "home", bn: "হোম", en: "Home", words: "হোম Restroniti রেস্ট্রোনীতি homepage restaurant" },
    ];
    let searchMatches = [];

    function updateSearchLocale() {
      if (!siteSearch) return;
      siteSearch.placeholder = locale === "bn" ? "প্ল্যাটফর্ম, প্ল্যান বা প্রশ্ন খুঁজুন..." : "Search features, plans or FAQs...";
      siteSearch.setAttribute("aria-label", locale === "bn" ? "ওয়েবসাইটে খুঁজুন" : "Search this website");
      if (searchResults && !searchResults.hidden) renderSearchResults();
    }

    function closeSearch() {
      if (searchResults && siteSearch) {
        searchResults.hidden = true;
        siteSearch.setAttribute("aria-expanded", "false");
      }
    }

    function goToSearchResult(id) {
      closeSearch();
      if (siteSearch) siteSearch.value = "";
      const target = byId(id);
      if (target) target.scrollIntoView({ behavior: mq.matches ? "instant" : "smooth", block: "start" });
      if (siteSearch) siteSearch.blur();
      closeMenu();
    }

    function renderSearchResults() {
      if (!siteSearch || !searchResults) return;
      const query = siteSearch.value.trim().toLocaleLowerCase();
      searchResults.replaceChildren();
      if (!query) {
        closeSearch();
        return;
      }
      searchMatches = siteSearchEntries.filter((x) =>
        (x.bn + " " + x.en + " " + x.words).toLocaleLowerCase().includes(query)
      );
      if (!searchMatches.length) {
        const empty = document.createElement("div");
        empty.className = "search-empty";
        empty.textContent = locale === "bn" ? "কোনো মিল পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজুন।" : "No matching section. Try another keyword.";
        searchResults.append(empty);
      } else {
        searchMatches.forEach((item) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "search-result";
          btn.setAttribute("role", "option");
          btn.setAttribute("aria-selected", "false");
          const label = document.createElement("span");
          label.textContent = item[locale];
          const hint = document.createElement("small");
          hint.textContent = locale === "bn" ? "সেকশন দেখুন ↗" : "Open section ↗";
          btn.append(label, hint);
          btn.addEventListener("click", () => goToSearchResult(item.id));
          searchResults.append(btn);
        });
      }
      searchResults.hidden = false;
      siteSearch.setAttribute("aria-expanded", "true");
    }

    if (siteSearch) {
      siteSearch.addEventListener("input", renderSearchResults);
      siteSearch.addEventListener("focus", () => {
        if (siteSearch.value.trim()) renderSearchResults();
      });
    }

    if (siteSearchForm) {
      siteSearchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (searchMatches.length) goToSearchResult(searchMatches[0].id);
        else if (siteSearch && siteSearch.value.trim()) renderSearchResults();
      });
    }

    resetStory();
    i18n("bn");
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Embedded Styles for Restroniti Storefront */}
      <style jsx global>{`
        :root {
          --red: #EC2734;
          --red-dark: #C61E2B;
          --orange: #FA7327;
          --brown: #2C170E;
          --cream: #FBF8F4;
          --cream-2: #FFF8F1;
          --white: #FFFFFF;
          --muted: #74675F;
          --line: #EAE0D7;
          --green: #1B8E67;
          --ui: 'Inter', 'Noto Sans Bengali', sans-serif;
          --bn: 'Noto Sans Bengali', 'Inter', sans-serif;
          --nav-height: 76px;
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; scroll-padding-top: calc(var(--nav-height) + 18px); }
        body {
          margin: 0;
          font-family: var(--bn);
          color: var(--brown);
          background: #FFFDFC;
          overflow-x: clip;
          -webkit-font-smoothing: antialiased;
        }
        body.lang-en { font-family: var(--ui); }
        .container { max-width: 1400px; padding-inline: clamp(22px, 3.4vw, 50px); margin-inline: auto; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
        
        /* SVG & Icon Rules */
        svg { display: block; }
        .icon {
          width: 19px !important;
          height: 19px !important;
          fill: none !important;
          stroke: currentColor !important;
          stroke-width: 1.75px !important;
          stroke-linecap: round !important;
          stroke-linejoin: round !important;
          flex: 0 0 auto !important;
          display: inline-block !important;
          vertical-align: middle !important;
        }
        .brand-mark .icon, .brand-mark svg {
          width: 25px !important;
          height: 25px !important;
          stroke-width: 2px !important;
        }
        .eyebrow-mark .icon {
          width: 16px !important;
          height: 16px !important;
        }
        .capability svg, .capability .icon {
          width: 19px !important;
          height: 19px !important;
          color: var(--orange) !important;
        }
        .button .icon, .button svg {
          width: 18px !important;
          height: 18px !important;
        }
        
        /* Navigation */
        .nav-shell {
          height: var(--nav-height);
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 253, 251, 0.97);
          border-bottom: 1px solid #EAE0D8;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: box-shadow .25s;
        }
        .nav-shell.scrolled { box-shadow: 0 12px 34px rgba(44, 23, 14, 0.075); }
        .nav { height: 100%; display: flex; align-items: center; justify-content: space-between; max-width: 1550px; margin-inline: auto; gap: clamp(12px, 1.3vw, 22px); }
        .brand { display: flex; align-items: center; gap: 12px; white-space: nowrap; }
        .brand-mark { width: 43px; height: 43px; border-radius: 13px; background: #FFF0E5; color: var(--orange); border: 1px solid #F2D9C9; display: grid; place-items: center; }
        .brand-text { font: 800 22px/1 var(--ui); letter-spacing: -0.85px; }
        .brand-text b { color: var(--red); }
        
        .nav-search {
          position: relative; display: flex; align-items: center; flex: 1 1 350px;
          min-width: 180px; max-width: 470px; height: 45px;
          background: #F9F6F2; border: 1px solid #E9DFD7; border-radius: 12px;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }
        .nav-search:focus-within { background: #fff; border-color: #E8A07E; box-shadow: 0 0 0 3px rgba(250, 115, 39, 0.12); }
        .nav-search .search-icon { height: 18px; width: 18px; margin-left: 15px; color: #866F61; }
        .nav-search input { width: 100%; height: 100%; padding: 0 12px; color: #342118; border: 0; outline: 0; background: transparent; font: 500 13px var(--bn); }
        .nav-search .search-shortcut { margin-right: 12px; border: 1px solid #EADFD5; padding: 2px 6px; border-radius: 5px; background: #fff; color: #A19488; font: 600 10px var(--ui); }
        
        .nav-links { display: flex; align-items: center; gap: 1px; padding: 4px; }
        .nav-links a { padding: 9px clamp(7px, 0.7vw, 12px); min-height: 39px; font-size: 12px; font-weight: 700; border-radius: 9px; color: #63564D; transition: background .2s, color .2s; }
        .nav-links a:hover, .nav-links a.active { color: #B72330; background: #F9F2ED; }
        
        .nav-end { display: flex; align-items: center; gap: 9px; flex: 0 0 auto; }
        .language { border: 1px solid #EAE0D8; border-radius: 11px; display: flex; align-items: center; gap: 7px; font: 700 12px var(--ui); color: #473B34; padding: 9px 11px; min-height: 43px; background: #fff; cursor: pointer; }
        .language:hover { background: #FFF8F2; border-color: #E5C8B9; }
        
        .button { min-height: 48px; border-radius: 13px; padding: 13px 21px; display: inline-flex; gap: 10px; align-items: center; justify-content: center; font: 700 13px/1.3 var(--ui); border: 1px solid transparent; transition: all .2s; white-space: nowrap; cursor: pointer; }
        .button:hover { transform: translateY(-2px); }
        .button.primary { color: #fff; background: var(--red-dark); box-shadow: 0 12px 28px rgba(198, 30, 43, 0.20); }
        .button.primary:hover { background: #AA1B26; }
        .button.secondary { background: #FFFFFF; color: var(--brown); border-color: #E5D8CD; }
        .button.secondary:hover { background: #FFF8F1; border-color: #C9B4A5; }
        .button.light { background: var(--red-dark); color: #fff; border-color: var(--red-dark); }
        .button.light:hover { background: #A91C28; }
        .menu-button { display: none; border: 1px solid var(--line); background: white; border-radius: 12px; width: 44px; height: 44px; color: var(--brown); align-items: center; justify-content: center; cursor: pointer; }
        .mobile-nav { display: none; }
        
        .search-results { position: absolute; top: calc(100% + 9px); left: 0; right: 0; background: #fff; border: 1px solid #EADFD6; border-radius: 15px; box-shadow: 0 22px 45px rgba(44, 23, 14, 0.12); padding: 7px; z-index: 105; max-height: 320px; overflow: auto; }
        .search-results[hidden] { display: none !important; }
        .search-result { display: flex; justify-content: space-between; align-items: center; width: 100%; text-align: left; padding: 11px 13px; border: 0; border-radius: 9px; background: transparent; color: var(--brown); cursor: pointer; font: 700 13px var(--bn); gap: 12px; }
        .search-result:hover { background: #FFF2E8; }
        .search-result small { color: #AF795E; font: 700 10px var(--ui); }
        .search-empty { padding: 15px; color: #77685F; font-size: 13px; }

        /* Hero */
        .hero { padding: clamp(64px, 6vw, 90px) 0 clamp(67px, 6vw, 90px); background: #FFFDFC; text-align: center; }
        .eyebrow { display: inline-flex; align-items: center; gap: 10px; padding: 9px 16px 9px 10px; border: 1px solid #EBDDD2; border-radius: 100px; background: #FFFDFC; font: 800 11px/1.4 var(--ui); color: #675349; letter-spacing: .10em; text-transform: uppercase; box-shadow: 0 8px 20px rgba(44, 23, 14, 0.04); }
        .eyebrow-mark { width: 29px; height: 29px; display: grid; place-items: center; background: #FFF1E6; color: var(--orange); border-radius: 100px; }
        .hero-title { max-width: 1060px; font-size: clamp(40px, 3.55vw, 60px); font-weight: 800; line-height: 1.35; margin: 18px auto 13px; color: var(--brown); text-wrap: balance; }
        .hero-title .accent { color: var(--red); }
        .hero-description { max-width: 720px; margin: 0 auto; font-size: clamp(15px, 1.12vw, 17px); line-height: 1.68; color: #74665C; font-weight: 500; }
        .hero-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 13px; margin-top: 24px; }
        .hero-footnote { font: 600 12px var(--ui); color: #8E8076; margin-top: 13px; }
        .capabilities { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; align-items: center; margin-top: 19px; }
        .capability { display: flex; gap: 10px; align-items: center; font: 700 12px var(--ui); color: #645850; }
        .capability svg { color: var(--orange); }
        .scroll-invite { margin-top: 30px; color: #9C8C80; font: 800 10px var(--ui); letter-spacing: .13em; text-transform: uppercase; }

        /* Story Section */
        .story { position: relative; height: 275vh; background: #FBF8F4; border-top: 1px solid #F1E9E2; border-bottom: 1px solid #F1E9E2; }
        .story-sticky { position: sticky; top: var(--nav-height); height: calc(100vh - var(--nav-height)); display: grid; place-items: center; overflow: hidden; background: #FBF8F4; }
        .story-top { position: absolute; left: clamp(26px, 5vw, 80px); right: clamp(26px, 5vw, 80px); top: 6%; display: flex; justify-content: space-between; font: 800 11px var(--ui); letter-spacing: .13em; text-transform: uppercase; color: #B85A2D; }
        .story-inner { width: min(920px, calc(100% - 88px)); min-height: 330px; position: relative; display: grid; place-items: center; text-align: center; }
        .story-slide { position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); opacity: 0; visibility: hidden; pointer-events: none; }
        .story-slide.active { visibility: visible; pointer-events: auto; }
        .story-number { font: 800 12px var(--ui); color: #BA5D2D; letter-spacing: .17em; }
        .story-slide h2 { font-size: clamp(38px, 3.75vw, 60px); font-weight: 800; line-height: 1.37; margin: 12px auto 11px; max-width: 880px; color: var(--brown); }
        .story-slide h2 span { color: var(--red-dark); }
        .story-slide p { max-width: 660px; margin: auto; color: #73665D; font-size: clamp(15px, 1.06vw, 17px); line-height: 1.65; }
        .story-progress { position: absolute; bottom: 11%; display: flex; gap: 10px; justify-content: center; left: 0; right: 0; }
        .story-progress span { height: 4px; border-radius: 99px; width: 76px; background: #E8D9CD; overflow: hidden; }
        .story-progress span:before { content: ""; display: block; height: 100%; width: var(--progress, 0%); background: var(--orange); }
        .story-bottom { position: absolute; bottom: 4%; left: 0; right: 0; text-align: center; color: #88796F; font: 700 10px var(--ui); letter-spacing: .1em; }
        .story-mobile { display: none; }

        /* Intro & Sections */
        .intro { padding: clamp(66px, 6vw, 88px) 0; background: #FBF8F4; }
        .intro-grid { max-width: 880px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .intro-kicker { font: 800 12px var(--ui); color: var(--orange); letter-spacing: .12em; text-transform: uppercase; }
        .section-heading { font-size: clamp(31px, 2.8vw, 45px); font-weight: 800; line-height: 1.34; margin: 10px auto 12px; color: var(--brown); text-wrap: balance; }
        .section-copy { max-width: 660px; margin: 0 auto; font-size: clamp(14px, 1vw, 16px); line-height: 1.72; color: var(--muted); }
        .intro-right p { font-size: clamp(15px, 1.08vw, 17px); line-height: 1.66; margin-bottom: 15px; color: #57473D; }
        .intro-right a { display: inline-flex; align-items: center; gap: 9px; color: var(--red-dark); font: 800 13px var(--ui); }

        /* Product Showcase */
        .product { padding: clamp(66px, 6vw, 88px) 0; background: #FFFFFF; }
        .product-head { max-width: 880px; margin: 0 auto 27px; text-align: center; }
        .app-showcase { display: grid; grid-template-columns: 1.3fr .7fr; max-width: 1080px; margin-inline: auto; border-radius: 27px; overflow: hidden; border: 1px solid #EDE3DB; box-shadow: 0 30px 70px rgba(44, 23, 14, 0.07); background: #FEFCFA; }
        .app-ui { padding: 28px; background: #FCFAF8; border-right: 1px solid #EEE4DB; }
        .app-topline { display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; }
        .app-topline span { font: 800 14px var(--ui); }
        .app-topline small { font: 600 10px var(--ui); color: #99897C; }
        .app-icons { display: flex; gap: 5px; }
        .app-icons i { width: 9px; height: 9px; border-radius: 50%; display: block; }
        .app-icons i:nth-child(1) { background: #F77F78; }
        .app-icons i:nth-child(2) { background: #F4C068; }
        .app-icons i:nth-child(3) { background: #86CEAC; }
        .app-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 17px; }
        .app-metric { padding: 18px; border-radius: 15px; background: white; border: 1px solid #F1E9E3; }
        .app-metric small { display: block; color: #8D7E73; font: 600 10px var(--ui); margin-bottom: 12px; }
        .app-metric strong { font: 800 24px var(--ui); }
        .app-chart { background: white; border-radius: 17px; border: 1px solid #F1E9E3; padding: 22px; }
        .app-chart-head { display: flex; justify-content: space-between; }
        .app-chart-head b { font: 800 13px var(--ui); }
        .app-chart-head span { font: 600 10px var(--ui); color: #98887B; }
        .app-chart svg { width: 100%; height: 185px; margin-top: 24px; }
        .app-chart-foot { display: flex; justify-content: space-between; color: #AA9C91; font: 600 9px var(--ui); }
        .app-caption { display: flex; gap: 10px; align-items: center; margin-top: 16px; color: #96877A; font: 600 10px var(--ui); }
        .app-caption .dot { width: 7px; height: 7px; background: #F59C61; border-radius: 50%; }
        .showcase-side { padding: 38px 34px; display: flex; flex-direction: column; justify-content: center; background: linear-gradient(125deg, #FFF9F2, #FEFBF8); }
        .showcase-side h3 { font-size: clamp(26px, 2.3vw, 34px); font-weight: 800; line-height: 1.38; margin: 0 0 16px; color: var(--brown); }
        .showcase-side p { color: #817064; font-size: 15px; line-height: 1.65; margin: 0; }
        .showcase-steps { display: flex; gap: 10px; margin-top: 32px; }
        .showcase-steps .tiny { padding: 11px 12px; background: #fff; border: 1px solid #EEE3DA; border-radius: 11px; color: #7C6F66; font: 700 11px var(--ui); }
        .showcase-steps .tiny.active { background: #FFF0E5; color: #C95D2B; border-color: #F2D7C2; }

        /* Workflow */
        .workflow { padding: clamp(66px, 6vw, 88px) 0; background: #FBF8F4; }
        .workflow-rows { max-width: 940px; margin: 25px auto 0; border-top: 1px solid #E6D9CC; }
        .workflow-row { display: grid; grid-template-columns: 52px minmax(190px, 260px) minmax(0, 1fr); column-gap: 23px; align-items: center; min-height: 112px; padding: 20px 0; border-bottom: 1px solid #E6D9CC; }
        .workflow-num { font: 800 17px var(--ui); color: var(--orange); }
        .workflow-row h3 { font-size: clamp(22px, 1.8vw, 27px); font-weight: 800; line-height: 1.35; margin: 0; color: var(--brown); }
        .workflow-row p { font-size: clamp(14px, 1vw, 16px); line-height: 1.62; color: #76675D; margin: 0; max-width: 475px; }

        /* Pricing */
        .pricing { padding: clamp(66px, 6vw, 88px) 0; background: #FFFFFF; }
        .pricing-heading { max-width: 880px; margin: 0 auto 27px; text-align: center; }
        .billing { display: inline-flex; gap: 4px; background: #F8F2ED; border: 1px solid #EDE1D8; border-radius: 13px; padding: 5px; margin-top: 12px; }
        .billing button { border: 0; background: transparent; color: #7D7066; padding: 10px 16px; border-radius: 9px; font: 700 12px var(--ui); cursor: pointer; }
        .billing button.active { background: white; color: var(--brown); box-shadow: 0 4px 14px rgba(44, 23, 14, 0.07); }
        .billing button .save { color: var(--green); font-size: 10px; margin-left: 4px; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1080px; margin: 30px auto 0; }
        .plan { border-radius: 24px; border: 1px solid #EDE2D9; background: white; padding: 27px; position: relative; }
        .plan.featured { border: 1.5px solid var(--orange); box-shadow: 0 20px 50px rgba(250, 115, 39, 0.11); background: linear-gradient(180deg, #FFFAF6, #fff 32%); }
        .plan-top { display: flex; align-items: center; justify-content: space-between; }
        .plan-name { font: 800 20px var(--ui); }
        .featured-tag { font: 800 10px var(--ui); color: #C64B24; background: #FFF0E3; border-radius: 99px; padding: 7px 10px; }
        .plan-desc { color: #887A6F; font-size: 14px; line-height: 1.75; min-height: 54px; margin: 13px 0 19px; }
        .plan-price { font: 800 42px/1.1 var(--ui); letter-spacing: -0.055em; }
        .plan-price small { font-size: 13px; font-weight: 600; color: #97887C; }
        .plan-billing { margin: 10px 0 24px; min-height: 20px; color: #98887D; font: 600 11px var(--ui); }
        .plan hr { border: 0; border-top: 1px solid #EDE2D8; margin: 24px 0; }
        .plan ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; }
        .plan li { display: flex; gap: 10px; align-items: flex-start; color: #65584E; font-size: 14px; line-height: 1.65; }
        .plan li svg { width: 17px; height: 17px; color: var(--green); margin-top: 2px; }
        .plan .button { width: 100%; margin-top: 25px; }
        .business-bar { display: flex; align-items: center; justify-content: space-between; max-width: 1080px; margin: 18px auto 0; padding: 27px 32px; border-radius: 22px; border: 1px solid #EBDCCF; background: #FFF8F1; }
        .business-bar h3 { margin: 0 0 6px; font: 800 19px var(--ui); }
        .business-bar p { color: #806E61; font-size: 14px; line-height: 1.7; margin: 0; }
        .price-note { max-width: 1080px; margin: 18px auto 0; font-size: 12px; color: #897C72; text-align: center; }

        /* FAQ */
        .faq { padding: clamp(66px, 6vw, 88px) 0; background: #FBF8F4; }
        .faq-layout { max-width: 780px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; gap: 21px; }
        .faq-list { text-align: left; border-top: 1px solid #E4D7CA; width: 100%; }
        .faq-list details { border-bottom: 1px solid #E4D7CA; padding: 14px 0; }
        .faq-list summary { font-size: 16px; font-weight: 700; list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 20px; line-height: 1.58; }
        .faq-list summary::-webkit-details-marker { display: none; }
        .faq-list summary:after { content: '+'; font: 400 27px var(--ui); color: var(--orange); }
        .faq-list details[open] summary:after { content: '−'; }
        .faq-list p { margin: 8px 32px 0 0; font-size: 14px; color: #806F65; line-height: 1.67; }

        /* Closing CTA */
        .closing { padding: 27px 0 48px; background: #FFFDFC; }
        .closing-panel { background: #FFF8F1; color: var(--brown); border: 1px solid #E8D8CA; border-radius: 28px; text-align: center; padding: 53px 34px; box-shadow: 0 12px 38px rgba(44, 23, 14, 0.035); }
        .closing-panel h2 { font-size: clamp(32px, 3.25vw, 48px); font-weight: 800; line-height: 1.34; margin: 0 auto 12px; color: var(--brown); }
        .closing-panel p { color: #71645B; font-size: 16px; line-height: 1.68; margin: 0 auto 20px; max-width: 680px; }

        /* Footer */
        .footer { padding: 47px 0 30px; background: #FFFDFC; }
        .footer-row { display: flex; align-items: center; justify-content: space-between; gap: 26px; border-bottom: 1px solid #E8DBD0; padding-bottom: 28px; }
        .footer-row p { font-size: 13px; color: #87776D; margin: 0; }
        .footer-bottom { display: flex; justify-content: space-between; padding-top: 23px; color: #96887B; font: 500 11px var(--ui); }

        [data-appear] { opacity: 0; transform: translateY(22px); transition: transform .85s cubic-bezier(.2, .7, .2, 1), opacity .8s; }
        [data-appear].visible { opacity: 1; transform: none; }

        /* Media Queries */
        @media (max-width: 1020px) {
          :root { --nav-height: 74px; }
          .nav-links { display: none !important; }
          .menu-button { display: flex; }
          .nav-search { max-width: none; flex: 1 1 300px; }
          .nav-end > .button.primary { display: none; }
          .mobile-nav.open {
            display: grid; gap: 3px; position: absolute; top: 100%; left: 0; right: 0;
            padding: 14px clamp(24px, 5vw, 44px) 22px; background: #FFFDFB;
            border-top: 1px solid #EAE0D8; box-shadow: 0 21px 40px rgba(44, 23, 14, 0.1);
          }
          .mobile-nav .mobile-cta { display: inline-flex; margin-top: 8px; }
          .story { height: auto; min-height: 0; }
          .story-sticky { display: none; }
          .story-mobile.container { display: block; max-width: 730px; padding: 64px clamp(22px, 5vw, 42px) 70px !important; }
          .mobile-story-item { padding: 26px 0 33px; border-bottom: 1px solid #E6D9CD; }
          .mobile-story-item:last-child { border-bottom: 0; }
          .mobile-story-item b { font: 800 11px var(--ui); color: #B85A2D; }
          .mobile-story-item h3 { font-size: clamp(28px, 6.7vw, 40px); font-weight: 800; line-height: 1.6; margin: 12px 0 7px; color: var(--brown); }
          .mobile-story-item h3 span { color: var(--red-dark); }
          .mobile-story-item p { color: #73665D; font-size: 15px; line-height: 1.85; margin: 0; }
          .pricing-grid { grid-template-columns: repeat(2, 1fr); }
          .pricing-grid .plan:nth-child(3) { grid-column: 1 / -1; }
          .app-showcase { grid-template-columns: 1fr; }
          .app-ui { border-right: 0; border-bottom: 1px solid #EEE4DB; }
        }
        @media (max-width: 680px) {
          :root { --nav-height: 128px; }
          .nav { display: flex; flex-wrap: wrap; gap: 9px; padding-block: 11px 10px; }
          .brand { order: 0; }
          .nav-end { order: 1; margin-left: auto; }
          .nav-search { order: 2; flex: 0 0 100%; width: 100%; height: 42px; }
          .pricing-grid { grid-template-columns: 1fr; }
          .pricing-grid .plan:nth-child(3) { grid-column: auto; }
          .business-bar { flex-direction: column; align-items: flex-start; gap: 15px; }
        }
      `}</style>

      {/* SVG Symbol definitions */}
      <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", display: "none" }} aria-hidden="true">
        <defs>
          <symbol id="i-flame" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2c.9 4.4-2.8 5.6-2.1 9 1.9-.3 3.6-2.1 4-4.4C18.1 9.8 20 12.9 20 16.4A8 8 0 0 1 4 16.4c0-4.1 2.8-7.7 5.5-9.8-.1 2.4 1.2 3.9 1.6 4.1" />
            <path d="M12 22c-2.3 0-3.8-1.6-3.8-3.6 0-1.8 1.1-3.1 3.5-4.7.1 1.6 1.2 2.2 2.3 2.9.8.5 1.4 1.1 1.4 1.9 0 2-1.5 3.5-3.4 3.5Z" />
          </symbol>
          <symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></symbol>
          <symbol id="i-arrow-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></symbol>
          <symbol id="i-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c-6 6-6 12 0 18m0-18c6 6 6 12 0 18" /></symbol>
          <symbol id="i-order" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></symbol>
          <symbol id="i-kitchen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 19h18M5 19v-4a7 7 0 0 1 14 0v4M12 8V5" /></symbol>
          <symbol id="i-chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16M7 16V9m5 7V5m5 11v-4" /></symbol>
          <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 5 5L20 6" /></symbol>
          <symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="10.8" cy="10.8" r="6.4" /><path d="m16 16 4.5 4.5" /></symbol>
          <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h16" /></symbol>
          <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5l14 14M19 5 5 19" /></symbol>
          <symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></symbol>
        </defs>
      </svg>

      {/* Main Header with Logo, Search, Menu, and LOGIN Button */}
      <header className="nav-shell" id="navigation">
        <div className="nav container">
          <a className="brand" href="#home" aria-label="Restroniti home">
            <span className="brand-mark">
              <svg className="icon"><use href="#i-flame" /></svg>
            </span>
            <span className="brand-text">restroniti<b>.</b></span>
          </a>

          <form className="nav-search" id="siteSearchForm" role="search" autoComplete="off">
            <label className="sr-only" htmlFor="siteSearch">Search website sections</label>
            <svg className="icon search-icon" aria-hidden="true"><use href="#i-search" /></svg>
            <input
              id="siteSearch"
              type="search"
              placeholder="প্ল্যাটফর্ম, প্ল্যান বা প্রশ্ন খুঁজুন..."
              aria-label="ওয়েবসাইটে খুঁজুন"
              aria-controls="searchResults"
              aria-expanded="false"
              autoComplete="off"
            />
            <span className="search-shortcut" aria-hidden="true">Ctrl K</span>
            <div className="search-results" id="searchResults" role="listbox" aria-label="Search suggestions" hidden></div>
          </form>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#platform" data-t="navPlatform">Platform</a>
            <a href="#workflow" data-t="navWorkflow">How it works</a>
            <a href="#pricing" data-t="navPricing">Pricing</a>
            <a href="#faq" data-t="navFAQ">FAQ</a>
          </nav>

          <div className="nav-end">
            <button type="button" className="language" id="languageToggle" aria-label="Switch language">
              <svg className="icon"><use href="#i-globe" /></svg>
              <span id="languageLabel">EN</span>
            </button>

            {/* DIRECT LOGIN BUTTON */}
            <Link
              href="/login"
              className="button secondary"
              style={{
                minHeight: "43px",
                padding: "9px 16px",
                borderRadius: "11px",
                fontSize: "12px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "#FFFFFF",
                borderColor: "#E5D8CD",
              }}
            >
              <svg className="icon" style={{ width: "16px", height: "16px" }}><use href="#i-user" /></svg>
              <span data-t="navLogin">লগইন</span>
            </Link>

            <Link href="/login" className="button primary" data-t="navCTA">
              <span>প্রোডাক্ট দেখুন</span>
              <svg className="icon"><use href="#i-arrow-up" /></svg>
            </Link>

            <button
              type="button"
              className="menu-button"
              id="menuButton"
              aria-expanded="false"
              aria-label="Open menu"
              aria-controls="mobileNavigation"
            >
              <svg className="icon"><use id="menuIcon" href="#i-menu" /></svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <nav className="mobile-nav container" id="mobileNavigation" aria-label="Mobile navigation">
          <a href="#platform" data-t="navPlatform">Platform</a>
          <a href="#workflow" data-t="navWorkflow">How it works</a>
          <a href="#pricing" data-t="navPricing">Pricing</a>
          <a href="#faq" data-t="navFAQ">FAQ</a>
          
          <Link
            href="/login"
            className="button secondary mobile-cta"
            style={{
              display: "inline-flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "8px",
              borderRadius: "11px",
            }}
          >
            <svg className="icon" style={{ width: "16px", height: "16px" }}><use href="#i-user" /></svg>
            <span>লগইন করুন</span>
          </Link>

          <Link href="/login" className="button primary mobile-cta">
            <span data-t="navCTA">Explore Restroniti</span>
            <svg className="icon"><use href="#i-arrow-up" /></svg>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="container">
            <div className="eyebrow" data-appear>
              <span className="eyebrow-mark"><svg className="icon"><use href="#i-flame" /></svg></span>
              <span data-t="heroEyebrow">বাংলাদেশের রেস্টুরেন্টের জন্য একটি নতুন অভিজ্ঞতা</span>
            </div>

            <h1 className="hero-title" data-appear data-html="heroTitle">
              <span className="title-line">রেস্টুরেন্টের প্রতিটি কাজ,</span>
              <span className="title-line"><span className="accent">এক জায়গায়, সহজ নিয়ন্ত্রণে।</span></span>
            </h1>

            <p className="hero-description" data-appear data-t="heroDescription">
              অর্ডার নেওয়া, টেবিল ও কিচেন সামলানো, স্টক দেখা এবং দিনের বিক্রির হিসাব—সবকিছুর জন্য একটি সহজ রেস্টুরেন্ট ম্যানেজমেন্ট প্ল্যাটফর্ম।
            </p>

            <div className="hero-actions" data-appear>
              {/* PRIMARY LOGIN / DASHBOARD CTA */}
              <Link href="/login" className="button primary">
                <span data-t="heroCTA1">লগইন / ড্যাশবোর্ড</span>
                <svg className="icon"><use href="#i-arrow" /></svg>
              </Link>
              <a href="#pricing" className="button secondary">
                <span data-t="heroCTA2">প্যাকেজগুলো দেখুন</span>
                <svg className="icon" style={{ color: "var(--orange)" }}><use href="#i-arrow-up" /></svg>
              </a>
            </div>

            <p className="hero-footnote" data-t="heroNote">
              Restaurant management, made clearer. · প্রোডাক্ট ডিজাইন প্রিভিউ
            </p>

            <div className="capabilities" data-appear>
              <div className="capability"><svg className="icon"><use href="#i-order" /></svg><span data-t="cap1">অর্ডার ও বিলিং</span></div>
              <div className="capability"><svg className="icon"><use href="#i-kitchen" /></svg><span data-t="cap2">কিচেন ও স্টক</span></div>
              <div className="capability"><svg className="icon"><use href="#i-chart" /></svg><span data-t="cap3">বিক্রির রিপোর্ট</span></div>
            </div>

            <div className="scroll-invite" data-t="scrollHint">SCROLL TO EXPLORE</div>
          </div>
        </section>

        {/* Scroll-driven Story Section */}
        <section className="story" id="story" aria-label="Scroll-driven product story">
          <div className="story-sticky">
            <div className="story-top">
              <span>RESTRONITI / THE FLOW</span>
              <span data-t="storyTop">আপনার প্রতিদিনের কাজের তিনটি ধাপ</span>
            </div>

            <div className="story-inner">
              <div className="story-slide active" data-slide="0">
                <div className="story-number">01 / ORDERS</div>
                <h2 data-html="story1Title">প্রতিটি অর্ডার,<br /><span>আরও সহজে।</span></h2>
                <p data-t="story1Text">টেবিল ও টেকঅ্যাওয়ে অর্ডার নিন একটি পরিষ্কার, দ্রুত ব্যবহারযোগ্য স্ক্রিনে।</p>
              </div>

              <div className="story-slide" data-slide="1">
                <div className="story-number">02 / KITCHEN</div>
                <h2 data-html="story2Title">অর্ডার থেকে কিচেন,<br /><span>একই ছন্দে।</span></h2>
                <p data-t="story2Text">কোন অর্ডার তৈরি হচ্ছে, কোনটি প্রস্তুত—টিমের সবার কাছে স্পষ্ট রাখুন।</p>
              </div>

              <div className="story-slide" data-slide="2">
                <div className="story-number">03 / INSIGHTS</div>
                <h2 data-html="story3Title">দিনশেষের হিসাব,<br /><span>আপনার হাতেই।</span></h2>
                <p data-t="story3Text">বিক্রি, জনপ্রিয় আইটেম এবং গুরুত্বপূর্ণ তথ্য দেখুন, যাতে সিদ্ধান্ত নেওয়া সহজ হয়।</p>
              </div>
            </div>

            <div className="story-progress" aria-hidden="true">
              <span className="active"></span>
              <span></span>
              <span></span>
            </div>

            <div className="story-bottom">SCROLL TO REVEAL</div>
          </div>

          <div className="story-mobile container">
            <div className="section-eyebrow" data-t="storyMobileLabel">একটি আরও সহজ রেস্টুরেন্ট ওয়ার্কফ্লো</div>
            <article className="mobile-story-item">
              <b>01 / ORDERS</b>
              <h3 data-html="story1Title">প্রতিটি অর্ডার,<br /><span>আরও সহজে।</span></h3>
              <p data-t="story1Text">টেবিল ও টেকঅ্যাওয়ে অর্ডার নিন একটি পরিষ্কার, দ্রুত ব্যবহারযোগ্য স্ক্রিনে।</p>
            </article>
            <article className="mobile-story-item">
              <b>02 / KITCHEN</b>
              <h3 data-html="story2Title">অর্ডার থেকে কিচেন,<br /><span>একই ছন্দে।</span></h3>
              <p data-t="story2Text">কোন অর্ডার তৈরি হচ্ছে, কোনটি প্রস্তুত—টিমের সবার কাছে স্পষ্ট রাখুন।</p>
            </article>
            <article className="mobile-story-item">
              <b>03 / INSIGHTS</b>
              <h3 data-html="story3Title">দিনশেষের হিসাব,<br /><span>আপনার হাতেই।</span></h3>
              <p data-t="story3Text">বিক্রি, জনপ্রিয় আইটেম এবং গুরুত্বপূর্ণ তথ্য দেখুন, যাতে সিদ্ধান্ত নেওয়া সহজ হয়।</p>
            </article>
          </div>
        </section>

        {/* Intro */}
        <section className="intro">
          <div className="container intro-grid">
            <div data-appear>
              <span className="intro-kicker" data-t="introKicker">BUILT FOR REAL SERVICE</span>
              <h2 className="section-heading" data-t="introTitle">ব্যস্ত রেস্টুরেন্টের জন্য, শান্ত ও পরিষ্কার একটি সিস্টেম।</h2>
            </div>
            <div className="intro-right" data-appear>
              <p data-t="introText">
                রেস্টুরেন্ট চালাতে প্রতিদিন অনেক কিছু একসঙ্গে সামলাতে হয়। Restroniti-র লক্ষ্য হলো অর্ডার নেওয়া থেকে কিচেন, টেবিল, স্টক ও রিপোর্টের কাজগুলোকে একটি সহজ ওয়ার্কফ্লোতে আনা।
              </p>
              <a href="#platform">
                <span data-t="introLink">প্রোডাক্টটি দেখুন</span>
                <svg className="icon"><use href="#i-arrow" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* Platform UI Showcase */}
        <section className="product" id="platform">
          <div className="container">
            <div className="product-head">
              <div data-appear>
                <span className="section-eyebrow" data-t="productKicker">THE PLATFORM</span>
                <h2 className="section-heading" data-t="productTitle">যা দরকার, সেটাই সামনে।</h2>
              </div>
              <p className="section-copy" data-appear data-t="productSub">
                অপ্রয়োজনীয় জটিলতা নয়—ব্যবহারযোগ্য, গোছানো স্ক্রিনে গুরুত্বপূর্ণ তথ্য।
              </p>
            </div>

            <div className="app-showcase" data-appear>
              <div className="app-ui">
                <div className="app-topline">
                  <div>
                    <span>Restaurant overview</span><br />
                    <small>UI concept · Sample data</small>
                  </div>
                  <div className="app-icons"><i></i><i></i><i></i></div>
                </div>

                <div className="app-metrics">
                  <div className="app-metric"><small>Total sales</small><strong>৳24.8K</strong></div>
                  <div className="app-metric"><small>Orders</small><strong>148</strong></div>
                  <div className="app-metric"><small>Ready</small><strong>26</strong></div>
                </div>

                <div className="app-chart">
                  <div className="app-chart-head"><b>Daily sales</b><span>Today · Demo</span></div>
                  <svg viewBox="0 0 560 190" preserveAspectRatio="none" aria-label="Decorative example chart">
                    <defs>
                      <linearGradient id="orangeFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#FA7327" stopOpacity=".25" />
                        <stop offset="1" stopColor="#FA7327" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g stroke="#F0E7DE" strokeDasharray="4 5">
                      <path d="M0 32H560M0 75H560M0 119H560M0 162H560" />
                    </g>
                    <path d="M0 157 C35 150 52 110 82 118 S137 75 162 83 S203 30 244 42 S296 98 328 77 S383 120 420 84 S484 50 516 63 S547 73 560 45 L560 190 L0 190Z" fill="url(#orangeFill)" />
                    <path d="M0 157 C35 150 52 110 82 118 S137 75 162 83 S203 30 244 42 S296 98 328 77 S383 120 420 84 S484 50 516 63 S547 73 560 45" fill="none" stroke="#FA7327" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <div className="app-chart-foot">
                    <span>10 AM</span><span>12 PM</span><span>2 PM</span><span>4 PM</span><span>6 PM</span><span>8 PM</span>
                  </div>
                </div>

                <div className="app-caption">
                  <span className="dot"></span>
                  <span>Concept UI, not live restaurant data</span>
                </div>
              </div>

              <div className="showcase-side">
                <span className="section-eyebrow" data-t="showKicker">OWNER VIEW</span>
                <h3 data-t="showTitle">দিনের গুরুত্বপূর্ণ সংখ্যাগুলো, এক নজরে।</h3>
                <p data-t="showText">
                  সারাদিনের বিক্রি, অর্ডারের সংখ্যা ও কাজের অবস্থা—মালিক এবং ম্যানেজারের জন্য সহজে বোঝার মতো করে সাজানো।
                </p>
                <div className="showcase-steps">
                  <span className="tiny active">Sales</span>
                  <span className="tiny">Orders</span>
                  <span className="tiny">Kitchen</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="workflow" id="workflow">
          <div className="container">
            <div data-appear>
              <span className="section-eyebrow" data-t="workflowKicker">BUILT AROUND YOUR DAY</span>
              <h2 className="section-heading" data-t="workflowTitle">কাজের প্রতিটি ধাপ, একই প্রবাহে।</h2>
            </div>

            <div className="workflow-rows">
              <div className="workflow-row" data-appear>
                <span className="workflow-num">01</span>
                <h3 data-t="work1Title">অর্ডার নিন</h3>
                <p data-t="work1Text">টেবিল বা কাউন্টারে দ্রুত অর্ডার তৈরি, আইটেম সিলেক্ট এবং বিলিংয়ের ব্যবস্থা।</p>
              </div>

              <div className="workflow-row" data-appear>
                <span className="workflow-num">02</span>
                <h3 data-t="work2Title">কিচেনে পাঠান</h3>
                <p data-t="work2Text">কিচেন টিকিট ও অর্ডারের অবস্থা আপডেট করার একটি গোছানো প্রক্রিয়া।</p>
              </div>

              <div className="workflow-row" data-appear>
                <span className="workflow-num">03</span>
                <h3 data-t="work3Title">দিনের হিসাব দেখুন</h3>
                <p data-t="work3Text">বিক্রির সারাংশ, পেমেন্ট এবং স্টকের গুরুত্বপূর্ণ তথ্য এক জায়গায়।</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="pricing" id="pricing">
          <div className="container">
            <div className="pricing-heading">
              <div data-appear>
                <span className="section-eyebrow" data-t="priceKicker">SIMPLE PLANS</span>
                <h2 className="section-heading" data-t="priceTitle">আপনার প্রয়োজন অনুযায়ী প্ল্যান।</h2>
                <p className="section-copy" data-t="priceSub">প্রোডাক্ট ডকুমেন্টের প্রস্তাবিত মূল্য; বাজার যাচাইয়ের পর পরিবর্তিত হতে পারে।</p>
              </div>

              <div className="billing" role="group" aria-label="Billing period">
                <button type="button" id="monthly" className="active" aria-pressed="true">
                  <span data-t="billMonthly">Monthly</span>
                </button>
                <button type="button" id="yearly" aria-pressed="false">
                  <span data-t="billYearly">Yearly</span>
                  <span className="save" data-t="billSave">−20%</span>
                </button>
              </div>
            </div>

            <div className="pricing-grid">
              <article className="plan" data-appear>
                <div className="plan-top"><span className="plan-name">Free</span></div>
                <p className="plan-desc" data-t="freeDesc">ছোট পরিসরে শুরু করার জন্য।</p>
                <div className="plan-price" data-price="0">৳0<small data-t="perMonth"> /mo</small></div>
                <div className="plan-billing" data-billed="free" data-t="freeBilling">No subscription fee</div>
                <hr />
                <ul>
                  <li><svg className="icon"><use href="#i-check" /></svg><span data-t="free1">১টি ব্রাঞ্চ, ২ জন ইউজার</span></li>
                  <li><svg className="icon"><use href="#i-check" /></svg><span data-t="free2">১০টি টেবিল, ৩০টি মেনু আইটেম</span></li>
                  <li><svg className="icon"><use href="#i-check" /></svg><span data-t="free3">মাসে ১৫০টি অর্ডার</span></li>
                </ul>
                <Link className="button secondary" href="/login" data-t="planExplore">শুরু করুন (লগইন)</Link>
              </article>

              <article className="plan" data-appear>
                <div className="plan-top"><span className="plan-name">Starter</span></div>
                <p className="plan-desc" data-t="starterDesc">ছোট ও মাঝারি রেস্টুরেন্টের দৈনন্দিন কাজ।</p>
                <div className="plan-price" data-price="599">৳599<small> /mo</small></div>
                <div className="plan-billing" data-billed="starter" data-t="priceMonthlyNote">Monthly billing</div>
                <hr />
                <ul>
                  <li><svg className="icon"><use href="#i-check" /></svg><span data-t="starter1">৫ জন ইউজার, ২৫টি টেবিল</span></li>
                  <li><svg className="icon"><use href="#i-check" /></svg><span data-t="starter2">মাসে ২,০০০টি অর্ডার</span></li>
                  <li><svg className="icon"><use href="#i-check" /></svg><span data-t="starter3">বেসিক রিপোর্ট ও ইনভেন্টরি</span></li>
                </ul>
                <Link className="button secondary" href="/login" data-t="planExplore">শুরু করুন (লগইন)</Link>
              </article>

              <article className="plan featured" data-appear>
                <div className="plan-top">
                  <span className="plan-name">Pro</span>
                  <span className="featured-tag" data-t="planPopular">MOST COMPLETE</span>
                </div>
                <p className="plan-desc" data-t="proDesc">বর্ধিত অর্ডার ও কিচেন ম্যানেজমেন্টের জন্য।</p>
                <div className="plan-price" data-price="1499">৳1,499<small> /mo</small></div>
                <div className="plan-billing" data-billed="pro" data-t="priceMonthlyNote">Monthly billing</div>
                <hr />
                <ul>
                  <li><svg className="icon"><use href="#i-check" /></svg><span data-t="pro1">১৫ জন ইউজার, ১০০টি টেবিল</span></li>
                  <li><svg className="icon"><use href="#i-check" /></svg><span data-t="pro2">মাসে ১৫,০০০টি অর্ডার</span></li>
                  <li><svg className="icon"><use href="#i-check" /></svg><span data-t="pro3">কিচেন ডিসপ্লে ও উন্নত রিপোর্ট</span></li>
                </ul>
                <Link className="button primary" href="/login" data-t="planExplore">
                  <span>শুরু করুন (লগইন)</span>
                  <svg className="icon"><use href="#i-arrow" /></svg>
                </Link>
              </article>
            </div>

            <div className="business-bar" data-appear>
              <div>
                <h3 data-t="businessTitle">Business · ৳3,499 / মাস</h3>
                <p data-t="businessDesc">মাল্টি-ব্রাঞ্চ ও বড় রেস্টুরেন্ট টিমের জন্য প্রস্তাবিত প্ল্যান।</p>
              </div>
              <Link href="/login" className="button secondary" data-t="businessCTA">
                <span>লগইন করে বিস্তারিত জানুন</span>
                <svg className="icon"><use href="#i-arrow-up" /></svg>
              </Link>
            </div>

            <p className="price-note" data-t="priceDisclaimer">
              সব মূল্য, ফিচার ও সীমা প্রস্তাবিত; এটি কোনো চালু Subscription Checkout নয়।
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq" id="faq">
          <div className="container faq-layout">
            <div data-appear>
              <span className="section-eyebrow">QUESTIONS, ANSWERED</span>
              <h2 className="section-heading" data-t="faqHeading">শুরুর আগে যা জানতে চান।</h2>
              <p className="section-copy" data-t="faqSub">এই প্রিভিউতে বাস্তব Account, Payment বা Booking সক্রিয় নেই।</p>
            </div>

            <div className="faq-list" data-appear>
              <details>
                <summary data-t="q1">Restroniti কী ধরনের সফটওয়্যার?</summary>
                <p data-t="a1">এটি রেস্টুরেন্টের অর্ডার, টেবিল, কিচেন, স্টক ও সেলস রিপোর্ট পরিচালনার উদ্দেশ্যে পরিকল্পিত একটি SaaS প্ল্যাটফর্ম।</p>
              </details>
              <details>
                <summary data-t="q2">এটি কি ছোট রেস্টুরেন্টেও ব্যবহার করা যাবে?</summary>
                <p data-t="a2">প্রস্তাবিত প্ল্যান অনুযায়ী ছোট রেস্টুরেন্টের জন্যও ব্যবস্থা আছে। বাস্তব পাইলটে বিভিন্ন রেস্টুরেন্টের চাহিদা যাচাই করা হবে।</p>
              </details>
              <details>
                <summary data-t="q3">মোবাইল ও কম্পিউটারে চলবে?</summary>
                <p data-t="a3">ডিজাইনটি মোবাইল, ট্যাবলেট ও ডেস্কটপকে লক্ষ্য করে তৈরি। প্রোডাকশন ফিচারগুলো বাস্তবে পরীক্ষা করে নিশ্চিত করতে হবে।</p>
              </details>
              <details>
                <summary data-t="q4">মূল্য কি চূড়ান্ত?</summary>
                <p data-t="a4">না। এখানে দেখানো প্ল্যান ও মূল্য প্রজেক্ট ডকুমেন্টের প্রস্তাব; বাস্তব বাজার যাচাইয়ের পর পরিবর্তিত হতে পারে।</p>
              </details>
            </div>
          </div>
        </section>

        {/* Closing Panel with Direct Login Link */}
        <section className="closing" id="closing">
          <div className="container">
            <div className="closing-panel" data-appear>
              <h2 data-t="closingTitle">রেস্টুরেন্ট পরিচালনা হোক একটু সহজ।</h2>
              <p data-t="closingText">প্রতিটি অর্ডার থেকে দিনশেষের রিপোর্ট—একটি পরিষ্কার ও ব্যবহারযোগ্য অভিজ্ঞতার দিকে।</p>
              <Link href="/login" className="button light">
                <span data-t="closingCTA">লগইন করে শুরু করুন</span>
                <svg className="icon" style={{ color: "var(--orange)" }}><use href="#i-arrow-up" /></svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-row">
            <a className="brand" href="#home">
              <span className="brand-mark"><svg className="icon"><use href="#i-flame" /></svg></span>
              <span className="brand-text">restroniti<b>.</b></span>
            </a>
            <p data-t="footerDesc">Restaurant operations, thoughtfully simplified.</p>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Restroniti · UI concept</span>
            <span data-t="footerNote">ডেমো ডেটা · লাইভ অ্যাকাউন্ট বা পেমেন্ট যুক্ত নয়</span>
          </div>
        </div>
      </footer>
    </>
  );
}
