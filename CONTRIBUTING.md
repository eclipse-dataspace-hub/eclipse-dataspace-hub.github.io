# Contributing to the Eclipse Dataspace Hub website

This file describes how the site is organized and how its texts are written. For running the site locally, see the [README](README.md).

## What the site contains

| Section | Content |
|---|---|
| **Overview** | Landing page with the component landscape, the demonstrators, and the routes into the learning paths. |
| **Learning paths** | Four series of short lectures, one per role (see below). |
| **Demonstrators** | How to choose between JAD and the Minimum Viable Dataspace, and what to read afterwards. |
| **Community** | How to ask, give feedback, and contribute. |

### Learning paths

| Path | Audience | Folder |
|---|---|---|
| A Dataspace Use Case | Newcomers and decision makers | `src/content/docs/use-case/` |
| Set Up a Dataspace Platform | Platform operators and self-hosted participants | `src/content/docs/platform-setup/` |
| Build a Dataspace Application | System integrators, application and data plane developers | `src/content/docs/application/` |
| Design Trust, Credentials, and Dataspace Profiles | Dataspace designers and governance authorities | `src/content/docs/trust-and-profiles/` |

All paths share one example: the fictional **Bike Dataspace**, in which bicycle manufacturers, suppliers, and recyclers share supplier certificates and battery data.

The three technical paths describe one architecture from three sides. A platform is the Core Platform Distribution plus a dataspace profile. Use-case applications run on top of it and act as the data plane. The trust path explains the decisions that the profile records.

## Writing conventions

**Lecture structure.** Every lecture has the same parts:

1. frontmatter with `title` and `description`;
2. an opening paragraph that sets the situation;
3. an `:::note[In this lecture]` aside with two to four points;
4. three to five sections;
5. `## Key takeaways`;
6. `## Go deeper`, with deep links to authoritative documentation.

**Scope.** A lecture takes five to ten minutes to read. It shows the minimal shape of a concept and links out for detail.

**Language.** Plain English, short sentences, second person, sentence-case headings. Define a term on first use.

**Terms.** Name the components as the component map on the landing page does: connector, Credential Service, Credential Issuer, data plane. Say control plane only where the text is about the split between control plane and data plane, for example around Data Plane Signaling. Do not call the Credential Service a wallet. An application that implements one use case for providers and consumers is a use-case application. Treat the Connector Fabric Manager as a concept: say what it does for a platform and link to its documentation for the internals.

**Example names.** Use the names and identifiers of the Bike Dataspace consistently:

| Name | Role |
|---|---|
| Bike Industry Association | Governance authority and credential issuer |
| Danube Cloud | Platform operator |
| Costa Frames | Frame supplier, hosted on Danube Cloud |
| Lindner Bikes | E-bike manufacturer, hosted on Danube Cloud |
| Hansen Recycling | Battery recycler, hosted on Danube Cloud |
| Brandt Batteries | Battery supplier with its own connector |
| Supplier certificate service | Use-case application for supplier certificates, hosted by Danube Cloud for its members |
| Battery data service | Use-case application for battery data, run by Brandt Batteries |

Credentials are `MembershipCredential` and `RecyclerCredential`. The membership credential lists the accepted data sharing agreements in its claim `agreements`, in the form `supplier-certificates:1.0`. The dataspace identifier is `bike-dataspace`. The use cases are `supplier-certificates` and `battery-passport-data`, and each identifier is also the code of the use case's data sharing agreement. Policy terms are `https://bike-dataspace.example/policy/Membership`, `https://bike-dataspace.example/policy/DataSharingAgreement`, and `https://bike-dataspace.example/policy/Recycler`.

**Membership is an example.** The Bike Dataspace has an association that admits members, and a membership credential, because that is the most common starting setup and makes the lectures tangible. Do not write as if every dataspace had one. In a general statement, say participant and credential. In the Bike story, member and membership credential are fine.

Hostnames use the reserved `.example` domain: `danube-cloud.example` for the platform, `bike-dataspace.example` for the association, and `brandt-batteries.example` for Brandt. Participant identifiers have the form `did:web:identity.danube-cloud.example:costa-frames`.

**Diagrams.** Draw a relationship or a sequence with one of the diagram components in `src/components/diagrams/`, not as a text sketch in a code block. A lecture that uses a component has the extension `.mdx` and imports the component below its frontmatter.

| Component | Use it for |
|---|---|
| `Sequence` | Messages between a few parties, in order |
| `Flow` | Who does what, top to bottom |
| `Chain` | Boxes joined by labelled arrows, in one or more lanes |
| `Exchange` | Two parties side by side and what passes between them |
| `Stages` | Work in stages, some of it in parallel |
| `StateFlow` | A state machine |
| `LayerStack` | The layers of a system |

Each component documents its properties in a comment at the top of its file. Give every diagram a `caption`. Keep technical strings such as JSON, HTTP requests, URLs, identifiers, and policy expressions in code blocks.

**Links.** Internal links are relative, so the site works under any base path. Links that leave the site open in a new tab. For Markdown links the build adds this by itself (`src/plugins/external-links.mjs`); a component that renders its own external links sets `target` and `rel` itself. Link to tagged or stable documentation where it exists.

**Currency.** The ecosystem moves quickly. Print an API path, a field name, or a configuration key only when the upstream source confirms it. Mark statements that depend on a version with "at the time of writing". State the status of experimental features in a `:::caution` aside, and prefer linking to upstream documentation over restating details that change.

## Adding a lecture

1. Create `src/content/docs/<path>/NN-slug.md`, or `.mdx` if the lecture uses a diagram. The number prefix sets the order on disk.
2. Add the lecture to the sidebar in `astro.config.mjs`.
3. Add a row to the lecture table in the path's `index.md`.

## Brand

The site uses the Eclipse Dataspace Hub brand kit: the Orbit mark and lockup in `src/assets/brand/`, the favicon set and social card in `public/`, and the brand colors and Geist typefaces in `src/styles/custom.css`. Use the files as they are. Do not recolor the mark or set the wordmark in another font.

| Color | Hex | Use |
|---|---|---|
| Ink | `#14121C` | Primary text, dark backgrounds |
| Paper | `#F6F5F2` | Light backgrounds |
| Violet | `#7B5CFF` | Brand accent, the core of the mark |
| Slate | `#5B5868` | Secondary text on light |
| Mist | `#B4B0C2` | Secondary text on dark |
| Line | `#E2E0DA` | Dividers and hairlines |

- Type is Geist for text and Geist Mono for code and labels.
- Write the name in mixed case: Eclipse Dataspace Hub.
- Use the reversed mark and lockup on dark backgrounds.
- Keep one satellite diameter of clear space around the mark. Minimum sizes are 32 px for the mark, 120 px wide for the horizontal lockup, and 16 px for the favicon cut.

The site carries only the brand files it uses. The full kit, with stacked lockups, one-color marks, app icons, and PNG exports, is kept outside this repository.
