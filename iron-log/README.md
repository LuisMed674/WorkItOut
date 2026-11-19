# Iron Log (React + Vite, browser-only)

    npm install
    npm run dev

All data is stored in this browser's localStorage (`ironlog_v1` for workouts, `ironlog_weight_v1` for weight).
Clearing site data or switching browsers/devices starts fresh.

## Deploy to GitHub Pages
1. Push this project to a GitHub repo's `main` branch.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push.
