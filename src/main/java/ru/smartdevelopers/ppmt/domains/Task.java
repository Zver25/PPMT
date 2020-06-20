package ru.smartdevelopers.ppmt.domains;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Date cratedAt;
    private Date completedAt;
    @ManyToOne(fetch = FetchType.LAZY)
    private User createdBy;
    @ManyToOne(fetch = FetchType.LAZY)
    private Project projectId;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCratedAt() {
        return cratedAt;
    }

    public void setCratedAt(Date cratedAt) {
        this.cratedAt = cratedAt;
    }

    public Date getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Date completedAt) {
        this.completedAt = completedAt;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Project getProjectId() {
        return projectId;
    }

    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }

}
