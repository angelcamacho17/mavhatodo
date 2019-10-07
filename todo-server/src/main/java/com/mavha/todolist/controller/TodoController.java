package com.mavha.todolist.controller;

import com.mavha.todolist.model.DBFile;
import com.mavha.todolist.model.Todo;
import com.mavha.todolist.payload.ApiResponse;
import com.mavha.todolist.payload.PagedResponse;
import com.mavha.todolist.payload.TodoRequest;
import com.mavha.todolist.payload.TodoResponse;
import com.mavha.todolist.repository.TodoRepository;
import com.mavha.todolist.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
public class TodoController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private TodoService todoService;

    @Autowired
    private TodoRepository todoRepository;

    @PostMapping("/todos")
    public ResponseEntity<?> postTodo(@Valid @RequestBody TodoRequest todoRequest){

        Todo todo = todoService.postTodo(todoRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{todoId}")
                .buildAndExpand(todo.getId()).toUri();
        Long id = todo.getId();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Todo Created Successfully", id ));

    }

    @PutMapping("/todos/update/{todoId}")
    public ResponseEntity<?> updateTodo(@Valid @RequestBody TodoRequest todoRequest,@PathVariable Long todoId){

        Todo todo = todoService.updateTodo(todoRequest,todoId);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{todoId}")
                .buildAndExpand(todo.getId()).toUri();
        Long id = todo.getId();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Todo Created Successfully", id ));

    }

    @DeleteMapping("/todos/delete/{todoId}")
    public void deleteTodo(@PathVariable Long todoId) {
         todoRepository.delete(todoRepository.findByTodo(todoId));
    }

    @PostMapping("/todos/done/{todoId}")
    public ResponseEntity<?> getTodoDone(@PathVariable Long todoId){

        Todo todoUpdate = todoRepository.findByTodo(todoId);

        todoUpdate.setStatus(!todoUpdate.getStatus());
        todoRepository.save(todoUpdate);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{todoId}")
                .buildAndExpand(todoUpdate.getId()).toUri();
        Long id = todoUpdate.getId();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Todo Created Done", id ));

    }

    @GetMapping("/todos")
    public PagedResponse<TodoResponse> getAllTodos() {
        return todoService.getAll();
    }

    @GetMapping("/todos/{todoId}")
    public TodoResponse getTodo(@PathVariable Long todoId){
        Todo todo = todoRepository.findByTodo(todoId);

        TodoResponse todoResponse = new TodoResponse();
        todoResponse.setId(todoId);
        todoResponse.setDescription(todo.getDescription());
        todoResponse.setStatus(todo.getStatus());
        todoResponse.setFile(todo.getFile().getFileName());
        return todoResponse;
    }
}
