package com.mavha.todolist.util;

import com.mavha.todolist.model.Todo;
import com.mavha.todolist.payload.TodoResponse;

public class ModelMapper {

    public static TodoResponse mapTodoToTodoResponse(Todo todo){
        TodoResponse todoResponse = new TodoResponse();

        todoResponse.setId(todo.getId());
        todoResponse.setDescription(todo.getDescription());
        if (todo.getFile() != null){
            todoResponse.setFile(todo.getFile().getFileName());
        }
        else {
            todoResponse.setFile("no file");
        }
        todoResponse.setStatus(todo.getStatus());

        return todoResponse;
    }
}
