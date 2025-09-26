DROP DATABASE IF EXISTS bluebyte;
CREATE DATABASE bluebyte;
USE bluebyte;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    image LONGTEXT NOT NULL
);

CREATE TABLE posts(
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    isDraft BOOLEAN DEFAULT FALSE,
    publishedAt DATETIME NOT NULL,
    updatedAt DATETIME,
    image LONGTEXT NOT NULL,
    userId INT NOT NULL,
    
    CONSTRAINT fk_posts_userId FOREIGN KEY(userId)
    REFERENCES users(id)
);

CREATE TABLE categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    image LONGTEXT NOT NULL,
    userId INT NOT NULL,
    
    CONSTRAINT fk_categories_userId FOREIGN KEY(userId)
    REFERENCES users(id)
);

CREATE TABLE posts_categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    categoryId INT NOT NULL,
    
    CONSTRAINT fk_posts_categories_postId FOREIGN KEY(postId)
    REFERENCES posts(id),
    
    CONSTRAINT fk_posts_categories_categoryId FOREIGN KEY(categoryId)
    REFERENCES categories(id)
);

CREATE TABLE comments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INT NOT NULL,
    postId INT NOT NULL,
    
    CONSTRAINT fk_comments_userId FOREIGN KEY(userId)
    REFERENCES users(id),
    
    CONSTRAINT fk_comments_postId FOREIGN KEY(postId)
    REFERENCES posts(id)
);

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    seen BOOLEAN DEFAULT FALSE,
    userId INT NOT NULL,
    
    CONSTRAINT fk_notifications_userId FOREIGN KEY (userId) 
    REFERENCES users(id)
);

DELIMITER //

CREATE PROCEDURE login(
	IN p_username VARCHAR(50),
    IN p_password VARCHAR(50)
)
BEGIN
	SELECT id, username, image FROM users 
    WHERE username = p_username AND password = p_password
    LIMIT 1;
END //

CREATE PROCEDURE registerUser(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(50),
    IN p_image LONGTEXT
)
BEGIN
    IF EXISTS (SELECT 1 FROM users WHERE username = p_username) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Username already exists';
    ELSE
        INSERT INTO users(username, password, image)
        VALUES(p_username, p_password, p_image);

        SELECT id, username, image FROM users 
        WHERE id = LAST_INSERT_ID();
    END IF;
END //

DELIMITER ;
