import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

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
        <Route path="/about" element={<About />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  )
}

