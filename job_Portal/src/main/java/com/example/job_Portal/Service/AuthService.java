package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.User;
import com.example.job_Portal.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Transactional
    public void save(User user) {
        user.setBlock(Boolean.FALSE);

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match.");
        }

        if (existsByEmail(user.getEmail())) {
            throw new IllegalStateException("Email already exists.");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);
    }


    public String login(User user){
        if(!existsByEmail(user.getEmail())){
            return "User not found!";
        }

        if (!encoder.matches(user.getPassword(), pass(user.getEmail()))) {
            return "Wrong password!";
        }

        String role = role(user.getEmail());
        if(block(user.getEmail()).equals(Boolean.TRUE)){
            return "User Blocked!";
        }
        if(!role.equals(user.getRole())){
            return "Wrong user role!";
        }
        if(role.equals("admin")){
            return "adminDashBoard";
        }
        else if(role.equals("student")){
            return "studentDashboard";
        }
        else if(role.equals("recruiter")){
            return "recruiterDashboard";
        }
        else{
            return "login";
        }
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

    public Boolean block(String email){
        User user = userRepo.findByEmail(email);
        boolean isBlocked = user.getBlock();
        return isBlocked;
    }
}
