import { DeleteRequest } from "../api/axios.js";

class Table {
    constructor() {
        this.table = document.createElement("table");
        this.thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");
    }

    setup() {
        const columns = [
            "Student ID",
            "Last Name",
            "First Name",
            "Middle I.N",
            "Course/Sec",
            "Contact No.",
            "Violation",
            "Staff Involved",
            "Severity",
            "Counseling",
            "",
        ];

        this.table.appendChild(this.thead);
        this.table.classList.add("table");

        columns.forEach((column) => {
            const th = document.createElement("th");
            th.textContent = column;
            this.thead.appendChild(th);
        });

        this.table.appendChild(this.tbody);

        return this.table;
    }

    addToTable(rows) {
        if (Array.isArray(rows)) {
            if (rows.length === 0) {
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                td.setAttribute("colspan", 11);
                td.style.textAlign = "center";
                td.textContent = "No records found";
                tr.appendChild(td);
                this.tbody.appendChild(tr);
                return this.table;
            } else {
                rows.forEach((row) => {
                    let middleInitial = row.middle_name.charAt(0).toUpperCase();

                    const tr = document.createElement("tr");
                    const tdStudentID = document.createElement("td");
                    const tdLastName = document.createElement("td");
                    const tdFirstName = document.createElement("td");
                    const tdMiddleInitial = document.createElement("td");
                    const tdCourseSection = document.createElement("td");
                    const tdContactNumber = document.createElement("td");
                    const tdViolation = document.createElement("td");
                    const tdStaffInvolved = document.createElement("td");
                    const tdSeverity = document.createElement("td");
                    const tdCounseling = document.createElement("td");
                    const tdDelete = document.createElement("td");
                    const deleteButton = document.createElement("button");

                    tdStudentID.textContent = row.student_id;
                    tdLastName.textContent = row.last_name;
                    tdFirstName.textContent = row.first_name;
                    tdMiddleInitial.textContent = middleInitial;
                    tdCourseSection.textContent = row.course_section;
                    tdContactNumber.textContent = row.contact_number;
                    tdViolation.textContent = row.type_of_violation;
                    tdStaffInvolved.textContent = row.staff_involved;
                    tdSeverity.textContent = row.severity_level;
                    tdCounseling.textContent = row.counseling_schedule;

                    deleteButton.setAttribute("data-id", row._id);
                    deleteButton.classList.add("delete-button");
                    deleteButton.innerHTML = `<img
                        style="width: 25px"
                        src="../../assets/images/delete.svg"
                        alt="Delete Icon"
                    />`;
                    tdDelete.appendChild(deleteButton);

                    tr.appendChild(tdStudentID);
                    tr.appendChild(tdLastName);
                    tr.appendChild(tdFirstName);
                    tr.appendChild(tdMiddleInitial);
                    tr.appendChild(tdCourseSection);
                    tr.appendChild(tdContactNumber);
                    tr.appendChild(tdViolation);
                    tr.appendChild(tdStaffInvolved);
                    tr.appendChild(tdSeverity);
                    tr.appendChild(tdCounseling);
                    tr.appendChild(tdDelete);

                    this.tbody.appendChild(tr);
                });

                return this.table;
            }
        }
    }

    async deleteStudentRecord(studentId) {
        let payload = {
            id: studentId,
        };

        const response = await DeleteRequest(
            "/student/record/remove/",
            payload
        );

        if (response.status === "success") {
            return true;
        }

        alert(response.message);
        return false;
    }
}

export { Table };
