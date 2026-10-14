import './App.css'
import { useState, useEffect } from 'react'
import { FaGithub, FaTelegram, FaSteam, FaWhatsapp, FaSpotify, FaDiscord, FaUser, FaHome } from 'react-icons/fa'

const socials = [
  { name: 'GitHub', url: 'https://github.com/artem20051205', icon: FaGithub },
  { name: 'Telegram', url: 'https://t.me/mrartemkaa', icon: FaTelegram },
  { name: 'WhatsApp', url: 'https://wa.me/+380931270315', icon: FaWhatsapp },
  { name: 'Steam', url: 'https://steamcommunity.com/profiles/76561198881972203/', icon: FaSteam },
  { name: 'Spotify', url: 'https://open.spotify.com/user/314ugvjdrralc5xdwomdiyvvd4vy?si=16fdeedab8174a3c', icon: FaSpotify },
  { name: 'Discord', url: 'https://discord.com/users/mr_artemka', icon: FaDiscord }
]

function ProjectCard({ title, description, link, picture }) {
  return (
    <div className="card">
      <a href={link} target="_blank" rel="noopener noreferrer" className="card-content">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {picture && <img src={picture} alt={title} className="project-image" />}
      </a>
    </div>
  )
}

function Skill({ name }) {
  return <span className="skill">{name}</span>
}

function App() {

  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/WordPress/wp-json/wp/v2/categories')
      .then(res => res.json())
      .then(cats => {
        const names = cats.map(cat => cat.name)
        setSkills(names)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/WordPress/wp-json/wp/v2/posts?_embed')
      .then(res => res.json())
      .then(posts => {
        const fetchedProjects = posts.map(post => ({
          id: post.id,
          title: post.title.rendered,
          description: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
          link: post.content.rendered.match(/<summary>(.*?)<\/summary>/)?.[1],
          picture: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : null
        }))
        setProjects(fetchedProjects)
      })
  }, [])

  return (
    <main>
      <header>
        <img src="/me.png" alt="Artem" width="120" className="avatar" />
        <h1>Artem</h1>
        <p className="subtitle">Creative software developer</p>
      </header>

      <section className="section">
        <h2>Skills</h2>
        <div className="skills">
          {skills.map((skill) => (
            <Skill key={skill} name={skill} />
          ))}
        </div>
      </section>


      <section className="section">
        <div className="section-header">
          <button className="about-btn" aria-label="About Me" title="About Me" onClick={() => window.location.href = '/about'}>
            <FaUser />
          </button>
          <h2>Projects</h2>
        </div>
        <div className="projects">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              link={project.link}
              picture={project.picture}
            />
          ))}
        </div>
      </section>
      <section className="section">
      </section>
      <footer>
        <div className="socials">
          {socials.map(({ name, url, icon: Icon }) => (
            <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}>
              <Icon />
            </a>
          ))}
        </div>
      </footer>

    </main>
  )
}

export default App
