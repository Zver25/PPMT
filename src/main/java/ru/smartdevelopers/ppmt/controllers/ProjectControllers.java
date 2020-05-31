package ru.smartdevelopers.ppmt.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.smartdevelopers.ppmt.domains.Project;
import ru.smartdevelopers.ppmt.repositories.ProjectRepository;
import ru.smartdevelopers.ppmt.services.ProjectService;

import java.security.Principal;

@RestController
@RequestMapping ("/api/project")
public class ProjectControllers {

    @Autowired
    ProjectService projectService;

    @Autowired

    @GetMapping ("/all")
    public Iterable<Project> getAllProject (Principal principal){

        return projectService.findAllProjects(principal.getName());
    }

    @GetMapping ("/{projectId}")
    public ResponseEntity<?> getProjectById (@PathVariable String projectId, Principal principal){

        Project project = projectService.findProjectById(projectId, principal.getName());

        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createNewProject (@RequestBody Project project, BindingResult result, Principal principal){

        Project project1 = projectService.saveOrUpdateProject(project, principal.getName());

        return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject (@PathVariable String projectId, Principal principal){

        projectService.deleteProjectById(projectId, principal.getName());

        return new ResponseEntity<String>("Project with ID: '"+projectId+"' was deleted", HttpStatus.OK);
    }

}
