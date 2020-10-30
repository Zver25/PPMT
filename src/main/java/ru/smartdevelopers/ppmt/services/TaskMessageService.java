package ru.smartdevelopers.ppmt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.smartdevelopers.ppmt.domains.Task;
import ru.smartdevelopers.ppmt.domains.TaskMessage;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.repositories.TaskMessageRepository;
import ru.smartdevelopers.ppmt.repositories.TaskRepository;

import java.util.List;

@Service
public class TaskMessageService {

    private TaskRepository taskRepository;
    private TaskMessageRepository taskMessageRepository;

    @Autowired
    public void setTaskRepository(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Autowired
    public void setTaskMessageRepository(TaskMessageRepository taskMessageRepository) {
        this.taskMessageRepository = taskMessageRepository;
    }


    public List<TaskMessage> findAllByTask(String taskTittle) {
        Task task = taskRepository.findAllByTitle(taskTittle);
        return taskMessageRepository.findAllByTaskId(task);
    }

    public TaskMessage create(TaskMessage taskMessage, User user) {
        taskMessage.setCreatedBy(user);
        return taskMessageRepository.save(taskMessage);
    }

    public TaskMessage update(TaskMessage taskMessage, User user) {
        taskMessage.setCreatedBy(user);
        return taskMessageRepository.save(taskMessage);
    }

    public void delete(TaskMessage taskMessage) {
        taskMessageRepository.delete(taskMessage);
    }


}

