todo-server, Server App (Spring Boot):

1. In the file application.properties, setup your database user and password.

  spring.datasource.username= yourUsername
  
  spring.datasource.password= yourPassword

2. Before run the todo-server application, create database in MySql:

  CREATE SCHEMA todo_list;

3. After run the application todo-server, please run this command in mysql workbench:

  ALTER TABLE todo_list.todos MODIFY file_id varchar(255) null;

todo-client, Client App (React):

FROM cmd, in the todo-client proyect, run:

  
  npm i
  
  
  npm start
