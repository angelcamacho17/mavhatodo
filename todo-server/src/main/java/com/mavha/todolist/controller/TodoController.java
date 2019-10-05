package com.mavha.todolist.controller;

import com.mavha.todolist.model.Todo;
import com.mavha.todolist.payload.ApiResponse;
import com.mavha.todolist.payload.TodoResponse;
import com.mavha.todolist.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
public class TodoController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private TodoService todoService;

    @PostMapping("/todos")
    public ResponseEntity<?> postTodo(@Valid @RequestBody Todo todoRequest){
        Todo todo = todoService.postTodo(todoRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{todoId}")
                .buildAndExpand(todo.getId()).toUri();
        Long id = todo.getId();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Todo Created Successfully", id ));

    }
}
