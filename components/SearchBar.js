import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [searchBy, setSearchBy] = useState('title'); // Default to searching by title

    const handleSearch = () => {
        onSearch(query, searchBy); // Pass both query and searchBy to the parent component
    };

    return (
        <div className="flex space-x-2">
            <input
                type="text"
                placeholder={`Search by ${searchBy}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="title">Title</option>
                <option value="author">Author</option>
            </select>
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Search
            </button>
        </div>
    );
}