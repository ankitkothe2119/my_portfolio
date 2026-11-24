"use client";

import { useEffect, useMemo, useState } from "react";
import cv from "../data/cv.json";

const GH_USER = "ankitkothe2119";
const GH_AVATAR = "https://avatars.githubusercontent.com/u/135228960?v=4";

const links = {
  linkedin:
    "https://www.linkedin.com/in/ankiitkothe?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: `https://github.com/${GH_USER}`,
  email: "mailto:ankiitkothe@gmail.com",
};

const projects = [
  {
    title: "CI/CD & GitOps Deployment Lab",
    description: "Customized GitHub Actions, Docker, Kubernetes/Minikube, Helm and Argo CD workflows, with documented deployment tests.",
    tags: ["GitHub Actions", "Docker", "Kubernetes", "Helm", "Argo CD"],
    source: "Adapted from axthithya/devops-starter-kit (MIT)",
    color: "pink",
  },
  {
    title: "OpenTelemetry Observability Demo",
    description: "Deployed locally, explored telemetry, built a service dashboard and tested alert scenarios.",
    tags: ["OpenTelemetry", "Observability", "Dashboards"],
    source: "Adapted from open-telemetry/opentelemetry-demo (Apache 2.0)",
    color: "cyan",
  },
  {
    title: "Document Intelligence API",
    description: "Document ingestion, knowledge-base APIs, access control and automated tests.",
    tags: ["APIs", "Access control", "Testing"],
    source: "Adapted from RedHatInsights/tangerine-backend (Apache 2.0)",
    color: "amber",
  },
  {
    title: "RAG Knowledge Assistant",
    description: "Focused document Q&A with retrieval evaluation and source-grounded answers.",
    tags: ["RAG", "Retrieval", "LLM"],
    source: "Adapted from infiniflow/ragflow (Apache 2.0)",
    color: "violet",
  },
  {
    title: "Full-Stack API & Web Application",
    description: "Customized API and React UI, added role-based functionality, validation and tests.",
    tags: ["FastAPI", "React", "Role-based access"],
    source: "Adapted from fastapi/full-stack-fastapi-template (MIT)",
    color: "green",
  },
];

const experience = cv.experience;

const skills = cv.skills;

const EVENT_TEXT = {
  PushEvent: "Pushed commits to",
  CreateEvent: "Created",
  WatchEvent: "Starred",
  ForkEvent: "Forked",
  IssuesEvent: "Issue activity in",
  PullRequestEvent: "Pull request in",
};

const LANG_COLORS = ["#f472b6", "#22d3ee", "#fbbf24", "#a78bfa", "#34d399", "#fb7185", "#60a5fa"];

function useGithub() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [u, r, e] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`).then((res) => res.json()),
          fetch(`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=100`).then((res) => res.json()),
          fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=10`).then((res) => res.json()),
        ]);
        if (cancelled) return;
        setProfile(u);
        setRepos(Array.isArray(r) ? r.filter((x) => !x.fork) : []);
        setEvents(Array.isArray(e) ? e : []);
      } catch (err) {
        /* offline or rate-limited: static content still renders */
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { profile, repos, events };
}

