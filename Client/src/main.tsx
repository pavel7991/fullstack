import { createRoot } from 'react-dom/client'
import './shared/styles/index.scss'

import App from './app/App.tsx'
import AppStoreProvider from './app/providers/StoreProvider.tsx'

createRoot(document.getElementById('root')!).render(
	<AppStoreProvider>
		<App />
	</AppStoreProvider>
)
