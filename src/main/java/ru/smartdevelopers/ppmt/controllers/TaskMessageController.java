package ru.smartdevelopers.ppmt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.smartdevelopers.ppmt.domains.TaskMessage;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.payloads.ResponsePayload;
import ru.smartdevelopers.ppmt.payloads.TaskMessagePayload;
import ru.smartdevelopers.ppmt.services.TaskMessageService;
import ru.smartdevelopers.ppmt.services.TaskService;
import ru.smartdevelopers.ppmt.services.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/taskmessages")
public class TaskMessageController {

    private TaskService taskService;
    private TaskMessageService taskMessageService;
    private UserService userService;

    @Autowired
    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @Autowired
    public void setTaskMessageService(TaskMessageService taskMessageService) {
        this.taskMessageService = taskMessageService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ResponsePayload<List<TaskMessagePayload>>> getAllMessageByTask (Principal principal) {
        List<TaskMessagePayload> taskMessagePayload = new ArrayList<>();
        for (TaskMessage taskMessage : taskMessageService.findAllByTask(principal.getName())) {
            taskMessagePayload.add(new TaskMessagePayload(taskMessage));
        }
        ResponsePayload<List<TaskMessagePayload>> taskMessageResponsePayload = new ResponsePayload<>();
        taskMessageResponsePayload.setDataPayload(taskMessagePayload);
        return new ResponseEntity<>(taskMessageResponsePayload, HttpStatus.OK);
    }

    @PostMapping("taskMessage")
    public ResponseEntity<ResponsePayload<TaskMessagePayload>> create (
            @RequestBody TaskMessagePayload taskRequest,
            Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (taskRequest != null && user != null) {
            TaskMessage createdTaskMessage = taskMessageService.create(taskRequest.getTaskMessage(), user);
            ResponsePayload<TaskMessagePayload> payload = (new ResponsePayload<TaskMessagePayload>()).setDataPayload(new TaskMessagePayload(createdTaskMessage));
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<TaskMessagePayload> payload = (new ResponsePayload<TaskMessagePayload>().setErrorPayload("Cant create task message"));
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

}
