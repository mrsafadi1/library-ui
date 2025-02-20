'use client';
import { useState } from 'react';
import axios from 'axios';
import ReturnToMainPageButton from '../../../components/ReturnToMainPageButton';

export default function AddBook() {
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationYear: '',
        description: ''
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/books', newBook);
            window.location.href = '/';
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Add New Book</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder='Book title'
                            value={newBook.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Author</label>
                        <input
                            type="text"
                            name="author"
                            placeholder='Book Author'
                            value={newBook.author}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Publication Year</label>
                        <input
                            type="number"
                            name="publicationYear"
                            placeholder='Book Publication year'
                            value={newBook.publicationYear}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Isbn</label>
                        <input
                            type="text"
                            name="isbn"
                            placeholder='Book Isbn number'
                            value={newBook.isbn}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder='Book description'
                            value={newBook.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                            Add Book
                        </button>
                        <ReturnToMainPageButton />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
}