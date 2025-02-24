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

export default async function Home() {
  // Header section
  const headerReponse = (await performRequest(
    HEADER_CONTENT_QUERY,
    {}
  )) as HeaderType;

  // About section
  const aboutReponse = (await performRequest(
    ABOUT_CONTENT_QUERY,
    {}
  )) as AboutType;

  // Skills section
  const skillsReponse = (await performRequest(
    SKILLS_CONTENT_QUERY,
    {}
  )) as SkillsType;

  // Projects section
  const projectsReponse = (await performRequest(
    PROJETCTS_CONTENT_QUERY,
    {}
  )) as ProjectsType;

  // Social links section
  const socialReponse = (await performRequest(
    SOCIAL_CONTENT_QUERY,
    {}
  )) as SocialLinksType;

  const formatedResponseHeader = headerReponse.landingpage.header;
  const formatedResponseAbout = aboutReponse.landingpage.aboutMe;
  const formatedResponseSkills = skillsReponse.landingpage.skills.skills;
  const formatedResponseProjects =
    projectsReponse.landingpage.projects.projects;
  const formatedResponseSocialLinks = socialReponse.landingpage.sociallinks;

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
