package ru.smartdevelopers.ppmt.domains;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Date;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    private String Title;
    private Date CreatedAt;
    private Date CompleteAt;

    // When will be created users
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonIgnore
//    private User createdBy;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public Date getCreatedAt() {
        return CreatedAt;
    }

    public void setCreatedAt(Date createdAt) {
        CreatedAt = createdAt;
    }

    public Date getCompleteAt() {
        return CompleteAt;
    }

    public void setCompleteAt(Date completeAt) {
        CompleteAt = completeAt;
    }
}