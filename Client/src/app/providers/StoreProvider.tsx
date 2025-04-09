import { Provider } from 'react-redux'
import store from '../store/store.ts'
import { ReactNode } from 'react'

const AppStoreProvider = ({ children }: { children: ReactNode }) => {
	return <Provider store={store}>{children}</Provider>
}
export default AppStoreProvider
