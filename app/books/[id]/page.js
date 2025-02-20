'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import ReturnToMainPageButton from '../../../components/ReturnToMainPageButton';

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [aiInsights, setAIInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/books/${id}`);
                setBook(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(`http://localhost:8080/books/${id}`);
                window.location.href = '/';
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const fetchAIInsights = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/books/${id}/ai-insights`);
            setAIInsights(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!book) return <p className="text-center">Book not found</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
                <p className="mb-2">Author: {book.author}</p>
                <p className="mb-2">Isbn: {book.isbn}</p>
                <p className="mb-4">Publication Year: {book.publicationYear}</p>
                <p className="mb-2">Description: {book.description}</p>

                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={fetchAIInsights}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Get AI Insights
                    </button>
                    <button
                        onClick={() => window.location.href = `/books/${id}/update`}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Update Book
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Delete Book
                    </button>
                </div>

                {aiInsights && (
                    <div className="p-4 bg-gray-50 rounded">
                        <h2 className="text-lg font-bold mb-2">AI Insights</h2>
                        <p>{aiInsights}</p>
                    </div>
                )}

                <div className="mt-4">
                    <ReturnToMainPageButton />
                </div>
            </div>
        </div>
    );
}