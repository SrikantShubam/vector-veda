# Content Mapping Document - Vector Veda Next.js Integration
## Phase 5: Content Integration Guide

---

## 📍 Page Structure Overview

```
/pages
├── index.tsx                    (Homepage)
├── services.tsx               (Services page)
├── case-studies.tsx           (Case Studies hub)
├── case-studies/
│   ├── dead-deal-autopsy.tsx
│   ├── variant-lens.tsx
│   ├── saraswati-daily-vow.tsx
│   ├── fenor-org.tsx
│   └── exam-repo.tsx
└── faq.tsx                    (FAQ page)

/components
├── Navigation.tsx             (Nav bar)
├── Header/Hero.tsx           (Homepage hero)
├── Services/
│   ├── ServiceCard.tsx
│   └── ServicesList.tsx
├── CaseStudies/
│   ├── CaseStudyCard.tsx
│   ├── CaseStudyDetail.tsx
│   └── CaseStudiesList.tsx
├── Testimonials.tsx
├── Portfolio.tsx
├── FAQ/
│   ├── FAQList.tsx
│   └── FAQItem.tsx
├── Footer.tsx
└── CTA.tsx

/data
└── content.json              (Centralized content file)
```

---

## 🗂️ Content Mapping by Section

### SECTION 1: NAVIGATION
**FINAL_CONTENT.md Lines:** 6-14

**Destination:** `components/Navigation.tsx`

**Content Structure:**
```json
{
  "navigation": {
    "logo": "Vector Veda",
    "items": [
      { "label": "Services", "href": "/services" },
      { "label": "Case Studies", "href": "/case-studies" },
      { "label": "How It Works", "href": "/#how-it-works" },
      { "label": "Reviews", "href": "/#reviews" },
      { "label": "Get in touch", "href": "/contact", "cta": true }
    ]
  }
}
```

**Notes:**
- Single primary CTA ("Get in touch") - make it visually distinct
- Consider sticky navigation on scroll
- Mobile hamburger menu for responsive

---

### SECTION 2: HEADER/HERO
**FINAL_CONTENT.md Lines:** 18-43

**Destination:** `components/Header/Hero.tsx` + `pages/index.tsx`

**Content Structure:**
```json
{
  "hero": {
    "status": "Available for Work",
    "headline": "Beautiful Products. Engineered Intelligence. Data-Driven Results.",
    "subheadline": "We design exceptional user experiences and build custom AI systems that solve real problems. From document intelligence to scientific platforms to mobile apps—we combine design rigor with technical expertise to deliver measurable impact.",
    "primaryCTA": {
      "text": "View Our Work",
      "href": "/case-studies"
    },
    "featuredImpact": [
      {
        "title": "AI-Powered Document Analysis",
        "metric": "95% Extraction Accuracy"
      },
      {
        "title": "Protein Variant Intelligence",
        "metric": "75% Expert Alignment"
      },
      {
        "title": "Mobile App with Voice Interface",
        "metric": "40K+ Daily Active Users"
      },
      {
        "title": "Corporate Website Redesign",
        "metric": "3.2X Lead Generation"
      }
    ]
  }
}
```

**Notes:**
- Hero should have background image or gradient
- Featured Impact = 4-card grid (responsive: 1 col mobile, 2 col tablet, 4 col desktop)
- CTA button should scroll to case studies or navigate to /case-studies
- Stat cards should have hover effects

---

### SECTION 3: SERVICES
**FINAL_CONTENT.md Lines:** 46-79

**Destination:** `pages/services.tsx` + `components/Services/`

