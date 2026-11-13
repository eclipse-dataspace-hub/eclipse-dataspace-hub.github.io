/**
 * Rehype plugin: links in Markdown and MDX content that leave the site open
 * in a new tab.
 *
 * A link counts as external when its target starts with http:// or https://.
 * Links between pages of this site are written as relative paths and are left
 * alone. Each external link also gets a note for screen readers, hidden
 * visually and kept out of the search index.
 *
 * Links rendered by components (cards, the component landscape, the footer,
 * the header icons) are not part of the Markdown tree. Those components set
 * the same attributes themselves.
 */
export function rehypeExternalLinks() {
  const isExternal = (href) => typeof href === 'string' && /^https?:\/\//i.test(href);

  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a' && isExternal(node.properties?.href)) {
      node.properties.target = '_blank';
      node.properties.rel = ['noopener', 'noreferrer'];
      node.children.push({
        type: 'element',
        tagName: 'span',
        properties: { className: ['sr-only'], dataPagefindIgnore: '' },
        children: [{ type: 'text', value: ' (opens in a new tab)' }],
      });
      return;
    }
    for (const child of node.children ?? []) visit(child);
  };

  return (tree) => visit(tree);
}
