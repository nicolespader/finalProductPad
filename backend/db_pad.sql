create database db_pad;
use db_pad;
DROP DATABASE db_pad;

select * from usuario;
select * from pergunta;
select * from resposta;
 
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    highScore INT DEFAULT 0
);
 
-- Tabela de perguntas
CREATE TABLE pergunta (
    id_perguntas INT AUTO_INCREMENT PRIMARY KEY,
    ds_descricao VARCHAR(255)
);

-- Tabela de respostas
CREATE TABLE resposta (
    id_respostas INT AUTO_INCREMENT PRIMARY KEY,
    id_pergunta INT,
    ds_resposta VARCHAR(255),
    ds_certo VARCHAR(255),
    FOREIGN KEY (id_pergunta) REFERENCES pergunta(id_perguntas)
);
 
