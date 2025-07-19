package com.example.job_Portal.Repo;

import com.example.job_Portal.Entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepo extends JpaRepository<Application, Long> {
    List<Application> findByEmail( String email);
    List<Application> findByRecEmail(String recEmail);
}
