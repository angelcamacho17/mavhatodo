package com.mavha.todolist.service;

import com.mavha.todolist.exception.ResourceNotFoundException;
import com.mavha.todolist.model.DBFile;
import com.mavha.todolist.model.Todo;
import com.mavha.todolist.payload.PagedResponse;
import com.mavha.todolist.payload.TodoRequest;
import com.mavha.todolist.payload.TodoResponse;
import com.mavha.todolist.repository.DBFileRepository;
import com.mavha.todolist.repository.TodoRepository;
import com.mavha.todolist.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private DBFileStorageService dBFileStorageService;

    @Autowired
    private DBFileRepository fileRepository;

    public PagedResponse<TodoResponse> getTodosBy(String filter){

        // Retrieve todos
        Pageable pageable = PageRequest.of(0, 30, Sort.Direction.ASC, filter);
        Page<Todo> todos = todoRepository.findAll(pageable);

        if(todos.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), todos.getNumber(),
                    todos.getSize(), todos.getTotalElements(), todos.getTotalPages(), todos.isLast());
        }

        List<Long> todoIds = todos.map(Todo::getId).getContent();

        List<TodoResponse> todosResponses = todos.map(todo -> {
            return ModelMapper.mapTodoToTodoResponse(todo);
        }).getContent();

        return new PagedResponse<>(todosResponses, todos.getNumber(),
                todos.getSize(), todos.getTotalElements(), todos.getTotalPages(), todos.isLast());
    }

    public PagedResponse<TodoResponse> getAll(){

        // Retrieve todos
        Pageable pageable = PageRequest.of(0, 30, Sort.Direction.DESC, "id");
        Page<Todo> todos = todoRepository.findAll(pageable);

        if(todos.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), todos.getNumber(),
                    todos.getSize(), todos.getTotalElements(), todos.getTotalPages(), todos.isLast());
        }

        List<Long> todoIds = todos.map(Todo::getId).getContent();

        List<TodoResponse> todosResponses = todos.map(todo -> {
            return ModelMapper.mapTodoToTodoResponse(todo);
        }).getContent();

        return new PagedResponse<>(todosResponses, todos.getNumber(),
                todos.getSize(), todos.getTotalElements(), todos.getTotalPages(), todos.isLast());
    }

    public Todo postTodo(TodoRequest todoRequest) {
        Todo todo = new Todo();
        todo.setDescription(todoRequest.getDescription());
        todo.setStatus(todoRequest.getStatus());
        if (todoRequest.getFile()!=""){
        DBFile file = fileRepository.findById(todoRequest.getFile())
                .orElseThrow(() -> new ResourceNotFoundException("File", "file database", todoRequest.getFile()));
            todo.setFile(file);
        }
        else {
            todo.setFile(null);
        }
        return todoRepository.save(todo);
    }

    public Todo updateTodo(TodoRequest todoRequest, Long todoId) {
        Todo todo = todoRepository.findByTodo(todoId);
        if(todoRequest.getFile()!="") {
            DBFile dbFile = dBFileStorageService.getFile(todoRequest.getFile());
            todo.setFile(dbFile);
        }
        todo.setDescription(todoRequest.getDescription());
        todo.setStatus(todoRequest.getStatus());

        return todoRepository.save(todo);
    }
}
