SET foreign_key_checks = 0;

DROP TABLE IF EXISTS member;
CREATE TABLE member (
    memberId VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (memberId)
);

DROP TABLE IF EXISTS article;
CREATE TABLE article (
    articleId INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL UNIQUE,
    content VARCHAR(150) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    memberId VARCHAR(50) NOT NULL,
    PRIMARY KEY (articleId),
    FOREIGN KEY (memberId) REFERENCES member(memberId)
);

DROP TABLE IF EXISTS book;
CREATE TABLE book (
    bookId INT NOT NULL,
    title VARCHAR(30) NOT NULL UNIQUE,
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

SET foreign_key_checks = 1;