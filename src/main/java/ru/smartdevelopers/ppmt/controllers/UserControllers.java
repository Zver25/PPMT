package ru.smartdevelopers.ppmt.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.payloads.LoginUserRequest;
import ru.smartdevelopers.ppmt.payloads.RegisterUserRequest;
import ru.smartdevelopers.ppmt.payloads.SuccessLoginResponse;
import ru.smartdevelopers.ppmt.security.JwtProvider;
import ru.smartdevelopers.ppmt.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserControllers {

    private UserService userService;

    private AuthenticationManager authenticationManager;

    private JwtProvider jwtProvider;


    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Autowired
    public void setJwtProvider(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/registration")
    public ResponseEntity<User> register(@RequestBody RegisterUserRequest user) throws Exception {
        User requestUser = user.mapToUser();
        User createdUser = userService.save(requestUser);
        return new ResponseEntity<User>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserRequest loginUserRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserRequest.getUsername(),
                        loginUserRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generate(authentication);
        return ResponseEntity.ok(new SuccessLoginResponse(true, token));
    }

}
