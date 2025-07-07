package com.example.job_Portal.Controller;

import com.example.job_Portal.Entity.JobPost;
import com.example.job_Portal.Service.RecruiterService;
import jakarta.validation.constraints.Email;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recruiter")
@CrossOrigin(origins = "*")
public class RecruiterController {

    @Autowired
    private RecruiterService recruiterService;

    @PostMapping("/addJob")
    public ResponseEntity<?> addjob(@RequestBody JobPost jobPost){
        try{
            recruiterService.saveJob(jobPost);
            return ResponseEntity.ok().body("Job Posted Successfully!");
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body("Try again!");
        }
    }

    @GetMapping("/view")
    public ResponseEntity<List<JobPost>> view(String email){
       List<JobPost> job = recruiterService.view(email);
       if(job!=null && !job.isEmpty()) {
           return new ResponseEntity<>(job, HttpStatus.OK);
       }
       return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
