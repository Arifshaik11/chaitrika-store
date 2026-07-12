# Supabase Setup Guide for Chaitra Wrap@Wear

## 🚀 Quick Setup

### Step 1: Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create new project
4. Project name: `chaitrika-store`
5. Password: (secure password)
6. Region: Select nearest (India if available)
7. Click "Create new project"

### Step 2: Get API Keys
1. Go to Project Settings → API
2. Copy these values:
   - `Project URL` → Save as `REACT_APP_SUPABASE_URL`
   - `anon (public) key` → Save as `REACT_APP_SUPABASE_ANON_KEY`

### Step 3: Create Database Table
1. Go to SQL Editor (left sidebar)
2. Click "New Query"
3. Copy and paste this SQL:

```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  basePrice INTEGER,
  sizes JSONB,
  shapes JSONB,
  customizable BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable real-time
ALTER PUBLICATION supabase_realtime ADD TABLE products;
```

4. Click "Run"
5. Done!

### Step 4: Update .env File
Add these lines to your `.env` file:

```
REACT_APP_SUPABASE_URL=your_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 5: Set Storage Bucket (Optional)
For better image storage:

1. Go to Storage (left sidebar)
2. Click "Create bucket"
3. Name: `product-images`
4. Privacy: Public
5. Click "Create"

---

## 🔐 Security Rules

Go to SQL Editor and run this to set up RLS:

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Everyone can read
CREATE POLICY "Enable read for all users" ON products
  FOR SELECT USING (true);

-- Only authenticated users can insert
CREATE POLICY "Enable insert for authenticated users" ON products
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Enable update for authenticated users" ON products
  FOR UPDATE USING (true);

-- Only authenticated users can delete
CREATE POLICY "Enable delete for authenticated users" ON products
  FOR DELETE USING (true);
```

---

## ✅ Features Available

- ✅ **Add Products** - Upload with images
- ✅ **Edit Products** - Modify existing products
- ✅ **Delete Products** - Remove products
- ✅ **Real-time Sync** - Changes appear instantly
- ✅ **No Localhost** - Works on live website
- ✅ **Image Storage** - Base64 images in database

---

## 🧪 Test It

1. Deploy your updated code
2. Go to `/admin` and login
3. Click "Add Product"
4. Fill in details and upload image
5. Click "Add Product"
6. Check `/products` page - new product appears instantly!

---

## 🆘 Troubleshooting

**Problem:** "Missing environment variables"
- **Solution:** Check .env file has both keys

**Problem:** Products not showing
- **Solution:** Check Supabase table has data in SQL Editor

**Problem:** Changes not syncing
- **Solution:** Check RLS policies are set up correctly

---

## 📊 Database Schema

| Column | Type | Notes |
|--------|------|-------|
| id | TEXT | Unique product ID |
| name | TEXT | Product name |
| category | TEXT | Product category |
| description | TEXT | Product description |
| image | TEXT | Base64 image data |
| basePrice | INTEGER | Base price |
| sizes | JSONB | Array of sizes with prices |
| shapes | JSONB | Array of shapes with prices |
| customizable | BOOLEAN | Is customizable |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update |

---

## 💡 Tips

- Use Supabase Dashboard to view/edit data
- Check real-time updates in SQL Editor
- Images are stored as base64 for simplicity
- All changes sync automatically across instances

**Your product management is now powered by Supabase!** 🎉
