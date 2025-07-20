package com.example.job_Portal.Controller;

import com.example.job_Portal.Entity.User;
import com.example.job_Portal.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){

           user.setBlock(Boolean.FALSE);

            if(!user.getPassword().equals(user.getConfirmPassword())){
                return ResponseEntity.badRequest().body("Password not matched!");
            }

            if(authService.existsByEmail(String.valueOf(user.getEmail()))){
                return ResponseEntity.badRequest().body("Email already in use.");
            }
            authService.save(user);
            return ResponseEntity.ok().body("User registered successfully.");
    }

    @PostMapping("/login")
    public String login(@RequestBody User user){

        if(!authService.existsByEmail(user.getEmail())){
            return "User not found!";
        }

       if (!encoder.matches(user.getPassword(), authService.pass(user.getEmail()))) {
            return "Wrong password!";
       }

        String role = authService.role(user.getEmail());
        if(authService.block(user.getEmail()).equals(Boolean.TRUE)){
            return "User Blocked!";
        }
        if(!role.equals(user.getRole())){
            return "Wrong user role!";
        }
        if(role.equals("admin")){
            return "adminDashBoard";
        }
        else if(role.equals("student")){
            return "studentDashboard";
        }
        else if(role.equals("recruiter")){
            return "recruiterDashboard";
        }
        else{
            return "login";
        }
    }

}