**Content Structure:**
```json
{
  "services": {
    "heading": "What We Build",
    "subheading": "We design thoughtful interfaces and engineer custom AI systems. Every product combines design discipline with technical depth—whether that's machine learning infrastructure, mobile architecture, or web optimization.",
    "items": [
      {
        "id": "custom-ai",
        "title": "Custom AI Systems & Document Intelligence",
        "description": "We design and build multi-tier AI systems from first principles. Document extraction, computer vision pipelines, LLM orchestration, validation frameworks—everything engineered for accuracy, cost, and explainability. We don't wrap existing tools; we build the systems you need.",
        "features": [
          "Multi-Tier LLM Architecture",
          "Vision + Text Processing",
          "Cost & Latency Optimization"
        ]
      },
      {
        "id": "scientific-ux",
        "title": "Scientific & Domain-Specific Product Design",
        "description": "Design interfaces for complex domains—protein analysis, competitive exams, financial modeling—that make specialist tools accessible without losing power. We combine expert feedback, rigorous UX research, and technical implementation. Every feature is grounded in user needs.",
        "features": [
          "Expert Feedback Loops",
          "Data Visualization & Analytics",
          "Accessible Complex UX"
        ]
      },
      {
        "id": "mobile",
        "title": "Mobile Product Development",
        "description": "Build production-grade mobile apps with Flutter that scale to millions of users. We handle state management, offline resilience, platform-specific quirks, monetization, and everything between design and App Store. Bilingual support, cultural nuance, and real analytics included.",
        "features": [
          "Flutter Architecture",
          "Monetization Strategy",
          "Platform Excellence"
        ]
      },
      {
        "id": "web-conversion",
        "title": "Web Product Strategy & Conversion",
        "description": "Design and build websites that convert. We combine conversion funnel strategy, UX research, copywriting, and technical implementation. Every layout decision is tested. Every CTA is measured. Results matter.",
        "features": [
          "Conversion Optimization",
          "A/B Testing & Analytics",
          "Technical Performance"
        ]
      }
    ]
  }
}
```

**Notes:**
- 4-service grid (2x2 on desktop, 1 col on mobile)
- Each service card should be clickable/expandable
- Icons for each service would help visual hierarchy
- Consider alternating left/right layout for desktop (feature card + description)

---

### SECTION 4: CASE STUDIES (HUB PAGE)
**FINAL_CONTENT.md Lines:** 82-86

**Destination:** `pages/case-studies.tsx`

**Content Structure:**
```json
{
  "caseStudiesHub": {
    "heading": "Case Studies",
    "subheading": "Real projects where we solved hard problems. See how we combine AI, beautiful design, and relentless focus on results.",
    "cases": [
      // Reference case study objects (see below)
    ]
  }
}
```

**Hub Page Layout:**
- Hero section (heading + subheading)
- 5-case study cards grid (2 col desktop, 1 col mobile)
- Each card shows: Title, brief problem statement, 1-2 key results, "Read More" link
- Filters/categories optional (AI, Mobile, Web, etc.)

---

### SECTION 5: CASE STUDIES (DETAIL PAGES)
**FINAL_CONTENT.md Lines:** 90-444

**Destination:**
- `pages/case-studies/dead-deal-autopsy.tsx`
- `pages/case-studies/variant-lens.tsx`
- `pages/case-studies/saraswati-daily-vow.tsx`
- `pages/case-studies/fenor-org.tsx`
- `pages/case-studies/exam-repo.tsx`

