package ru.smartdevelopers.ppmt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.smartdevelopers.ppmt.domains.Task;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.payloads.ResponsePayload;
import ru.smartdevelopers.ppmt.payloads.TaskPayload;
import ru.smartdevelopers.ppmt.services.TaskService;
import ru.smartdevelopers.ppmt.services.UserService;
import java.security.Principal;
import java.util.ArrayList;
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
    public ResponseEntity<ResponsePayload<List<TaskPayload>>> getAllTask(Principal principal) {
        List<TaskPayload> tasksPayload = new ArrayList<>();
        for (Task task: taskService.findAllByUser(principal.getName())) {
            tasksPayload.add(new TaskPayload(task));
        }
        ResponsePayload<List<TaskPayload>> taskResponsePayload = new ResponsePayload<>();
        taskResponsePayload.setDataPayload(tasksPayload);
        return new ResponseEntity<>(taskResponsePayload, HttpStatus.OK);
    }

    @GetMapping("{task}")
    public ResponseEntity<ResponsePayload<TaskPayload>> getTaskById(@PathVariable Task task, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (task != null && task.getCreatedBy().getId().equals(user.getId())) {
            ResponsePayload<TaskPayload> payload = (new ResponsePayload<TaskPayload>()).setDataPayload(new TaskPayload(task));
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<TaskPayload> payload = (new ResponsePayload<TaskPayload>()).setErrorPayload("Task not found");
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<ResponsePayload<TaskPayload>> create(
            @RequestBody TaskPayload taskRequest,
            Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (taskRequest != null && user != null) {
            Task createdTask = taskService.create(taskRequest.getTask(), user);
            ResponsePayload<TaskPayload> payload = (new ResponsePayload<TaskPayload>()).setDataPayload(new TaskPayload(createdTask));
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<TaskPayload> payload = (new ResponsePayload<TaskPayload>().setErrorPayload("Cant create task"));
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

    @PutMapping("{task}")
    public ResponseEntity<ResponsePayload<TaskPayload>> update(
            @PathVariable Task task,
            @RequestBody TaskPayload taskPatch,
            Principal principal
    ) {
        User user = userService.findByUsername(principal.getName());
        if (task != null && task.getCreatedBy().getId().equals(user.getId())) {
            Task updatedTask = taskService.update(task.update(taskPatch.getTask()));
            ResponsePayload<TaskPayload> payload = (new ResponsePayload<TaskPayload>()).setDataPayload(new TaskPayload(updatedTask));
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<TaskPayload> payload = (new ResponsePayload<TaskPayload>()).setErrorPayload("Cant update task");
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
