package ru.smartdevelopers.ppmt.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.smartdevelopers.ppmt.domains.Project;

import java.util.Optional;

@Repository
public interface ProjectRepository  extends CrudRepository <Project, Long> {

    Optional<Project> findById (Long id);

    @Override
    Iterable <Project> findAll();

    Iterable <Project> findAllByProjectLeader (String username);

}
