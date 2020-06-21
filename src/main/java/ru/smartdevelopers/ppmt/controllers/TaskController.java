package ru.smartdevelopers.ppmt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.smartdevelopers.ppmt.domains.Task;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.payloads.ResponsePayload;
import ru.smartdevelopers.ppmt.services.TaskService;
import ru.smartdevelopers.ppmt.services.UserService;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private UserService userService;
    private TaskService taskService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<ResponsePayload<List<Task>>> getAllTask(Principal principal) {
        ResponsePayload<List<Task>> taskResponsePayload = new ResponsePayload<>();
        taskResponsePayload.setDataPayload(taskService.findAllByUser(principal.getName()));
        return new ResponseEntity<>(taskResponsePayload, HttpStatus.OK);
    }

    @GetMapping("{task}")
    public ResponseEntity<ResponsePayload<Task>> getTaskById(@PathVariable Task task, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (task != null && task.getCreatedBy().getId().equals(user.getId())) {
            ResponsePayload<Task> payload = (new ResponsePayload<Task>()).setDataPayload(task);
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<Task> payload = (new ResponsePayload<Task>()).setErrorPayload("Task not found");
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<ResponsePayload<Task>> create(@RequestBody Task task, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (task != null && user != null) {
            Task createdTask = taskService.create(task, user);
            ResponsePayload<Task> payload = (new ResponsePayload<Task>()).setDataPayload(createdTask);
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<Task> payload = (new ResponsePayload<Task>().setErrorPayload("Cant create task"));
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

    @PutMapping("{task}")
    public ResponseEntity<ResponsePayload<Task>> update(
            @PathVariable Task task,
            @RequestBody Task taskPatch,
            Principal principal
    ) {
        User user = userService.findByUsername(principal.getName());
        if (task != null && task.getCreatedBy().getId().equals(user.getId())) {
            Task updatedTask = taskService.update(task.update(taskPatch));
            ResponsePayload<Task> payload = (new ResponsePayload<Task>()).setDataPayload(updatedTask);
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<Task> payload = (new ResponsePayload<Task>()).setErrorPayload("Cant update task");
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

    @DeleteMapping("{task}")
    public ResponseEntity<ResponsePayload<Long>> delete(@PathVariable Task task, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (task != null && task.getCreatedBy().getId().equals(user.getId())) {
            taskService.delete(task);
            ResponsePayload<Long> payload = (new ResponsePayload<Long>()).setDataPayload(task.getId());
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<Long> payload = (new ResponsePayload<Long>()).setErrorPayload("Cant delete task");
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

}
