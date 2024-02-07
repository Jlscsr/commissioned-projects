import { GetRequest } from "../api/axios.js";
import { onMounted } from "../helpers.js";
import { getElement } from "../DOMs/Elements.js";

const renderAnnouncement = (violation) => {
    const [date, time] = violation.counseling_schedule.split(" ");

    return `
        <div class="announcement-container">
            <div class="date-container">
                <p>${date}</p>
                <p>${time}</p>
            </div>
            <div class="announcement-body">
                <h3>Counseling | Violation: ${violation.type_of_violation}</h3>
                <p>${violation.remarks}</p>
            </div>
        </div>
    `;
};

const renderStudentViolationsRecords = (violations) => {
    const totalViolationContainer = getElement("#total-violations");
    const announcementContainer = getElement("#announcement-container");

    if (violations.length > 0) {
        const numberOfViolations = violations.length;
        totalViolationContainer.textContent = numberOfViolations;

        violations.forEach((violation) => {
            const announcement = renderAnnouncement(violation);
            announcementContainer.insertAdjacentHTML("beforeend", announcement);
        });
    }
};

const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/frontend/index.html";
};

const initializePage = async () => {
    const isTokenAvailable = localStorage.getItem("Bearer");

    if (!isTokenAvailable) {
        window.location.href = "/frontend/index.html";
    } else {
        const userData = JSON.parse(localStorage.getItem("c_user"));
        const studentRecords = await GetRequest("/student/record/", {
            id: userData._id,
        });

        const userName = getElement(".profile-name");
        userName.textContent = `${userData.first_name} ${userData.last_name}`;

        if (studentRecords.status === "success") {
            renderStudentViolationsRecords(studentRecords.data.violations);
        } else {
            alert(studentRecords.message);
        }
    }
};

// Logout button
const logoutButton = getElement("#logout-button");
logoutButton.addEventListener("click", handleLogout);

// Run the initialization on page load
onMounted(initializePage);
