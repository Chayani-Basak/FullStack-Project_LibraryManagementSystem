import { useState } from 'react';
import { AddBook } from './components/AddBook';
import ChangeBooksQuantity from './components/ChangeBooksQuantity';

export const AdminPage=() => {
    const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick]=useState(false);
    
    function addBookClickFunction() {
        setChangeQuantityOfBooksClick(false);
    }

    function changeQuantityOfBooksClickFunction() {
        setChangeQuantityOfBooksClick(true);
    }

    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>ADMIN'S CORNER</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button onClick={addBookClickFunction} className='nav-link active' id='nav-add-book-tab' data-bs-toggle='tab' 
                        data-bs-target='#nav-add-book' type='button' role='tab' aria-controls='nav-add-book'
                        aria-selected='false'>
                            Add New Book
                        </button>
                        <button onClick={changeQuantityOfBooksClickFunction} className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab' 
                        data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity'
                        aria-selected='true'>
                            Modify Existing Books
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-add-book' role='tabpanel'
                    aria-labelledby='nav-add-book-tab'>
                            <AddBook />
                    </div>
                    <div className='tab-pane fade' id='nav-quantity' role='tabpanel'
                    aria-labelledby='nav-quantity-tab'>
                            {changeQuantityOfBooksClick? <ChangeBooksQuantity/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}