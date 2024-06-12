import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faBook
} from "@fortawesome/free-solid-svg-icons";

export const ShelfPage = () => {

    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        booksList();
    }, [])

    function booksList() {
        const url = 'http://localhost:8080/api/books';
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                return response.json();
            })
            .then(data => {
                setBooks(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    async function borrowBook(bookId) {
        const url = `http://localhost:8080/api/books/borrow/${bookId}`;
        const borrowResponse = await fetch(url, { method: 'POST' });
        if (!borrowResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setMessage('Book borrowed successfully!');
        booksList();
    }

    async function returnBook(bookId) {
        const url = `http://localhost:8080/api/books/return/${bookId}`;
        const returnResponse = await fetch(url, { method: 'POST' });
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setMessage('Book returned successfully!');
        booksList();
    }

    return (
        <div className='shelf'>
            <div className='container'>
                {message && <p style={{ color: 'blue' }}><b>{message}</b></p>}
                <div className='mt-3'>
                    <nav>
                        <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                            <button className='nav-link active' id='nav-history-tab' data-bs-toggle='tab' data-bs-target='#nav-history' type='button'>
                                Books Piled <FontAwesomeIcon icon={faList} />
                            </button>
                            <table className='table table-bordered table-striped table-warning'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>ISBN</th>
                                        <th>Genre</th>
                                        <th>Available Copies</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        books.map(book =>
                                            <tr key={book.bookId}>
                                                <td>{book.title}</td>
                                                <td>{book.author}</td>
                                                <td>{book.isbn}</td>
                                                <td>{book.genre}</td>
                                                <td>{book.availableCopies}</td>
                                                <td>
                                                    <button className='btn btn-success' style={{ marginLeft: "10px", marginRight: "10px" }} onClick={() => borrowBook(book.bookId)}>
                                                        Borrow
                                                        <FontAwesomeIcon icon={faBook} />
                                                    </button>
                                                    <button className='btn btn-info' style={{ marginLeft: "10px" }} onClick={() => returnBook(book.bookId)}>
                                                        Return
                                                        <FontAwesomeIcon icon={faBook} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}