import { ChangeEvent, FormEvent, useState } from 'react'
import { useCreateArticle } from '../models/useCreateArticle.ts'
import { Article } from '../../../entities/article/model/types.ts'
import { Alert, Box, Button, Link } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Input from '../../../shared/ui/form/Input.tsx'

const CreateArticleForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [img, setImg] = useState('')
  const [createdArticle, setCreatedArticle] = useState<Article | null>(null)

  const { createArticle, isLoading, error } = useCreateArticle()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const article = await createArticle({ title, content, img }).catch()

    if (article) {
      setCreatedArticle(article)
    }
  }

  return (
    <div>
      {createdArticle && (
        <>
          <Alert severity="success" variant="outlined">
            <Link component={NavLink} to={`/articles/${createdArticle.id}`}>
              {createdArticle.title}
            </Link>{' '}
            was add.
          </Alert>
        </>
      )}

      {!createdArticle && (
        <Box component="form" onSubmit={handleSubmit}>
          <Input
            label="Name"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            required
          />

          <Input
            label="URL img"
            value={img}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setImg(e.target.value)}
          />
          <Input
            label="Content"
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            multiline
            minRows={6}
            required
          />
          {error && <Alert severity="error">{error}</Alert>}

          <Button type="submit" variant="contained" color="warning" sx={{ mt: 2 }} fullWidth>
            {isLoading ? 'Creating ...' : 'Create Article'}
          </Button>
        </Box>
      )}
    </div>
  )
}
export default CreateArticleForm
