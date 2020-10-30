package ru.smartdevelopers.ppmt.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.smartdevelopers.ppmt.domains.Task;
import ru.smartdevelopers.ppmt.domains.TaskMessage;

import java.util.List;

@Repository
public interface TaskMessageRepository extends CrudRepository <TaskMessage, Long> {

    List<TaskMessage> findAllByTaskId (Task task);

    TaskMessage findAllById(Long id);

}