**Content Structure (per case study):**
```json
{
  "caseStudies": [
    {
      "id": "dead-deal-autopsy",
      "slug": "dead-deal-autopsy",
      "title": "Dead Deal Autopsy - From Hours to Minutes: AI-Powered Legal Document Analysis",
      "shortTitle": "Dead Deal Autopsy",
      "category": "AI Document Intelligence",
      "year": "2024-2025",
      "overview": {
        "company": "Dead Deal Autopsy",
        "type": "Advanced document intelligence system for analyzing bankruptcy and credit restructuring documents",
        "description": "A financial analysis firm needed to extract key metrics from complex bankruptcy documents..."
      },
      "problem": {
        "headline": "Manual bottleneck at scale",
        "points": [
          "Bankruptcy 'first day' declarations and credit agreements are dense, multi-page PDFs...",
          "Important metrics scattered across pages...",
          "Current process: 8-12 analyst-hours per deal × 50 deals/quarter = 400-600 billable hours lost..."
        ],
        "research": {
          "headline": "Research findings",
          "points": [
            "Standard PDF parsing (PDFPlumber, PyPDF2) failed on scanned PDFs...",
            "Vision APIs existed but were expensive ($0.01-0.10 per page)...",
            "No existing tool handled the domain complexity..."
          ]
        }
      },
      "solution": {
        "headline": "Three-tier intelligent extraction system",
        "tiers": [
          {
            "name": "Tier 1: Text-based RAG (80% of deals resolved here)",
            "details": [
              "Used Docling for intelligent PDF parsing...",
              "Built LlamaIndex RAG system...",
              "Cost: ~$0.05/document"
            ]
          },
          {
            "name": "Tier 2: Vision-based correction (15% escalation)",
            "details": [
              "For low-confidence extractions...",
              "Cost: ~$0.80/escalation"
            ]
          },
          {
            "name": "Tier 3: Critic validation (5% manual review)",
            "details": [
              "Used DeepSeek (cheaper critic model)...",
              "Flagged anomalies..."
            ]
          }
        ],
        "technical": {
          "headline": "Technical implementation",
          "points": [
            "Python backend with FastAPI + Celery...",
            "Pinecone for embeddings, PostgreSQL...",
            "Docker containerization...",
            "Comprehensive error logging..."
          ]
        }
      },
      "results": {
        "metrics": [
          { "value": "95%", "label": "automatic extraction accuracy" },
          { "value": "8h → 15min", "label": "per deal (32x faster)" },
          { "value": "320+ hours", "label": "annual analyst time saved" },
          { "value": "Reduced errors", "label": "by capturing source citations" }
        ],
        "points": [
          "95% automatic extraction accuracy (validated on 50+ real bankruptcy documents)",
          "Scaled to 50+ deals without hiring additional analysts",
          "Analyst satisfaction: Junior analysts now focus on strategy analysis instead of data entry"
        ]
      },
      "testimonial": {
        "quote": "The dead deal extraction system eliminated 8 hours of manual work per deal. More importantly, we went from 0 to 95% accuracy overnight. One person built something we thought required a whole team.",
        "author": "Investment Analyst",
        "company": "Bankruptcy Advisory Firm"
      }
    },
    // ... repeat structure for variant-lens, saraswati-daily-vow, fenor-org, exam-repo
  ]
}
```

**Component Layout (per detail page):**
- Breadcrumb: Home > Case Studies > [Case Name]
- Hero section: Title + category + year
- Overview section
- Problem section (headline + bullets + research)
- Solution section (headline + numbered tiers/points + technical details)
- Results section (metrics grid + results bullets)
- Testimonial section (quote + author + company)
- Related cases (links to other 4 cases)
- Final CTA: "Let's talk about your project"

**Notes:**
- Use a consistent layout component for all 5 cases
- Make metrics visually prominent (consider animated counters)
- Include back navigation to case studies hub
- Open Graph metadata should include case study title + key metric

---

### SECTION 6: HOW IT WORKS / PROCESS
**FINAL_CONTENT.md Lines:** 448-470

**Destination:** Anchor on homepage `/#how-it-works` OR `pages/process.tsx` (optional)

**Content Structure:**
```json
{
  "process": {
    "heading": "Our Approach",
    "subheading": "We've built complex products in AI, mobile, scientific computing, and web. Here's how we do it.",
    "steps": [
      {
        "number": "01",
        "title": "Discovery & Analysis",
        "description": "We audit your current state (bottlenecks, user pain points, technical constraints). For AI projects, we assess whether the problem is a data problem, a model problem, or a product problem. We define what success looks like: revenue, users, errors eliminated, or time saved."
      },
      {
        "number": "02",
        "title": "Design & Architecture",
        "description": "We prototype rigorously. For AI systems, we validate accuracy and cost before building. For mobile, we design the state machine and offline behavior upfront. For web, we do competitive analysis and conversion funnel mapping."
      },
      {
        "number": "03",
        "title": "Build with Focus",
        "description": "We build relentlessly—tests first, infrastructure second, polish third. For AI: we integrate models with cost/latency optimization. For mobile: we handle platform-specific quirks (notifications, audio, background state). For web: we optimize for conversion and accessibility."
      },
      {
        "number": "04",
        "title": "Launch & Iterate",
        "description": "We ship to real users and measure. We run A/B tests on critical decisions. We iterate based on analytics, user feedback, and business metrics. Post-launch, we own optimization and scaling."
      }
    ]
  }
}
```

**Notes:**
- Can be integrated as section on homepage OR dedicated page
- 4-step vertical timeline (desktop) or stacked (mobile)
- Icons/numbers for each step
- Consider animated transitions as user scrolls through

---

### SECTION 7: WHY CHOOSE US
**FINAL_CONTENT.md Lines:** 474-492

