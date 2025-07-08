package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.JobPost;
import com.example.job_Portal.Repo.JobPostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public boolean deletePost(Long id){
        if(jobPostRepo.existsById(id)){
            jobPostRepo.deleteById(id);
            return true;
        }
        return  false;
    }

    public boolean existById(Long id){
        return jobPostRepo.existsById(id);
    }

    public Optional<JobPost> findById(Long id){
        return jobPostRepo.findById(id);
    }
}
