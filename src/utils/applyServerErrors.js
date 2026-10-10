// Shows Laravel 422 validation errors under the matching form fields.
// Returns true if it handled the error.
export function applyServerErrors(error, setError) {
  const errors = error?.response?.data?.errors;

  if (error?.response?.status !== 422 || !errors || !setError) {
    return false;
  }

  Object.entries(errors).forEach(([field, messages]) => {
    setError(field, { type: "server", message: messages?.[0] });
  });

  return true;
}