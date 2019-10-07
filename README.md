Server:

FROM MySQL->

  CREATE SCHEMA todo_list;

After run the application todo-server, please run this command in mysql->

  ALTER TABLE todo_list.todos MODIFY file_id varchar(255) null;

Client:

FROM cmd->

  npm i
  npm start
