package com.example.aidigitalwardrobe.dataaccesslayer.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    User findUserByUserIdentifier_UserId(String userId);
}
