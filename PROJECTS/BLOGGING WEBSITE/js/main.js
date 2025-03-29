// Common JavaScript for all pages

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // User dropdown toggle
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userMenuButton && userDropdown) {
        userMenuButton.addEventListener('click', function() {
            userDropdown.classList.toggle('hidden');
        });
    }
    
    // Toggle between login and signup forms
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const backToLogin = document.getElementById('back-to-login');
    const emailForm = document.getElementById('email-form');
    
    if (showSignup && showLogin && loginForm && signupForm && backToLogin && emailForm) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            emailForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            backToLogin.classList.remove('hidden');
        });
        
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            backToLogin.classList.add('hidden');
            emailForm.classList.remove('hidden');
        });
    }
    
    // Toggle between email and social auth
    const toggleSignup = document.getElementById('toggle-signup');
    
    if (toggleSignup && loginForm && signupForm) {
        toggleSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            document.getElementById('back-to-login').classList.remove('hidden');
        });
    }
});