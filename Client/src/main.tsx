import { createRoot } from 'react-dom/client'
import './shared/styles/index.scss'

import App from './app/App.tsx'

createRoot(document.getElementById('root')!).render(<App />)
