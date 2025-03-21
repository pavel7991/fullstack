import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { Article } from '../model/types'

interface ArticleCardProps {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card sx={{ maxWidth: 400, margin: '10px auto' }}>
      <CardContent>
        <Typography variant="h6">{article.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {article.content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ArticleCard
