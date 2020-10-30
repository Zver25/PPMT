package ru.smartdevelopers.ppmt.payloads;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ru.smartdevelopers.ppmt.domains.Task;
import ru.smartdevelopers.ppmt.domains.TaskMessage;

import java.util.Date;

public class TaskMessagePayload {
    private Long id;
    private String text;
    private Date createdAt;
    private Date modifiedAt;
    private Long taskMessageId;

    public TaskMessagePayload() {
    }

    public TaskMessagePayload(TaskMessage taskMessage) {
        this.id = taskMessage.getId();
        this.text = taskMessage.getText();
        this.createdAt = taskMessage.getCreatedAt();
        this.modifiedAt = taskMessage.getModifiedAt();
        this.taskMessageId = taskMessage.getTask() != null ? taskMessage.getTask().getId() : null;
    }

    @JsonIgnore
    public TaskMessage getTaskMessage() {
        TaskMessage taskMessage = new TaskMessage();
        taskMessage.setId(id);
        taskMessage.setText(text);
        taskMessage.setCreatedAt(createdAt);
        taskMessage.setModifiedAt(modifiedAt);
        if (taskMessageId != null && taskMessageId > 0) {
            Task task = new Task();
            task.setId(taskMessageId);
            taskMessage.setTask(task);
        }
        return taskMessage;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getModifiedAt() {
        return modifiedAt;
    }

    public Long getTaskMessageId() {
        return taskMessageId;
    }
}
