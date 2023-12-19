use shop;
create table users(
NOMBRE varchar (50) not null,
EMAIL varchar (50) not null,
FECHA DATETIME default now(),
CELULAR varchar (20),
PASWORD varchar (100) not null,
IDUSUARIO varchar(50) not null,
primary key(IDUSUARIO)
);
create table productos(
ID int auto_increment,
ID_PROD varchar(50),
TITULO varchar(50),
NOMBRE varchar (50),
CATEGORIA varchar(20),
DESCRIPCION varchar(20),
IMG varchar(50),
STOCK varchar (50),
PRECIO int,
primary key(ID)
);
create table carrito(
IDUSUARIO varchar(50),
IDPRODUCTO int,
FECHA DATETIME default now(),
foreign key(IDUSUARIO)references users(IDUSUARIO),
foreign key (IDPRODUCTO) references productos(ID)
);
create table orden(
IDCARRITO varchar(50),
ID int auto_increment,
NOMBRE varchar(50),
FECHA DATETIME default now(),
primary key(ID),
foreign key(IDCARRITO)references carrito(IDUSUARIO)
);