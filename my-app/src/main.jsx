import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './About.jsx'

const root = createRoot(document.getElementById('root'))

// Hash routing (#/about) so the site also works on GitHub Pages
function render() {
  const page = window.location.hash === '#/about' ? <About /> : <App />
  root.render(
    <StrictMode>
      {page}
    </StrictMode>,
  )
  window.scrollTo(0, 0)
}

window.addEventListener('hashchange', render)
render()
