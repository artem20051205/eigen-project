import './App.css'
import { FaHome } from 'react-icons/fa'
function About() {
  return (
    <main>
      <section className="section">
        <h2>About Me</h2>
        <div className="about-content">
          <img src="/photo.jpg" alt="Artem" className="avatar" />
          <p>
            Hello! I'm Artem, a passionate software developer with a love for creating innovative solutions. I have experience in various programming languages and frameworks, and I enjoy tackling challenging problems. In my free time, I like to explore new technologies and contribute to open-source projects.
          </p>
        </div>
        <button className="about-btn" aria-label="Back" title="Back" onClick={() => window.history.back()}>
          <FaHome className="about-btn-icon" />
        </button>
      </section>
    </main>
  )
}

export default About
