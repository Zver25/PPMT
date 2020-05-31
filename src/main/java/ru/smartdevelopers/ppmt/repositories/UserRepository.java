package ru.smartdevelopers.ppmt.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.smartdevelopers.ppmt.domains.User;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);

}
