package ru.smartdevelopers.ppmt.domains;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "taskMessages")
public class TaskMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String text;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createdAt;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date modifiedAt;
    @ManyToOne(fetch = FetchType.LAZY)
    private User createdBy;
    @ManyToOne(fetch = FetchType.LAZY)
    private Task task;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Date modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task taskId) {
        this.task = taskId;
    }

    public TaskMessage update (TaskMessage taskMessage) {
        this.text = taskMessage.text;
        this.modifiedAt = taskMessage.modifiedAt;
        return this;
    }
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.modifiedAt = new Date();
    }

}