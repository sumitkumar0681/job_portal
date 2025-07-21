package com.example.job_Portal.Controller;

import com.example.job_Portal.Entity.Application;
import com.example.job_Portal.Entity.Status;
import com.example.job_Portal.Service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/application")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applypost(@RequestBody @Valid Application application){
        try {
            applicationService.applypost(application);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/RecView/{recEmail}")
    public ResponseEntity<List<Application>> getAll1(@PathVariable @Valid String recEmail){
        List<Application> app = applicationService.findByRecEmail(recEmail);
        if(app!=null){
            return new ResponseEntity<>(app, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/view/{studentEmail}")
    public ResponseEntity<List<Application>> getAll(@PathVariable @Valid String studentEmail){
        List<Application> app = applicationService.findByEmail(studentEmail);
        if(app!=null){
            return new ResponseEntity<>(app, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/updateStat")
    public ResponseEntity<?> updateStat(@RequestBody Status status){
        try{
            applicationService.saveStatus(status);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/appStat/id")
    public ResponseEntity<List<Status>> getStat(@RequestParam Long id){
        List<Status> status = applicationService.getStat(id);
        if(status!=null){
            return new ResponseEntity<>(status, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
