# 🔐 Secure OS Login Simulation Website

This project is a web-based Secure Operating System Login Simulation.
It includes:
- User Registration
- User Login
- OTP Verification (Multi-Factor Authentication)
- Desktop Screen UI after successful login
- Glassmorphism design

This project is built using:
HTML, CSS, and JavaScript.

---

## 📌 Project Features

- ✅ Register new user with username and password
- ✅ Login with saved credentials
- ✅ OTP verification system for security
- ✅ Desktop screen after successful authentication
- ✅ Clock display in taskbar
- ✅ Glassmorphism UI design
- ✅ Responsive layout
- ✅ Logout functionality

---

## 🛠 Technologies Used

- HTML5 → Structure of the webpage  
- CSS3 → Styling and glassmorphism UI  
- JavaScript → Logic for login, register, OTP, and screen switching  
- EmailJS → For OTP sending (email service)  

---

## 📂 Project Files Structure

/project-folder
│
├── index.html # Main HTML file
├── style.css # Styling file
├── script.js # JavaScript logic
├── wallpaper.png # Background image
└── README.md # Project documentation


---

## 🧠 Working Explanation (Step by Step)

### 1️⃣ index.html (Structure)

```html
<!DOCTYPE html>
<html>

```

→ Defines the HTML document.
<link rel="stylesheet" href="style.css">

→ Connects the CSS file for design.
<script src="script.js"></script>

2️⃣ Login Screen
<div id="login-screen" class="glass-panel">

→ Creates login UI panel.
<input type="text" id="username">
<input type="password" id="password">

→ Takes username and password from user.
<button onclick="handleLogin()">Login</button>

→ Calls JavaScript function to verify login.

3️⃣ Register Screen
→ Connects JavaScript logic.

