package com.example.job_Portal.Entity;



import com.example.job_Portal.Entity.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="application")
@Data
public class Application{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationid;

    private String orgName;
    private String location;
    private String recEmail;
    private String appliedFor;
    private String name;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    private String email;
    private String address;
    private String qualification;
    private String marksType;
    private Double markQuali;
    private Double per12;
    private Double per10;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate applyDate;

    private String resumeLink;

//    @OneToOne(mappedBy = "application", cascade = CascadeType.ALL)
//    private Status status;

    public Long getApplicationid() {
        return applicationid;
    }

    public void setApplicationid(Long applicationid) {
        this.applicationid = applicationid;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRecEmail() {
        return recEmail;
    }

    public void setRecEmail(String recEmail) {
        this.recEmail = recEmail;
    }

    public String getAppliedFor() {
        return appliedFor;
    }

    public void setAppliedFor(String appliedFor) {
        this.appliedFor = appliedFor;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getMarksType() {
        return marksType;
    }

    public void setMarksType(String marksType) {
        this.marksType = marksType;
    }

    public Double getMarkQuali() {
        return markQuali;
    }

    public void setMarkQuali(Double markQuali) {
        this.markQuali = markQuali;
    }

    public Double getPer12() {
        return per12;
    }

    public void setPer12(Double per12) {
        this.per12 = per12;
    }

    public Double getPer10() {
        return per10;
    }

    public void setPer10(Double per10) {
        this.per10 = per10;
    }

    public LocalDate getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(LocalDate applyDate) {
        this.applyDate = applyDate;
    }

    public String getResumeLink() {
        return resumeLink;
    }

    public void setResumeLink(String resumeLink) {
        this.resumeLink = resumeLink;
    }

//    public Status getStatus() {
//        return status;
//    }
//
//    public void setStatus(Status status) {
//        this.status = status;
//    }
}
