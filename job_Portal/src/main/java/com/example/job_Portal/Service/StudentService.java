package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.JobPost;
import com.example.job_Portal.Repo.JobPostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudentService {

    @Autowired
    private JobPostRepo jobPostRepo;

    public List<JobPost> view(){
        return jobPostRepo.findAll();
    }

    public Optional<JobPost> viewById(Long  id){
        return jobPostRepo.findById(id);
    }

    public List<JobPost> searchPost(String keyword){
        return jobPostRepo.searchPost(keyword);
    }
}
