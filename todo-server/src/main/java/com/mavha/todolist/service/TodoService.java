package com.mavha.todolist.service;

import com.mavha.todolist.exception.ResourceNotFoundException;
import com.mavha.todolist.model.DBFile;
import com.mavha.todolist.model.Todo;
import com.mavha.todolist.payload.TodoRequest;
import com.mavha.todolist.payload.TodoResponse;
import com.mavha.todolist.repository.DBFileRepository;
import com.mavha.todolist.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private DBFileRepository fileRepository;

    public Todo postTodo(TodoRequest todoRequest){
        Todo todo = new Todo();
        todo.setDescription(todoRequest.getDescription());
        todo.setStatus(todoRequest.getStatus());

        DBFile file = fileRepository.findById(todoRequest.getFile())
                .orElseThrow(() -> new ResourceNotFoundException("File", "file database", todoRequest.getFile()));
        todo.setFile(file);
        return todoRepository.save(todo);
    }
}
