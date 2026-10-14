import './App.css'
import { useState, useEffect } from 'react'
import { FaHome } from 'react-icons/fa'
function About() {
  return (
    <main>
      <section className="section">
        <h2>About Me</h2>
        <div className="about-content">
          <img src="/me.png" alt="Artem" className="avatar" />
          <p>lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.     </p>
        </div>
        <button className="about-btn" aria-label="Back" title="Back" onClick={() => window.history.back()}>
          <FaHome className="about-btn-icon" />
        </button>
      </section>
    </main>
  )
}

export default About
