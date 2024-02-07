/*
========================================================================
                        Login Page Script
========================================================================

This script handles the login functionality on the login page.

========================================================================
                        Import Statements
========================================================================
*/

import { LoginUser } from "./authentication/Login.js";
import { onMounted } from "./helpers.js";

/*
========================================================================
                        Login Form Submission
========================================================================
*/

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Retrieve email and password inputs
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    // Check if both email and password are provided
    if (email.value && password.value) {
        // Attempt to login user
        let loggedInUser = await LoginUser(email.value, password.value);

        // If user successfully logged in, check role and redirect to appropriate page
        if (loggedInUser && loggedInUser.role === "admin") {
            window.location.href = "/frontend/views/admin.html";
        } else if (loggedInUser && loggedInUser.role === "student") {
            window.location.href = "/frontend/views/student.html";
        } else {
            // Display login failed alert and reset form
            alert("Login failed!");
            loginForm.reset();
        }
    }
});

/*
========================================================================
                        Token Existence Check on Page Load
========================================================================
*/

// This always checks the existence of the token every time the page is loaded.
onMounted(() => {
    let isTokenAvailable = localStorage.getItem("Bearer");
    let currentUser = localStorage.getItem("c_user");

    // Redirect to admin page if token is available
    if (isTokenAvailable) {
        if (currentUser.role === "student") {
            window.location.href = "/frontend/views/student.html";
        } else if (currentUser.role === "admin") {
            window.location.href = "/frontend/views/admin.html";
        }
    }
});
