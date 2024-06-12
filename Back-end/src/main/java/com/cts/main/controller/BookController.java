package com.cts.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cts.main.entity.Book;
import com.cts.main.service.BookService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/books")
public class BookController {
	@Autowired
	private BookService bookService;

	@PostMapping("/create")
	public ResponseEntity<Book> addBook(@RequestBody Book book) throws Exception {
        return new ResponseEntity<>(bookService.createBook(book), HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Book>> getAllBooks() {
	    return new ResponseEntity<>(bookService.retrieveAllBooks(), HttpStatus.OK);
	}

	@GetMapping("/retrieve/{bookId}")
	public ResponseEntity<Book> getBookById(@PathVariable Long bookId) {
	    return new ResponseEntity<>(bookService.retrieveById(bookId), HttpStatus.OK);
	}
	
	@PutMapping("/update/{bookId}")
	public ResponseEntity<Book> updateBook(@PathVariable Long bookId, @RequestBody Book updatedBook) throws Exception {
        return new ResponseEntity<>(bookService.updateBook(bookId, updatedBook), HttpStatus.OK);
	 }

	 @DeleteMapping("/delete/{bookId}")
	 public ResponseEntity<Void> removeBook(@PathVariable Long bookId) throws Exception {
		 bookService.deleteBook(bookId);
		 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	 }
	 
	 @GetMapping("/search/title")
	 public List<Book> retrieveBooksByTitle(@RequestParam("title") String title) {
	     return bookService.retrieveBooksByTitle(title);
	 }
	 
	 @GetMapping("/search/genre")
	 public List<Book> retrieveBooksByGenre(@RequestParam("genre") String genre) {
	     return bookService.retrieveBooksByGenre(genre);
	 }

	 @PostMapping("/borrow/{bookId}")
	 public ResponseEntity<Book> borrowBook(@PathVariable Long bookId) throws Exception {
	     Book borrowedBook=bookService.borrowBook(bookId);
	     if (borrowedBook!=null) {
	         return ResponseEntity.ok(borrowedBook);
	     } 
	     else {
	         return ResponseEntity.badRequest().build();
	     }
	 }

	 @PostMapping("/return/{bookId}")
	 public ResponseEntity<Book> returnBook(@PathVariable Long bookId) throws Exception {
	     Book returnedBook=bookService.returnBook(bookId);
	     if (returnedBook!=null) {
	         return ResponseEntity.ok(returnedBook);
	     } 
	     else {
	         return ResponseEntity.badRequest().build(); 
	     }
	 }
	 
}
