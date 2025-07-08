package com.example.job_Portal.Repo;

import com.example.job_Portal.Entity.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPostRepo extends JpaRepository<JobPost, Long> {
    List<JobPost> findByEmail(String email);

    @Query("SELECT j from JobPost j WHERE LOWER(j.orgName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(j.jobTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(j.jobType) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%')) ")
    List<JobPost> searchPost(@Param("keyword") String keyword);

}
