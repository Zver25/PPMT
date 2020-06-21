package ru.smartdevelopers.ppmt.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.smartdevelopers.ppmt.domains.Project;
import ru.smartdevelopers.ppmt.domains.Task;
import ru.smartdevelopers.ppmt.domains.User;

import java.util.List;

public interface TaskRepository extends CrudRepository <Task, Long> {

    List<Task> findAllByCreatedBy(User user);

    List<Task> findAllByProject(Project project);
}
