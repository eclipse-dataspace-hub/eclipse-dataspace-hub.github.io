// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { rehypeExternalLinks } from './src/plugins/external-links.mjs';

// The deployment workflow passes the GitHub Pages origin and base path, so the
// same source builds for a project site (/<repo>/) and for an organisation
// site (/). Local builds default to the organisation site layout.
const site = process.env.SITE_URL ?? 'https://eclipse-dataspace-hub.github.io';
const base = process.env.BASE_PATH ?? '/';

/** Resolves a file in `public/` against the configured base path. */
const asset = (file) => `${base.replace(/\/$/, '')}/${file}`;

/**
 * Sidebar entries for one learning path. Lectures are numbered in the label;
 * the slug prefix keeps the files in the same order on disk.
 *
 * @param {string} path
 * @param {[slug: string, label: string][]} lectures
 */
const lectures = (path, lectures) => [
  { label: 'About this path', slug: path },
  ...lectures.map(([slug, label], index) => ({
    label: `${index + 1}. ${label}`,
    slug: `${path}/${slug}`,
  })),
];

export default defineConfig({
  site,
  base,
  markdown: {
    rehypePlugins: [rehypeExternalLinks],
  },
  integrations: [
    starlight({
      title: 'Eclipse Dataspace Hub',
      description:
        'The entry point to the Eclipse dataspace ecosystem: guided learning paths, runnable demonstrators, and links to the projects that hold the technical detail.',
      social: [
        {
          icon: 'github',
          label: 'Eclipse Dataspace Hub on GitHub',
          href: 'https://github.com/eclipse-dataspace-hub',
        },
      ],
      logo: {
        light: './src/assets/brand/lockup-horizontal.svg',
        dark: './src/assets/brand/lockup-horizontal-reversed.svg',
        alt: 'Eclipse Dataspace Hub',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      head: [
        { tag: 'link', attrs: { rel: 'icon', href: asset('favicon.ico'), sizes: '48x48' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: asset('apple-touch-icon.png') } },
        { tag: 'link', attrs: { rel: 'manifest', href: asset('site.webmanifest') } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#14121C' } },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: new URL(asset('social-card.png'), site).href },
        },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      ],
      customCss: [
        '@fontsource-variable/geist',
        '@fontsource-variable/geist-mono',
        './src/styles/custom.css',
      ],
      components: {
        Footer: './src/components/Footer.astro',
        SocialIcons: './src/components/SocialIcons.astro',
      },
      sidebar: [
        { label: 'Overview', slug: 'index' },
        {
          label: 'Learning Paths',
          items: [
            {
              label: 'A Dataspace Use Case',
              collapsed: true,
              items: lectures('use-case', [
                ['01-the-problem', 'The problem'],
                ['02-the-participants', 'The participants'],
                ['03-how-a-dataspace-works', 'How a dataspace works'],
                ['04-joining-the-dataspace', 'Joining the dataspace'],
                ['05-publishing-an-offer', 'Publishing an offer'],
                ['06-finding-and-agreeing', 'Finding and agreeing'],
                ['07-getting-the-data', 'Getting the data'],
                ['08-a-second-use-case', 'A second use case'],
                ['09-when-things-change', 'When things change'],
                ['10-is-a-dataspace-right-for-you', 'Is a dataspace right for you?'],
              ]),
            },
            {
              label: 'Set Up a Dataspace Platform',
              collapsed: true,
              items: lectures('platform-setup', [
                ['01-operating-models', 'Operating models'],
                ['02-platform-and-profile', 'Platform and profile'],
                ['03-prepare-the-cluster', 'Prepare the cluster'],
                ['04-install-the-core-platform', 'Install the core platform'],
                ['05-access-and-workload-identity', 'Access and workload identity'],
                ['06-write-a-dataspace-profile', 'Write a dataspace profile'],
                ['07-apply-the-profile', 'Apply the profile'],
                ['08-credentials-and-the-issuer', 'Credentials and the issuer'],
                ['09-provision-a-participant', 'Provision a participant'],
                ['10-data-planes-and-applications', 'Data planes and use-case applications'],
                ['11-operate-and-evolve', 'Operate and evolve'],
                ['12-self-hosted-participants', 'Self-hosted participants'],
              ]),
            },
            {
              label: 'Build a Dataspace Application',
              collapsed: true,
              items: lectures('application', [
                ['01-what-you-are-building', 'What you are building'],
                ['02-your-starting-point', 'Your starting point'],
                ['03-application-architecture', 'Application architecture'],
                ['04-publish-an-offer', 'Publish an offer'],
                ['05-policies-in-practice', 'Policies in practice'],
                ['06-discover-and-negotiate', 'Discover and negotiate'],
                ['07-transfer-data', 'Transfer data'],
                ['08-channels', 'Channels'],
                ['09-data-plane-architecture', 'Data plane architecture'],
                ['10-flow-tokens', 'Flow tokens'],
                ['11-design-the-use-case-protocol', 'Design the use-case protocol'],
                ['12-calls-and-decisions', 'Calls and decisions in the application'],
                ['13-credentials-and-claims', 'Credentials and claims'],
                ['14-events-and-resilience', 'Events and resilience'],
                ['15-a-second-use-case', 'A second use case'],
                ['16-test-and-ship', 'Test and ship'],
              ]),
            },
            {
              label: 'Design Trust, Credentials, and Dataspace Profiles',
              collapsed: true,
              items: lectures('trust-and-profiles', [
                ['01-why-trust-needs-design', 'Why trust needs design'],
                ['02-roles-and-responsibilities', 'Roles and responsibilities'],
                ['03-the-dataspace-profile', 'The dataspace profile'],
                ['04-design-the-credentials', 'Design the credentials'],
                ['05-onboarding', 'Onboarding'],
                ['06-policy-vocabulary', 'Policy vocabulary'],
                ['07-credential-lifecycle', 'Credential lifecycle'],
                ['08-use-cases-and-agreements', 'Use cases and agreements'],
                ['09-beyond-the-policy', 'Beyond the policy'],
                ['10-from-pilot-to-scale', 'From pilot to scale'],
              ]),
            },
          ],
        },
        { label: 'Demonstrators', slug: 'demonstrators' },
        { label: 'Community', slug: 'community' },
      ],
    }),
  ],
});
