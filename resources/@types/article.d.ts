interface ArticleList {
    articleId: number
    title: string
    content: string
    createdAt: string
    updatedAt: string
}

interface ArticleListProps {
    articleList: ArticleList[]
}

interface idRelation {
    parentId: number | null
    childId: number | null
    articleId: number
}