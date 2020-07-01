package ru.smartdevelopers.ppmt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.smartdevelopers.ppmt.domains.Project;
import ru.smartdevelopers.ppmt.domains.Task;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.payloads.ResponsePayload;
import ru.smartdevelopers.ppmt.payloads.TaskPayload;
import ru.smartdevelopers.ppmt.services.ProjectService;
import ru.smartdevelopers.ppmt.services.TaskService;
import ru.smartdevelopers.ppmt.services.UserService;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping ("/api/projects")
public class ProjectController {

    private UserService userService;
    private ProjectService projectService;
    private TaskService taskService;

    @Autowired
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<ResponsePayload<List<Project>>> getAllProject (Principal principal) {
        ResponsePayload<List<Project>> projectsResponsePayload = new ResponsePayload<>();
        projectsResponsePayload.setDataPayload(projectService.findAllByUser(principal.getName()));
        return new ResponseEntity<>(projectsResponsePayload, HttpStatus.OK);
    }

    @GetMapping ("{project}")
    public ResponseEntity<ResponsePayload<Project>> getProjectById (@PathVariable Project project, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (project != null && project.getCreatedBy().getId().equals(user.getId())) {
            ResponsePayload<Project> payload = (new ResponsePayload<Project>()).setDataPayload(project);
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<Project> payload = (new ResponsePayload<Project>()).setErrorPayload("Project not found");
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

    @GetMapping("{project}/tasks")
    public ResponseEntity<ResponsePayload<List<TaskPayload>>> fetchTasks(@PathVariable Project project, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (project != null && project.getCreatedBy().getId().equals(user.getId())) {
            List<TaskPayload> tasksPayload = new ArrayList<>();
            for (Task task : taskService.findByProject(project)) {
                tasksPayload.add(new TaskPayload(task));
            }
            ResponsePayload<List<TaskPayload>> tasksResponsePayload =
                    (new ResponsePayload<List<TaskPayload>>()).setDataPayload(tasksPayload);
            return new ResponseEntity<>(tasksResponsePayload, HttpStatus.OK);
        }
        ResponsePayload<List<TaskPayload>> tasksResponsePayload = (new ResponsePayload<List<TaskPayload>>()).setErrorPayload("Project not found");
        return new ResponseEntity<>(tasksResponsePayload, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<ResponsePayload<Project>> create(@RequestBody Project project, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (project != null && user != null) {
            Project createdProject = projectService.create(project, user);
            ResponsePayload<Project> payload = (new ResponsePayload<Project>()).setDataPayload(createdProject);
            return new ResponseEntity<>(payload, HttpStatus.CREATED);
        }
        ResponsePayload<Project> payload = (new ResponsePayload<Project>()).setErrorPayload("Cant create project");
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }


    @PutMapping("{project}")
    public ResponseEntity<ResponsePayload<Project>> update(
            @PathVariable Project project,
            @RequestBody Project projectPatch,
            Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if(project != null && project.getCreatedBy().getId().equals(user.getId())) {
            Project updatedProject = projectService.update(project.update(projectPatch));
            ResponsePayload<Project> payload = (new ResponsePayload<Project>()).setDataPayload(updatedProject);
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<Project> payload = (new ResponsePayload<Project>()).setErrorPayload("Cant update project");
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

    @DeleteMapping("{project}")
    public ResponseEntity<ResponsePayload<Long>> delete (@PathVariable Project project, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (project != null && project.getCreatedBy().getId().equals(user.getId())) {
            projectService.delete(project);
            ResponsePayload<Long> payload = (new ResponsePayload<Long>()).setDataPayload(project.getId());
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
        ResponsePayload<Long> payload = (new ResponsePayload<Long>()).setErrorPayload("Cant delete project");
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

}