export default function Home() {
  const { profile, repos, events } = useGithub();
  const year = new Date().getFullYear();

  const topRepos = useMemo(
    () =>
      [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 6),
    [repos]
  );

  const langBreakdown = useMemo(() => {
    const counts = {};
    repos.forEach((r) => {
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([name, n], i) => ({ name, pct: total ? Math.round((n / total) * 100) : 0, color: LANG_COLORS[i] }));
  }, [repos]);

  return (
    <>
      <div className="bg-blobs" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>

      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo">AK<span>.</span></a>
          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#github">GitHub</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">DevOps &amp; Cloud Engineer (entry level)</p>
              <h1>
                Hi, I&apos;m <span className="grad-text">{profile?.name || "Ankit Kothe"}</span>.
                <br />
                I build and automate reliable cloud infrastructure.
              </h1>
              <p className="lead">
                {profile?.bio ||
                  "MCA candidate at DAVV, Indore (CGPA 9.00). CI/CD, GitOps, containers and observability, plus hands-on troubleshooting of hardware, networks and operating systems."}
              </p>
              {profile?.location && <p className="muted small">📍 {profile.location}</p>}
              <div className="actions">
                <a className="btn" href="#projects">View projects</a>
                <a className="btn btn-ghost" href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="btn btn-ghost" href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <div className="photo-wrap">
              <div className="photo-ring">
                <img src={profile?.avatar_url || GH_AVATAR} alt="Ankit Kothe" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section container">
          <h2><span className="grad-text">About</span></h2>
          <p className="muted">
            I&apos;m focused on DevOps, cloud infrastructure and backend engineering. I learn by building:
            I take open-source projects, customize their pipelines and infrastructure, and document the results.
            Looking for an entry-level DevOps or Cloud Engineer role where I can keep growing.
          </p>
        </section>

        <section id="projects" className="section container">
          <h2><span className="grad-text">Projects</span></h2>
          <div className="grid">
            {projects.map((p) => (
              <article className={`card glow-${p.color}`} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((t) => <span key={t} className={`tag tag-${p.color}`}>{t}</span>)}
                </div>
                <p className="source">{p.source}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="github" className="section container">
          <h2><span className="grad-text">GitHub</span> live</h2>

          {profile && (
            <div className="gh-stats">
              <div className="stat"><b>{profile.public_repos}</b><span>Public repos</span></div>
              <div className="stat"><b>{profile.followers}</b><span>Followers</span></div>
              <div className="stat"><b>{profile.following}</b><span>Following</span></div>
              <div className="stat"><b>{repos.reduce((s, r) => s + r.stargazers_count, 0)}</b><span>Total stars</span></div>
            </div>
          )}

          {langBreakdown.length > 0 && (
            <div className="panel">
              <h3>Languages across repos</h3>
              <div className="lang-bar">
                {langBreakdown.map((l) => (
                  <span key={l.name} style={{ width: `${l.pct}%`, background: l.color }} title={`${l.name} ${l.pct}%`} />
                ))}
              </div>
              <div className="lang-legend">
                {langBreakdown.map((l) => (
                  <span key={l.name}><i style={{ background: l.color }} />{l.name} {l.pct}%</span>
                ))}
              </div>
            </div>
          )}

          <div className="grid">
            {topRepos.length === 0 && <p className="muted">Loading repositories from GitHub…</p>}
            {topRepos.map((r, i) => (
              <a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer" className={`card repo glow-${["pink", "cyan", "amber", "violet", "green", "pink"][i % 6]}`}>
                <h3>{r.name}</h3>
                <p>{r.description || "No description provided."}</p>
                <div className="tags">
                  {r.language && <span className="tag">{r.language}</span>}
                  <span className="tag">★ {r.stargazers_count}</span>
                  <span className="tag">Updated {new Date(r.pushed_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                  {(r.topics || []).slice(0, 3).map((t) => <span key={t} className="tag tag-cyan">{t}</span>)}
                </div>
              </a>
            ))}
          </div>

          {events.length > 0 && (
            <div className="panel">
              <h3>Recent activity</h3>
              <ul className="activity">
                {events.map((ev) => (
                  <li key={ev.id}>
                    <span className="ev-type">{EVENT_TEXT[ev.type] || "Activity in"}</span>{" "}
                    <a href={`https://github.com/${ev.repo.name}`} target="_blank" rel="noopener noreferrer">{ev.repo.name}</a>
                    <span className="period"> · {new Date(ev.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section id="experience" className="section container">
          <h2><span className="grad-text">Experience</span></h2>
          {experience.map((e) => (
            <div className="job" key={e.role + e.period}>
              <div className="job-head">
                <h3>{e.role}</h3>
                <span className="period">{e.period}</span>
              </div>
              <p className="org">{e.org}</p>
              <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          ))}
        </section>

        <section id="education" className="section container">
          <h2><span className="grad-text">Education</span></h2>
          {cv.education.map((ed) => (
            <div className="job" key={ed.degree}>
              <div className="job-head"><h3>{ed.degree}</h3><span className="period">{ed.period}</span></div>
              <p className="org">{ed.school}</p>
            </div>
          ))}
        </section>

        <section id="skills" className="section container">
          <h2><span className="grad-text">Skills</span> &amp; certifications</h2>
          {Object.entries(skills).map(([group, items]) => (
            <div className="skill-group" key={group}>
              <h3>{group}</h3>
              <div className="tags">{items.map((s, i) => <span key={s} className={`tag tag-${["pink", "cyan", "amber", "violet", "green"][i % 5]}`}>{s}</span>)}</div>
            </div>
          ))}
          <p className="muted certs">Certifications: UX/UI (Google) · GenAI (Infosys) · Data Analytics (Deloitte)</p>
        </section>

        <section id="contact" className="section container contact">
          <h2><span className="grad-text">Let&apos;s connect</span></h2>
          <p className="muted">Open to entry-level DevOps, Cloud and related roles.</p>
          <a className="mail" href={links.email}>ankiitkothe@gmail.com</a>
          <div className="actions">
            <a className="btn btn-ghost" href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="btn btn-ghost" href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">© {year} Ankit Kothe · Built with Next.js</div>
      </footer>
    </>
  );
}
