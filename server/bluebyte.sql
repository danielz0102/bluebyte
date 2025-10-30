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

-- VIEWS

DROP VIEW IF EXISTS posts_vw;
CREATE VIEW posts_vw AS SELECT
	p.*,
    u.username,
	(
		SELECT c.title 
		FROM posts_categories pc
		JOIN categories c ON c.id = pc.categoryId
		WHERE pc.postId = p.id
		LIMIT 1
	) AS category
FROM posts p
JOIN users u ON p.userId = u.id;

-- STORED PROCEDURES

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

CREATE PROCEDURE getLastestPosts()
BEGIN
	SELECT * FROM posts_vw
	ORDER BY COALESCE(updatedAt, publishedAt) DESC
	LIMIT 10;
END //

CREATE PROCEDURE getPostsByUser(IN p_userId INT)
BEGIN
	SELECT 
        p.id,
        p.title,
        p.content,
        p.isDraft,
        p.publishedAt,
        p.updatedAt,
        p.image,
        p.userId,
        (
            SELECT c.title 
            FROM posts_categories pc
            JOIN categories c ON c.id = pc.categoryId
            WHERE pc.postId = p.id
            LIMIT 1
        ) AS category
    FROM posts p
    WHERE p.userId = p_userId
    ORDER BY COALESCE(p.updatedAt, p.publishedAt) DESC;
END //

CREATE PROCEDURE createPost(
    IN p_title VARCHAR(255),
    IN p_content TEXT,
    IN p_image LONGTEXT,
    IN p_userId INT,
    IN p_categoryId INT
)
BEGIN
    DECLARE v_postId INT;

    -- Verificar que el usuario exista
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = p_userId) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'User does not exist';
    END IF;

    -- Verificar que la categoría exista
    IF NOT EXISTS (SELECT 1 FROM categories WHERE id = p_categoryId) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Category does not exist';
    END IF;

    -- Crear el post
    INSERT INTO posts(title, content, publishedAt, image, userId)
    VALUES(p_title, p_content, NOW(), p_image, p_userId);

    -- Obtener el ID del post recién creado
    SET v_postId = LAST_INSERT_ID();

    -- Registrar la relación post-categoría
    INSERT INTO posts_categories(postId, categoryId)
    VALUES(v_postId, p_categoryId);

    -- Retornar el post creado con su categoría
    SELECT 
        p.*, 
        c.title AS category
    FROM posts p
    JOIN posts_categories pc ON pc.postId = p.id
    JOIN categories c ON c.id = pc.categoryId
    WHERE p.id = v_postId;
END //

CREATE PROCEDURE updatePost(
	IN p_id INT,
	IN p_title VARCHAR(255),
    IN p_content TEXT,
    IN p_image LONGTEXT
)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM posts WHERE id = p_id) THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Post does not exists';
	END IF;
    
    UPDATE posts
    SET title = p_title,
        content = p_content,
        image = p_image
	WHERE id = p_id;
    
    SELECT * FROM posts WHERE id = p_id;
END //

CREATE PROCEDURE deletePost(IN p_id INT)
BEGIN
	DELETE FROM posts WHERE id = p_id;
END //

CREATE PROCEDURE registerCategory(
    IN p_title VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_image LONGTEXT,
    IN p_userId INT
)
BEGIN
    IF EXISTS (SELECT 1 FROM categories WHERE title = p_title) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Category already exists';
    ELSE
        INSERT INTO categories(title, description, image, userId)
        VALUES(p_title, p_description, p_image, p_userId);

        SELECT id, title, description, image, userId 
        FROM categories 
        WHERE id = LAST_INSERT_ID();
    END IF;
END //

CREATE PROCEDURE getComments(IN p_postId INT)
BEGIN
	SELECT 
		u.username,
        u.image,
        c.content,
        c.createdAt
	FROM comments c
    JOIN users u ON u.id = c.userId
    JOIN posts p ON p.id = c.postId
    WHERE c.postId = p_postId
    ORDER BY c.createdAt DESC;
END //

DELIMITER ;