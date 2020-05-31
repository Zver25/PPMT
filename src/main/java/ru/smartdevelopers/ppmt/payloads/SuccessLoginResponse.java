package ru.smartdevelopers.ppmt.payloads;

public class SuccessLoginResponse {

    private boolean status;
    private String token;

    public SuccessLoginResponse() {
    }

    public SuccessLoginResponse(boolean status, String token) {
        this.status = status;
        this.token = token;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
