package com.example.job_Portal.Repo;

import com.example.job_Portal.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepo extends JpaRepository<Status, Long> {
}
