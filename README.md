# 🔔 Subscription Tracker API

![Node.js](https://img.shields.io/badge/Node.js-18.x%2B-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend%20Framework-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Mongoose-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT%20Bearer-red?logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A robust, scalable RESTful API built with Node.js, Express, and MongoDB that enables users to manage recurring subscriptions, monitor renewal deadlines, and receive automated reminders triggered by scheduled cron jobs.

---

## 🚀 Features

- **Authentication & Authorization:** Secure user registration, login, and route protection using JSON Web Tokens (JWT) and Bcrypt password hashing.
- **Role & Access Middleware:** Custom middleware protecting sensitive endpoints and validating user-specific resource ownership.
- **Subscription Lifecycle Management:** Complete CRUD operations for tracking subscription cost, billing cycles (monthly, quarterly, yearly), renewal dates, and status.
- **Automated Reminder Engine:** Background scheduled Cron jobs running periodic checks to notify users before upcoming subscription renewals.
- **Deduplication & Spam Guard:** Intelligent messaging utility designed to prevent duplicate reminder notifications.
- **Global Validation & Error Handling:** Standardized error handler middleware catching operational and validation errors cleanly across all endpoints.
- **Postman Ready:** Pre-configured Postman environment and collections included for rapid endpoint testing.

---

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
- **Scheduler:** Node-Cron
- **Authentication:** JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **Testing & API Tooling:** Postman

---

## 📂 Project Structure

```text
Subscription-Tracker-API/
├── config/             # Environment, DB connections, and third-party service configs
├── controllers/        # Business logic for auth, users, and subscriptions
├── database/           # MongoDB connection handlers and database schemas
├── middleware/         # Auth verification, rate limiting, and error handling
├── models/             # Mongoose data models (User, Subscription, etc.)
├── postman/            # Exported Postman collections and environment globals
│   └── globals/
├── routes/             # REST API endpoint definitions
├── utils/              # Helper functions, email triggers, and date parsers
├── .gitignore          # Ignored files (node_modules, .env)
├── app.js              # Application entry point and middleware configuration
└── package.json        # Dependencies and scripts
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Server Configuration
PORT=5500
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/subscription-tracker?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Email / Notification Service (if applicable)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/gnanasaidevarakonda/Subscription-Tracker-API.git](https://github.com/gnanasaidevarakonda/Subscription-Tracker-API.git)
   cd Subscription-Tracker-API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Update .env with your MongoDB credentials and secret keys
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   node app.js
   ```

The API will start listening at `http://localhost:5500`.

---

## 📖 API Endpoints Reference

### 🔐 Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/sign-up` | Register a new user account | Public |
| `POST` | `/api/v1/auth/sign-in` | Authenticate user and return JWT token | Public |
| `POST` | `/api/v1/auth/sign-out` | Clear user session / token | Private |

### 👤 User Management (`/api/v1/users`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/users` | Retrieve all users (Admin only) | Private/Admin |
| `GET` | `/api/v1/users/:id` | Get current user profile details | Private |
| `PUT` | `/api/v1/users/:id` | Update profile information | Private |
| `DELETE`| `/api/v1/users/:id` | Deactivate/delete account | Private |

### 💳 Subscriptions (`/api/v1/subscriptions`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/subscriptions` | Fetch all subscriptions for authenticated user | Private |
| `POST` | `/api/v1/subscriptions` | Create a new recurring subscription | Private |
| `GET` | `/api/v1/subscriptions/:id` | Retrieve subscription details by ID | Private |
| `PUT` | `/api/v1/subscriptions/:id` | Update pricing, renewal date, or status | Private |
| `DELETE`| `/api/v1/subscriptions/:id` | Remove a subscription record | Private |

---

## 🧪 Testing with Postman

1. Open Postman.
2. Click **Import** and navigate to the `postman/` directory inside this project.
3. Import both the collection and environment/globals files.
4. Set the `baseUrl` variable to `http://localhost:5500/api/v1` and start testing endpoints.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Gnana Sai Devarakonda**
- GitHub: [@gnanasaidevarakonda](https://github.com/gnanasaidevarakonda)

docs: add comprehensive README documentation
