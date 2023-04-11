
# Spodissey

LyonHacks III Submission — Spicing up your life with music around the world! This software accesses your Spotify account and recommends songs from countries around the world.

## Pre-requisites

To run this program you will need:

- A [Node.js LTS](https://nodejs.org/en/) environment or later.
- A [Spotify Developer Account](https://developer.spotify.com/)

## Usage

Create an app in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/), set the redirect URI to `http://localhost:5173/callback` and `http://localhost:5173/callback/` and copy your Client ID. Replace the value for clientId in `/src/script.ts` with your own Client ID.

Clone the repository, and run:

```bash
npm install
npm run dev
``` 

