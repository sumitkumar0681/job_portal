package com.example.job_Portal.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="status")
@Data
public class Status {

    @Id
    private Long id;
    private String stat;

    @OneToOne
    @MapsId
//    @JoinColumn(name = "id") // maps to applicationid
//    private Application application;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public Application getApplication() {
//        return application;
//    }
//
//    public void setApplication(Application application) {
//        this.application = application;
//    }

    public String getStat() {
        return stat;
    }

    public void setStat(String stat) {
        this.stat = stat;
    }
}
