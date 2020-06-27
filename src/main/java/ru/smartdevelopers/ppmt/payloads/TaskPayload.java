package ru.smartdevelopers.ppmt.payloads;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import ru.smartdevelopers.ppmt.domains.Project;
import ru.smartdevelopers.ppmt.domains.Task;

import java.util.Date;

public class TaskPayload {

    private Long id;
    private String title;
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createdAt;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date completedAt;
    private Long projectId;

    public TaskPayload() {
    }

    public TaskPayload(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.createdAt = task.getCreatedAt();
        this.completedAt = task.getCompletedAt();
        this.projectId = task.getProject() != null ? task.getProject().getId() : null;
    }

    @JsonIgnore
    public Task getTask() {
        Task task = new Task();
        task.setId(id);
        task.setTitle(title);
        task.setDescription(description);
        task.setCreatedAt(createdAt);
        task.setCompletedAt(completedAt);
        if (projectId != null && projectId > 0) {
            Project project = new Project();
            project.setId(projectId);
            task.setProject(project);
        }
        return task;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getCompletedAt() {
        return completedAt;
    }

    public Long getProjectId() {
        return projectId;
    }
}
