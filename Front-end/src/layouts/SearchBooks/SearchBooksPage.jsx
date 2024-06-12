import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";

export const SearchBooksPage = () => {
    const [books, setBooks] = useState([]);
    const [httpError, setHttpError] = useState(null);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [genreSelection, setGenreSelection] = useState('Book genre');

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = 'http://localhost:8080/api/books';
            let url = '';
            if (searchUrl === '') {
                url = baseUrl;
            } else if (searchUrl.includes('title=')) {
                url = `${baseUrl}/search/title?${searchUrl}`;
            } else if (searchUrl.includes('genre=')) {
                url = `${baseUrl}/search/genre?${searchUrl}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            console.log('Response JSON:', responseJson);
            setBooks(responseJson);
        };
        fetchBooks().catch((error) => {
            setHttpError(error.message);
        });
    }, [searchUrl]);

    const searchHandleChange = () => {
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`title=${search}`);
        }
    };

    const genreField = (value) => {
        if (value === 'All') {
            setGenreSelection('Book genre');
            setSearchUrl('');
        } else if (value === 'Academia' || value === 'Fiction') {
            setGenreSelection(value);
            setSearchUrl(`genre=${value.toLowerCase()}`);
        }
    };


    return (
        <div className='search'>
            <div>
                <div className='container'>
                    <div>
                        <div className='row mt-5'>
                            <div className='col-6'>
                                <div className='d-flex'>
                                    <input className='form-control me-2' type='search' placeholder='Search by title' aria-labelledby='Search' onChange={e => setSearch(e.target.value)} />
                                    <button className='btn btn-primary' style={{ display: 'flex', alignItems: 'center' }} onClick={() => searchHandleChange()}>
                                        Search <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '5px' }} />
                                    </button>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='dropdown'>
                                    <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expands='false'>
                                        {genreSelection}
                                    </button>
                                    <ul className='dropdown-menu' aria-labelledBy='dropdownMenuButton1'>
                                        <li onClick={() => genreField('All')}>
                                            <a className='dropdown-item' href='#'>
                                                All
                                            </a>
                                        </li>
                                        <li onClick={() => genreField('Academia')}>
                                            <a className='dropdown-item' href='#'>
                                                Academia
                                            </a>
                                        </li>
                                        <li onClick={() => genreField('Fiction')}>
                                            <a className='dropdown-item' href='#'>
                                                Fiction
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <br />
                        <table className='table table-bordered table-striped table-primary'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>ISBN</th>
                                    <th>Genre</th>
                                    <th>Total Copies</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map(book => (
                                    <tr key={book.id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.genre}</td>
                                        <td>{book.totalCopies}</td>
                                        <td>{book.cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
