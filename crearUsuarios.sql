#crear usuario
create user if not exists usuario_2824003@localhost identified by "Aprendiz2024";

#creamos la base de datos
create database node_2824003;

#Asignar permisos al usuario en la base de datos
grant all privileges on node_2824003.* to usuario_2824003@localhost;

ALTER USER 'usuario_2824003'@'localhost' IDENTIFIED BY 'AprendizGuille2025';
flush privileges;

#