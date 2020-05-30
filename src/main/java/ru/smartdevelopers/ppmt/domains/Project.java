package ru.smartdevelopers.ppmt.domains;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Date;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private Date createdAt;
    private Date completeAt;

    // When will be created users
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonIgnore
//    private User createdBy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getCompleteAt() {
        return completeAt;
    }

    public void setCompleteAt(Date completeAt) {
        this.completeAt = completeAt;
    }
}