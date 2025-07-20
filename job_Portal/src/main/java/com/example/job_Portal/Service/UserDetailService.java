package com.example.job_Portal.Service;

import com.example.job_Portal.Entity.User;
import com.example.job_Portal.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException{

        User user = userRepo.findByName(name);
        if(user!=null){
            UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                    .username(user.getName())
                    .password(user.getPassword())
                    .build();
            return userDetails;
        }
        throw new UsernameNotFoundException("User : "+name+" not found");
    }

}
