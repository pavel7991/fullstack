import { ChangeEvent, FormEvent, useState } from 'react'
import { useCreateArticle } from '../models/useCreateArticle.ts'
import { Article } from '../../../entities/article/model/types.ts'
import { Alert, Box, Button, Link, TextField, TextFieldProps } from '@mui/material'
import { NavLink } from 'react-router-dom'

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

  const textFieldProps: TextFieldProps = {
    variant: 'outlined',
    size: 'small',
    margin: 'normal',
    fullWidth: true
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
          <TextField
            label="Name"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            required
            {...textFieldProps}
          />
          <TextField
            label="URL img"
            value={img}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setImg(e.target.value)}
            {...textFieldProps}
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            multiline
            minRows={6}
            required
            {...textFieldProps}
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
