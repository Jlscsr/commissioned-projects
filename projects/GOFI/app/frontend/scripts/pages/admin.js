import { onMounted } from "../helpers.js";
import { Table } from "../DOMs/Table.js";
import { UserForm } from "../DOMs/UserForm.js";
import { GetRequest } from "../api/axios.js";
import {
    createElement,
    getElement,
    checkFields,
    clearFields,
} from "../DOMs/Elements.js";

// Eto kukunin yung heading na nasa html para maupdate yung page name
const pageHeading = getElement(
    ".header-container > .page-name > .heading-name"
);

// Eto kukunin yung student entry and account settings button na nasa sidebar
const studentEntryButton = getElement("#student-entry-button");
const accountSettingsButton = getElement("#account-settings-button");

// Eto naman sa logout button
const logoutButton = getElement("#logout-button");

// Eto naman kukunin yung container na kung saan natin iddisplay yung mga UI na galing sa JavaScript
const dynamicMainContent = getElement("#dynamic-content-container");

// Eto pang loading
const loadingSpinner =
    '<div class="loading-indicator"><span class="loading-spinner"></span></div>';

// Etong function na to, once na ma click yung student entry button, it will render the student entry UI
const renderStudentEntryUI = async () => {
    // Update the page header
    pageHeading.textContent = "Student Entry";

    // Create a new table
    const table = new Table();
    let tableElemet = table.setup();

    // Create the add button para mag add ng new violation
    const buttonContainer = createElement("div", ["add-button"]);
    const button = createElement("button", [], "add-button", {
        innerText: "Add",
    });

    // Eto another container para sa table
    const studentEntry = createElement("div", ["student-entry"]);

    // eto naman, parang pinapatong lang natin yung mga element sa container nila
    buttonContainer.appendChild(button);
    studentEntry.appendChild(buttonContainer);

    // Eto update natin yung content ng dynamic container natin to loading
    dynamicMainContent.innerHTML = loadingSpinner;

    // Dito na mag sstart mag request sa backend, para makuha yung mga student records
    const response = await GetRequest("/student/record/", {});

    // Dito ccheck kung success ba yung request
    if (response.status === "success") {
        // Get the new updated table
        tableElemet = table.addToTable(response.data);

        studentEntry.appendChild(tableElemet);

        // Dito na mag sstart mag display yung UI ng student entry
        dynamicMainContent.innerHTML = studentEntry.outerHTML;

        // Dito kukunin natin lahat ng delete buttons sa table
        let deleteButtons = document.querySelectorAll(".delete-button");

        // Loop through each delete button and add event listener
        deleteButtons.forEach((button) => {
            button.addEventListener("click", async (e) => {
                // Dito kukunin natin yung naka set na id ng student sa mga buttons
                let id = button.getAttribute("data-id");

                // Next mag rerequest ulit sa backend for deletion ng student record
                let isDeleteSuccess = await table.deleteStudentRecord(id);

                // Check ulit kung success yung deletion
                if (isDeleteSuccess) {
                    alert("Student record successfully deleted.");

                    // Pag success, rerender ulit yung UI para makuha yung new updated table
                    renderStudentEntryUI();
                } else {
                    alert("Failed to delete student record.");
                }
            });
        });

        // Add event listener to the add violation button
        const addViolation = getElement("#add-button");
        addViolation.addEventListener("click", renderAddViolationFormUI);
    } else {
        alert(response.message);
    }
};

