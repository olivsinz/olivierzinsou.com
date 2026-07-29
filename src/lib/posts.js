import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import php from 'highlight.js/lib/languages/php'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'

hljs.registerLanguage('php', php)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx]
  const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
  const [lang, ...attrParts] = info.split(/\s+/)
  const attrs = attrParts.join(' ')
  const knownLang = lang && hljs.getLanguage(lang) ? lang : null
  const lines = token.content.replace(/\n$/, '').split('\n')

  const highlightedLines = lines.map((line) => {
    if (!knownLang) return md.utils.escapeHtml(line)
    try {
      return hljs.highlight(line, { language: knownLang, ignoreIllegals: true }).value
    } catch {
      return md.utils.escapeHtml(line)
    }
  })

  const rows = highlightedLines.map((line) => `<span class="code-line">${line}</span>`).join('')
  const langClass = knownLang ? ` language-${knownLang}` : ''
  const filenameMatch = attrs.match(/filename="([^"]*)"/)
  const filename = filenameMatch ? filenameMatch[1] : null
  const caption = filename ? `<div class="code-caption">${md.utils.escapeHtml(filename)}</div>` : ''

  return `<div class="code-block"><pre class="hljs line-numbers"><code class="${langClass}">${rows}</code></pre>${caption}</div>`
}

md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const alt = self.renderInlineAsText(token.children, options, env)
  const src = token.attrGet('src')
  const img = `<img src="${src}" alt="${md.utils.escapeHtml(alt)}" loading="lazy" decoding="async" />`
  const caption = alt ? `<span class="img-caption">${md.utils.escapeHtml(alt)}</span>` : ''
  return img + caption
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split('\n')) {
    const lineMatch = line.match(/^([^:]+):\s*(.*)$/)
    if (!lineMatch) continue
    const [, key, rawValue] = lineMatch
    data[key.trim()] = rawValue.trim().replace(/^['"]|['"]$/g, '')
  }

  return { data, content: match[2] }
}

const files = import.meta.glob('../posts/*.md', { eager: true, query: '?raw', import: 'default' })

const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    const { data, content } = parseFrontmatter(raw)
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? null,
      excerpt: data.excerpt ?? '',
      category: data.category ?? null,
      html: md.render(content),
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getPosts() {
  return posts
}

export function getPost(slug) {
  return posts.find((post) => post.slug === slug) ?? null
}
