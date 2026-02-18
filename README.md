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
```html
<script src="script.js"></script>
```

2️⃣ Login Screen
```html
<div id="login-screen" class="glass-panel">
```

→ Creates login UI panel.
```html
<input type="text" id="username">
<input type="password" id="password">
```

→ Takes username and password from user.
```html
<button onclick="handleLogin()">Login</button>
```

→ Calls JavaScript function to verify login.

3️⃣ Register Screen
→ Connects JavaScript logic.
```html
<div id="register-screen">
```

→ Screen for creating new account.
```html
<input id="reg-username">
<input id="reg-password">
```

→ Stores new username and password.
```html
<button onclick="handleRegister()">Create Account</button>
```

→ Saves user data.

4️⃣ OTP Screen
```html
<div id="otp-screen">
```

→ Security verification screen.
```html
<input id="otp-input" maxlength="6">
```

→ User enters 6-digit OTP.
```html
<button onclick="handleOTP()">Verify Access</button>
```

→ Confirms OTP.

5️⃣ Desktop Screen
```html
<div id="desktop-screen">
```
→ Shows desktop after successful login.

Contains:

- Taskbar

- Clock

- Desktop icons

- Logout button


🎨 style.css (Design Explanation)
Glassmorphism Panel

```html
.glass-panel {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  border-radius: 16px;
}
```
→ Creates glass effect UI.

Background

```html
.background-container {
  background: url('wallpaper.png');
}
```
→ Adds wallpaper image.

Buttons

```html
button:hover {
  background: rgba(255,255,255,0.3);
}
```
→ Hover animation effect.

Desktop Taskbar

```html
.taskbar {
  position: absolute;
  bottom: 0;
}
```
→ Taskbar fixed at bottom like OS.

# ⚙️ script.js (Logic Explanation)

Register Function

```html
function handleRegister() {
```

→ Saves username and password.
Login Function
```html
function handleLogin() {
```

→ Checks entered credentials with saved data.

OTP Generator
```html
function generateOTP() {
```

→ Creates random 6-digit OTP.

OTP Verification
```html
function handleOTP() {
```

→ Verifies OTP entered by user.

Screen Switching
```html
showLogin()
showRegister()
```

→ Switches between login & register screens.

Clock Function
```html
setInterval(updateClock, 1000);
```
→ Updates time every second.


# 🚀 How to Run Project

1. Download or clone the repository

2. Open index.html in browser

3. Register new user

4. Login with credentials

5. Enter OTP

6. Access desktop screen

# 📸 Screenshots

<img width="1919" height="1079" alt="Screenshot 2026-02-17 154726" src="https://github.com/user-attachments/assets/85ceb8e7-7edb-4a1e-a3a4-c569b75121a9" />
<img width="1919" height="789" alt="Screenshot 2026-02-17 154739" src="https://github.com/user-attachments/assets/febb4a4f-9243-4002-aa7f-38c116fcc3af" />
<img width="1918" height="985" alt="Screenshot 2026-02-17 154838" src="https://github.com/user-attachments/assets/d0851803-e966-41f7-bfdb-3078f0c81c9c" />
<img width="1919" height="983" alt="Screenshot 2026-02-17 154819" src="https://github.com/user-attachments/assets/21810e64-1013-40b1-ab12-20235b7d6ba1" />

🔮 Future Improvements

- Database connection

- Real authentication system

- Profile settings

- File explorer simulation

- Dark/Light mode

- Mobile optimization



