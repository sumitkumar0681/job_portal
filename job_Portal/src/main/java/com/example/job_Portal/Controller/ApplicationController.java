package com.example.job_Portal.Controller;

import com.example.job_Portal.Entity.Application;
import com.example.job_Portal.Service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/application")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<Application> apply(@RequestBody Application application){
        try {
            applicationService.apply(application);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/view/{recEmail}")
    public ResponseEntity<List<Application>> getAll(@PathVariable String recEmail){
        List<Application> app = applicationService.findByEmail(recEmail);
        if(app!=null){
            return new ResponseEntity<>(app, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
