# Firebase Integration Testing Guide

Complete step-by-step guide to test the Firebase Cloud Storage and Firestore integration.

---

## Pre-Testing Checklist

- [ ] Firebase project created at [Firebase Console](https://console.firebase.google.com/)
- [ ] Firestore Database created (test mode)
- [ ] Firebase Storage enabled (test mode)
- [ ] `.env` file has correct Firebase credentials (not placeholders)
- [ ] Development server running: `npm start`
- [ ] No errors in browser console (F12 → Console tab)

---

## Test 1: Firebase Initialization

**What it tests**: Firebase configuration is loaded correctly

**Steps**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `Object.keys(window)`
4. Should NOT show Firebase initialization errors

**Expected Output**: ✅ No errors in console  
**If fails**: Check `.env` file values match Firebase Console exactly

---

## Test 2: Admin Login

**What it tests**: Authentication context is working

**Steps**:
1. Navigate to `http://localhost:3000/admin`
2. You should see login form
3. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
4. Click "Login"

**Expected Output**: ✅ Redirects to Admin Panel  
**If fails**: Check browser console for errors; verify `AuthContext.js` is properly exported

---

## Test 3: Admin Panel Access

**What it tests**: Admin route protection and UI loading

**Steps**:
1. After successful login, you're on Admin Panel
2. Check page loads completely
3. Click "Add Product" button

**Expected Output**: ✅ Modal form appears with all input fields  
**If fails**: Check console errors; verify `AdminPanel.js` is accessible

---

## Test 4: Image Upload (Most Important)

**What it tests**: Firebase Storage is configured and accepting uploads

**Steps**:
1. In Admin Panel modal, fill form:
   - Product Name: `Test Product`
   - Category: `Magnetic Frame`
   - Description: `Test description`
   - Upload Image: Select any image from your computer
2. Click image upload area
3. Select a JPG or PNG image (< 10MB)
4. Image preview should appear
5. Fill Sizes:
   - Size: `4x6`, Price: `299`
6. Fill Shapes:
   - Shape: `Square`, Price: `0`
7. Click "Add Product"

**Expected Output**:
- ✅ Button shows "Uploading Photo..."
- ✅ After 2-5 seconds: "Product added successfully!" alert
- ✅ Product appears in products list below

**If upload hangs**:
1. Check browser console (F12) for errors
2. Go to Firebase Console → Storage
3. Check if `products/` folder exists
4. Check if image file appears there
5. If not → Security Rules may be blocking; verify Storage Rules are in test mode

**If upload succeeds but image is broken**:
1. Check Firebase Console → Storage → See uploaded file
2. Right-click file → Copy download URL
3. Paste in new browser tab
4. Should show your image
5. If broken → Image file may be corrupted

---

## Test 5: Firestore Database Sync

**What it tests**: Product data is saved to Firestore

**Steps**:
1. After adding product in Admin Panel
2. Go to [Firebase Console](https://console.firebase.google.com/)
3. Select your project
4. Go to **Firestore Database**
5. Look for `products` collection
6. Click on it

**Expected Output**:
- ✅ `products` collection exists
- ✅ New product document appears with your test product
- ✅ Document has fields: `name`, `category`, `description`, `image`, `sizes`, `shapes`
- ✅ `image` field contains Firebase Storage URL (looks like: `https://storage.googleapis.com/...`)

**If collection is empty**:
1. Check browser console while adding product
2. Look for errors like "Firebase not initialized"
3. Verify Firestore is enabled in Firebase Console
4. Check Security Rules aren't blocking writes (should be open in test mode)

---

## Test 6: Real-time Sync on Homepage

**What it tests**: Real-time listener is working (new products appear immediately)

**Steps**:
1. In Admin Panel, add another test product (different name)
2. **Don't refresh the page**
3. Go to `http://localhost:3000/` (Homepage)
4. Look for newly added product in products grid
5. Should appear WITHOUT page refresh

**Expected Output**: ✅ New product visible immediately  
**If fails**:
1. Manually refresh page (Ctrl+R)
2. Product should appear after refresh
3. If still not there → Check Firestore has the product (Test 5)
4. If Firestore has it but homepage doesn't → Check ProductContext `onSnapshot` listener

---

## Test 7: Edit Product

**What it tests**: Update functionality and Firebase updates

**Steps**:
1. In Admin Panel, find a product row
2. Click the **Edit** (pencil) icon
3. Change product name to: `Test Product - Updated`
4. Change one size price
5. Click "Update Product"

**Expected Output**:
- ✅ "Product updated successfully!" alert
- ✅ Change immediately visible in products table
- ✅ Verify in Firestore Console the document is updated

---

## Test 8: Delete Product

**What it tests**: Delete functionality and real-time removal

**Steps**:
1. In Admin Panel, find a test product
2. Click **Delete** (trash) icon
3. Confirm deletion in popup

**Expected Output**:
- ✅ "Product deleted successfully!" alert
- ✅ Product immediately removed from table
- ✅ Product removed from Firestore (refresh Firebase Console to see)
- ✅ Product removed from homepage (refresh page)

---

## Test 9: Images Persist After Refresh

**What it tests**: Firebase Storage URLs are permanent

**Steps**:
1. Add a product with image
2. Wait for success message
3. **Close browser completely**
4. Reopen and navigate to homepage
5. Check if your product is still there with image

**Expected Output**: ✅ Product visible with correct image  
**If fails**: Images may not be properly stored; check Firebase Storage in Console

---

## Test 10: Local Default Products

**What it tests**: Default seed products appear on first load

**Steps**:
1. Go to Firestore Console
2. Delete all products in `products` collection
3. Refresh app
4. Check homepage

**Expected Output**: ✅ Default 4 products (Magnetic, Keychain, Acrylic, MDF) appear automatically  
**Note**: ProductContext automatically seeds defaults if collection is empty

---

## Test 11: Image Paths in ProductDetail

**What it tests**: Product images display correctly on detail page

**Steps**:
1. Click on any product on homepage
2. ProductDetail page loads
3. Image should display properly
4. All sizes and shapes should be selectable

**Expected Output**: ✅ Image loads; sizes/shapes dropdown work  
**If image broken**: Check image URL in Firestore is valid Firebase Storage URL

---

## Test 12: Cart Operations with Custom Products

**What it tests**: Customization works with Firebase-loaded products

**Steps**:
1. Click "Add to Cart" on any product
2. Select size
3. Select shape
4. Click "Add to Cart"
5. Go to Cart page
6. Product should show customization details

**Expected Output**: ✅ Cart displays product with selected size/shape  
**If fails**: Check sizes/shapes structure in Firestore product document

---

## Performance Tests

### Test 13: Load Time with Multiple Products

**Steps**:
1. Add 10+ products via Admin Panel
2. Measure homepage load time
3. Open DevTools Network tab
4. Reload page
5. Check load time

**Expected Output**:
- ✅ Homepage loads in < 3 seconds
- ✅ Firestore query is optimized
- ✅ Images load from Firebase CDN (fast)

### Test 14: Image Size Optimization

**Steps**:
1. Check image file sizes in Firebase Storage Console
2. Images should be reasonable size (< 2MB each)

**If too large**:
- Recommend compressing images before upload
- Users should resize images to max 1080px width
- JPEG quality 80-90 is good balance

---

## Deployment Tests

### Test 15: Build for Production

**Steps**:
1. Terminal: `npm run build`
2. Wait for build to complete
3. Check build output (should say "Build successful")

**Expected Output**: ✅ `build/` folder created with ~150KB gzipped size

### Test 16: Test Built App Locally

**Steps**:
1. Install serve globally: `npm install -g serve`
2. Run: `serve -s build`
3. Open `http://localhost:3000` (or shown port)
4. Test all functionality (add product, upload image, etc.)

**Expected Output**: ✅ All tests pass same as development

---

## Troubleshooting Matrix

| Problem | Cause | Solution |
|---------|-------|----------|
| Upload button disabled | Firebase not initialized | Check `.env` file values |
| "Uploading Photo..." hangs | Storage Rules blocked | Open Storage Rules to test mode |
| Image upload succeeds but broken link | URL not in Firestore | Check Firestore has `image` field with URL |
| Products don't appear on homepage | Real-time listener not working | Check browser console for `onSnapshot` errors |
| Admin login fails | Credentials wrong | Username: `admin`, Password: `admin123` |
| "Project ID not found" error | `.env` has wrong project ID | Copy exact value from Firebase Console |
| Firestore empty after restart | Default seed failed | Check for seed errors in console |
| Deployed site shows broken images | Authorized domains not added | Add domain to Firebase Authentication → Settings |

---

## Quick Debug Checklist

If something doesn't work:

```
1. Open browser console (F12)
   └─ Any red errors? Read them carefully

2. Check `.env` file
   └─ All values filled (not placeholders)?
   └─ Did you restart `npm start` after editing?

3. Check Firebase Console
   └─ Firestore Database enabled?
   └─ Storage enabled?
   └─ Data appearing in correct collections?

4. Check Security Rules
   └─ Firestore in test mode (allows all reads/writes)?
   └─ Storage in test mode?

5. Check network tab
   └─ Firebase requests showing 200 OK?
   └─ Or 403 Forbidden (security rules)?

6. Try hard refresh
   └─ Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   └─ Clears cache and reloads

7. Restart development server
   └─ Stop: Ctrl+C
   └─ Start: npm start
```

---

## Success Criteria

Your Firebase integration is working when:

✅ Admin can login  
✅ Admin can upload image and add product  
✅ Product appears in Firebase Storage (Console → Storage)  
✅ Product appears in Firestore (Console → Firestore)  
✅ Product immediately appears on homepage without refresh  
✅ Refreshing page shows product still there  
✅ Admin can edit and delete products  
✅ Homepage shows all 4 default products on first load  
✅ Product customization (sizes/shapes) works correctly  
✅ App builds successfully with `npm run build`  
✅ Production build works locally with `serve -s build`  

---

## Next Steps

1. Complete all tests above ✅
2. Deploy to Vercel/Netlify with environment variables
3. Add authorized domains in Firebase Console
4. Test deployment end-to-end
5. Update authentication to production level (not hardcoded credentials)
6. Monitor Firebase usage in Console

