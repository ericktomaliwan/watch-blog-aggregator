import AppRouter from './router'

export const metadata = {
    title: {
      template: '%s - WBA',
      default: 'WatchBlogAggregator',
    },
    description: '',
  }
  
/* Move old routes to new router */
export default function App() {
  return <AppRouter />
}

