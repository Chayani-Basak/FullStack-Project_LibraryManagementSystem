package com.cts.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.main.dto.LoginDto;
import com.cts.main.dto.RegisterDto;
import com.cts.main.repository.UserRepository;
import com.cts.main.service.UserService;
import com.cts.main.entity.User;

//@CrossOrigin(origins="http://localhost:3000")
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@PostMapping("/signup")
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
		if(userRepository.existsByEmail(registerDto.getEmail())) {
	         return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
	     }

	     User user=new User();
	     user.setFirstName(registerDto.getFirstName());
	     user.setLastName(registerDto.getLastName());
	     user.setEmail(registerDto.getEmail());
	     user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
	     user.setRole("USER");
	     userRepository.save(user);
	     return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
	}
	
	@PostMapping("/signin")
	 public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
			User user=userRepository.findByEmailAndRole(loginDto.getEmail(), loginDto.getRole());
			if (user != null && passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
				return new ResponseEntity<>(user, HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>("Invalid email or password!", HttpStatus.UNAUTHORIZED);
			}
	 }
	
	@GetMapping()
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users=userService.getAllUsers();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
}
