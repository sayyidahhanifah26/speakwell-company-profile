import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthStore } from '../store/useAuthStore'; 
import { toast } from 'sonner';

interface LoginValues {
  email: string;
  password: string;
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Format email tidak valid').required('Email wajib diisi'),
  password: Yup.string().required('Password wajib diisi'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore(); 

  const initialValues: LoginValues = { email: "", password: "" };

  const handleSubmit = async (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    try {
      const success = await login(values.email, values.password); 

      if (success) {
        toast.success("Login Berhasil! Selamat datang."); 
        navigate("/blog-list"); 
      } else {
        toast.error("Login Gagal: Email atau Password salah."); 
      }
    } catch (error) {
      toast.error("Terjadi error saat proses login.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center px-6">
      <Formik 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        validationSchema={ValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form
            className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              Login
            </h2>
        
            {/* --- FIELD EMAIL --- */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email:</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan email"
                disabled={isSubmitting}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              />
              <ErrorMessage name="email">
                  {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* --- FIELD PASSWORD --- */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">Password:</label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                disabled={isSubmitting}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              />
              <ErrorMessage name="password">
                  {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* --- TOMBOL LOGIN --- */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition duration-200 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Login;