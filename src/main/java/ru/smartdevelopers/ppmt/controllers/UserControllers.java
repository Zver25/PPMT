package ru.smartdevelopers.ppmt.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.payloads.RegisterUserRequest;
import ru.smartdevelopers.ppmt.services.UserService;

@RestController
@RequestMapping ("/api/users")
public class UserControllers {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterUserRequest user) throws Exception {
        User requestUser = user.mapToUser();
        User createdUser = userService.create(requestUser);
        return new ResponseEntity<User>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login() {

    }

}
