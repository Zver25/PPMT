package ru.smartdevelopers.ppmt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.smartdevelopers.ppmt.domains.Project;
import ru.smartdevelopers.ppmt.domains.Task;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.repositories.ProjectRepository;
import ru.smartdevelopers.ppmt.repositories.TaskRepository;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    @Autowired
    public void setTaskRepository(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task create(Task task, User user){
        task.setCreatedBy(user);
        return taskRepository.save(task);
    }

    public Task update(Task task) {
        return taskRepository.save(task);
    }

    public Task delete(Task task) {
        return taskRepository.save(task);
    }
}
