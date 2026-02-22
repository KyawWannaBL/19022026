Drop-in patch

1) Copy `src/pages/HomePage.tsx` into your project (same path).
2) Copy everything in `public/` into your project's `public/` folder:
   - public/hero.mp4
   - public/create_animated_video.gif
   - public/app-debug.apk
3) Copy `firebase.json` to your project root (if you deploy with Firebase Hosting).

Then:
- `npm run build`
- `firebase deploy`
