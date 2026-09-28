# Role-Based Access Login (React + Vite)

Set C - Q2: Login form with a role-based message.

## Run
```
npm install
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

## Features
- Username input with "Login as Admin" and "Login as Viewer" buttons
- After login the form is hidden and shows `Welcome, <username> (<role>)`
- Admin sees a "Delete Post" button on each post; Viewer sees "Read-only access"
- Logout button returns to the login form

Main code: `src/App.jsx`, styling: `src/App.css`. Q1 theory answer: `ANSWER_Q1.md`.
