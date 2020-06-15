package ru.smartdevelopers.ppmt.controllers;

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
import ru.smartdevelopers.ppmt.payloads.SuccessLoginResponse;
import ru.smartdevelopers.ppmt.security.JwtProvider;
import ru.smartdevelopers.ppmt.services.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import static ru.smartdevelopers.ppmt.security.SecurityConstants.HEADER_TOKEN;

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

    private ResponseEntity<?> authenticate(String username, String password, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generate(authentication);
        response.addCookie(new Cookie(HEADER_TOKEN, token));
        return ResponseEntity.ok(new SuccessLoginResponse(true, token));
    }

    @Autowired
    public void setJwtProvider(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("registration")
    public ResponseEntity<?> register(@RequestBody RegisterUserRequest user, HttpServletResponse response) throws Exception {
        User requestUser = user.mapToUser();
        userService.create(requestUser);

        return authenticate(user.getUsername(), user.getPassword(), response);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginUserRequest loginUserRequest, HttpServletResponse response) {
        return authenticate(loginUserRequest.getUsername(), loginUserRequest.getPassword(), response);
    }

}
