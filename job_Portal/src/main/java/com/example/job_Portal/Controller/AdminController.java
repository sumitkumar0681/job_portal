package com.example.job_Portal.Controller;

import com.example.job_Portal.Entity.JobPost;
import com.example.job_Portal.Entity.User;
import com.example.job_Portal.Service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/viewjob")
    public ResponseEntity<List<JobPost>> getAll(){
        List<JobPost> jobs = adminService.allJobs();
        if(!jobs.isEmpty()){
            return new ResponseEntity<>(jobs, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/viewUsers")
    public ResponseEntity<?> users(){
        List<User> user = adminService.users();
        if(!user.isEmpty()){
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/userStat/email")
    public ResponseEntity<?> update(@RequestBody @Valid Map<String, String> request){
        boolean check = adminService.updateAccount(request);
        if(check) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
