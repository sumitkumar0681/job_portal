package com.example.job_Portal.Controller;

import com.example.job_Portal.Entity.JobPost;
import com.example.job_Portal.Entity.User;
import com.example.job_Portal.Service.AdminService;
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
    private ResponseEntity<?> update(@RequestBody Map<String, String> request){

        String email = request.get("email");
        String stat = request.get("status");

        if(email==null || stat==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = adminService.findByEmail(email);
        if(user!=null) {
            if(stat.equalsIgnoreCase("block")){
                user.setBlock(Boolean.TRUE);
            }
            else if (stat.equalsIgnoreCase("active")) {
                user.setBlock(Boolean.FALSE);
            }
            adminService.update(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
