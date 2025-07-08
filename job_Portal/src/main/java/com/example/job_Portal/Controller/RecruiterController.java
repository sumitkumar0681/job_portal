package com.example.job_Portal.Controller;

import com.example.job_Portal.Entity.JobPost;
import com.example.job_Portal.Service.RecruiterService;
import jakarta.validation.constraints.Email;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/view/id")
    public ResponseEntity<Optional<JobPost>> getbyId(@RequestParam Long id){
        Optional<JobPost> job = recruiterService.findById(id);
        if(job != null && !job.isEmpty()){
            return new ResponseEntity<>(job, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deletePost(@RequestParam Long id){
        boolean removed = recruiterService.deletePost(id);
        if(removed){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updatePost(@RequestBody JobPost jobPost){
        try{
            recruiterService.saveJob(jobPost);
            return new ResponseEntity<>(jobPost, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
