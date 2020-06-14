package ru.smartdevelopers.ppmt.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    private static final String INDEX = "index.html";

    @RequestMapping("/")
    public String index() {
        return INDEX;
    }

    @RequestMapping("/projects")
    public String projects() {
        return INDEX;
    }

    @RequestMapping("/auth")
    public String auth() {
        return INDEX;
    }
}
