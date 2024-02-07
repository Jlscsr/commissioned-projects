const onMounted = (callback) => {
    document.addEventListener("DOMContentLoaded", () => {
        callback();
    });
};

export { onMounted };
