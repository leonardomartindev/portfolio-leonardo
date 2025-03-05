import { performRequest } from "@/lib/datocms";
import styles from "./page.module.css";
import {
  ABOUT_CONTENT_QUERY,
  HEADER_CONTENT_QUERY,
  PROJETCTS_CONTENT_QUERY,
  SKILLS_CONTENT_QUERY,
  SOCIAL_CONTENT_QUERY,
} from "@/lib/queries";
import {
  AboutType,
  HeaderType,
  ProjectsType,
  SkillsType,
  SocialLinksType,
} from "@/types/pageData";
import Header from "./components/header/header";
import About from "./components/about/about";
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
import SocialLinks from "./components/socialLinks/SocialLinks";

// Adicionar revalidação para cache
export const revalidate = 3600; // Revalida a cada hora

export default async function Home() {
  const [
    headerReponse,
    aboutReponse,
    skillsReponse,
    projectsReponse,
    socialReponse,
  ] = await Promise.all([
    performRequest(HEADER_CONTENT_QUERY, {}),
    performRequest(ABOUT_CONTENT_QUERY, {}),
    performRequest(SKILLS_CONTENT_QUERY, {}),
    performRequest(PROJETCTS_CONTENT_QUERY, {}),
    performRequest(SOCIAL_CONTENT_QUERY, {}),
  ]);

  const formatedResponseHeader = (headerReponse as HeaderType).landingpage.header;
  const formatedResponseAbout = (aboutReponse as AboutType).landingpage.aboutMe;
  const formatedResponseSkills = (skillsReponse as SkillsType).landingpage.skills.skills;
  const formatedResponseProjects = (projectsReponse as ProjectsType).landingpage.projects.projects;
  const formatedResponseSocialLinks = (socialReponse as SocialLinksType).landingpage.sociallinks;

  return (
    <main className={styles.main}>
      <Header headerData={formatedResponseHeader} />
      <About aboutData={formatedResponseAbout} />
      <Skills skillsData={formatedResponseSkills} />
      <Projects projectsData={formatedResponseProjects} />
      <Contact />
      <SocialLinks socialLinksData={formatedResponseSocialLinks} />
    </main>
  );
}