Premium MLM demo site (Neon glass). Instructions:
1) Open firebase.js and replace the placeholders with your Firebase project's Web App config (Project Settings -> Your apps).
   - Make sure storageBucket uses .appspot.com and databaseURL is the Realtime DB URL.
2) In Firebase Console -> Realtime Database -> Rules, set temporary rules for testing:
{
  "rules": { ".read": true, ".write": true }
}
3) Upload these files to GitHub Pages or Netlify, or test locally by serving with a static HTTP server.
4) Register a new user — you will get an auto-generated customer ID (e.g., IDk9f1a-3A4B).
5) The system will place the new user under their sponsor using BFS (3x width).
