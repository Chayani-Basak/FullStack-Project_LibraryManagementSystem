import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSave,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ChangeBooksQuantity = () => {

    const [books, setBooks] = useState([])
    const [message, setMessage] = useState('')
    const [editingBook, setEditingBook] = useState(null);

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

    async function deleteBook(bookId) {
        const url = `http://localhost:8080/api/books/delete/${bookId}`;
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        setMessage('Book deleted successfully!');
        booksList();
    }

    function startUpdateBook(bookId) {
        // Find the book that needs to be updated
        const bookToEdit = books.find(book => book.bookId === bookId);
        // Set the editingBook state
        setEditingBook(bookToEdit);
    }

    async function updateBook(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/books/update/${editingBook.bookId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editingBook),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            setMessage('Book updated successfully!');
            booksList();
        } catch (error) {
            console.error("Error:", error);
        }
        setEditingBook(null);
    }

    return (
        <div className='container'>
            {message && <p style={{ color: 'green' }}><b>{message}</b></p>}
            <div>
                <table className='table table-bordered table-striped' style={{backgroundColor: '#d4ebf2'}}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Genre</th>
                            <th>Total Copies</th>
                            <th>Available Copies</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books?.map(book => {
                                console.log('Book:', book);
                                return (
                                    <tr key={book.bookId}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.genre}</td>
                                        <td>{book.totalCopies}</td>
                                        <td>{book.availableCopies}</td>
                                        <td>
                                            <button className='btn btn-info' style={{ marginLeft: "10px", marginRight: "10px" }} onClick={() => startUpdateBook(book.bookId)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                                Update
                                            </button>
                                            <button className='btn btn-danger' style={{ marginLeft: "10px" }} onClick={() => deleteBook(book.bookId)} >
                                                <FontAwesomeIcon icon={faTrash} />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {editingBook && (
                <div className='card-body'>
                    <form onSubmit={updateBook}>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Title</label>
                                <input type="text" className='form-control' name='title' required
                                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} value={editingBook.title} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Author</label>
                                <input type="text" className='form-control' name='author' required
                                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} value={editingBook.author} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>ISBN</label>
                                <input type="text" className='form-control' name='isbn' required
                                    onChange={(e) => setEditingBook({ ...editingBook, isbn: e.target.value })} value={editingBook.isbn} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Genre</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                    {editingBook.genre}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a onClick={() => setEditingBook({ ...editingBook, genre: 'Academia' })} className='dropdown-item'>Academia</a></li>
                                    <li><a onClick={() => setEditingBook({ ...editingBook, genre: 'Fiction' })} className='dropdown-item'>Fiction</a></li>
                                </ul>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Total Copies</label>
                                <input type='number' className='form-control' name='totalCopies' required
                                    onChange={(e) => {
                                        const totalCopies = e.target.value;
                                        setEditingBook({ ...editingBook, totalCopies: totalCopies, availableCopies: totalCopies });
                                    }}
                                    value={editingBook.totalCopies} />
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary mt-3'>
                                <FontAwesomeIcon icon={faSave} />
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ChangeBooksQuantity;