package com.cts.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.main.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	Boolean existsByEmail(String email);
	User findByEmailAndRole(String email, String role);
}