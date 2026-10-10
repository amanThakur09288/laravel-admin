export const getApiErrorMessage = (error) => {
  const responseData = error.response?.data;

  /*
    |--------------------------------------------------------------------------
    | Laravel validation errors
    |--------------------------------------------------------------------------
    */

  if (responseData?.errors) {
    const errors = responseData.errors;

    const firstField = Object.keys(errors)[0];

    if (firstField) {
      const messages = errors[firstField];

      if (Array.isArray(messages) && messages.length > 0) {
        return messages[0];
      }
    }
  }

  /*
    |--------------------------------------------------------------------------
    | Normal Laravel message
    |--------------------------------------------------------------------------
    */

  if (responseData?.message) {
    return responseData.message;
  }

  /*
    |--------------------------------------------------------------------------
    | Server response
    |--------------------------------------------------------------------------
    */

  if (error.response) {
    return "Something went wrong on the server.";
  }

  /*
    |--------------------------------------------------------------------------
    | Request sent but server didn't respond
    |--------------------------------------------------------------------------
    */

  if (error.request) {
    return "Unable to connect to the server.";
  }

  /*
    |--------------------------------------------------------------------------
    | JavaScript / Axios error
    |--------------------------------------------------------------------------
    */

  return error.message || "Something went wrong.";
};
