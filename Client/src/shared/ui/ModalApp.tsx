import { ReactNode } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface ModalAppProps {
  title: ReactNode
  body: ReactNode
  open: boolean
  handleClose: () => void
}

const ModalApp = ({ open, handleClose, title, body }: ModalAppProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ mt: '5px' }} variant="h5">
            {title}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Typography>{body}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
export default ModalApp
