/**
 * Secure OS Authentication Module Script
 * Implementation of SHA-256 Hashing, MFA, and Security Checks
 */

// --- Constants & State ---
const MAX_INPUT_LENGTH = 30;
let generatedOTP = null;
let currentUsername = null;

// --- EmailJS Configuration ---
// TODO: User must replace these with their actual keys from https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = "service_qkbwlzh";
const EMAILJS_TEMPLATE_ID = "template_f8s56cc";
const EMAILJS_PUBLIC_KEY = "p2z-DfJcFbts9tQej"; // Also update in index.html if using init() there, or just use here.

// --- Security: Buffer Overflow Protection ---
// Limit input length and detect large pastes
function setupSecurityListeners(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener('input', (e) => {
        if (e.target.value.length >= MAX_INPUT_LENGTH) {
            // Prevent further input implicitly via maxlength attribute, 
            // but we can add visual feedback here.
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });

    input.addEventListener('paste', (e) => {
        const pasteData = (e.clipboardData || window.clipboardData).getData('text');
        if (pasteData.length > MAX_INPUT_LENGTH) {
            e.preventDefault();
            alert('security WARNING: Buffer Overflow Attempt Detected!\nInput size exceeds memory allocation limit (simulated).');
        }
    });
}

// Apply security to all password fields
setupSecurityListeners('password');
setupSecurityListeners('reg-password');
setupSecurityListeners('reg-username');


// --- Cryptography: SHA-256 Hashing ---
/**
 * Hashes a string using SHA-256.
 * Note: uses Web Crypto API (asynchronous).
 * @param {string} message - The plaintext to hash.
 * @returns {Promise<string>} - The hex string of the hash.
 */
async function sha256(message) {
    // encode as (utf-8) Uint8Array
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Generates a random salt.
 * @returns {string} - Random hex string.
 */
function generateSalt() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}


// --- Registration Logic ---
async function handleRegister() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const messageDiv = document.getElementById('register-message');

    if (!username || !password) {
        showMessage(messageDiv, "Please fill in all fields.", false);
        return;
    }

    if (localStorage.getItem('user_' + username)) {
        showMessage(messageDiv, "User already exists.", false);
        return;
    }

    // 1. Generate Salt
    const salt = generateSalt();

    // 2. Hash Password + Salt
    const hash = await sha256(password + salt);

    // 3. Store Securely (Simulation: localStorage is not truly secure against XSS, but sufficient for this demo)
    const userData = {
        salt: salt,
        hash: hash
    };

    // SECURITY NOTE: We NEVER store the plain text password.
    // SECURITY NOTE: No trapdoor (e.g., if username == 'admin' -> login) exists.

    localStorage.setItem('user_' + username, JSON.stringify(userData));

    showMessage(messageDiv, "Registration Successful! Redirecting...", true);
    setTimeout(() => {
        showLogin();
        document.getElementById('username').value = username;
        messageDiv.innerText = "";
        document.getElementById('reg-password').value = "";
    }, 1500);
}


// --- Login Logic ---
async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('username').value ? document.getElementById('password').value : "";
    // Fix: password field is id='password'
    const passwordInput = document.getElementById('password').value;
    const messageDiv = document.getElementById('login-message');

    if (!username || !passwordInput) {
        showMessage(messageDiv, "Please enter credentials.", false);
        return;
    }

    // Trapdoor Check: Explicitly showing NO backdoor
    // if (username === "admin" && password === "godmode") { ... } // DOES NOT EXIST

    const storedUserStr = localStorage.getItem('user_' + username);
    if (!storedUserStr) {
        // Generic error message to prevent User Enumeration
        showMessage(messageDiv, "Invalid username or password.", false);
        return;
    }

    const storedUser = JSON.parse(storedUserStr);

    // 1. Re-calculate hash using stored salt
    const attemptHash = await sha256(passwordInput + storedUser.salt);

    // 2. Compare hashes
    if (attemptHash === storedUser.hash) {
        // Password correct -> Proceed to MFA
        currentUsername = username;
        showMessage(messageDiv, "Password Verified. Initating MFA...", true);
        setTimeout(() => {
            showOTP();
        }, 1000);
    } else {
        showMessage(messageDiv, "Invalid username or password.", false);
    }
}


// --- MFA Logic ---
function showOTP() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('otp-screen').classList.remove('hidden');
    document.getElementById('otp-screen').classList.add('fade-in');

    generateOTP();
}

// --- Notification Logic ---
function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission();
    }
}

// Request permission on load
requestNotificationPermission();

function generateOTP() {
    // Generate secure random 6-digit number
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    // modulo 1,000,000 to get max 6 digits, padStart to ensure 6
    const otp = (array[0] % 1000000).toString().padStart(6, '0');
    generatedOTP = otp;

    // Simulate sending SMS/Email
    console.log(`%c [MFA SIMULATION] Your OTP code is: ${otp} `, 'background: #222; color: #bada55; font-size: 20px');

    // --- EmailJS Integration ---
    const emailParams = {
        to_name: currentUsername,
        otp_code: otp,
    };

    if (typeof EMAILJS_SERVICE_ID !== 'undefined' && EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID") {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams)
            .then(() => console.log('EmailJS Sent'), (err) => console.error('EmailJS Err', err));
    }

    // Send System Notification (Simulates message arriving on device)
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("New Message", {
            body: `Your Secure OS OTP Code is: ${otp}`,
            icon: "https://cdn-icons-png.flaticon.com/512/2058/2058768.png" // Shield icon
        });
    }

    // Fallback: Notify user to check email if notifications are strictly blocked
    // We no longer show the code in an alert since Email is working.
    if (!("Notification" in window) || Notification.permission !== "granted") {
        setTimeout(() => alert("[MFA SIMULATION]\n\nOTP sent to your Email."), 500);
    }

    const messageDiv = document.getElementById('otp-message');
    showMessage(messageDiv, "OTP Sent to Email & Notification.", true);
}

function handleOTP() {
    const input = document.getElementById('otp-input').value;
    const messageDiv = document.getElementById('otp-message');

    if (input === generatedOTP) {
        showMessage(messageDiv, "Authentication Verified.", true);
        setTimeout(() => {
            showDesktop();
        }, 1000);
    } else {
        showMessage(messageDiv, "Invalid OTP Code.", false);
    }
}


// --- UI Navigation & Helpers ---
function showRegister() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('register-screen').classList.remove('hidden');
    document.getElementById('register-screen').classList.add('fade-in');
}

function showLogin() {
    document.getElementById('register-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('login-screen').classList.add('fade-in');
}

function showDesktop() {
    document.getElementById('otp-screen').classList.add('hidden');
    document.getElementById('desktop-screen').classList.remove('hidden');

    // Update Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, 1000);
}

function showMessage(element, text, isSuccess) {
    element.innerText = text;
    element.className = "message " + (isSuccess ? "success" : "error");
}