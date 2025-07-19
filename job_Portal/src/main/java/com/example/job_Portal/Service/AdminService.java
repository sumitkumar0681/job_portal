package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.JobPost;
import com.example.job_Portal.Entity.User;
import com.example.job_Portal.Repo.JobPostRepo;
import com.example.job_Portal.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JobPostRepo jobPostRepo;

    public List<JobPost> allJobs(){
        return jobPostRepo.findAll();
    }

    public List<User> users(){
       return userRepo.findAll();
    }

    public User findByEmail(String email){
        return userRepo.findByEmail(email);
    }

    public void update(User user){
        userRepo.save(user);
    }
}
