package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.User;
import com.example.job_Portal.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    public void save(User user){
        userRepo.save(user);
    }

    public List<User> getUser(){
        return userRepo.findAll();
    }

    public boolean existsByEmail(String email){
        return userRepo.existsByEmail(email);
    }

    public String userName(String email){
        User user = userRepo.findByEmail(email);
        return user.getName();
    }

    public String pass(String email){
        User user = userRepo.findByEmail(email);
        return user.getPassword();
    }

    public String role(String email){
        User user = userRepo.findByEmail(email);
        return user.getRole();
    }
}
