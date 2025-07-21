package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.JobPost;
import com.example.job_Portal.Entity.User;
import com.example.job_Portal.Repo.JobPostRepo;
import com.example.job_Portal.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JobPostRepo jobPostRepo;

    public List<JobPost> allJobs() {
        return jobPostRepo.findAll();
    }

    public List<User> users() {
        return userRepo.findAll();
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Transactional
    public void update(User user) {
        userRepo.save(user);
    }

    @Transactional
    public boolean updateAccount(Map<String, String> request) {
        String email = request.get("email");
        String stat = request.get("status");

        if (email == null || stat == null) {
            return false;
        }
        User user = userRepo.findByEmail(email);
        if (user != null) {
            if (stat.equalsIgnoreCase("block")) {
                user.setBlock(Boolean.TRUE);
            } else if (stat.equalsIgnoreCase("active")) {
                user.setBlock(Boolean.FALSE);
            }
            update(user);
            return true;
        } else {
            return false;
        }
    }
}