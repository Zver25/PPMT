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

    private UserRepository userRepository;

    private ProjectService projectService;

    @Autowired
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public Iterable<Project> getAllProject (Principal principal){

        return projectService.findAllProjects(principal.getName());
    }

    @GetMapping ("/{project}")
    public ResponseEntity<?> getProjectById (@PathVariable Project project, Principal principal) throws Exception {
        User user = userRepository.findByUsername(principal.getName());
        if (project.getCreatedBy().getId().equals(user.getId())) {
            return new ResponseEntity<>(project, HttpStatus.OK);
        }
        return new ResponseEntity<Project>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("")
    public ResponseEntity<Project> createNewProject (@RequestBody Project project, Principal principal){

        User user = userRepository.findByUsername(principal.getName());
        Project createdProject = projectService.saveOrUpdateProject(project, user);

        return new ResponseEntity<Project>(createdProject, HttpStatus.CREATED);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject (@PathVariable String projectId, Principal principal){

        projectService.deleteProjectById(projectId, principal.getName());

        return new ResponseEntity<String>("Project with ID: '"+projectId+"' was deleted", HttpStatus.OK);
    }

}