**Destination:** Section on homepage OR `pages/about.tsx` (optional)

**Content Structure:**
```json
{
  "whyChooseUs": {
    "heading": "Why Companies Choose Vector Veda",
    "subheading": "We're a technical founder who designs, builds, and ships. No hand-offs, no excuses. We engineer solutions, not workflows.",
    "pillars": [
      {
        "title": "We Engineer AI Systems, Not Just Integrate Them",
        "description": "Multi-tier LLM architectures, vision pipelines, custom validation frameworks. We optimize for accuracy, cost, and explainability from first principles. You get systems you can reason about, not black boxes."
      },
      {
        "title": "Data Science + Design Expertise",
        "description": "BSc in Data Science + years of product design experience. We think like engineers and designers simultaneously. Every feature decision is grounded in data and user research."
      },
      {
        "title": "We Ship Fast Because We Scope Right",
        "description": "Clear communication, realistic timelines, no scope creep. When we say something will be done, it's done. We own the outcome end-to-end."
      },
      {
        "title": "Products That Scale",
        "description": "From 2K DAU to 200K+ users. We architect for growth: lean infrastructure, intelligent caching, graceful degradation. Your product won't break under success."
      }
    ]
  }
}
```

**Notes:**
- 4-card grid OR alternating left/right layout
- Consider icons for each pillar
- Can be on homepage or dedicated section

---

### SECTION 8: TESTIMONIALS
**FINAL_CONTENT.md Lines:** 496-530

**Destination:** `components/Testimonials.tsx` (used on homepage + case study pages)

**Content Structure:**
```json
{
  "testimonials": [
    {
      "id": 1,
      "quote": "The dead deal extraction system eliminated 8 hours of manual work per deal. More importantly, we went from 0 to 95% accuracy overnight. One person built something we thought required a whole team.",
      "author": "Investment Analyst",
      "company": "Bankruptcy Advisory Firm",
      "linkedCaseStudy": "dead-deal-autopsy"
    },
    {
      "id": 2,
      "quote": "VariantLens is exactly what we needed for undergraduate teaching. The explainability makes it perfect for helping students understand *why*, not just get answers. It's now cited in research papers.",
      "author": "Professor",
      "company": "Molecular Biology Department, Top University",
      "linkedCaseStudy": "variant-lens"
    },
    // ... continue for all 5
  ]
}
```

**Notes:**
- Can display as carousel/slider on homepage
- Testimonial cards on case study pages should link back to case study
- Use rich formatting for company names (consider logos if available)

---

### SECTION 9: PORTFOLIO
**FINAL_CONTENT.md Lines:** 534-563

**Destination:** `components/Portfolio.tsx` (homepage section OR `/portfolio.tsx` page)

**Content Structure:**
```json
{
  "portfolio": {
    "heading": "Featured Projects",
    "subheading": "Live products we've shipped. 200K+ users. Billions of operations. Measurable business impact.",
    "items": [
      {
        "id": 1,
        "title": "Dead Deal Autopsy",
        "tech": "Python + FastAPI | Multi-Tier LLM + Vision | Document Intelligence",
        "description": "95% accurate extraction of bankruptcy documents in 15 minutes (vs 8 hours manual). Three-tier system: RAG for 80%, vision for edge cases, critic for validation.",
        "linkedCaseStudy": "dead-deal-autopsy",
        "image": "/images/dead-deal-autopsy.png"
      },
      // ... continue for all 5
    ]
  }
}
```

**Notes:**
- 5-item grid (could be 1 col, 2 col, or 3 col depending on design)
- Each item should be clickable → navigate to case study
- Consider hover effects (image cards with overlay text)
- Portfolio items could have categories/filters

---

### SECTION 10: SOCIAL PROOF
**FINAL_CONTENT.md Lines:** 567-573

**Destination:** `components/SocialProof.tsx` (homepage section)

**Content Structure:**
```json
{
  "socialProof": {
    "heading": "Proven Track Record",
    "subheading": "Built products across AI, mobile, scientific computing, and web. Shipped to 200K+ users. Designed and engineered from first principles.",
    "stats": [
      { "value": "5", "label": "Live Products" },
      { "value": "200K+", "label": "Combined Users" },
      { "value": "95%+", "label": "Accuracy Systems" },
      { "value": "4.3★", "label": "Mobile Ratings" }
    ]
  }
}
```

