package ru.smartdevelopers.ppmt.controllers;

import com.sun.org.slf4j.internal.Logger;
import com.sun.org.slf4j.internal.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.smartdevelopers.ppmt.domains.User;
import ru.smartdevelopers.ppmt.payloads.LoginUserRequest;
import ru.smartdevelopers.ppmt.payloads.RegisterUserRequest;
import ru.smartdevelopers.ppmt.payloads.ResponsePayload;
import ru.smartdevelopers.ppmt.security.JwtProvider;
import ru.smartdevelopers.ppmt.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

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

    private ResponseEntity<ResponsePayload<String>> authenticate(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return getResponseToken(authentication);
    }

    private ResponseEntity<ResponsePayload<String>> getResponseToken(Authentication authentication) {
        String token = jwtProvider.generate(authentication);
        ResponsePayload<String> payload = (new ResponsePayload<String>()).setDataPayload(token);
        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

    @Autowired
    public void setJwtProvider(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("registration")
    public ResponseEntity<?> register(@RequestBody RegisterUserRequest user) throws Exception {
        User requestUser = user.mapToUser();
        userService.create(requestUser);
        return authenticate(user.getUsername(), user.getPassword());
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginUserRequest loginUserRequest) {
        return authenticate(loginUserRequest.getUsername(), loginUserRequest.getPassword());
    }

    @GetMapping("logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.getContext().setAuthentication(null);
        return ResponseEntity.ok("");
    }

    @GetMapping("refreshToken")
    public ResponseEntity<ResponsePayload<String>> refreshToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return getResponseToken(authentication);
    }

}
