# Spotify Dashboard

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#creating-your-own-dashboard">Creating Your Own Dashboard</a>
      <ul>
        <li><a href="#getting-the-data-ready">Getting the Data Ready</a></li>
        <li><a href="#replacing-the-data-in-the-publicdata-folder">Replacing the Data in the `public/data` Folder</a></li>
        <li><a href="#setting-up-secrets">Setting Up Secrets</a></li>
        <li><a href="#enabling-read-and-write-permissions">Enabling Read and Write Permissions</a></li>
      </ul>
    </li>
    <li><a href="#code-structure">Code Structure</a>
      <ul>
        <li><a href="#technologies">Technologies</a></li>
        <li><a href="#user-interface">User Interface</a></li>
        <li><a href="#charts">Charts</a></li>
        <li><a href="#state-management">State Management</a></li>
        <li><a href="#fonts">Fonts</a></li>
      </ul>
    </li>
    <li><a href="#automation">Automation</a></li>
    <li><a href="#running-the-development-server">Running the Development Server</a>
      <ul>
        <li><a href="#modify-the-nextconfigjs-file">Modify the `next.config.js` File</a></li>
        <li><a href="#installing-the-dependencies">Installing the Dependencies</a></li>
        <li><a href="#starting-the-server">Starting the Server</a></li>
      </ul>
    </li>
  </ol>
</details>


---

## Overview

Spotify introduced "Spotify Wrapped" as a yearly summary of a user's listening habits. It’s a fun way to share musical tastes with friends and family while promoting artists and songs. However, despite its engaging concept, it lacks depth in the statistics provided.

This project is a dynamic Spotify dashboard built with **React** and **TypeScript**, aimed at providing deeper insights into your listening habits. The dashboard can be accessed here: [https://yeriaddict.github.io/spotify-statistics/](https://yeriaddict.github.io/spotify-statistics/).

The website leverages the [Last.fm API](https://www.last.fm/api) to fetch your "scrobbles" (listened tracks) and the [Spotify API](https://developer.spotify.com/documentation/web-api) to process and validate data (e.g., verifying album, artist, and track names). The data is updated automatically every 15 minutes to reflect your most recent listening habits.

---

## Creating Your Own Dashboard

Although this dashboard is designed for personal use, you can fork and deploy your own version by following these steps:

### Getting the Data Ready

Due to Spotify API limitations, you cannot directly fetch all necessary data dynamically. You must:
1. Request your Spotify data as a JSON file and preprocess it. See the detailed instructions in this repository I created: [https://github.com/YeriAddict/spotify-data-processor](https://github.com/YeriAddict/spotify-data-processor).
2. Create a Last.fm account and sync it with your Spotify account.

### Replacing the Data in the `public/data` Folder

Once your dataset is ready:
1. Replace the existing `spotify_data.json` file in the `public/data` folder with your processed JSON file.
2. Keep the same filename (`spotify_data.json`) to ensure compatibility with the application.

**Note:** The `archive` folder contains a static backup of the initial dataset. This is useful for reference since the main JSON file is automatically modified during periodic updates.

### Setting Up Secrets

You will need API credentials to enable data fetching:
1. **Last.fm API Key**: Create an account and generate an API key [here](https://www.last.fm/api/account/create).
2. **Spotify API Credentials**: Create an app [here](https://developer.spotify.com/dashboard/) to get your client ID and secret.

Once you have your credentials:
1. Go to your repository's **Settings > Security > Secrets and variables > Actions**.
2. Add the following secrets:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `LASTFM_API_KEY`
   - `LASTFM_USERNAME`

### Enabling Read and Write Permissions

The repository requires write permissions for the GitHub Actions workflow to update the `spotify_data.json` file:
1. Go to **Settings > Code and Automation > Actions > General > Workflow Permissions**.
2. Enable **Read and Write Permissions**.

---

## Code Structure

### Technologies

This project uses the following technologies:
- **[React 18](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Next.js 14](https://nextjs.org/docs/getting-started)**

---

### User Interface

- **[HeroUI](https://www.heroui.com/)**: Used for UI components like buttons, cards, and modals.
- **[Tailwind CSS](https://tailwindcss.com/)**: Provides utility-first styling for responsive designs.
- **[next-themes](https://github.com/pacocoursey/next-themes/)**: Adds dark and light theme support.

---

### Charts

- **[recharts](https://recharts.org/en-US)**: Used for bar charts.
- **[nivo](https://nivo.rocks/)**: Used for the calendar chart.

---

### State Management

- **[react-query](https://tanstack.com/query/latest/docs/framework/react/overview)**: Handles data fetching and caching efficiently.

For more information, read [here](https://ui.dev/why-react-query)

---

### Fonts

- **[Lora](https://fonts.google.com/specimen/Lora)**: Primary font.
- **[Roboto](https://fonts.google.com/specimen/Roboto)**: Secondary font.

---

### Automation

The project is fully automated:
1. **Data Fetching and Processing**: The `update_data.py` script fetches and preprocesses the latest scrobbles from Last.fm and updates the JSON file.
2. **GitHub Actions Workflow**: The `update-data.yml` workflow runs every 15 minutes to:
   - Fetch the latest data.
   - Commit and push changes to the repository.
3. **Automatic Deployment**: A second workflow (`deploy-website.yml`) redeploys the website whenever new data is committed.

---

## Running the Development Server

Follow these steps to run the development server locally:

### Modify the `next.config.js` File

Update your `next.config.js` file with the following configuration. This file is not meant to be changed frequently and should be kept like this locally:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    /**
     * Enable static exports for the App Router.
     *
     * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
     */
    output: "export",

    /**
     * Set base path. This is the slug of your GitHub repository.
     *
     * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
     */
    basePath: "",

    /**
     * Disable server-based image optimization. Next.js does not support
     * dynamic features with static exports.
     *
     * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
     */
    images: {
      unoptimized: true,
    },
};

module.exports = nextConfig;
```

### Installing the dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Starting the server

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm run dev
```
