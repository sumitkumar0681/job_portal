package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.JobPost;
import com.example.job_Portal.Repo.JobPostRepo;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruiterService {

    @Autowired
    private JobPostRepo jobPostRepo;

    public void saveJob(JobPost jobPost){
        jobPostRepo.save(jobPost);
    }

    public List<JobPost> view(String email){
         return jobPostRepo.findByEmail(email);
    }
}
