package ru.smartdevelopers.ppmt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.repositories.UserRepositories;

@Service
public class UserService {

    private UserRepositories userRepositories;

    @Autowired
    public void setUserRepositories(UserRepositories userRepositories) {
        this.userRepositories = userRepositories;
    }

    public User create(User user) {
        return userRepositories.save(user);
    }

    public User update(User user) {
        return userRepositories.save(user);
    }

    public void delete(User user) {
        userRepositories.delete(user);
    }
}