// Dito naman sa UI ng account settings
const renderAccountSettingsUI = () => {
    // Update the page header
    pageHeading.textContent = "Account Settings";

    // Create a new form
    const form = new UserForm();

    // Kunin natin yung naka built-in na registration form sa UserForm class
    const registerForm = form.registerForm();

    // Eto yung mga container para sa UI
    const accountSettingsContainer = createElement("div", ["account-settings"]);
    const accountSettingsHeader = createElement("div", [
        "account-settings-header",
    ]);
    const accountSettingsHeaderTitle = createElement(
        "h2",
        ["account-settings-heading"],
        "",
        { textContent: "Student Information" }
    );
    const accountSettingsForm = createElement("div", ["account-settings-form"]);

    // Eto naman, parang pinapatong lang natin yung mga element sa container nila
    accountSettingsHeader.appendChild(accountSettingsHeaderTitle);
    accountSettingsContainer.appendChild(accountSettingsHeader);
    accountSettingsForm.appendChild(registerForm);
    accountSettingsContainer.appendChild(accountSettingsForm);

    // Dito na mag sstart mag display yung UI ng account settings
    dynamicMainContent.innerHTML = "";
    dynamicMainContent.innerHTML = accountSettingsContainer.outerHTML;

    // Dito kukunin natin yung cancel button, tapos dagdag lang tayo ng click dun na mag
    // rerender ulit ng student entry UI
    const cancelButton = getElement("#cancel-button");
    cancelButton.addEventListener("click", (e) => {
        renderStudentEntryUI();
    });

    // Dito naman yung pag create ng new student account
    const createButton = getElement("#create-button");
    createButton.addEventListener("click", async (e) => {
        // Eto kukunin natin yung mga input fields once na ma click yung create button
        let studentId = getElement("#studentId");
        let firstname = getElement("#firstname");
        let lastname = getElement("#lastname");
        let middleName = getElement("#middleName");
        let email = getElement("#email");
        let contactNo = getElement("#contact-no");
        let password = getElement("#password");
        let confirmPassword = getElement("#confirm-password");

        // Eto yung mga fields na kukunin natin para ma check kung may empty field
        let fields = [
            studentId,
            firstname,
            lastname,
            middleName,
            email,
            contactNo,
            password,
            confirmPassword,
        ];

        // Check if may empty field
        let hasEmptyField = checkFields(fields);

        // Kapag meron, alert na may empty field at clear yung mga fields
        if (!hasEmptyField) {
            alert("Please fill up all fields.");
            clearFields(fields);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert("Invalid email format.");
            email.value = "";
            return;
        }

        // Contact number validation
        const contactNoRegex = /^0\d{10}$/;
        if (!contactNoRegex.test(contactNo.value)) {
            alert(
                "Invalid contact number format. It should start with 0 and have 11 digits."
            );
            contactNo.value = "";
            return;
        }

        // Password validation
        if (password.value.length < 6) {
            alert("Password should have a minimum of 6 characters.");
            password.value = "";
            confirmPassword.value = "";
            return;
        }

        // Password confirmation validation
        if (password.value !== confirmPassword.value) {
            alert("Password does not match.");
            password.value = "";
            confirmPassword.value = "";
            return;
        }

        // Dito sa part na to kapag walang problema sa field,
        // mapupunta lang dito kapag okay yung mga validation sa taas
        let payload = {
            student_id: studentId.value,
            first_name: firstname.value,
            last_name: lastname.value,
            middle_name: middleName.value,
            email: email.value,
            contact_number: contactNo.value,
            password: password.value,
        };

        // Dito na mag sstart mag request sa backend para ma register yung student
        let isRegisterSuccess = await form.registerUser(payload);

        // Check kung yung registration is success
        if (isRegisterSuccess) {
            alert("Student successfully registered.");
            clearFields(fields);
            renderStudentEntryUI();
        } else {
            alert(
                "Failed to register the student. The student is either already registered."
            );
            clearFields(fields);
        }
    });
};

