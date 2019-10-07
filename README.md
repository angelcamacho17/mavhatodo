Server App:

1. Before run the todo-server application, create database in MySql:

  CREATE SCHEMA todo_list;

2. After run the application todo-server, please run this command in mysql workbench:

  ALTER TABLE todo_list.todos MODIFY file_id varchar(255) null;

Client App:

FROM cmd run:

  npm i
  npm start
