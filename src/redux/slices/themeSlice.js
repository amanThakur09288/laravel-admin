import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("admin-theme");

    if (savedTheme) {
        return savedTheme;
    }

    return "light";
};

const themeSlice = createSlice({
    name: "theme",

    initialState: {
        mode: getInitialTheme(),
    },

    reducers: {
        toggleTheme: (state) => {
            state.mode =
                state.mode === "light"
                    ? "dark"
                    : "light";

            localStorage.setItem(
                "admin-theme",
                state.mode
            );
        },

        setTheme: (state, action) => {
            state.mode = action.payload;

            localStorage.setItem(
                "admin-theme",
                action.payload
            );
        },
    },
});

export const {
    toggleTheme,
    setTheme,
} = themeSlice.actions;

export default themeSlice.reducer;