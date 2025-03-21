import Home from '../components/pages/Home.tsx'
import Articles from '../components/pages/Articles.tsx'
import { ComponentType } from 'react'

interface RouteInterface {
  path: string
  label: string
  Component: ComponentType
}

export const routes: RouteInterface[] = [
  { path: '/', label: 'Home', Component: Home },
  { path: '/articles', label: 'Articles', Component: Articles }
]
