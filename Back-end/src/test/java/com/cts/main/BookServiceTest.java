package com.cts.main.ServiceTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cts.main.entity.Author;
import com.cts.main.entity.Book;
import com.cts.main.entity.Publisher;
import com.cts.main.entity.User;
import com.cts.main.repository.BookRepository;
import com.cts.main.repository.UserRepository;
import com.cts.main.service.BookService;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {
	
	@Mock
	private BookRepository bookRepository;
	
	@Mock
	private UserRepository userRepository;

	@InjectMocks
	private BookService bookService;

	private Book book;

	@BeforeEach
	public void setup(){
		Author author1=Author.builder()
		        .authorId(1L)
		        .name("Khaled Hosseini")
		        .build(); 

		Publisher publisher1=Publisher.builder()
		        .publisherId(1L)
		        .name("Penguin Books")
		        .build();
		
		User borrower=User.builder()
	            .id(1L)
	            .build();
		
		List<Author> authors=Arrays.asList(author1);
	    List<Publisher> publishers=Arrays.asList(publisher1);
		
	    book=Book.builder()
	            .bookId(1L)
	            .title("The Kite-Runner")
	            .ISBN("KR1002")
	            .genre("War Fiction")
	            .authors(authors)
	            .publishers(publishers)
	            .borrowed(false)
	            .borrower(borrower)
	            .build();
	}

	// JUnit test for save method
	@DisplayName("JUnit test for saveBook method")
	@Test
	public void givenBookObject_whenSaveBook_thenReturnBookObject() {
	    // given - precondition or setup
	    when(bookRepository.save(book)).thenReturn(book);

	    System.out.println(bookRepository);
	    System.out.println(bookService);

	    // when -  action or the behaviour that we are going to test
	    Book savedBook=bookService.save(book);

	    System.out.println(savedBook);
	    
	    // then - verify the output
	    assertThat(savedBook).isNotNull();
	}
	
	// JUnit test for findAll method
	@DisplayName("JUnit test for findAllBooks method")
    @Test
    public void givenBooksList_whenGetAllBooks_thenReturnBooksList() {
        // given - precondition or setup
		Author author1=Author.builder()
		        .authorId(2L)
		        .name("Herbert Schildt")
		        .build(); 

		Publisher publisher1=Publisher.builder()
		        .publisherId(2L)
		        .name("Oxford University Press")
		        .build();
		
		List<Author> authors=Arrays.asList(author1);
	    List<Publisher> publishers=Arrays.asList(publisher1);
		
	    Book book1=Book.builder()
	            .bookId(2L)
	            .title("Fundamentals of Java")
	            .ISBN("JF2001")
	            .genre("Core Java")
	            .authors(authors)
	            .publishers(publishers)
	            .borrowed(false)
	            .borrower(null)
	            .build();

        when(bookRepository.findAll()).thenReturn(List.of(book, book1));

        // when -  action or the behaviour that we are going to test
        List<Book> bookList=bookService.findAll();

        // then - verify the output
        assertThat(bookList).isNotNull();
        assertThat(bookList.size()).isEqualTo(2);
    }
	
	// JUnit test for findBookById method
	@DisplayName("JUnit test for findBookById method")
    @Test
    public void givenBookId_whenGetBookById_thenReturnBookObject() {
		// given - precondition or setup
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        // when -  action or the behaviour that we are going to test
        Book savedBook=bookService.findById(book.getBookId()).get();
        
        System.out.println(bookRepository);
	    System.out.println(bookService);

        // then - verify the output
        assertThat(savedBook).isNotNull();

    }
	
	// JUnit test for updateBook method
	@DisplayName("JUnit test for updateBook method")
    @Test
    public void givenBookObject_whenUpdateBook_thenReturnUpdatedBook() {
        // given - precondition or setup
        when(bookRepository.save(book)).thenReturn(book);
        book.setTitle("SpringBoot in Depth");
        book.setISBN("SB2002");
        book.setGenre("SpringBoot Core");
        
        Author author1=Author.builder()
		        .name("Nageshwar Rao")
		        .build(); 
		
		List<Author> authors=Arrays.asList(author1);
		book.setAuthors(authors);
        
        // when -  action or the behaviour that we are going to test
        Book updatedBook=bookService.updateBook(book);
		
		System.out.println(bookRepository);
	    System.out.println(bookService);

        // then - verify the output
        assertThat(updatedBook.getTitle()).isEqualTo("SpringBoot in Depth");
        assertThat(updatedBook.getISBN()).isEqualTo("SB2002");
        assertThat(updatedBook.getGenre()).isEqualTo("SpringBoot Core");
        assertThat(updatedBook.getAuthors()).isEqualTo(authors);
    }
	
	//JUnit test for deleteEmployee method
	@DisplayName("JUnit test for deleteUser method")
    @Test
    public void givenBookId_whenDeleteBook_thenNothing() {
        // given - precondition or setup
        long bookId=1L;

        doNothing().when(bookRepository).deleteById(bookId);

        // when -  action or the behaviour that we are going to test
        bookService.deleteById(bookId);

        // then - verify the output
        verify(bookRepository, times(1)).deleteById(bookId);
    }
	
	//JUnit test for borrowBook method
	@DisplayName("JUnit test for borrowBook method")
	@Test
	public void testBorrowBook() {
		// given - precondition or setup
	    Book book = new Book();
	    User user = new User();
	    when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
		when(userRepository.findById(1L)).thenReturn(Optional.of(user));
	    when(bookRepository.save(book)).thenReturn(book);
	    
	    // when -  action or the behaviour that we are going to test
	    Book borrowedBook=bookService.borrowBook(1L, 1L);
	    
	    // then - verify the output
	    assertThat(borrowedBook).isNotNull();
	}
	
	//JUnit test for returnBook method
	@DisplayName("JUnit test for deleteUser method")
	@Test
	public void testReturnBook() {
		// given - precondition or setup
	    Book book = new Book();
	    book.setBorrowed(true);
	    when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
	    when(bookRepository.save(book)).thenReturn(book);
	    
	    // when -  action or the behaviour that we are going to test
	    Book returnedBook=bookService.returnBook(1L);
	    
	    // then - verify the output
	    assertThat(returnedBook).isNotNull();
	}
}