**Notes:**
- 4-stat grid with visual emphasis
- Consider animated counters as section comes into view
- Large, readable typography

---

### SECTION 11: FAQ
**FINAL_CONTENT.md Lines:** 577-625

**Destination:** `pages/faq.tsx` + `components/FAQ/`

**Content Structure:**
```json
{
  "faq": {
    "heading": "Frequently Asked Questions",
    "subheading": "Clear answers to questions we hear from prospective clients.",
    "items": [
      {
        "id": 1,
        "question": "How do you approach a new project?",
        "answer": "We start with discovery: understand your problem, constraints, and success metrics. For AI projects, we validate accuracy and cost before building. For web/mobile, we research users and competitors. Then we prototype and get feedback before full development. No surprises."
      },
      {
        "id": 2,
        "question": "What's your experience with AI systems in production?",
        "answer": "We've built multi-tier LLM architectures, vision pipelines, custom validation frameworks. We optimize for accuracy, cost, and latency from first principles. More importantly, we've made mistakes and learned—error handling, fallback strategies, API rate limiting. Your system won't break."
      },
      // ... continue for all 6
    ]
  }
}
```

**Notes:**
- Accordion/collapsible UI for FAQ items
- FAQ page should have SEO focus (frequently searched questions)
- Can embed FAQ schema for rich snippets

---

### SECTION 12: CTA / FOOTER
**FINAL_CONTENT.md Lines:** 609-626

**Destination:** `components/CTA.tsx` + `components/Footer.tsx`

**Content Structure:**
```json
{
  "cta": {
    "heading": "Ready to Build?",
    "subheading": "Whether you're starting an MVP or scaling to millions of users, let's talk about what's possible.",
    "title": "Let's Start With a Conversation",
    "description": "45-minute discovery call. No pitch—just honest assessment of your problem and what we'd build.",
    "primaryCTA": {
      "text": "Get in touch",
      "href": "/contact"
    }
  },
  "footer": {
    "tagline": "Vector Veda - Design. Engineering. AI.",
    "description": "Beautiful products built by one technical founder.",
    "links": {
      "main": [
        { "label": "Services", "href": "/services" },
        { "label": "Case Studies", "href": "/case-studies" },
        { "label": "Contact", "href": "/contact" }
      ],
      "legal": [
        { "label": "Privacy", "href": "/privacy" },
        { "label": "Terms", "href": "/terms" }
      ]
    }
  }
}
```

**Notes:**
- CTA section appears before footer (throughout site)
- Footer should be uniform across all pages
- Consider social links if applicable (GitHub, LinkedIn, etc.)

---

### SECTION 13: SEO & METADATA
**FINAL_CONTENT.md Lines:** 549-585

**Destination:** `next-seo.config.ts` or individual page metadata

**Implementation:**
```json
{
  "seo": {
    "pages": {
      "homepage": {
        "title": "Custom AI Systems & Beautiful Products | Vector Veda",
        "description": "Beautiful products. Engineered AI. 5 shipped projects, 200K+ users. AI extraction at 95% accuracy, mobile apps at 40K DAU, scientific platforms, conversion optimization.",
        "keywords": [
          "Custom AI systems",
          "Document extraction with AI",
          "LLM architecture",
          "Mobile app development Flutter",
          "Scientific UX design"
        ],
        "ogImage": "/images/og-home.jpg"
      },
      "services": {
        "title": "AI Engineering, Mobile Development, Web Design | Vector Veda",
        "description": "Custom AI systems, mobile development with Flutter, scientific product design, and conversion-optimized web design."
      },
      "caseStudies": {
        "title": "AI Document Extraction, Mobile Apps, Scientific Software | Vector Veda",
        "description": "See how we built a 95% accurate document extraction system, a protein analysis tool for researchers, mobile apps to 40K+ users, and discovered insights for competitive exams."
      }
    },
    "blogIdeas": [
      "Building Multi-Tier LLM Systems: Accuracy, Cost, and Explainability",
      "From Prototype to 200K Users: Technical Architecture Decisions",
      "Mobile App Monetization Without Alienating Users: Lessons from 40K DAU",
      "Designing Interfaces for Complex Domains: Science, Finance, Education",
      "API Fallback Patterns: Reliability When External Services Fail",
      "Lean Infrastructure for Scale: Firebase, Next.js, Serverless",
      "Conversion Rate Optimization for B2B SaaS: From 0.8% to 2.6%"
    ]
  }
}
```

