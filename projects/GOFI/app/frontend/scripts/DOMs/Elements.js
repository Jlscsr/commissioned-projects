const createElement = (tag = "", className = [], id = "", content = {}) => {
    const element = document.createElement(tag);

    if (className.length > 0) {
        className.forEach((name) => {
            element.classList.add(name);
        });
    }

    if (id) {
        element.id = id;
    }

    if (Object.keys(content).length > 0) {
        if (content.hasOwnProperty("innerHtml")) {
            element.innerHTML = content.innerHtml;
        } else if (content.hasOwnProperty("textContent")) {
            element.textContent = content.textContent;
        } else if (content.hasOwnProperty("innerText")) {
            element.innerText = content.innerText;
        }
    }

    return element;
};

const getElement = (selector) => {
    return document.querySelector(selector);
};

const checkFields = (fields) => {
    let isValid = false;

    fields.forEach((field) => {
        if (field.value.trim() === "") {
            isValid = false;
        } else {
            isValid = true;
        }
    });

    return isValid;
};

const clearFields = (fields) => {
    fields.forEach((field) => {
        field.value = "";
    });
};

export { createElement, getElement, checkFields, clearFields };
