class Fields {
    constructor(req) {
        this.req = req;
        this.acceptedFields = [
            "id",
            "student_id",
            "first_name",
            "last_name",
            "middle_name",
            "email",
            "password",
            "contact_number",
            "type_of_violation",
            "staff_involved",
            "severity_level",
            "counseling_schedule",
            "course_section",
            "remarks",
            "role",
        ];
    }

    areKeysInRequest = (fields = {}) => {
        if (fields) {
            for (const key in fields) {
                if (!this.req.body.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };

    areResponseKeysAccepted = (fields = {}) => {
        if (fields) {
            for (const key in fields) {
                if (!this.acceptedFields.includes(key)) {
                    return false;
                }
            }

            return true;
        }

        return false;
    };

    areResponseValuesEmpty = (fields = {}) => {
        return Object.values(fields).every(
            (value) => value !== null && value !== ""
        );
    };

    hasHarmfulChars = (fields = {}) => {
        const disallowedCharsRegex = /[<>&'";{}()=*+?![\]^$|\\]/;

        for (const key in fields) {
            if (disallowedCharsRegex.test(fields[key])) {
                return true;
            }
        }

        return false;
    };
}

module.exports = Fields;
