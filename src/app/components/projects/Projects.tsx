"use client";
import { useTypingEffect } from "@/utils/useTypingEffect";
import styles from "./style.module.css";
import { ProjectsType } from "@/types/pageData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProjetctsProps {
  projectsData: ProjectsType["landingpage"]["projects"]["projects"];
}

export default function Projects({ projectsData }: ProjetctsProps) {
  const titleText = "Projetos";
  const typedTitle = useTypingEffect([titleText], 100, 50, 2000);
  const [isPersonal, setIsPersonal] = useState(true);

  const filteredProjects = projectsData.filter(
    (project) => project.ispersonal === isPersonal
  );

  return (
    <section id="projetos" className={styles.projectsSection}>
      <h1>&gt; {typedTitle}</h1>

      <div className={styles.projects}>
        <div className={styles.changeProjectTypeMenu}>
          <button
            className={isPersonal ? styles.activeButton : ""}
            onClick={() => setIsPersonal(true)}
          >
            Pessoal
          </button>
          <button
            className={!isPersonal ? styles.activeButton : ""}
            onClick={() => setIsPersonal(false)}
          >
            Acadêmicos
          </button>
        </div>

        <div className={styles.cards}>
          {filteredProjects.map((project, i) => {
            const techsArray = project.listTechs
              .split("\n")
              .map((tech) => tech.replace(/[*\-]/, "").trim());

            const truncatedDescription =
              project.aboutProject.length > 200
                ? `${project.aboutProject.slice(0, 200)}...`
                : project.aboutProject;

            return (
              <div className={styles.card} key={i}>
                <Link href={project.id}>
                  <div className={styles.imageContainer}>
                    <Image
                      alt={project.titleProject}
                      width={300}
                      height={200}
                      src={project.projectImages[0].url}
                      className={styles.cardImage}
                    />
                    <div className={styles.techsContainer}>
                      {techsArray.map((tech, i) => (
                        <span key={i}>{tech}</span>
                      ))}
                    </div>
                    <div className={styles.overlay}>
                      <span>Clique aqui para abrir projeto em nova guia</span>
                    </div>
                  </div>
                </Link>

                <div className={styles.cardContent}>
                  <h3>{project.titleProject}</h3>
                  <p>{truncatedDescription}</p>

                  <div className={styles.buttons}>
                    {project.respositoryLink && (
                      <Link target="_blank" href={project.respositoryLink}>
                        Repositório
                      </Link>
                    )}
                    <Link target="_blank" href={project.deployLink}>
                      Deploy
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
