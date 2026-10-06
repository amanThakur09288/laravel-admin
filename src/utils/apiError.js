export const getApiErrorMessage = (error) => {
    // Laravel validation error
    if (error.response?.data?.errors) {
        const errors =
            error.response.data.errors;

        const firstField = Object.keys(errors)[0];

        if (
            firstField &&
            errors[firstField]?.length
        ) {
            return errors[firstField][0];
        }
    }

    // Laravel normal message
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    // Server responded but something went wrong
    if (error.response) {
        return "Something went wrong on the server.";
    }

    // Request was sent but server didn't respond
    if (error.request) {
        return "Unable to connect to the server.";
    }

    // Axios/request configuration error
    return (
        error.message ||
        "Something went wrong."
    );
};