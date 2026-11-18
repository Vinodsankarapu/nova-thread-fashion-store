# Nova Thread Fashion Store

React + Vite + Redux Toolkit + JSON Server fashion e-commerce demo.

## Features
- Product listing, details, search, filters and sorting
- Signup, login and protected routes
- Add/edit products
- Cart and wishlist
- Redux Toolkit state management

## Run locally

Requires Node.js and npm.

```bash
npm install
```

Create a `.env` file in this folder:

```env
VITE_API_URL=http://localhost:3000
```

Start the JSON Server backend in terminal 1:

```bash
npm run server
```

Start the React frontend in terminal 2:

```bash
npm run dev
```

## Deploy

This app has a separate frontend and JSON Server backend. Deploy both.

### 1. Push this project to GitHub

Create a new GitHub repository, then run these commands from this project folder:

```bash
git init
git add .
git commit -m "Initial commit - Nova Thread Fashion Store"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nova-thread-fashion-store.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Deploy the backend on Render

Create a **Web Service** from the GitHub repository.

- Root Directory: leave blank if this project folder is the repository root
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`

After deployment, copy the Render service URL, for example `https://your-api.onrender.com`.

The API should be reachable at `https://your-api.onrender.com/products`.

### 3. Deploy the frontend on Netlify

Import the same GitHub repository into Netlify.

- Base directory: leave blank if this project folder is the repository root
- Build command: `npm run build`
- Publish directory: `dist`

In Netlify site settings, add this environment variable:

```env
VITE_API_URL=https://your-api.onrender.com
```

Replace the value with your actual Render URL (no trailing slash). Trigger a new deploy after adding the variable.

The `public/_redirects` file is included for React Router routes.

## Important demo limitations

- `db.json` is a JSON Server demo database. Render's local filesystem may be ephemeral, so changes can be lost when the service restarts or redeploys unless you configure persistent storage. A managed database is better for a production store.
- The sample user in `db.json` is for local/demo testing only. Do not use real customer passwords or personal information. This demo should not be treated as production-ready authentication.
- Keep secrets out of GitHub. Put deployment configuration in platform environment variables.
