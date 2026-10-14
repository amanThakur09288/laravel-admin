import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const courseSlice = createSlice({
    name: "courses",

    initialState,

    reducers: {
        setCourses: (state, action) => {
            state.items = action.payload;
        },

        addCourse: (state, action) => {
            state.items.push(action.payload);
        },

        updateCourseState: (state, action) => {
            const updatedCourse = action.payload;

            const index = state.items.findIndex(
                (course) => course.id === updatedCourse.id
            );

            if (index !== -1) {
                state.items[index] = updatedCourse;
            }
        },

        removeCourse: (state, action) => {
            state.items = state.items.filter(
                (course) => course.id !== action.payload
            );
        },

        clearCourses: (state) => {
            state.items = [];
        },
    },
});

export const {
    setCourses,
    addCourse,
    updateCourseState,
    removeCourse,
    clearCourses,
} = courseSlice.actions;

export default courseSlice.reducer;