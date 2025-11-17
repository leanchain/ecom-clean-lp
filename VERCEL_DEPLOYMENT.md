# Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

Your repository is configured and ready for Vercel deployment!

---

## 🔑 Required Environment Variables

Before deploying, you **MUST** add the following environment variable to Vercel:

### SHADCNBLOCKS_API_KEY

This API key is used by the shadcnblocks component registry during the build process.

**Steps to add:**

1. Go to your Vercel project: https://vercel.com/fieson/ecom-clean-lp
2. Navigate to **Settings → Environment Variables**
3. Click **Add New**
4. Add the following:
   - **Name:** `SHADCNBLOCKS_API_KEY`
   - **Value:** `sk_live_td2qxakzgUnUFkxVkjFRZmNAlCgxkN6C`
   - **Environments:** Select all (Production, Preview, Development)
5. Click **Save**

---

## 🚀 Deployment Settings

Verify these settings in your Vercel project:

**Framework Preset:** Next.js (auto-detected)  
**Build Command:** `npm run build` (default)  
**Output Directory:** `.next` (default)  
**Install Command:** `npm install` (default)  
**Node Version:** 18.x or higher (Next.js 15 requires Node 18.17+)

---

## 📋 What's Already Configured

✅ **Next.js 15** with App Router  
✅ **TypeScript** with path aliases (`@/*`)  
✅ **Tailwind CSS 4** with custom configuration  
✅ **MDX Support** for blog posts  
✅ **Image Optimization** (AVIF/WebP)  
✅ **All dependencies** properly listed  
✅ **.gitignore** configured correctly  
✅ **Blog "Coming Soon"** page (no content yet)

---

## 🔄 Triggering a Deployment

After adding the environment variable:

1. **Option A:** Push a new commit to trigger automatic deployment
2. **Option B:** Go to Vercel dashboard → Deployments → Redeploy

---

## 🐛 Troubleshooting

### Build Fails with "SHADCNBLOCKS_API_KEY not found"
- Make sure you added the environment variable in Vercel settings
- Verify it's enabled for the correct environment (Production/Preview)
- Redeploy after adding the variable

### Blog Page Shows Empty
- This is expected! All old speaker blog posts were archived
- The page now shows a "Coming Soon" message
- Add new Fieson-related blog posts to `src/blog/` when ready

### Images Not Loading
- All images are local and should work fine
- Verify `/public/images/` and `/public/videos/` directories exist

---

## 📝 Post-Deployment Tasks

After successful deployment:

1. ✅ Test all pages (homepage, pricing, demo, contact, comparison)
2. ✅ Verify blog shows "Coming Soon" message
3. ✅ Check Cal.com booking embed on `/demo` page
4. ✅ Test dark mode toggle
5. ✅ Verify all images load correctly
6. ✅ Test responsive design on mobile

---

## 🎯 Next Steps

1. **Add the environment variable** (see above)
2. **Trigger a deployment**
3. **Monitor build logs** for any errors
4. **Test the live site**
5. **Create Fieson blog content** (optional, when ready)

---

## 📞 Support

If you encounter any issues:
- Check Vercel build logs for specific errors
- Verify all environment variables are set correctly
- Ensure Node version is 18.17 or higher

---

**Last Updated:** 2025-11-17

