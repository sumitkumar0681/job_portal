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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStat() {
        return stat;
    }

    public void setStat(String stat) {
        this.stat = stat;
    }
}
