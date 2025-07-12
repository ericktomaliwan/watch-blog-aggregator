import { Routes, Route } from 'react-router-dom'

export const metadata = {
    title: {
      template: '%s - WBA',
      default: 'WatchBlogAggregator',
    },
    description: '',
  }
  

export default function App() {
  return (
    <div>
      {/* You can add your navigation component here */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  )
}

// Temporary Home component - you might want to move this to its own file
function Home() {
  return (
    <div>
      <h1>Welcome to Watch Blog Aggregator</h1>
    </div>
  )
}

