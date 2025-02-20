'use client';

export default function ReturnToMainPageButton() {
    return (
        <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
            Return to Main Page
        </button>
    );
}