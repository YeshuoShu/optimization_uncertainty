# Uncertainty Framework Web

A full-screen interactive framework for presenting uncertainty sources in wildfire optimization.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Deploy to GitHub Pages

This project is already configured for GitHub Pages through GitHub Actions.

1. Create a new GitHub repository, for example `uncertainty-framework-web`.
2. Upload or push all files in this folder to the repository.
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push to the `main` branch. The site will build and deploy automatically.

For a normal project site, the URL will look like:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

The Vite `base` path is configured automatically in `vite.config.js`, so the project can work even if you rename the repository. If you deploy to a user/organization site such as `YOUR-USERNAME.github.io`, the base path automatically stays `/`.

## Presentation controls

- Click a node to enter its detail page.
- Click **Back to Framework** to return.
- Use keyboard **← / →** to move between uncertainty pages.
- Press **H**, **Home**, or **Esc** to return to the main framework.

## Design notes

- Built for horizontal large-screen presentation.
- Main color: `#003660`.
- White background, modern academic dashboard style.
- Replace the visual placeholder cards with original figures if needed.
