package com.mavha.todolist.controller;

import com.mavha.todolist.model.Todo;
import com.mavha.todolist.payload.TodoResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @PostMapping("/todos")
    public TodoResponse postTodo(@RequestBody Todo todo){
        return todoService.postTodo(todo);
    }
}
