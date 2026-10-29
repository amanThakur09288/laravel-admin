import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

import Batches from "./pages/batches/Batches";
import CreateBatch from "./pages/batches/CreateBatch";
import EditBatch from "./pages/batches/EditBatch";
import BatchDetails from "./pages/batches/BatchDetails";
import ContactMessages from "./pages/contacts/ContactMessages";
import ContactMessageDetails from "./pages/contacts/ContactMessageDetails";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import CourseDetails from "./pages/CourseDetails";
import Services from "./pages/Services";
import CreateService from "./pages/CreateService";
import EditService from "./pages/EditService";
import Login from "./pages/Login";
import ServiceDetails from "./pages/ServiceDetails";
import Quizzes from "./pages/Quizzes";
import CreateQuiz from "./pages/CreateQuiz";
import EditQuiz from "./pages/EditQuiz";
import QuizDetails from "./pages/QuizDetails";
import QuizResults from "./pages/QuizResults";
import QuizResultDetails from "./pages/QuizResultDetails";
import VideoSections from "./pages/VideoSections";
import CreateVideoSection from "./pages/CreateVideoSection";
import EditVideoSection from "./pages/EditVideoSection";
import VideoSectionLessons from "./pages/VideoSectionLessons";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />

          <Route path="/batches" element={<Batches />} />
          <Route path="/batches/create" element={<CreateBatch />} />
          <Route path="/batches/:id" element={<BatchDetails />} />
          <Route path="/batches/:id/edit" element={<EditBatch />} />
          <Route path="contact-messages" element={<ContactMessages />} />
          <Route
            path="contact-messages/:id"
            element={<ContactMessageDetails />}
          />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:id/edit" element={<EditCourse />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/create" element={<CreateService />} />
          <Route path="/services/:id/edit" element={<EditService />} />
          <Route path="/services/:id" element={<ServiceDetails />} />

          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quizzes/create" element={<CreateQuiz />} />
          <Route path="/quizzes/:id" element={<QuizDetails />} />
          <Route path="/quizzes/:id/edit" element={<EditQuiz />} />

          <Route path="/quiz-results" element={<QuizResults />} />
          <Route
            path="/quiz-results/:attemptId"
            element={<QuizResultDetails />}
          />

          <Route path="/video-sections" element={<VideoSections />} />
          <Route
            path="/video-sections/create"
            element={<CreateVideoSection />}
          />
          <Route
            path="/video-sections/:id/edit"
            element={<EditVideoSection />}
          />
          <Route
            path="/video-sections/:id/lessons"
            element={<VideoSectionLessons />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
