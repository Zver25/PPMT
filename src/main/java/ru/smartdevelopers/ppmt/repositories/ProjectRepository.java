package ru.smartdevelopers.ppmt.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.smartdevelopers.ppmt.domains.Project;
import ru.smartdevelopers.ppmt.domains.User;

import java.util.List;

@Repository
public interface ProjectRepository  extends CrudRepository <Project, Long> {

    List<Project> findAllByCreatedBy(User user);

    Project findAllById(Long projectId);

}
