import './App.css'
import { useState, useEffect } from 'react'

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

  {/*const projects = [
    {
      id: 1,
      title: 'Website van Hendrik Hogendijk',
      description: 'Website van een hovenier uit Utrecht: tuinontwerp, tuinaanleg, tuinonderhoud en zwemvijvers.',
      link: 'https://artem20051205.github.io/L.I.A/index.html',
      picture: 'https://artem20051205.github.io/L.I.A/assets/fotos/logo.png',
    },
    {
      id: 2,
      title: 'The Time Nail Studio',
      description: 'Nagelstudio aan huis in Nijkerk: je kiest je kleur online en Yana mengt die vóór je afspraak.',
      link: 'https://artem20051205.github.io/yanast/v2/',
      picture: 'https://raw.githubusercontent.com/artem20051205/yanast/3875351ad69e6066c0ab87e87c55e0d1c2d8426d/assets/icons/favicon.svg',
    },
    {
      id: 3,
      title: 'AnnexBios',
      description: 'Website van bioscoop AnnexBios in Bilthoven, met een filmagenda en de mogelijkheid om kaartjes te bestellen.',
      link: 'https://u250444.gluwebsite.nl/AnnexBios/',
      picture: 'https://u250444.gluwebsite.nl/AnnexBios/style/images/logo.png',
    }
  ]
    */}

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
          link: post.content.rendered.match(/<summary>(.*?)<\/summary>/)?.[1] || post.link,
          picture: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : null
        }))
        setProjects(fetchedProjects)
      })
  }, [])

  return (
    <main>
      {/* Шапка */}
      <header>
        <img src="/me.png" alt="Artem" width="120" className="avatar" />
        <h1>Artem</h1>
        <p className="subtitle">Creative software developer</p>
      </header>


      {/* Навыки — рендер массива */}
      <section className="section">
        <h2>Skills</h2>
        <div className="skills">
          {skills.map((skill) => (
            <Skill key={skill} name={skill} />
          ))}
        </div>
      </section>

      {/* Проекты — рендер массива компонентов */}
      <section className="section">
        <h2>Projects</h2>
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

      <footer>
        <p>Made with React</p>
      </footer>
    </main>
  )
}

export default App
