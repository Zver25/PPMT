package ru.smartdevelopers.ppmt.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.smartdevelopers.ppmt.domains.User;

public interface UserRepositories extends CrudRepository<User, Long> {

}
