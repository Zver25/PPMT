package ru.smartdevelopers.ppmt.payloads;

import ru.smartdevelopers.ppmt.domains.User;

public class RegisterUserRequest {

    private String username;
    private String fullname;
    private String password;
    private String confirmPassword;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public User mapToUser() throws Exception {
        User user = new User();
        user.setUsername(this.getUsername());
        user.setFullname(this.getFullname());
        user.setPassword(this.getPassword());
        if (!this.password.equals(this.confirmPassword)) {
            throw new Exception("Password and confirm password not match");
        }
        return user;
    }
}
