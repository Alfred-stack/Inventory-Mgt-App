# Deployment Guide - InventoryPro

## Repository Structure
```
wares-hub/
├── frontend/          # React app (move current code here)
├── backend/           # Express.js server (your existing backend)
├── README.md
└── DEPLOYMENT.md      # This file
```

## Step 1: Restructure Repository

1. Create `frontend/` and `backend/` folders in your GitHub repo
2. Move all current frontend files to `frontend/` folder
3. Move your Express.js backend files to `backend/` folder

## Step 2: Deploy Backend to Render

1. **Create Render Account**: Sign up at [render.com](https://render.com)
2. **Connect GitHub**: Link your wares-hub repository
3. **Create Web Service**:
   - Service Type: Web Service
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Environment Variables** (Add these in Render dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=https://your-vercel-domain.vercel.app
   ```

## Step 3: Setup MongoDB Atlas

1. **Create MongoDB Atlas Account**: [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Create Free Cluster**
3. **Get Connection String**: Replace `<password>` with your database user password
4. **Whitelist IPs**: Add `0.0.0.0/0` for Render access

## Step 4: Deploy Frontend to Vercel

1. **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Import Project**: Connect your GitHub repository
3. **Configure Project**:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables** (Add in Vercel dashboard):
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com
   ```

## Step 5: Update Backend CORS

In your backend Express.js app, update CORS configuration:

```javascript
// backend/server.js or app.js
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:8080', // Development
    'https://your-vercel-domain.vercel.app' // Production
  ],
  credentials: true
}));
```

## Step 6: Test Deployment

1. **Backend Health Check**: Visit `https://your-render-backend.onrender.com/health`
2. **Frontend**: Visit your Vercel URL
3. **API Integration**: Test CRUD operations in the deployed frontend

## Environment Variables Summary

### Render (Backend):
- `NODE_ENV=production`
- `PORT=10000`
- `MONGODB_URI=mongodb+srv://...`
- `JWT_SECRET=your_secret`
- `CORS_ORIGIN=https://your-vercel-domain.vercel.app`

### Vercel (Frontend):
- `VITE_API_URL=https://your-render-backend.onrender.com`

## Notes

- **Free Tier Limitations**: 
  - Render: 750 hours/month, sleeps after 15min inactivity
  - Vercel: Unlimited static hosting
  - MongoDB Atlas: 512MB storage

- **Domain Setup**: Both platforms support custom domains with paid plans

- **Automatic Deployments**: Both services auto-deploy on GitHub pushes

## Troubleshooting

1. **CORS Errors**: Ensure backend CORS origin matches frontend domain
2. **API Connection**: Check `VITE_API_URL` environment variable
3. **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist
4. **Build Failures**: Check build logs in respective platforms

Your frontend is now deployment-ready with automatic backend detection!