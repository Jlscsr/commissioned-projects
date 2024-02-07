document.addEventListener("DOMContentLoaded", () => {
    /* Toggles the navigation in mobile design */
    const toggleMenu = () => {
        nav.classList.toggle("openMenu");
    };

    /* Closes the navigation in mobile design */
    const closeMenuHandler = () => {
        nav.classList.remove("openMenu");
    };

    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const closeMenu = document.querySelector(".close-btn");
    const navLists = document.querySelectorAll(".navbar-list");
    const nav = document.querySelector(".inner__content");
    const body = document.body;

    const navItems = document.querySelectorAll(
        ".navbar-container > .navbar-list > a"
    );

    /* Opens the navigation in mobile design */
    hamburgerMenu.addEventListener("click", toggleMenu);

    /* Closes the navigation in mobile design */
    closeMenu.addEventListener("click", closeMenuHandler);

    /* Closes the navigation in mobile design when a link is clicked */
    navLists.forEach((menu) => {
        menu.addEventListener("click", closeMenuHandler);
    });

    /* Adds the selected class to the clicked link */
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navItems.forEach((navItem) => {
                navItem.parentElement.classList.remove("selected");
            });

            item.parentElement.classList.add("selected");
        });
    });
});
