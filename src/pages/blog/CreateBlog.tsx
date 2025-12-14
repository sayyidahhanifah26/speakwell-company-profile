import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogStore } from '../../store/useBlogStore';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';

interface CreateBlogValues {
    title: string;
    content: string;
}

const ValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Judul wajib diisi')
        .min(5, 'Judul minimal 5 karakter')
        .max(100, 'Judul maksimal 100 karakter'),
    content: Yup.string()
        .required('Konten wajib diisi')
        .min(20, 'Konten minimal 20 karakter'),
});

const CreateBlog: React.FC = () => {
    const navigate = useNavigate();
    const { createBlog } = useBlogStore();

    const initialValues: CreateBlogValues = { title: '', content: '' };

    const handleSubmit = async (
        values: CreateBlogValues, 
        { setSubmitting, resetForm }: FormikHelpers<CreateBlogValues>
    ) => {
        try {
            const success = await createBlog(values.title, values.content);

            if (success) {
                toast.success('Artikel berhasil dibuat dan dipublikasikan!');
                resetForm();
                navigate('/blog-list');
            } else {
                toast.error('Gagal membuat artikel. Silakan coba lagi.');
            }
        } catch (error) {
            toast.error('Terjadi error saat menyimpan data.');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen bg-gray-50 pt-28 px-6">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
                    Buat Blog Baru
                </h2>
                
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={handleSubmit}
                    validationSchema={ValidationSchema}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-6">
                            {/* FIELD TITLE */}
                            <div>
                                <label htmlFor="title" className="block text-gray-700 mb-2 font-medium">
                                    Judul Artikel:
                                </label>
                                <Field
                                    id="title"
                                    name="title" 
                                    type="text"
                                    placeholder="Masukkan judul artikel"
                                    disabled={isSubmitting}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition duration-150"
                                />
                                <ErrorMessage name="title">
                                    {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                                </ErrorMessage>
                            </div>
                            
                            {/* FIELD CONTENT */}
                            <div>
                                <label htmlFor="content" className="block text-gray-700 mb-2 font-medium">
                                    Isi Artikel:
                                </label>
                                <Field 
                                    id="content"
                                    as="textarea" 
                                    name="content" 
                                    placeholder="Tulis isi blog di sini..." 
                                    rows={15}
                                    disabled={isSubmitting}
                                    className="w-full border border-gray-300 p-3 rounded-lg h-60 resize-y focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition duration-150" 
                                />
                                <ErrorMessage name="content">
                                    {(msg) => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition duration-200 text-white py-3 rounded-lg font-semibold shadow-md disabled:bg-gray-400"
                            >
                                {isSubmitting ? 'Mempublikasikan...' : 'Publish Artikel'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default CreateBlog;