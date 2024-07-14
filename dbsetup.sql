SET foreign_key_checks = 0;

DROP TABLE IF EXISTS member;
CREATE TABLE member (
    memberId VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (memberId)
);

DROP TABLE IF EXISTS article;
CREATE TABLE article (
    articleId INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(500) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    memberId VARCHAR(50) NOT NULL,
    PRIMARY KEY (articleId),
    FOREIGN KEY (memberId) REFERENCES member(memberId)
);

DROP TABLE IF EXISTS book;
CREATE TABLE book (
    bookId INT NOT NULL,
    title VARCHAR(50) NOT NULL UNIQUE,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    memberId VARCHAR(50) NOT NULL,
    PRIMARY KEY (bookId),
    FOREIGN KEY (memberId) REFERENCES member(memberId)
);

DROP TABLE IF EXISTS article_book_relation;
CREATE TABLE article_book_relation (
    parentId INT,
    childId INT,
    articleId INT NOT NULL,
    bookId INT NOT NULL,
    PRIMARY KEY (articleId, bookId),
    FOREIGN KEY (parentId) REFERENCES article(articleId),
    FOREIGN KEY (childId) REFERENCES article(articleId),
    FOREIGN KEY (articleId) REFERENCES article(articleId),
    FOREIGN KEY (bookId) REFERENCES book(bookId)
);

DROP TABLE IF EXISTS app_config;
CREATE TABLE app_config (
    value VARCHAR(50),
    purpose VARCHAR(50)
);

INSERT INTO member VALUES (
    '0001A', 'admin', 'user', 'd4740681f66a592a083a8758ad77f8684f665d7ff0c94bc31064ac0fc4c882b6'
);

INSERT INTO app_config VALUES (
    'n15p9k4p4za91w2707d9k02z605197', 'password salt'
);

SET foreign_key_checks = 1;