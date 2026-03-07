import fs from "fs";
import path from "path";

let matter = null;
try {
  // Optional dependency: allow app to run even if install fails.
  // eslint-disable-next-line global-require
  matter = require("gray-matter");
} catch (_) {
  matter = null;
}

const DEFAULT_NAVIGATION = {
  brandName: "Vector Veda",
  brandHref: "/",
  ctaLabel: "Get in touch",
  ctaHref: "#contact",
  items: [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "How It Works", href: "#process" },
    { label: "Expertise", href: "#metrix" },
    { label: "FAQ", href: "#faqs" },
    { label: "Reviews", href: "#reviews" },
    { label: "Get in touch", href: "#contact" }
  ]
};

const DEFAULT_FOOTER = {
  brandName: "Vector Veda",
  brandTagline: "Beautiful products built by one technical founder.",
  copyrightText: "(c) 2026, Vector Veda.",
  navLinks: [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Contact", href: "#contact" }
  ],
  resourceLinks: [
    { label: "Privacy Policy", href: "./privacy-policy" },
    { label: "Terms Of Service", href: "./legals/terms-of-service" }
  ],
  socialLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: "Globe" },
    { label: "Email", href: "mailto:hello@vectorveda.com", icon: "Envelope" },
    { label: "Phone", href: "tel:+919999999999", icon: "Phone" }
  ]
};

const DEFAULT_HOMEPAGE = {
  hero: {
    statusText: "Available for Work",
    titleLine1: "Beautiful Products.",
    titleLine2: "Engineered Intelligence.",
    subtitle: "We design exceptional user experiences and build custom AI systems that solve real problems.",
    primaryCtaLabel: "View Our Work",
    primaryCtaHref: "#case-studies",
    secondaryCtaLabel: "Get in touch",
    secondaryCtaHref: "#contact",
    featuredImpacts: []
  },
  services: {
    label: "Services",
    title: "What We Build",
    description: "",
    cards: []
  },
  caseStudies: {
    label: "Work",
    title: "Case Studies",
    description: "",
    items: []
  },
  process: {
    label: "Process",
    title: "Our Approach",
    description: "",
    ctaLabel: "View Our Work",
    ctaHref: "#case-studies",
    steps: []
  },
  metrics: {
    label: "Expertise",
    title: "Why Companies Choose Vector Veda",
    description: "",
    items: []
  },
  reviews: {
    label: "Reviews",
    title: "What Users & Teams Say",
    description: "",
    items: []
  },
  faq: {
    label: "Questions",
    title: "Frequently Asked Questions",
    description: "",
    items: []
  },
  contact: {
    label: "Contact",
    title: "Ready to Build?",
    description: "",
    submitLabel: "Get in touch",
    details: []
  }
};

function readMarkdown(fileName) {
  const filePath = path.join(process.cwd(), "content", fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  if (matter) {
    return matter(raw).data || {};
  }
  return {};
}

function readJson(fileName) {
  const filePath = path.join(process.cwd(), "content", fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function mergeNavigation(data) {
  return {
    brandName: data?.brandName || DEFAULT_NAVIGATION.brandName,
    brandHref: data?.brandHref || DEFAULT_NAVIGATION.brandHref,
    ctaLabel: data?.ctaLabel || DEFAULT_NAVIGATION.ctaLabel,
    ctaHref: data?.ctaHref || DEFAULT_NAVIGATION.ctaHref,
    items: Array.isArray(data?.items) && data.items.length ? data.items : DEFAULT_NAVIGATION.items
  };
}

function mergeFooter(data) {
  return {
    brandName: data?.brandName || DEFAULT_FOOTER.brandName,
    brandTagline: data?.brandTagline || DEFAULT_FOOTER.brandTagline,
    copyrightText: data?.copyrightText || DEFAULT_FOOTER.copyrightText,
    navLinks: Array.isArray(data?.navLinks) && data.navLinks.length ? data.navLinks : DEFAULT_FOOTER.navLinks,
    resourceLinks:
      Array.isArray(data?.resourceLinks) && data.resourceLinks.length
        ? data.resourceLinks
        : DEFAULT_FOOTER.resourceLinks,
    socialLinks: Array.isArray(data?.socialLinks) && data.socialLinks.length ? data.socialLinks : DEFAULT_FOOTER.socialLinks
  };
}

function mergeHomepage(data) {
  return {
    ...DEFAULT_HOMEPAGE,
    ...data,
    hero: {
      ...DEFAULT_HOMEPAGE.hero,
      ...(data?.hero || {})
    },
    services: {
      ...DEFAULT_HOMEPAGE.services,
      ...(data?.services || {})
    },
    caseStudies: {
      ...DEFAULT_HOMEPAGE.caseStudies,
      ...(data?.caseStudies || {})
    },
    process: {
      ...DEFAULT_HOMEPAGE.process,
      ...(data?.process || {})
    },
    metrics: {
      ...DEFAULT_HOMEPAGE.metrics,
      ...(data?.metrics || {})
    },
    reviews: {
      ...DEFAULT_HOMEPAGE.reviews,
      ...(data?.reviews || {})
    },
    faq: {
      ...DEFAULT_HOMEPAGE.faq,
      ...(data?.faq || {})
    },
    contact: {
      ...DEFAULT_HOMEPAGE.contact,
      ...(data?.contact || {})
    }
  };
}

export function getNavigationData() {
  try {
    return mergeNavigation(readMarkdown("navigation.md"));
  } catch (_) {
    return DEFAULT_NAVIGATION;
  }
}

export function getFooterData() {
  try {
    return mergeFooter(readMarkdown("footer.md"));
  } catch (_) {
    return DEFAULT_FOOTER;
  }
}

export function getHomepageData() {
  try {
    return mergeHomepage(readJson("homepage.json"));
  } catch (_) {
    return DEFAULT_HOMEPAGE;
  }
}

export function getSiteContent() {
  return {
    navigation: getNavigationData(),
    footer: getFooterData(),
    homepage: getHomepageData()
  };
}
