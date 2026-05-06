# 🚀 FakeFlipkart - Quick Reference Card

## ⚡ Quick Start (60 seconds)

```bash
# Backend
cd backend
npm install
npm run dev  # Runs on port 5000

# Frontend (new terminal)
cd frontend
npm install
npm start    # Opens http://localhost:3000
```

---

## 🔑 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@example.com | admin123 |
| **User** | user@example.com | user123 |

> 💡 Tip: Run `node seed.js` in backend folder to create these accounts

---

## 💳 Test Payment

```
Card: 4111 1111 1111 1111
Expiry: Any future date (12/25)
CVV: Any 3 digits (123)
```

---

## 📍 URLs & Ports

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| MongoDB | mongodb+srv://... (Atlas) |

---

## 🗂️ Project Structure

```
ecommerce-mern-backend/
├── backend/          ← Express server
│   ├── models/       ← Database schemas
│   ├── routes/       ← API endpoints
│   ├── middleware/   ← Auth & validation
│   └── seed.js       ← Sample data
│
└── frontend/         ← React app
    └── src/
        ├── components/  ← Pages & components
        └── axiosConfig.js ← API client
```

---

## 🔌 API Endpoints (Quick Reference)

### Auth
- `POST /api/users/register` - Sign up
- `POST /api/users/login` - Sign in
- `GET /api/users/me` - Get profile

### Products
- `GET /api/products` - Get all
- `POST /api/products/:id/reviews` - Add review

### Cart & Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/my-orders` - View orders

### Admin
- `POST /api/products` - Add product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

---

## 🎨 Key Files to Know

| File | Purpose |
|------|---------|
| `backend/.env` | 🔑 Configuration |
| `backend/server.js` | 🚀 Main server |
| `frontend/src/App.js` | 🎯 Routes |
| `frontend/src/axiosConfig.js` | 🔗 API setup |

---

## 🛠️ Common Commands

```bash
# Backend
npm run dev          # Start with nodemon
npm test            # Run tests
npm run seed        # Populate database

# Frontend
npm start           # Start dev server
npm run build       # Production build
npm test            # Run tests
```

---

## 🐛 Debugging Tips

```bash
# Check MongoDB connection
# Look in Network tab (F12)
# Check browser console for errors
# Backend logs show API calls
# Check .env variables
```

---

## 📦 Key Dependencies

**Backend**
- `express` - Web framework
- `mongoose` - Database
- `jsonwebtoken` - Auth tokens
- `bcryptjs` - Password hashing
- `razorpay` - Payments

**Frontend**
- `react` - UI library
- `react-router` - Routing
- `axios` - HTTP client

---

## 🚨 Troubleshooting

### Issue: "Cannot find module"
```bash
cd folder
npm install
```

### Issue: Port already in use
```bash
# Change PORT in .env
# Or kill process using port:
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -i :5000
```

### Issue: MongoDB connection fails
- Check MONGO_URI in .env
- Whitelist IP in MongoDB Atlas
- Ensure MongoDB is running

### Issue: Razorpay not working
- Verify keys in .env
- Ensure you're in test mode
- Check Razorpay sandbox dashboard

---

## 🎯 Feature Checklist

- ✅ User authentication
- ✅ Product browsing
- ✅ Search & filters
- ✅ Shopping cart
- ✅ Checkout
- ✅ Payment (Razorpay)
- ✅ Order tracking
- ✅ Wishlist
- ✅ Reviews & ratings
- ✅ Admin dashboard
- ✅ Dark mode
- ✅ Responsive design

---

## 📱 Test on Mobile

```bash
# Find your machine IP
# ipconfig (Windows)
# ifconfig (macOS/Linux)

# On mobile, visit:
http://YOUR_IP:3000
```

---

## 🚀 Deployment Checklist

- [ ] Update MONGO_URI for production DB
- [ ] Change JWT_SECRET to random string
- [ ] Update RAZORPAY keys to production
- [ ] Set NODE_ENV=production
- [ ] Deploy backend (Render/Heroku)
- [ ] Update API URL in frontend
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Test all features in production

---

## 📚 Documentation

- **SETUP_GUIDE.md** - Detailed setup
- **PROJECT_COMPLETE.md** - Full documentation
- **API docs** - In SETUP_GUIDE.md

---

## 💡 Pro Tips

1. **Use MongoDB Compass** for easier database viewing
2. **Use Postman** to test APIs without frontend
3. **Check browser DevTools** for network issues
4. **Use `.env.example`** as template for new installations
5. **Run `npm install`** after pulling new code

---

## ✨ What's Included

✅ Complete backend with all routes  
✅ Complete frontend with all pages  
✅ Database schemas & models  
✅ Authentication & authorization  
✅ Payment integration  
✅ Admin panel  
✅ Sample data (seed.js)  
✅ Full documentation  
✅ Responsive design  
✅ Production-ready code  

---

## 🎓 Code Quality

- 📝 Well-documented
- ✅ Error handling included
- 🔒 Security best practices
- 📱 Mobile responsive
- 🎨 Consistent styling
- 🚀 Performance optimized

---

## 🆘 Need Help?

1. Check **SETUP_GUIDE.md**
2. Check **PROJECT_COMPLETE.md**
3. Check browser **Console** (F12)
4. Check **backend logs**
5. Check **.env** configuration

---

## 🎉 Ready to Go!

You have everything needed to:
- Run the application locally
- Make changes and improvements
- Deploy to production
- Add new features
- Learn full-stack development

**Start with:** `npm install` and `npm run dev`

---

**Happy Coding! 🚀**

