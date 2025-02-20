'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';
import ReturnToMainPageButton from '../components/ReturnToMainPageButton';

export default function Home() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeView, setActiveView] = useState('all');

    // Fetch all books on mount
    useEffect(() => {
        fetchAllBooks();
    }, []);

    const fetchAllBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/books');
            setBooks(response.data);
            setActiveView('all');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSpecificBook = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/books/${id}`);
            setBooks([response.data]);
            setActiveView('specific');
        } catch (error) {
            setError("Book with ID: " + id + " is not exist!");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query, searchBy) => {
        setLoading(true);
        try {
            let response;
            if (searchBy === 'title') {
                response = await axios.get(`http://localhost:8080/books/search?title=${query}`);
            } else if (searchBy === 'author') {
                response = await axios.get(`http://localhost:8080/books/search?author=${query}`);
            }
            setBooks(response.data);
            setActiveView('search');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const navigateToAddBook = () => {
        window.location.href = '/books/add';
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Book Management System</h1>

            {/* <div className="flex justify-center mb-8">
                <ReturnToMainPageButton />
            </div> */}

            <div className="flex justify-center space-x-4 mb-8">
                <button onClick={fetchAllBooks} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Get All Books
                </button>
                <button onClick={navigateToAddBook} className="px-4 py-2 bg-green-500 text-white rounded">
                    Add New Book
                </button>
                <button
                    onClick={() => {
                        const bookId = prompt('Enter Book ID:');
                        if (bookId) fetchSpecificBook(bookId);
                    }}
                    className="px-4 py-2 bg-purple-500 text-white rounded"
                >
                    Get Specific Book
                </button>
                <button
                    onClick={() => setActiveView('search')}
                    className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                    Search Books
                </button>
            </div>

            {activeView === 'search' && (
                <div className="flex justify-center mb-8">
                    <SearchBar onSearch={handleSearch} />
                </div>
            )}

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}

            {books.length > 0 ? (
                <BookList books={books} />
            ) : (
                !loading && <p className="text-center">No books found</p>
            )}
        </div>
    );
}