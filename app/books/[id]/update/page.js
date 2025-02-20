'use client'; // Enable client-side interactivity
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

export default function UpdateBook() {
    const { id } = useParams();
    const router = useRouter();
    const [book, setBook] = useState({ title: '', author: '', publicationYear: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch book details on initial load
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/books/${id}`);
                setBook(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBookDetails();
    }, [id]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/books/${id}`, book);
            router.push(`/books/${id}`); // Redirect to the book details page after update
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Update Book</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={book.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={book.author}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Isbn</label>
                        <input
                            type="number"
                            name="isbn"
                            value={book.isbn}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Publication Year</label>
                        <input
                            type="number"
                            name="publicationYear"
                            value={book.publicationYear}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700"> Description</label>
                        <input
                            type="text"
                            name="description"
                            value={book.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Update Book
                    </button>
                </form>
            </div>
        </div>
    );
}