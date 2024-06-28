interface BookList {
    bookId: number
    title: string
    createdAt: string
    updatedAt: string
}

interface BookListProps {
    bookList: BookList[]
}