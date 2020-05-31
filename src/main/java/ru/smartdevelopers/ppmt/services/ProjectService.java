package ru.smartdevelopers.ppmt.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.smartdevelopers.ppmt.domains.Project;
import ru.smartdevelopers.ppmt.repositories.ProjectRepository;
import ru.smartdevelopers.ppmt.repositories.UserRepository;

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

    public Project saveOrUpdateProject (Project project, String username){

        return projectRepository.save(project);
    }

    public Iterable<Project> findAllProjects (String username){
        return projectRepository.findAllByProjectLeader(username);
    }

    public Project findProjectById (String projectId, String username){
        Project project = projectRepository.findById(projectId);
        //добавить exception?
        return project;
    }

    public void deleteProjectById(String projectId, String username){
        projectRepository.delete(findProjectById(projectId, username));
    }

}
