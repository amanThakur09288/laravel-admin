export const navigateToLogin = () => {
    window.history.pushState({}, "", "/login?session=expired");

    window.dispatchEvent(new PopStateEvent("popstate"));
};