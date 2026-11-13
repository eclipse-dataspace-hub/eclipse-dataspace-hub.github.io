# eclipse-dataspace-hub.github.io website

This repository contains the website of the [Eclipse Dataspace Hub](https://github.com/eclipse-dataspace-hub): the landing page, the demonstrators overview, and the learning paths.

## Running the website locally

Building and running the site locally requires [Node.js](https://nodejs.org/) 26 and npm. The exact version is in `.tool-versions`. The site is built with [Astro](https://astro.build/) and the [Starlight](https://starlight.astro.build/) documentation theme.

```bash
npm ci
npm run dev
```

Open `http://localhost:4321` in your browser. Changes to the content show up after you save.

## Building the website

```bash
npm run build     # build the static site into dist/
npm run preview   # serve the built site
```

The search works in the built site only, not with `npm run dev`.

## Deployment

The workflow in `.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages at <https://eclipse-dataspace-hub.github.io> on every push to `main`.

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) describes the structure of the site, the writing conventions for lectures, and the brand rules.

## License

Apache License 2.0. See [LICENSE](LICENSE).
