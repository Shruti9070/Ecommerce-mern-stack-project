# 🛍️ FakeFlipkart - Complete MERN eCommerce Website

A full-featured eCommerce platform built with **React**, **Node.js/Express**, and **MongoDB**, similar to Flipkart with authentication, product management, cart system, orders, and payment integration.

## ✨ Features Implemented

### ✅ 1. Authentication System
- Signup & Login pages
- JWT token authentication
- bcrypt password hashing
- Token stored in localStorage
- Logout functionality
- Protected routes

### ✅ 2. User Roles
- User and Admin roles
- Role-based access control
- Admin-only routes protected

### ✅ 3. Product System
- Product listing with filters
- Product details page
- Multiple images per product
- Ratings and reviews system
- Specifications support
- Category-based organization

### ✅ 4. Search & Filter
- Search by product name (real-time)
- Filter by category
- Filter by price range
- Sort options (low-to-high, high-to-low, rating)

### ✅ 5. Cart System
- Add to cart functionality
- Increase/decrease quantity
- Remove items
- Auto total calculation
- localStorage persistence

### ✅ 6. Order System
- Order creation and storage
- Order tracking
- Order history page
- Order status management (Admin)

### ✅ 7. Payment Integration
- Razorpay payment gateway (test mode)
- Multiple payment methods (UPI, Cards, Wallets)
- Payment verification
- Order confirmation

### ✅ 8. Admin Panel
- Product management (Add, Update, Delete)
- View all products
- Order management
- Order status updates
- Role-based protection

