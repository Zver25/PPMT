package ru.smartdevelopers.ppmt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.smartdevelopers.ppmt.domains.Project;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.repositories.UserRepository;
import ru.smartdevelopers.ppmt.services.ProjectService;
import ru.smartdevelopers.ppmt.services.UserService;

import java.security.Principal;

@RestController
@RequestMapping ("/api/projects")
public class ProjectControllers {

    private UserService userService;

    private ProjectService projectService;

    @Autowired
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Iterable<Project> getAllProject (Principal principal){

        return projectService.findAllProjects(principal.getName());
    }

    @GetMapping ("/{project}")
    public ResponseEntity<?> getProjectById (@PathVariable Project project, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (project.getCreatedBy().getId().equals(user.getId())) {
            return new ResponseEntity<>(project, HttpStatus.OK);
        }
        return new ResponseEntity<Project>(HttpStatus.NOT_FOUND);
    }

    @PostMapping()
    public ResponseEntity<Project> create(@RequestBody Project project, Principal principal){
        // Проверка пользователя
        User user = userService.findByUsername(principal.getName());
        if (user != null) {
            // При создании устанавливать пользователя
            Project createdProject = projectService.create(project, user);
            createdProject.setCreatedBy(user);
            return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PutMapping("/{project}")
    public ResponseEntity<Project> update(@PathVariable Project project, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if(project.getCreatedBy().getId().equals(user.getId())) {
            projectService.update(project, user);
            return new ResponseEntity<>(project, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{project}")
    public ResponseEntity<Project> delete (@PathVariable Project project, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (project.getCreatedBy().getId().equals(user.getId())) {
            projectService.delete(project);
            return new ResponseEntity<>(project, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
