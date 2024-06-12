import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSave,
} from "@fortawesome/free-solid-svg-icons";

export const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genre, setGenre] = useState('');
    const [totalCopies, setTotalCopies] = useState('Genre');
    const [availableCopies, setAvailableCopies] = useState(0);

    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function genreField(value) {
        setGenre(value);
    }

    async function submitNewBook() {
        const url = `http://localhost:8080/api/books/create`;
        if (title != '' && author != '' && isbn != '' && genre != '' && totalCopies >= 0) {
            let book = {
                title: title,
                author: author,
                isbn: isbn,
                genre: genre,
                totalCopies: totalCopies,
                availableCopies: totalCopies
            };

            const submitNewBookResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            if (!submitNewBookResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setTitle('');
            setAuthor('');
            setIsbn('');
            setGenre('');
            setTotalCopies(0);
            setAvailableCopies(totalCopies);
            setDisplayWarning(false);
            setDisplaySuccess(true);
        }
        else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <div>
            <div className='container mt-5 mb-5'>
                {displaySuccess &&
                    <div className='alert alert-success' role='alert'>
                        Book added successfully!
                    </div>
                }
                {displayWarning &&
                    <div className='alert alert-danger' role='alert'>
                        All fields must be filled out!
                    </div>
                }
                <div className='card'>
                    <div className='card-header'>
                        Book Details
                    </div>
                    <div className='card-body'>
                        <form method='POST'>
                            <div className='row'>
                                <div className='col-md-6 mb-3'>
                                    <label className='form-label'>Title</label>
                                    <input type="text" className='form-control' name='title' required
                                        onChange={(e) => setTitle(e.target.value)} value={title} />
                                </div>
                                <div className='col-md-3 mb-3'>
                                    <label className='form-label'>Author</label>
                                    <input type="text" className='form-control' name='author' required
                                        onChange={(e) => setAuthor(e.target.value)} value={author} />
                                </div>
                                <div className='col-md-3 mb-3'>
                                    <label className='form-label'>ISBN</label>
                                    <input type="text" className='form-control' name='isbn' required
                                        onChange={(e) => setIsbn(e.target.value)} value={isbn} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-3 mb-3'>
                                    <label className='form-label'>Genre</label>
                                    <button className='form-control btn btn-secondary dropdown-toggle' type='button'
                                        id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {genre}
                                    </button>
                                    <ul id='addNewBookId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                        <li><a onClick={() => genreField('Academia')} className='dropdown-item'>Academia</a></li>
                                        <li><a onClick={() => genreField('Fiction')} className='dropdown-item'>Fiction</a></li>
                                    </ul>
                                </div>
                                <div className='col-md-3 mb-3'>
                                    <label className='form-label'>Total Copies</label>
                                    <input type='number' className='form-control' name='totalCopies' required
                                        onChange={(e) => setTotalCopies(e.target.value)} value={totalCopies} />
                                </div>
                            </div>
                            <div>
                                <button type='button' className='btn btn-primary mt-3' onClick={submitNewBook}>
                                    <FontAwesomeIcon icon={faSave} />
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}