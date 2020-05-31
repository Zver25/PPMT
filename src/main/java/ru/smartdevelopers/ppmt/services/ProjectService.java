package ru.smartdevelopers.ppmt.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.smartdevelopers.ppmt.domains.Project;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.repositories.ProjectRepository;
import ru.smartdevelopers.ppmt.repositories.UserRepository;

import java.util.Optional;

@Service
public class ProjectService {


    private ProjectRepository projectRepository;

    private UserRepository userRepository;

    @Autowired
    public void setProjectRepository(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Project create (Project project, User user){
        project.setCreatedBy(user);
        return projectRepository.save(project);
    }

    public Project update (Project project, User user) {
        project.setCreatedBy(user);
        return projectRepository.save(project);
    }

    public Iterable<Project> findAllProjects (String username){
        return projectRepository.findAllByProjectLeader(username);
    }

//    public Project findProjectById (Long id){
//        Optional<Project> project = projectRepository.findById(id);
//        //добавить exception?
//        return project;
//    }

    public void delete(Project project){
        projectRepository.delete(project);
    }

}
