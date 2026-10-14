import api from "./axios";

export const getCourses = async () => {
    const response = await api.get("/courses");
    return response.data;
};

export const getCourse = async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
};

export const createCourse = async (data) => {
    const response = await api.post("/courses", data);
    return response.data;
};

export const updateCourse = async (id, data) => {
    const response = await api.put(`/courses/${id}`, data);
    return response.data;
};

export const deleteCourse = async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
};