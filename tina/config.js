import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  branch,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  cmsCallback: (cms) => {
    cms.flags.set("branch-switcher", true);
    return cms;
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "navigation",
        label: "Navigation",
        path: "content",
        format: "md",
        match: {
          include: "navigation"
        },
        fields: [
          { name: "brandName", label: "Brand Name", type: "string", required: true },
          { name: "brandHref", label: "Brand Link", type: "string", required: true },
          { name: "ctaLabel", label: "CTA Label", type: "string", required: true },
          { name: "ctaHref", label: "CTA Link", type: "string", required: true },
          {
            name: "items",
            label: "Nav Items",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "Nav Item"
              })
            },
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "href", label: "Href", type: "string", required: true }
            ]
          }
        ]
      },
      {
        name: "homepage",
        label: "Homepage",
        path: "content",
        format: "json",
        match: {
          include: "homepage"
        },
        fields: [
          {
            name: "hero",
            label: "Hero",
            type: "object",
            fields: [
              { name: "statusText", label: "Status Text", type: "string", required: true },
              { name: "titleLine1", label: "Title Line 1", type: "string", required: true },
              { name: "titleLine2", label: "Title Line 2", type: "string", required: true },
              { name: "subtitle", label: "Subtitle", type: "string", required: true },
              { name: "primaryCtaLabel", label: "Primary CTA Label", type: "string", required: true },
              { name: "primaryCtaHref", label: "Primary CTA Href", type: "string", required: true },
              { name: "secondaryCtaLabel", label: "Secondary CTA Label", type: "string", required: true },
              { name: "secondaryCtaHref", label: "Secondary CTA Href", type: "string", required: true },
              {
                name: "featuredImpacts",
                label: "Featured Impacts",
                type: "object",
                list: true,
                fields: [
                  { name: "title", label: "Title", type: "string", required: true },
                  { name: "metric", label: "Metric", type: "string", required: true }
                ]
              }
            ]
          },
          {
            name: "services",
            label: "Services",
            type: "object",
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "title", label: "Title", type: "string", required: true },
              { name: "description", label: "Description", type: "string", required: true },
              {
                name: "cards",
                label: "Cards",
                type: "object",
                list: true,
                fields: [
                  { name: "title", label: "Title", type: "string", required: true },
                  { name: "description", label: "Description", type: "string", required: true },
                  { name: "bullets", label: "Bullets", type: "string", list: true, required: true }
                ]
              }
            ]
          },
          {
            name: "caseStudies",
            label: "Case Studies",
            type: "object",
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "title", label: "Title", type: "string", required: true },
              { name: "description", label: "Description", type: "string", required: true },
              {
                name: "items",
                label: "Items",
                type: "object",
                list: true,
                fields: [
                  { name: "id", label: "Id", type: "string", required: true },
                  { name: "name", label: "Name", type: "string", required: true },
                  { name: "category", label: "Category", type: "string", required: true },
                  { name: "image", label: "Image Path", type: "string", required: true },
                  { name: "resultHeading", label: "Result Heading", type: "string", required: true },
                  { name: "resultText", label: "Result Text", type: "string", required: true }
                ]
              }
            ]
          },
          {
            name: "process",
            label: "Process",
            type: "object",
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "title", label: "Title", type: "string", required: true },
              { name: "description", label: "Description", type: "string", required: true },
              { name: "ctaLabel", label: "CTA Label", type: "string", required: true },
              { name: "ctaHref", label: "CTA Href", type: "string", required: true },
              {
                name: "steps",
                label: "Steps",
                type: "object",
                list: true,
                fields: [
                  { name: "number", label: "Number", type: "string", required: true },
                  { name: "title", label: "Title", type: "string", required: true },
                  { name: "description", label: "Description", type: "string", required: true }
                ]
              }
            ]
          },
          {
            name: "metrics",
            label: "Metrics",
            type: "object",
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "title", label: "Title", type: "string", required: true },
              { name: "description", label: "Description", type: "string", required: true },
              {
                name: "items",
                label: "Items",
                type: "object",
                list: true,
                fields: [
                  { name: "value", label: "Value", type: "string", required: true },
                  { name: "suffix", label: "Suffix", type: "string", required: true },
                  { name: "label", label: "Metric Label", type: "string", required: true },
                  { name: "description", label: "Metric Description", type: "string", required: true }
                ]
              }
            ]
          },
          {
            name: "reviews",
            label: "Reviews",
            type: "object",
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "title", label: "Title", type: "string", required: true },
              { name: "description", label: "Description", type: "string", required: true },
              {
                name: "items",
                label: "Items",
                type: "object",
                list: true,
                fields: [
                  { name: "quote", label: "Quote", type: "string", required: true },
                  { name: "name", label: "Name", type: "string", required: true },
                  { name: "role", label: "Role", type: "string", required: true },
                  { name: "image", label: "Image Path", type: "string", required: true }
                ]
              }
            ]
          },
          {
            name: "faq",
            label: "FAQ",
            type: "object",
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "title", label: "Title", type: "string", required: true },
              { name: "description", label: "Description", type: "string", required: true },
              {
                name: "items",
                label: "Items",
                type: "object",
                list: true,
                fields: [
                  { name: "question", label: "Question", type: "string", required: true },
                  { name: "answer", label: "Answer", type: "string", required: true }
                ]
              }
            ]
          },
          {
            name: "contact",
            label: "Contact",
            type: "object",
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "title", label: "Title", type: "string", required: true },
              { name: "description", label: "Description", type: "string", required: true },
              { name: "submitLabel", label: "Submit Label", type: "string", required: true },
              {
                name: "details",
                label: "Contact Details",
                type: "object",
                list: true,
                fields: [
                  { name: "id", label: "Id", type: "string", required: true },
                  { name: "label", label: "Label", type: "string", required: true },
                  { name: "value", label: "Value", type: "string", required: true },
                  { name: "href", label: "Href", type: "string", required: true }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Header",
            type: "string",
            required: true
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true
          }
        ]
      },
      {
        name: "footer",
        label: "Footer",
        path: "content",
        format: "md",
        match: {
          include: "footer"
        },
        fields: [
          { name: "brandName", label: "Brand Name", type: "string", required: true },
          { name: "brandTagline", label: "Brand Tagline", type: "string", required: true },
          { name: "copyrightText", label: "Copyright Text", type: "string", required: true },
          {
            name: "navLinks",
            label: "Footer Nav Links",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "Nav Link"
              })
            },
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "href", label: "Href", type: "string", required: true }
            ]
          },
          {
            name: "resourceLinks",
            label: "Footer Resource Links",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "Resource Link"
              })
            },
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "href", label: "Href", type: "string", required: true }
            ]
          },
          {
            name: "socialLinks",
            label: "Footer Social Links",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "Social Link"
              })
            },
            fields: [
              { name: "label", label: "Label", type: "string", required: true },
              { name: "href", label: "Href", type: "string", required: true },
              {
                name: "icon",
                label: "Icon",
                type: "string",
                required: true,
                options: ["Globe", "Envelope", "Phone"]
              }
            ]
          }
        ]
      }
    ]
  }
});
