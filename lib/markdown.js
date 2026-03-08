function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function isBreakToken(value) {
  return String(value || "").replace(/<[^>]*>/g, "").trim() === "[[BR]]";
}

function renderInline(raw) {
  if (!raw) {
    return "";
  }

  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  const boldRe = /\*\*([^*]+)\*\*/g;

  let out = "";
  let idx = 0;

  while (idx < raw.length) {
    linkRe.lastIndex = idx;
    boldRe.lastIndex = idx;
    const linkMatch = linkRe.exec(raw);
    const boldMatch = boldRe.exec(raw);

    const next =
      linkMatch && boldMatch
        ? linkMatch.index <= boldMatch.index
          ? { type: "link", match: linkMatch }
          : { type: "bold", match: boldMatch }
        : linkMatch
          ? { type: "link", match: linkMatch }
          : boldMatch
            ? { type: "bold", match: boldMatch }
            : null;

    if (!next) {
      out += escapeHtml(raw.slice(idx));
      break;
    }

    if (next.match.index > idx) {
      out += escapeHtml(raw.slice(idx, next.match.index));
    }

    if (next.type === "link") {
      const [, text, href] = next.match;
      const isDeleteAction = text.trim().toLowerCase() === "delete your data here";
      const actionClass = isDeleteAction ? " legal-action-button" : "";
      out += `<a class="vectorveda-text vectorveda-rich-link${actionClass}" href="${escapeAttr(href)}">${renderInline(text)}</a>`;
    } else {
      const [, text] = next.match;
      out += `<strong class="vectorveda-text vectorveda-rich-strong">${renderInline(text)}</strong>`;
    }

    idx = next.match.index + next.match[0].length;
  }

  return out;
}

export function renderMarkdownToHtml(markdown) {
  if (!markdown) {
    return "";
  }

  const token = "[[BR]]";
  const normalized = markdown
    .replace(/\r\n/g, "\n")
    .replace(new RegExp(`^\\s*\\[\\[BR\\]\\]\\s*$`, "gm"), token)
    .replace(/\s*\[\[BR\]\]\s*/g, `\n${token}\n`);

  const tokenizeEmptyLines = (input) => {
    const lines = input.split("\n");
    return lines
      .map((line) => (line.trim() === "" ? token : line))
      .join("\n");
  };

  const promoteSingleNewlinesToParagraphs = (input) => {
    const lines = input.split("\n");
    const out = [];
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const next = lines[i + 1];
      const isListLine = /^\s*([-*]|\d+\.)\s+/.test(line);
      const nextIsListLine = next ? /^\s*([-*]|\d+\.)\s+/.test(next) : false;
      const isToken = line.trim() === token;
      const nextIsToken = next ? next.trim() === token : false;
      out.push(line);
      if (line.trim() === "" || !next) {
        continue;
      }
      if (!isListLine && !nextIsListLine) {
        out.push("");
      }
    }
    return out.join("\n");
  };

  let marked = null;
  try {
    // Optional dependency for rich markdown rendering.
    // eslint-disable-next-line global-require
    marked = require("marked");
  } catch (_) {
    marked = null;
  }

  if (marked) {
    const renderer = new marked.Renderer();
    renderer.paragraph = (text) => {
      if (isBreakToken(text)) {
        return `<p class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-paragraph"><br/></p>`;
      }
      return `<p class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-paragraph">${text}</p>`;
    };
    renderer.strong = (text) =>
      `<strong class="vectorveda-text vectorveda-rich-strong">${text}</strong>`;
    renderer.list = (body) =>
      `<ul class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-list" data-styles-preset="I7m4vyYgV">${body}</ul>`;
    renderer.listitem = (text) =>
      `<li class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-item" data-preset-tag="p"><p class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-paragraph">${text}</p></li>`;
    renderer.heading = (text, level) => {
      const plainText = String(text || "").replace(/<[^>]*>/g, "");
      const id = slugify(plainText);
      return `<h${level} id="${id}" class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-heading">${text}</h${level}>`;
    };
    renderer.link = (href, title, text) => {
      const safeTitle = title ? ` title="${title}"` : "";
      const plainText = String(text || "")
        .replace(/<[^>]*>/g, "")
        .trim()
        .toLowerCase();
      const isDeleteAction = plainText === "delete your data here";
      const actionClass = isDeleteAction ? " legal-action-button" : "";
      return `<a class="vectorveda-text vectorveda-rich-link${actionClass}" href="${href}"${safeTitle}>${text}</a>`;
    };
    renderer.hr = () => `<hr class="vectorveda-rich-hr"/>`;
    const prepared = promoteSingleNewlinesToParagraphs(tokenizeEmptyLines(normalized));
    return marked
      .parse(prepared, { renderer, breaks: true })
      .replace(
        /<p class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-paragraph">\s*\[\[BR\]\]\s*<\/p>/g,
        `<p class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-paragraph"><br/></p>`
      )
      .replace(/\s*\[\[BR\]\]\s*/g, "");
  }

  const lines = normalized.split("\n");
  const html = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "" || trimmed === token) {
      html.push(
        `<p class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-paragraph"><br/></p>`
      );
      i += 1;
      continue;
    }

    if (/^---+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
      html.push(`<hr class="vectorveda-rich-hr"/>`);
      i += 1;
      continue;
    }

    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = slugify(text);
      html.push(
        `<h${level} id="${id}" class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-heading">${renderInline(
          text
        )}</h${level}>`
      );
      i += 1;
      continue;
    }

    const listMatch = /^([-*]|\d+\.)\s+(.+)$/.exec(trimmed);
    if (listMatch) {
      const items = [];
      while (i < lines.length) {
        const current = lines[i].trim();
        const currentMatch = /^([-*]|\d+\.)\s+(.+)$/.exec(current);
        if (!currentMatch) {
          break;
        }
        items.push(
          `<li class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-item" data-preset-tag="p"><p class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-paragraph">${renderInline(
            currentMatch[2]
          )}</p></li>`
        );
        i += 1;
      }
      html.push(
        `<ul class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-list" data-styles-preset="I7m4vyYgV">${items.join(
          ""
        )}</ul>`
      );
      continue;
    }

    html.push(
      `<p class="vectorveda-text vectorveda-styles-preset-1tja4ie vectorveda-rich-paragraph">${renderInline(
        line
      )}</p>`
    );
    i += 1;
  }

  return html.join("");
}
