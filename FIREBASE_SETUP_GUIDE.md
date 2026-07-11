# Firebase Cloud Storage Setup Guide

This guide walks you through setting up Firebase for the Chaitrika application to enable automatic product image uploads and real-time website updates.

## Prerequisites
- Google account
- Firebase project (free tier works)
- Environment variables configured

---

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `chaitrika-products` (or your choice)
4. Accept terms and click **"Continue"**
5. Disable Google Analytics (optional) → Click **"Create project"**
6. Wait for project to be created (~1-2 minutes)

---

## Step 2: Get Firebase Credentials

### For Web App:

1. In Firebase Console, click the **gear icon** → **Project settings**
2. Scroll down to **"Your apps"** section
3. Click **"Web"** (</>) to add a web app
4. App name: `chaitrika-web`
5. Check **"Also set up Firebase Hosting"** (optional)
6. Click **"Register app"**
7. **Copy the firebaseConfig object** - you'll need these values

Example config structure:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "chaitrika-products.firebaseapp.com",
  projectId: "chaitrika-products",
  storageBucket: "chaitrika-products.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd..."
};
```

---

## Step 3: Set Up Firestore Database

1. In Firebase Console, go to **"Firestore Database"**
2. Click **"Create database"**
3. Choose location closest to your users (default is fine)
4. **Start in test mode** (for development)
5. Click **"Create"**

Database will be created at: `firebaseproject.firebaseapp.com`

---

## Step 4: Enable Firebase Storage

1. In Firebase Console, go to **"Storage"**
2. Click **"Get started"**
3. Accept default location (usually `us-central1`)
4. Start in **"Test mode"** for development
5. Click **"Done"**

Storage bucket: `chaitrika-products.appspot.com`

---

## Step 5: Configure Environment Variables

### Local Development (.env file):

Create or update `.env` file in project root with your Firebase credentials:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyD_YOUR_API_KEY_HERE
REACT_APP_FIREBASE_AUTH_DOMAIN=chaitrika-projects.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=chaitrika-products
REACT_APP_FIREBASE_STORAGE_BUCKET=chaitrika-products.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcd1234efgh5678
```

**IMPORTANT**: 
- Never commit `.env` to git
- `.env` is already in `.gitignore`
- Each deployment environment needs its own `.env` file

---

## Step 6: Firebase Security Rules

### For Test Mode (Development):
Database and Storage are accessible to anyone. Fine for development, but secure before production.

### For Production, Update Rules:

**Firestore Rules** (if needed):
1. Go to **Firestore Database** → **Rules**
2. Update with authentication rules (set up admin authentication first)

**Storage Rules**:
1. Go to **Storage** → **Rules**
2. Click **"Edit rules"**
3. Replace with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{fileName} {
      // Allow anyone to read product images
      allow read: if true;
      // Allow only authenticated admins to upload
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

---

## Step 7: Set Up Admin Authentication (Optional but Recommended)

For production, set up proper admin authentication:

1. In Firebase Console, go to **Authentication**
2. Click **"Get started"**
3. Enable **"Email/Password"** sign-in method
4. Add your admin email address as a test user
5. Set custom claims via Firebase CLI or Cloud Functions to mark as admin

For now, the app uses hardcoded credentials in `AuthContext.js`:
- Username: `admin`
- Password: `admin123`

---

## Step 8: Verify Connection

### Check Firebase is Working:

1. **Terminal**: Navigate to project root
2. Run development server:
   ```bash
   npm start
   ```
3. App should load without errors in browser console
4. Check for Firebase connection in DevTools Console (shouldn't show errors)

### Test Admin Panel Upload:

1. Navigate to `http://localhost:3000/admin`
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. Click **"Add Product"**
4. Fill form with test data
5. Upload an image
6. Click **"Add Product"**

**Expected behavior**:
- ✅ Success message appears
- ✅ Image uploads to Firebase Storage
- ✅ Product appears in products list
- ✅ Product automatically shows on homepage/products page
- ✅ Page refreshes → product still there (persisted in Firestore)

---

## Step 9: Deployment

### For Vercel/Netlify:

1. Add environment variables in deployment platform:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_PROJECT_ID`
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - `REACT_APP_FIREBASE_APP_ID`

2. Deploy your app normally

3. Update Firebase Console **Authorized domains**:
   - Go to **Authentication** → **Settings**
   - Add your deployed domain (e.g., `chaitrika.vercel.app`)

4. Test admin panel on deployed site

### For Firebase Hosting:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase:
   ```bash
   firebase init hosting
   ```

3. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

## Troubleshooting

### "Firebase is not initialized"
- Check `.env` file has correct values
- Restart development server after updating `.env`
- Check `src/firebase.js` exports `db` and `storage`

### "Image upload fails silently"
- Check browser console for errors
- Open Firebase Console → **Storage** → Check if files appear
- Verify Storage Rules allow uploads

### "Products don't appear after upload"
- Check Firestore → **collections** → **products**
- Verify product document has correct structure
- Check ProductContext real-time listener is working (no console errors)

### "Images show broken links"
- Check image URLs in Firestore are valid
- Firebase Storage URLs look like: `https://storage.googleapis.com/bucket-name/products/filename`
- Verify Storage Rules allow read access

### "After deployment, admin panel doesn't work"
- Check environment variables are set in deployment platform
- Verify authorized domains in Firebase Authentication
- Check Security Rules allow your domain

---

## Security Checklist Before Production

- [ ] Change admin password in `AuthContext.js`
- [ ] Set up proper admin authentication (not hardcoded credentials)
- [ ] Update Firestore Security Rules (restrict to authenticated users)
- [ ] Update Storage Security Rules (restrict uploads to admins)
- [ ] Enable HTTPS (automatic on major platforms)
- [ ] Add rate limiting (consider Firebase Extensions)
- [ ] Monitor Storage usage (free tier: 5GB/month)
- [ ] Set up database backups

---

## File Structure

```
src/
├── firebase.js                 # Firebase config & exports
├── context/
│   ├── ProductContext.js       # Real-time sync from Firestore
│   └── AuthContext.js          # Admin authentication
└── pages/
    └── AdminPanel.js           # Product upload form
.env                            # Firebase credentials (not in git)
```

---

## Support Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Real-time Updates](https://firebase.google.com/docs/firestore/query-data/listen)
- [Firebase Storage Upload](https://firebase.google.com/docs/storage/web/upload-files)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

---

**Created**: July 2026  
**Last Updated**: July 2026
