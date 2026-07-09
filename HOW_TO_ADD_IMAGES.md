# How to Add Product Images

## Step 1: Create Images Folder

1. Open the project folder: `d:\chaitrika.in`
2. Navigate to: `public` folder
3. Create a new folder named: `images`

Your path should be: `d:\chaitrika.in\public\images`

---

## Step 2: Add Your Product Images

Place your images in the `public/images` folder with these exact names:

### **Required Image Files:**

```
public/images/
├── magnetic-frame.jpg          (Main product image for Magnetic Frame)
├── magnetic-frame-2.jpg        (Alternative image 2)
├── magnetic-frame-3.jpg        (Alternative image 3)
├── keychain.jpg                (Main product image for Keychain)
├── acrylic-frame.jpg           (Main product image for Acrylic Frame)
└── mdf-frame.jpg               (Main product image for MDF Frame)
```

---

## Step 3: Image Requirements

### **Specifications:**
- **Format:** JPG or PNG
- **Size:** Minimum 500x500px (for best quality)
- **File Size:** Under 500KB each (for fast loading)
- **Aspect Ratio:** Square (1:1) recommended

### **Optimization Tips:**
- Compress images to reduce file size
- Use clear, well-lit product photos
- Show product in use or from multiple angles
- Use consistent lighting across all images

---

## Step 4: Verify Changes

After adding images:

1. **Restart dev server:** `npm start`
2. **Clear browser cache:** Press `Ctrl+Shift+Delete`
3. **Check if images load:** They should display on product cards

---

## Step 5: Deploy

When deploying, make sure to upload the `public` folder entirely, including the `images` subfolder.

### **Upload Structure:**
```
build/
├── index.html
├── static/
└── [other files]

public/
├── index.html
└── images/
    ├── magnetic-frame.jpg
    ├── keychain.jpg
    ├── acrylic-frame.jpg
    └── mdf-frame.jpg
```

---

## Troubleshooting

### **Images Not Showing on Localhost?**
- ✅ Check file names match exactly (case-sensitive on Linux/deployment)
- ✅ Verify images are in `public/images/` folder
- ✅ Restart `npm start`
- ✅ Clear browser cache

### **Images Not Showing After Deployment?**
- ✅ Ensure `public/images/` folder was uploaded
- ✅ Check file permissions (must be readable)
- ✅ Verify file names match ProductContext.js exactly
- ✅ Check browser console for 404 errors

### **Images Load Slowly?**
- ✅ Compress images to under 200KB
- ✅ Use tools like TinyPNG or ImageOptim
- ✅ Consider using WebP format for better compression

---

## Quick Image Sources

If you don't have product images, find free ones at:

1. **Pexels** (https://pexels.com) - Free stock photos
2. **Unsplash** (https://unsplash.com) - Free high-quality images
3. **Pixabay** (https://pixabay.com) - Free images
4. **Take your own photos** - Best option!

---

## File Names Reference

**Update ProductContext.js if you use different names:**

```javascript
// Example with different names:
image: '/images/my-magnetic-frame.png',  // Your file name

// Always use /images/ prefix for local files
// Format: /images/[filename].[extension]
```

---

## Commands Quick Reference

```bash
# Start development server
npm start

# Build for production
npm run build

# After adding images, restart:
npm start
```

---

## Need Help?

Make sure:
1. ✅ Folder path is exactly: `public/images/`
2. ✅ File names match ProductContext.js exactly
3. ✅ Image format is .jpg or .png
4. ✅ Server is restarted after adding images
5. ✅ Browser cache is cleared

Your images should now load both on localhost and after deployment! 🖼️
