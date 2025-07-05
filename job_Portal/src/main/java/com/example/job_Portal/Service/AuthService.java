package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.User;
import com.example.job_Portal.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    public void save(User user){
        userRepo.save(user);
    }

}
