create database db_pad;
use db_pad;
select * from usuario;
select * from perguntas;
 
create table usuario(
	id int auto_increment primary key,
    nome varchar(255),
    email varchar(255),
    senha varchar(255)
);
 
create table perguntas(
	id int auto_increment primary key,
    pergunta varchar(255),
    pontos_perguntas int
);
 
create table historico(
	id_usuario int,
    pontuacao int,
    foreign key(id_usuario) references usuario(id)
);
 
alter table perguntas modify resposta varchar(255);
 
UPDATE perguntas
SET opcao4 = "Vermelho"
WHERE id = 5;
 
alter table perguntas
ADD opcao4 varchar(255);
INSERT INTO perguntas(pergunta, pontos_perguntas) VALUES ("Qual cor é frequentemente associada a sentimentos de tranquilidade e relaxamento?", 50);
INSERT INTO perguntas(pergunta, pontos_perguntas) VALUES ("Qual cor é muitas vezes usada para estimular o apetite em ambientes como restaurantes?", 50);
INSERT INTO perguntas(pergunta, pontos_perguntas) VALUES ("Qual cor é geralmente considerada a mais enérgica e estimulante?", 50);
INSERT INTO perguntas(pergunta, pontos_perguntas) VALUES ("Qual cor é frequentemente associada a emoções de tristeza e melancolia?", 50)