// Eto same lang sa registration form, pero eto yung UI para sa pag add ng violation
const renderAddViolationFormUI = () => {
    pageHeading.textContent = "Add Violation";

    // Create a new form
    const form = new UserForm();
    const addViolationForm = form.addViolationForm();

    const studentEntryContainer = createElement("div", ["student-entry"]);
    const studentViolationContainer = createElement("div", [
        "student-violation",
    ]);
    const studentViolationHeader = createElement("div", [
        "student-violation-header",
    ]);
    const studentViolationHeaderTitle = createElement(
        "h2",
        ["student-violation-heading"],
        "",
        { textContent: "Student Violation" }
    );
    const studentViolationFormContainer = createElement("div", [
        "student-violation-form",
    ]);

    studentViolationHeader.appendChild(studentViolationHeaderTitle);
    studentViolationFormContainer.appendChild(addViolationForm);
    studentViolationContainer.appendChild(studentViolationHeader);
    studentViolationContainer.appendChild(studentViolationFormContainer);
    studentEntryContainer.appendChild(studentViolationContainer);

    dynamicMainContent.innerHTML = "";
    dynamicMainContent.innerHTML = studentEntryContainer.outerHTML;

    const cancelButton = getElement("#cancel-button");
    cancelButton.addEventListener("click", (e) => {
        renderStudentEntryUI();
    });

    // Dito na yung pag add ng new violation
    const createButton = getElement("#create-button");
    createButton.addEventListener("click", async (e) => {
        // Get lang din yung mga input fields sa pag add ng new violation
        let studentId = getElement("#studentId");
        let course_section = getElement("#course");
        let violation = getElement("#violation");
        let remarks = getElement("#remarks");
        let staff_involved = getElement("#staff-involved");
        let severity_level = getElement("#severity-level");
        let counseling_date = getElement("#counseling-date");

        // Get yung selected severity level
        let selected_severity =
            severity_level.options[severity_level.selectedIndex];

        // Eto yung mga fields na kukunin natin para ma check kung may empty field
        // Same process lang din sa registration form, validations
        let fields = [
            studentId,
            course_section,
            violation,
            remarks,
            staff_involved,
            selected_severity,
            counseling_date,
        ];

        let hasEmptyFields = checkFields(fields);

        if (!hasEmptyFields) {
            alert("Please fill up all fields.");
            clearFields(fields);
            return;
        }

        // Date validation
        const datePattern =
            /\d{2}\/\d{2}\/\d{4} (0?[1-9]|1[0-2]):[0-5][0-9][APMapm]{2}/;
        if (!datePattern.test(counseling_date.value)) {
            alert("Invalid date format.");
            counseling_date.value = "";
            return;
        }

        // Dito sa part na to kapag walang problema sa validations sa taas
        let payload = {
            student_id: studentId.value,
            course_section: course_section.value,
            type_of_violation: violation.value,
            remarks: remarks.value,
            staff_involved: staff_involved.value,
            severity_level: selected_severity.value,
            counseling_schedule: counseling_date.value,
            role: "student",
        };

        // Dito na mag sstart mag request sa backend para ma add yung new violation
        let isAddingViolationSuccess = await form.addNewViolation(payload);

        // Check kung yung pag add ng new violation is success
        if (isAddingViolationSuccess) {
            alert("Added new student record successfully.");
            clearFields(fields);
            renderStudentEntryUI();
        } else {
            alert("Failed to add student record");
            clearFields(fields);
        }
    });
};

// Eto yung button para sa Student Entry Button na nasa sidebar
studentEntryButton.addEventListener("click", renderStudentEntryUI);

// Eto yung button para sa Account Settings Button na nasa sidebar
accountSettingsButton.addEventListener("click", renderAccountSettingsUI);

// Eto yung button para sa Logout Button na nasa sidebar
logoutButton.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
});

// Eto yung pag check kung may token na naka set sa local storage, kapag wala, redirect sa login page
// Then dito rin yung pag update ng pangalan ng user sa navigation bar
let userProfileName = getElement(".profile-name");
onMounted(() => {
    let isTokenAvailable = localStorage.getItem("Bearer");

    if (!isTokenAvailable) {
        window.location.href = "/frontend/index.html";
    } else {
        let userData = JSON.parse(localStorage.getItem("c_user"));
        userProfileName.textContent =
            userData.first_name + " " + userData.last_name;
        renderStudentEntryUI();
    }
});
