/* =========================================
   GOSIYA MASJID - PUBLIC WEBSITE SCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const welcomeScreen = document.getElementById("welcomeScreen");
const publicWebsite = document.getElementById("publicWebsite");
const adminLoginBox = document.getElementById("adminLoginBox");
const loginMessage = document.getElementById("loginMessage");


/* =========================================
   GUEST ACCOUNT
========================================= */

function enterGuest() {

    if (welcomeScreen) {
        welcomeScreen.style.display = "none";
    }

    if (publicWebsite) {
        publicWebsite.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   ADMIN LOGIN POPUP
========================================= */

function openAdminLogin() {

    if (!adminLoginBox) {
        return;
    }

    adminLoginBox.classList.add("active");

    const username =
        document.getElementById("username");

    if (username) {
        setTimeout(() => {
            username.focus();
        }, 200);
    }
}


function closeAdminLogin() {

    if (!adminLoginBox) {
        return;
    }

    adminLoginBox.classList.remove("active");

    if (loginMessage) {
        loginMessage.textContent = "";
    }
}


/* =========================================
   ADMIN LOGIN
========================================= */

/*
   IMPORTANT:

   यह अभी DEMO LOGIN है।

   बाद में हम इसे proper backend/database
   authentication से connect करेंगे।

   Demo accounts:

   Super Admin
   Username: admin
   Password: admin123

   Content Admin
   Username: imam
   Password: imam123
*/

function adminLogin(event) {

    event.preventDefault();

    const usernameInput =
        document.getElementById("username");

    const passwordInput =
        document.getElementById("password");

    if (!usernameInput || !passwordInput) {
        return;
    }

    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value;

    let role = null;


    /* =========================
       SUPER ADMIN
    ========================== */

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        role = "superadmin";

    }


    /* =========================
       CONTENT ADMIN
    ========================== */

    else if (
        username === "imam" &&
        password === "imam123"
    ) {

        role = "contentadmin";

    }


    /* =========================
       LOGIN SUCCESS
    ========================== */

    if (role) {

        localStorage.setItem(
            "gosiyaAdminLoggedIn",
            "true"
        );

        localStorage.setItem(
            "gosiyaAdminRole",
            role
        );


        /*
           Admin panel open करें
        */

        window.location.href =
            "admin.html";

        return;
    }


    /* =========================
       LOGIN FAILED
    ========================== */

    if (loginMessage) {

        loginMessage.textContent =
            "❌ Username या password गलत है।";

    }

}


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (!mobileMenu) {
        return;
    }

    mobileMenu.classList.toggle("active");
}


function closeMobileMenu() {

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (!mobileMenu) {
        return;
    }

    mobileMenu.classList.remove("active");
}


/* =========================================
   PAYMENT MESSAGE
========================================= */

function showPaymentMessage() {

    const message =
        document.getElementById("paymentMessage");

    if (!message) {
        return;
    }

    message.textContent =
        "💳 Payment details जल्द उपलब्ध कराई जाएंगी।";
}


/* =========================================
   CLOSE LOGIN WHEN CLICKING OUTSIDE
========================================= */

if (adminLoginBox) {

    adminLoginBox.addEventListener(
        "click",
        function(event) {

            if (
                event.target === adminLoginBox
            ) {

                closeAdminLogin();

            }

        }
    );

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeAdminLogin();
            closeMobileMenu();

        }

    }
);


/* =========================================
   CLOSE MOBILE MENU ON LINK CLICK
========================================= */

document.querySelectorAll(
    ".mobile-menu a"
).forEach(function(link) {

    link.addEventListener(
        "click",
        function() {

            closeMobileMenu();

        }
    );

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


window.addEventListener(
    "scroll",
    function() {

        let currentSection = "";

        sections.forEach(
            function(section) {

                const sectionTop =
                    section.offsetTop - 120;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            }
        );


        navLinks.forEach(
            function(link) {

                link.classList.remove(
                    "active"
                );

                if (
                    link.getAttribute("href") ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Gosiya Masjid website loaded successfully."
        );

    }
);
