import { PostRequest } from "../api/axios.js";

class UserForm {
    constructor() {
        this.form = document.createElement("form");
        this.form.classList.add("form");
    }

    registerForm() {
        this.form.innerHTML = `
            <!-- Student ID -->
            <div class="studentId">
                <label for="studentId" class="block"
                    >Student ID:</label
                >
                <input
                    type="text"
                    class="block input-primary"
                    required
                    placeholder="Student ID"
                    id="studentId"
                />
            </div>
            <!-- Student Names -->
            <div class="student-names">
                <!-- First Name -->
                <div class="firstname">
                    <label for="firstname" class="block"
                        >First name:</label
                    >
                    <input
                        type="text"
                        class="block input-primary"
                        required
                        placeholder="First name"
                        id="firstname"
                    />
                </div>

                <!-- Middle Name -->
                <div class="middle-name">
                    <label for="middleName" class="block"
                        >Middle Name:</label
                    >
                    <input
                        type="text"
                        class="block input-primary"
                        required
                        placeholder="Middle Initial"
                        id="middleName"
                    />
                </div>
            </div>

            <div class="lastname">
                <label for="lastname" class="block"
                    >Last name:</label
                >
                <input
                    type="text"
                    class="block input-primary"
                    required
                    placeholder="Last name"
                    id="lastname"
                />
            </div>

            <!-- Email -->
            <div class="email">
                <label for="email" class="block">Email:</label>
                <input
                    type="email"
                    class="block input-primary"
                    required
                    placeholder="Email"
                    id="email"
                />
            </div>

            <!-- Contact No. -->
            <div class="contact-no">
                <label for="contact-no" class="block"
                    >Contact No.:</label
                >
                <input
                    type="text"
                    class="block input-primary"
                    required
                    placeholder="Contact No."
                    id="contact-no"
                />
            </div>

            <!-- Passwords -->
            <div class="passwords">
                <!-- Password -->
                <div class="password">
                    <label for="password" class="block"
                        >Password:</label
                    >
                    <input
                        type="password"
                        class="block input-primary"
                        required
                        placeholder="Password"
                        id="password"
                    />
                </div>

                <!-- Confirm Password -->
                <div class="confirm-password">
                    <label for="confirm-password" class="block"
                        >Confirm Password:</label
                    >
                    <input
                        type="password"
                        class="block input-primary"
                        required
                        placeholder="Confirm Password"
                        id="confirm-password"
                    />
                </div>
            </div>

            <!-- Buttons Cancel/Create -->
            <div class="buttons">
                <!-- Cancel Button -->
                <div class="cancel-button">
                    <button
                        type="button"
                        class="btn-primary cancel-button"
                        id="cancel-button"
                    >
                        Cancel
                    </button>
                </div>

                <!-- Create Button -->
                <div class="create-button">
                    <button
                        type="button"
                        class="btn-primary create-button"
                        id="create-button"
                    >
                        Create
                    </button>
                </div>
            </div>
        `;

        return this.form;
    }

    addViolationForm() {
        this.form.innerHTML = `
                <form class="form">
                    <!-- Student ID -->
                    <div class="studentId">
                        <label for="studentId" class="block"
                            >Student ID:</label
                        >
                        <input
                            type="text"
                            class="block input-primary"
                            required=""
                            placeholder="Student ID"
                            id="studentId"
                        />
                    </div>
                    <div class="course">
                        <label for="course" class="block"
                            >Course/Section:</label
                        >
                        <input
                            type="text"
                            class="block input-primary"
                            required=""
                            placeholder="Course"
                            id="course"
                        />
                    </div>

                    <!-- Violation -->
                    <div class="violation">
                        <label for="violation" class="block"
                            >Violation:</label
                        >
                        <input
                            type="text"
                            class="block input-primary"
                            placeholder="Violation"
                            id="violation"
                        />
                    </div>

                    <!-- Remarks -->
                    <div class="remarks">
                        <label for="remarks" class="block"
                            >Remarks:</label
                        >
                        <!-- Textarea -->
                        <textarea
                            class="block input-primary"
                            placeholder="Remarks"
                            id="remarks"
                        ></textarea>
                    </div>

                    <!-- Staff Involved -->
                    <div class="staff-involved">
                        <label for="staff-involved" class="block"
                            >Staff Involved:</label
                        >
                        <input
                            type="text"
                            class="block input-primary"
                            placeholder="Staff Involved"
                            id="staff-involved"
                        />
                    </div>

                    <!-- Severity Level -->
                    <div class="severity-level">
                        <label for="severity-level" class="block"
                            >Severity Level:</label
                        >
                        <select
                            class="block input-primary"
                            id="severity-level"
                        >
                            <option selected value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div class="counseling-date">
                        <label for="counseling-date" class="block"
                            >Counseling Date:</label
                        >
                        <input
                            type="text"
                            class="block input-primary"
                            placeholder="mm/dd/yyyy 00:00PM/AM"
                            id="counseling-date"
                        />
                    </div>

                    <!-- Buttons Cancel/Create -->
                    <div class="buttons">
                        <!-- Cancel Button -->
                        <div class="cancel-button">
                            <button
                                type="button"
                                class="btn-primary cancel-button"
                                id="cancel-button"
                            >
                                Cancel
                            </button>
                        </div>

                        <!-- Create Button -->
                        <div class="create-button">
                            <button
                                type="button"
                                class="btn-primary create-button"
                                id="create-button"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>
        `;

        return this.form;
    }

    async registerUser(payload) {
        const response = await PostRequest("/user/register/", payload);

        if (response.status === "success") {
            return true;
        }

        alert(response.message);
        return false;
    }

    async addNewViolation(payload) {
        const response = await PostRequest("/student/record/add/", payload);

        if (response.status === "success") {
            return true;
        }

        alert(response.message);
        return false;
    }
}

export { UserForm };
