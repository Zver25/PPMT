package ru.smartdevelopers.ppmt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.smartdevelopers.ppmt.domains.Project;
import ru.smartdevelopers.ppmt.domains.Task;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.repositories.TaskRepository;
import ru.smartdevelopers.ppmt.repositories.UserRepository;

import java.util.List;

@Service
public class TaskService {

    private TaskRepository taskRepository;
    private UserRepository userRepository;

    @Autowired
    public void setTaskRepository(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    public List<Task> findAllByUser(String username) {
        User user = userRepository.findByUsername(username);
        return taskRepository.findAllByCreatedBy(user);
    }

    public List<Task> findByProject(Project project) {
        return taskRepository.findAllByProject(project);
    }
}
