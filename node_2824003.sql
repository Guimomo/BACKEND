#show databases;
#use node_2824003;

create table categorias (
id INT auto_increment primary key,
nombre VARCHAR(255) not null,
descripcion TEXT,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp
);

describe categorias;

create table productos (
id INT auto_increment primary key,
nombre VARCHAR(225) not null,
descripcion TEXT,
precio DECIMAL(10,2),
categoria_id INT,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp,
foreign key (categoria_id) references categorias(id) on delete set null
);

describe productos;

select * from categorias;

insert into categorias (nombre,descripcion) values
("Frutas y vegetales", "Productos de origen vegetal"),
("Limpieza", "Productos para la limpieza del hogar");

insert into productos (nombre,descripcion,precio,categoria_id) values
("manzana", "manazanas rojas y verdes", 2000.00, 1),
("Cloro", "Producto de limpieza", 3000.00, 2);

delete from categorias where id = 3;