**Notes:**
- Use next-seo package for consistent metadata
- Open Graph images for each major page (social sharing)
- Schema.org structured data for rich snippets
- Blog posts for long-form content ideas (boosts SEO)

---

## 📋 Data Organization

### Recommended Structure: `data/content.json`

```
data/
├── content.json          (Everything centralized)
├── case-studies/
│   ├── dead-deal-autopsy.json
│   ├── variant-lens.json
│   ├── saraswati-daily-vow.json
│   ├── fenor-org.json
│   └── exam-repo.json
├── testimonials.json
└── seo.json
```

**OR use CMS:**
- Consider using Sanity, Contentful, or Notion API
- Easier content updates without redeploying
- Can manage case studies, testimonials, FAQs in one place

---

## 🎯 Component Dependencies

```
Homepage (pages/index.tsx)
├── Navigation
├── Hero
├── Featured Impact (4-card grid)
├── Services Overview (4-card preview)
├── Process Section
├── Testimonials (carousel, 3 visible)
├── Portfolio (5-item grid)
├── Why Choose Us (4-pillar grid)
├── Social Proof (4-stat grid)
├── FAQ Preview (3 FAQs expanded)
├── CTA Section
└── Footer

Services Page (pages/services.tsx)
├── Navigation
├── Hero
├── Services Full List (4 items, expandable)
├── Related Case Studies
├── CTA Section
└── Footer

Case Studies Hub (pages/case-studies.tsx)
├── Navigation
├── Hero
├── 5-Case Study Cards Grid
├── Filter/Category Sidebar (optional)
├── CTA Section
└── Footer

Case Study Detail (pages/case-studies/[slug].tsx)
├── Navigation
├── Breadcrumb
├── Hero (title, category, year)
├── Content Sections (Problem, Solution, Results)
├── Testimonial
├── Related Cases (4 other cases)
├── CTA Section
└── Footer

FAQ Page (pages/faq.tsx)
├── Navigation
├── Hero
├── FAQ Accordion
├── CTA Section
└── Footer
```

---

## 🔗 Internal Navigation Links

**Primary Conversion Path:**
1. User enters from homepage
2. Clicks "View Our Work" → `/case-studies`
3. Browses case studies → clicks on one
4. Reads detailed case study → clicks "Get in touch" or "Let's Start With a Conversation"
5. → Contact form or Calendly link

**Secondary Paths:**
- Homepage → Services → (Related Cases) → Case Study
- Homepage → Why Choose Us → Services → (Related Cases)
- Footer → Links to any main page

---

## ✅ Implementation Checklist

- [ ] Create `pages/index.tsx` (homepage)
- [ ] Create `pages/services.tsx`
- [ ] Create `pages/case-studies.tsx`
- [ ] Create `pages/case-studies/[slug].tsx` (dynamic route)
- [ ] Create `pages/faq.tsx`
- [ ] Create `pages/contact.tsx` (or use Calendly embed)
- [ ] Create all components in `components/`
- [ ] Create `data/content.json` with all content
- [ ] Setup SEO metadata with next-seo
- [ ] Create navigation responsive layout
- [ ] Setup internal linking
- [ ] Test all CTAs
- [ ] Add images/media (hero, case study banners, etc.)
- [ ] Setup Google Analytics
- [ ] Test mobile responsiveness
- [ ] Deploy & verify links work

---

## 📝 Notes for Implementation

1. **Start with homepage** - Set up layout foundation, then reuse components
2. **Centralize data** - Use `data/content.json` or CMS to avoid repetition
3. **Component reusability** - ServiceCard, CaseStudyCard, FAQItem, etc. should be flexible
4. **Mobile-first** - Design components for mobile, then enhance for desktop
5. **Performance** - Lazy load images, optimize CaseStudiesList carousel
6. **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
7. **Analytics** - Track CTA clicks, case study views, scroll depth

---

**Ready to start coding!** This mapping should give you a clear path from FINAL_CONTENT.md to your Next.js structure.
