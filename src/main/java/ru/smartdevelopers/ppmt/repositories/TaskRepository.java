package ru.smartdevelopers.ppmt.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.smartdevelopers.ppmt.domains.Task;

public interface TaskRepository extends CrudRepository <Task, Long> {

}
