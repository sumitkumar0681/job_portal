package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.Application;
import com.example.job_Portal.Repo.ApplicationRepo;
import com.example.job_Portal.Repo.StatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.job_Portal.Entity.Status;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepo applicationRepo;

    @Autowired
    private StatusRepo statusRepo;

    @Transactional
    public void apply(Application application){
        applicationRepo.save(application);
    }

    public List<Application> findByEmail(String email){
        return applicationRepo.findByEmail(email);
    }

    public Optional<Application> findById(Long id){
        return applicationRepo.findById(id);
    }

    public void saveStatus(Status status){
        statusRepo.save(status);
    }

    public List<Application> findByRecEmail(String recEmail){
        return applicationRepo.findByRecEmail(recEmail);
    }

    public List<Status> getStat(Long id){
        return statusRepo.findAllById(Collections.singleton(id));
    }

    @Transactional
    public void applypost(Application application){
        try {
            apply(application);
            Long  id = application.getApplicationid();
            Status status = new Status();
            status.setId(id);
            status.setStat("Pending");
            saveStatus(status);
        }
        catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
