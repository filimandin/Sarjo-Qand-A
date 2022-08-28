
CREATE DATABASE question_and_answers1;

CREATE TABLE `question_and_answers1`.`questions`(
     `id` INT NOT NULL AUTO_INCREMENT , 
    `question` VARCHAR(255) NOT NULL ,
   
     PRIMARY KEY (`id`))
ENGINE = InnoDB;


CREATE TABLE `question_and_answers1`.`choices` (
    `id` INT NOT NULL AUTO_INCREMENT , 
    `question_id` INT NOT NULL ,
    `name` VARCHAR(255) NOT NULL ,
    `is_correct` ENUM('NO','YES') NOT NULL , 

    PRIMARY KEY (`id`)) 
ENGINE = InnoDB;


CREATE TABLE `question_and_answers1`.`users` ( 
    `id` INT NOT NULL AUTO_INCREMENT , 
    `username` VARCHAR(255) NOT NULL ,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL , 
    `last_name` VARCHAR(255) NOT NULL , 
    `user_type` ENUM('USER','ADMIN') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
    PRIMARY KEY (`id`)) 
ENGINE = InnoDB;

