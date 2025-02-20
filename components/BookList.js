import Link from 'next/link';

export default function BookList({ books, onBookClick }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
                <div key={book.id}
                    // onClick={() => onBookClick(book.id)}
                    className="bg-white p-6 rounded-lg shadow-md">
                    <Link href={`/books/${book.id}`}>
                        <div>
                            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                            <p className="text-gray-700 mb-2">ID: {book.id}</p>
                            <p className="text-gray-700 mb-1">Author: {book.author}</p>
                            <p className="text-gray-700 mb-1">Isbn: {book.isbn}</p>
                            <p className="text-gray-700">Year: {book.publicationYear}</p>
                            <p className="text-gray-700 mb-2">Description: {book.description}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}