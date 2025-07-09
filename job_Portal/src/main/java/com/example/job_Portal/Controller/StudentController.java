package com.example.job_Portal.Controller;

import com.example.job_Portal.Entity.JobPost;
import com.example.job_Portal.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/view")
    public ResponseEntity<List<JobPost>> view(){
        List<JobPost> job =  studentService.view();
        if(job!=null && !job.isEmpty()){
            return new ResponseEntity<>(job, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/view/id")
    public ResponseEntity<Optional<JobPost>> viewById(@RequestParam Long id){
        Optional<JobPost> job = studentService.viewById(id);
        if(job!=null && !job.isEmpty()){
            return new ResponseEntity<>(job, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/view/search")
    public ResponseEntity<List<JobPost>> viewJob(@RequestParam String keyword){
        List<JobPost> job = studentService.searchPost(keyword);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }
}
