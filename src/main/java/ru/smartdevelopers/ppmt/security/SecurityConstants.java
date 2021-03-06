package ru.smartdevelopers.ppmt.security;

public class SecurityConstants {

    public static final String H2_CONSOLE = "/h2-console/**";
    public static final String AUTH_URLS = "/api/users/**";
    public static final String SECRET = "SECRET";
    public static final String HEADER_TOKEN = "Authentication";
    public static final long EXPIRATION_TOKEN_TIME = 600_000; // 10 minutes

}