### ✅ 9. UI Design (Flipkart Style)
- Navbar with search and categories
- Banner section on homepage
- Product grid layout with hover effects
- Footer section
- Responsive design
- Colors: Blue (#2874f0), Orange (#fb641b)
- Smooth transitions and animations

### ✅ 10. Bonus Features
- ❤️ Wishlist system
- ⭐ Product reviews
- 🌙 Dark mode toggle
- Image zoom on product details
- User-friendly UI

### ✅ 11. Error Handling & Loading
- Loading states while fetching
- Error messages displayed properly
- Form validation
- API error handling

---

## 📁 Project Structure

```
ecommerce-mern-backend/
│
├── backend/
│   ├── server.js                 # Express server
│   ├── package.json              # Backend dependencies
│   ├── .env                       # Environment variables
│   │
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   │
│   ├── models/
│   │   ├── User.js               # User schema (with role)
│   │   ├── Product.js            # Product schema (enhanced)
│   │   ├── Order.js              # Order schema
│   │   ├── Wishlist.js           # Wishlist schema
│   │
│   ├── routes/
│   │   ├── userRoutes.js         # Auth & user routes
│   │   ├── productRoutes.js      # Product routes (with filters)
│   │   ├── orderRoutes.js        # Order routes
│   │   ├── wishlistRoutes.js     # Wishlist routes
│   │   ├── paymentRoutes.js      # Razorpay payment routes
│   │
│   └── middleware/
│       └── auth.js               # JWT verification & role check
│
├── frontend/
│   ├── package.json              # Frontend dependencies
│   ├── public/
│   │   └── index.html
│   │
│   └── src/
│       ├── App.js                # Main routing
│       ├── index.js
│       │
│       ├── axiosConfig.js        # API interceptor with auth
│       │
│       ├── Components:
│       ├── Navbar.js             # Top navigation
│       ├── Footer.js             # Footer component
│       ├── HomePage.js           # Product listing with filters
│       ├── ProductDetails.js     # Single product + reviews
│       ├── CartPage.js           # Shopping cart
│       ├── CheckoutPage.js       # Checkout & payment
│       ├── OrderSuccess.js       # Order confirmation
│       ├── Login.js              # Login page
│       ├── Signup.js             # Signup page
│       ├── AdminDashboard.js     # Admin panel
│       ├── Wishlist.js           # Wishlist page
│       ├── MyOrders.js           # Order history
│       │
│       └── Styles (CSS):
│           ├── App.css
│           ├── Navbar.css
│           ├── Footer.css
│           ├── HomePage.css
│           ├── ProductDetails.css
│           ├── Cart.css
│           ├── Checkout.css
│           ├── OrderSuccess.css
│           ├── Auth.css
│           ├── AdminDashboard.css
│           ├── Wishlist.css
│           └── MyOrders.css
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone & Navigate
```bash
cd ecommerce-mern-backend
```

### Step 2: Setup Backend

```bash
cd backend
npm install

# Create .env file with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
RAZORPAY_KEY_ID=rzp_test_1DP5MMOk9V27p3
RAZORPAY_KEY_SECRET=rn3PnnIYYiHw6Y5n3VJpMnJ8

# Start backend
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 3: Setup Frontend

```bash
cd frontend
npm install

# Start frontend
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🔑 Environment Variables

### Backend (.env)
```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Server
PORT=5000

# Razorpay (Test Keys)
RAZORPAY_KEY_ID=rzp_test_1DP5MMOk9V27p3
RAZORPAY_KEY_SECRET=rn3PnnIYYiHw6Y5n3VJpMnJ8
```

---

## 📚 API Endpoints

### Authentication
```
POST   /api/users/register         - Sign up new user
POST   /api/users/login            - Login user
GET    /api/users/me               - Get current user (Protected)
PUT    /api/users/profile          - Update profile (Protected)
POST   /api/users/logout           - Logout (Protected)
```

### Products
```
GET    /api/products               - Get all products (with filters)
GET    /api/products/:id           - Get product details
POST   /api/products               - Create product (Admin only)
PUT    /api/products/:id           - Update product (Admin only)
DELETE /api/products/:id           - Delete product (Admin only)
GET    /api/products/categories/all - Get all categories
POST   /api/products/:id/reviews   - Add review (Protected)
```

### Orders
```
POST   /api/orders                 - Create order (Protected)
GET    /api/orders/user/my-orders  - Get user orders (Protected)
GET    /api/orders/:id             - Get order details (Protected)
GET    /api/orders                 - Get all orders (Admin only)
PUT    /api/orders/:id/status      - Update order status (Admin only)
```

### Wishlist
```
GET    /api/wishlist               - Get wishlist (Protected)
POST   /api/wishlist/add/:productId     - Add to wishlist (Protected)
DELETE /api/wishlist/remove/:productId  - Remove from wishlist (Protected)
```

### Payment
```
POST   /api/payments/create-order  - Create Razorpay order (Protected)
POST   /api/payments/verify-payment - Verify payment (Protected)
```

---

## 👤 Test Accounts

### For Testing (Create these in MongoDB or via signup):

**Admin Account:**
- Email: admin@example.com
- Password: admin123
- Role: admin

**User Account:**
- Email: user@example.com
- Password: user123
- Role: user

---

## 💳 Razorpay Payment Testing

### Test Card Details:
```
Card Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
```

### Test UPI:
```
Use: success@razorpay
```

---

## 🎨 Styling Features

- **Flipkart Color Scheme**: Blue (#2874f0) & Orange (#fb641b)
- **Responsive Design**: Mobile, Tablet, Desktop
- **Dark Mode**: Toggle with moon icon
- **Smooth Animations**: Hover effects, transitions
- **Modern Layout**: Grid-based design, flexbox

---

## 🔒 Security Features

1. **Password Hashing**: bcryptjs (10 salt rounds)
2. **JWT Authentication**: Secure token-based auth
3. **Protected Routes**: Role-based access control
4. **Admin Verification**: Server-side role check
5. **CORS Enabled**: Frontend-backend communication
6. **Environment Variables**: Sensitive data in .env

---

## ✅ Testing Workflow

1. **Register/Login**: Create account or login
2. **Browse Products**: Filter, search, view details
3. **Add Reviews**: Rate products
4. **Wishlist**: Save favorite items
5. **Add to Cart**: Shop products
6. **Checkout**: Enter shipping details
7. **Payment**: Complete with Razorpay
8. **Track Orders**: View in "My Orders"
9. **Admin**: Add/manage products and orders

---

## 📱 Features by Page

### HomePage
- Product grid with 4 columns
- Search bar with real-time filtering
- Filter by category, price, rating
- Sort options
- Add to cart directly

### Product Details
- Multiple images with zoom
- Full description and specs
- Rating and reviews
- Add review form
- Wishlist button

### Cart
- Product list with images
- Quantity controls
- Remove items
- Order summary
- Proceed to checkout

### Checkout
- Shipping address form
- Payment method selection
- Razorpay integration
- Order summary

### My Orders
- Order list
- Order tracking status
- Order details view
- Track shipping

### Admin Dashboard
- Add product form
- Product list table
- Delete products
- Order management
- Status updates

### Wishlist
- Saved products grid
- Quick add to cart
- View product details

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
```bash
# Install missing dependencies
npm install
```

### Issue: MongoDB Connection Error
```bash
# Check MONGO_URI in .env
# Ensure MongoDB is running
# Verify IP whitelist in MongoDB Atlas
```

### Issue: Payment Not Working
```bash
# Verify Razorpay keys in .env
# Check if script is loaded: check in browser console
# Use correct test keys for test mode
```

### Issue: CORS Error
```bash
# Backend server.js already includes CORS
# Ensure frontend URL matches backend CORS settings
```

---

## 📊 Database Collections

### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  phone: String,
  address: String,
  profileImage: String,
  timestamps
}
```

### Products
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  image: String,
  images: [String],
  description: String,
  category: String,
  rating: Number,
  reviews: [{
    userId, userName, rating, comment, createdAt
  }],
  specifications: {},
  stock: Number,
  timestamps
}
```

### Orders
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  products: [{
    productId, name, price, quantity, image
  }],
  total: Number,
  paymentMethod: String,
  paymentId: String,
  status: String,
  shippingAddress: {},
  timestamps
}
```

---

## 🎓 Learning Resources

- **React**: Component-based UI, Hooks, Router
- **Express.js**: RESTful APIs, Middleware, Error handling
- **MongoDB**: NoSQL database, Mongoose schema
- **Authentication**: JWT, bcryptjs, Protected routes
- **Payment**: Razorpay integration
- **Responsive Design**: CSS Grid, Flexbox, Media queries

---

## 📝 Future Enhancements

- [ ] Email notifications
- [ ] SMS order updates
- [ ] Analytics dashboard
- [ ] Product recommendations
- [ ] Coupon/Promo codes
- [ ] Inventory management
- [ ] Refund management
- [ ] Customer support chat
- [ ] Product variants
- [ ] Bulk orders
- [ ] Subscription products
- [ ] Social login (Google, Facebook)

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Verify .env variables
5. Check network tab in DevTools

---

## 📄 License

This is a learning project. Free to use and modify.

---

## 🎉 Enjoy Building!

Start the development servers and begin shopping! 🛒

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start
```

Happy coding! 🚀
