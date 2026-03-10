===== PERSONAL BUDGET MANAGEMENT APPLICATION =====

Project: FER202-02
Subject Code: FER202
Duration: 85 minutes

TECHNOLOGY STACK:
- ReactJS (Functional Components & Hooks)
- Redux Toolkit (State Management)
- React Router (Routing)
- Bootstrap 5 (UI Framework)
- Axios (HTTP Client)
- JSON Server (Mock Backend)

INSTALLATION AND RUN:

1. Install dependencies:
   npm install

2. Start JSON Server (Terminal 1):
   npm run server
   - Server will run on http://localhost:3001
   - Uses db.json as database
   • API calls in development default to http://localhost:3001; if you
     prefer to run the app completely offline (no server) set
     `REACT_APP_API_URL=""` before starting React.  The app will then use
     an in‑memory list (expenses are not persisted across reloads).

3. Start React App (Terminal 2):
   npm start
   - App will run on http://localhost:3000
   - Automatically opens in browser

DEFAULT LOGIN CREDENTIALS:
- Username: admin
- Password: 123456
- Full Name: Nguyen Van Anh

FEATURES IMPLEMENTED:

✅ Authentication:
   - Login page with username/password validation
   - Check both fields are not empty
   - Password must be at least 6 characters
   - Redirect to /home on success
   - Logout functionality

✅ Dashboard:
   - Header with app name and user info
   - Total expenses display (formatted in VND)
   - Filter by category
   - Add Expense form with validation
   - Expense Management table with Edit/Delete

✅ Expense Management:
   - Add new expenses with validation
   - Edit existing expenses
   - Delete expenses with confirmation
   - Real-time updates
   - Display date in DD-MM-YYYY format
   - Amount formatted with thousand separators

✅ Filtering:
   - Filter expenses by category
   - "All categories" option to show all expenses
   - Drop-down selector

✅ Form Validation:
   - Name: Required, non-empty
   - Category: Required, selected from dropdown
   - Amount: Required, must be > 0
   - Date: Required

PROJECT STRUCTURE:

fer202-02/
├── src/
│   ├── components/
│   │   ├── addExpenseForm.js      - Add/Edit expense form
│   │   ├── expenseTable.js        - Expense table with Edit/Delete
│   │   ├── filter.js              - Category filter
│   │   ├── header.js              - Navigation header
│   │   ├── footer.js              - Footer
│   │   ├── totalCard.js           - Total expenses display
│   │   ├── Header.css
│   │   └── Footer.css
│   ├── pages/
│   │   ├── loginPage.js           - Login page
│   │   └── homePage.js            - Main dashboard
│   ├── redux/
│   │   ├── store.js               - Redux store configuration
│   │   ├── authSlice.js           - Auth state management
│   │   └── expenseSlice.js        - Expense state management
│   ├── services/
│   │   └── api.js                 - Axios API instance
│   ├── routes/
│   │   └── appRoutes.js           - Route configuration
│   ├── App.js
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
├── db.json                         - JSON Server database
├── package.json
└── README.md

INSTALLED PACKAGES:
- react@^19.2.4
- react-dom@^19.2.4
- react-router-dom@^7.13.1
- @reduxjs/toolkit@^2.11.2
- react-redux@^9.2.0
- axios@^1.13.6
- bootstrap@^5.3.1
- json-server@^1.0.0-beta.12
- react-scripts@5.0.1
- @testing-library/react@^16.3.2
- @testing-library/jest-dom@^6.9.1
- @testing-library/user-event@^13.5.0
- web-vitals@^2.1.4

NOTES:
- Redux Toolkit is used for state management (Full 10 marks)
- Protected routes for /home page
- Real-time updates when adding/editing/deleting expenses
- Responsive design with Bootstrap

BUILD FOR PRODUCTION:
npm run build

===== END OF README =====
