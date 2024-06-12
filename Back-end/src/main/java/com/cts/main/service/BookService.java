package com.cts.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.main.entity.Book;
import com.cts.main.exception.NotFoundException;
import com.cts.main.repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book createBook(Book book) {
       return bookRepository.save(book);
    }
    
    public List<Book> retrieveAllBooks () {
        return bookRepository.findAll();
    }
    
    public Book retrieveById(Long bookId) {
    	return bookRepository.findById(bookId).orElseThrow(() -> new NotFoundException("Book with id "+bookId+" does not exist."));
    }
    
    public Book updateBook(Long bookId, Book updatedBook) {
        Book book=retrieveById(bookId);
        if (book != null) {
	        book.setTitle(updatedBook.getTitle());
	        book.setAuthor(updatedBook.getAuthor());
	        book.setISBN(updatedBook.getISBN());
	        book.setGenre(updatedBook.getGenre());
	        return bookRepository.save(book);
        }
        else {
            throw new NotFoundException("Book with id "+bookId+" does not exist.");
        }
    }

    public void deleteBook(Long bookId) throws Exception {
    	Book book=retrieveById(bookId);
    	if (book!=null) {
    		bookRepository.deleteById(bookId);
    	}
    	else {
    		throw new NotFoundException("Book with id "+bookId+" does not exist.");
        }
    }
    
    public List<Book> retrieveBooksByTitle(String title) {
        return bookRepository.findByTitleContaining(title);
    }
    
    public List<Book> retrieveBooksByGenre(String genre) {
        return bookRepository.findByGenre(genre);
    }

    public Book borrowBook(Long bookId) throws Exception {
        Book book=retrieveById(bookId);

        if (book!=null && book.getAvailableCopies()>0) {
            book.setAvailableCopies(book.getAvailableCopies()-1);
            return bookRepository.save(book);
        }
        else {
        	throw new Exception("Book doesn't exist or already borrowed by user!");
        }
    }

    public Book returnBook(Long bookId) throws Exception {
        Book book=retrieveById(bookId);
        if (book!=null) {
            book.setAvailableCopies(book.getAvailableCopies()+1);
            return bookRepository.save(book);
        }
        else {
        	throw new Exception("Book doesn't exist!");
        }
    }
}



//Map<Integer, String> m=new HasMap<>();
//m.put(1, "SpringBoot");
//m.put(2, "Java");
//m.put(3, "SQL");
//m.put(4, "React");
//
//
//Map<Integer, String> res=map.entrySet().stream().filter(e->e.getKey()>=75 && e.getKey()<=100).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));



