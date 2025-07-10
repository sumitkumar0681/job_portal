package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.Application;
import com.example.job_Portal.Repo.ApplicationRepo;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepo applicationRepo;

    public void apply(Application application){
        applicationRepo.save(application);
    }

    public List<Application> findByEmail(String recEmail){
        return applicationRepo.findByrecEmail(recEmail);
    }
}
