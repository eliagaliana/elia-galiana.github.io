import Image from "next/image";
import bimLogo from "@/assets/logos/consultora-bim.webp";
import {
  contactMailto,
  experience,
  projects,
  site,
  stackChart,
  stackMarquee,
} from "@/content/site";
import { Header } from "@/components/Header";
import { Topo } from "@/components/Topo";
import { HeroPortrait } from "@/components/HeroPortrait";
import { RevealObserver } from "@/components/RevealObserver";
import { VelocityMarquee } from "@/components/VelocityMarquee";
import { WordLight } from "@/components/WordLight";
import { HorizontalProjects } from "@/components/HorizontalProjects";
import { EyeChart } from "@/components/EyeChart";
import { TimelineLine } from "@/components/TimelineLine";
import { CommunityField } from "@/components/CommunityField";
import { Magnetic } from "@/components/Magnetic";
import { CopyEmail } from "@/components/CopyEmail";
import { Cursor } from "@/components/Cursor";
import { ScrollScenes } from "@/components/ScrollScenes";
import { SplitChars } from "@/components/SplitChars";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <Cursor />
      <RevealObserver />
      <ScrollScenes />

      <main id="contenido">
        {/* HERO: de entrada solo el retrato y las acciones; el nombre y la descripción llegan con el scroll. */}
        <section id="inicio" className="hero">
          {/* La sección es alta y este bloque se queda pegado arriba (sticky) mientras dura. */}
          <div className="hero-sticky">
          <Topo className="hero-topo" />
          <h1 className="hero-title" aria-label="Elia Galiana">
            <span className="mask" aria-hidden="true">
              <span className="line">Elia</span>
            </span>{" "}
            <span className="mask" aria-hidden="true">
              <span className="line">Galiana</span>
            </span>
          </h1>
          <HeroPortrait />
          <p className="hero-lead">
            Desarrolladora fullstack en Sevilla. Diseño y programo webs y aplicaciones. Creo
            soluciones tecnológicas para empresas y autónomos. Trabajo presencial en Sevilla y en
            remoto en el resto de España.
          </p>
          <div className="hero-actions">
            <a href={contactMailto} className="btn btn-primary">
              Cuéntame tu proyecto <Arrow />
            </a>
            <a href="#proyectos" className="btn btn-ghost">
              Ver proyectos
            </a>
          </div>
          <div className="cover-shade hero-shade" aria-hidden="true" />
          </div>
        </section>

        {/* MARQUEE */}
        <section className="band" aria-label="Lo que hago">
          <VelocityMarquee speed={1.6} repeat={6} className="band-marquee">
            <span>Diseño</span>
            <span className="serif">y</span>
            <span>Código</span>
            <span className="serif">y</span>
          </VelocityMarquee>
        </section>

        {/* SOBRE MÍ */}
        <section id="sobre-mi" className="section light about">
          <div className="wrap about-grid">
            <div className="about-side">
              <h2 className="h2" data-fx="slide">
                Sobre mí
              </h2>
              <dl className="facts">
                <div data-reveal style={d(0)}>
                  <dt>Formación</dt>
                  <dd>Bootcamp Full Stack Developer, Upgrade Hub</dd>
                </div>
                <div data-reveal style={d(80)}>
                  <dt>Ahora</dt>
                  <dd className="fact-logo">
                    <Image src={bimLogo} alt="" sizes="32px" />
                    Desarrolladora Fullstack en Consultora BIM
                  </dd>
                </div>
                <div data-reveal style={d(160)}>
                  <dt>Base</dt>
                  <dd>Sevilla, presencial y en remoto en toda España</dd>
                </div>
              </dl>
            </div>
            <WordLight
              className="statement"
              text="Antes de programar medía cómo ve la gente en una óptica. Hoy hago lo que más me apasiona: diseño y programo webs y aplicaciones de principio a fin."
            />
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" className="projects" aria-labelledby="proyectos-title">
          <HorizontalProjects
            header={
              <div className="wrap projects-head">
                <h2 id="proyectos-title" className="h2" data-fx="slide">
                  Proyectos
                </h2>
                <p className="projects-intro" data-reveal style={d(80)}>
                  Del diseño en Figma al código y bases de datos.
                </p>
              </div>
            }
          >
            {projects.map((p) => (
              <article key={p.title} className="project">
                <div className="project-media">
                  <Image
                    src={p.image}
                    alt={`Captura del proyecto ${p.title}`}
                    sizes="(min-width: 1024px) 40vw, 92vw"
                  />
                </div>
                <div className="project-body">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-kind">
                    {p.kind}
                    {p.status ? <span className="project-status"> · {p.status}</span> : null}
                  </p>
                  <p className="project-summary">{p.summary}</p>
                  <p className="project-tags">{p.tags.join(" / ")}</p>
                  {p.href ? (
                    <a href={p.href} className="link" target="_blank" rel="noreferrer">
                      {p.linkLabel ?? "Ver código"} <Arrow />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </HorizontalProjects>
        </section>

        {/* STACK */}
        <section id="stack" className="section light stack">
          <div className="wrap stack-grid">
            <div className="stack-head">
              <h2 className="h2" data-fx="slide">
                Mi stack, graduado
              </h2>
              <p className="stack-intro" data-reveal style={d(80)}>
                Como en una revisión de la vista: arriba, en grande, lo que más uso. Abajo, lo que
                completa cada proyecto.
              </p>
            </div>
            <EyeChart rows={stackChart} />
          </div>
          <div className="stack-marquees" aria-hidden="true">
            <VelocityMarquee speed={1.6} className="tech-marquee">
              {stackMarquee.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </VelocityMarquee>
            <VelocityMarquee speed={-1.6} className="tech-marquee tech-marquee-alt">
              {[...stackMarquee].reverse().map((t) => (
                <span key={t}>{t}</span>
              ))}
            </VelocityMarquee>
          </div>
        </section>

        {/* EXPERIENCIA */}
        <section id="experiencia" className="section experience">
          <div className="wrap">
            <h2 className="h2" data-fx="slide">
              Experiencia
            </h2>
            <TimelineLine>
              <ol className="jobs">
                {experience.map((job) => (
                  <li key={job.company} className="job">
                    <span className="job-dot" data-current={job.current || undefined} aria-hidden="true" />
                    <p className="job-period">{job.period}</p>
                    <div className="job-main">
                      <Image src={job.logo} alt="" className="job-logo" sizes="56px" />
                      <div>
                        <h3 className="job-role">{job.role}</h3>
                        <p className="job-company">{job.company}</p>
                      </div>
                    </div>
                    <p className="job-summary">{job.summary}</p>
                  </li>
                ))}
              </ol>
            </TimelineLine>
          </div>
        </section>

        {/* EMPECEMOS: bloque violeta que invita a contactar (textos: propuesta). */}
        <section id="empecemos" className="community" aria-labelledby="empecemos-title">
          <CommunityField>
            <Topo className="community-topo" />
            <div className="wrap community-grid">
              <h2 id="empecemos-title" className="h2 community-title">
                Hagamos que tu idea funcione
              </h2>
              <div className="community-body">
                <p className="community-lead" data-reveal style={d(80)}>
                  Da igual si es una web, una aplicación o algo que todavía no sabes cómo llamar.
                  Cuéntamelo y lo pensamos juntos.
                </p>
                <ul className="community-points">
                  <li data-reveal style={d(140)}>Hablas directamente conmigo, sin intermediarios.</li>
                  <li data-reveal style={d(200)}>Diseño y programo yo: de la primera idea a la versión publicada.</li>
                  <li data-reveal style={d(260)}>Presencial en Sevilla o en remoto desde cualquier punto de España.</li>
                </ul>
                <div className="community-actions" data-reveal style={d(320)}>
                  <Magnetic>
                    <a href={contactMailto} className="btn btn-light btn-lg">
                      Cuéntame tu proyecto <Arrow />
                    </a>
                  </Magnetic>
                  <a href={site.linkedin} className="btn btn-outline-light btn-lg" target="_blank" rel="noreferrer">
                    Escríbeme en LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </CommunityField>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="section contact">
          <div className="wrap">
            <div className="contact-head">
              <h2 className="h2" data-fx="slide">
                ¿Hablamos?
              </h2>
              <p className="contact-lead" data-reveal style={d(80)}>
                Una web, una aplicación, un software, cualquier cosa tecnológica. Estaré encantada de
                responderte.
              </p>
            </div>
            <a href={contactMailto} className="contact-email" aria-label={site.email}>
              <SplitChars text={site.email} />
            </a>
            <div className="contact-actions" data-reveal style={d(200)}>
              <CopyEmail email={site.email} />
              <a href={site.linkedin} className="btn btn-ghost" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={site.github} className="btn btn-ghost" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-name" aria-hidden="true">
          <SplitChars text="Elia Galiana" />
        </p>
        <div className="wrap footer-row">
          <p>© {new Date().getFullYear()} {site.name}. Sevilla.</p>
          <a href="#inicio" className="link">
            Volver arriba
          </a>
        </div>
      </footer>
    </>
  );
}
