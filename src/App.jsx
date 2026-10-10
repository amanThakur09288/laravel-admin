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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="contact-messages/:id" element={<ContactMessageDetails />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
