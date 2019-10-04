package com.mavha.todolist.service;

import com.mavha.todolist.model.Todo;
import com.mavha.todolist.payload.TodoResponse;
import com.mavha.todolist.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public TodoResponse postTodo(Todo todo){

    }
}
