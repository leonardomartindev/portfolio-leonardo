"use client";

import { useState } from "react";
import styles from "@/app/[id]/style.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface ProjectDetailsProps {
  id?: string;

  project: {
    titleProject: string;
    aboutProject: string;
    techs: string[];
    images: { url: string }[];
    respositoryLink?: string;
    deployLink?: string;
  };
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % project.images.length
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const paragraphs = project.aboutProject
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");

  return (
    <main className={styles.main}>
      <div className={styles.leftContent}>
        <div className={styles.imageContainer}>
          <Image
            alt="imagem do projeto"
            width={400}
            height={400}
            src={project.images[currentImageIndex]?.url || "/default-image.png"}
            className={styles.projectImage}
          />
          {project.images.length > 1 && (
            <>
              <button
                onClick={goToPreviousImage}
                className={styles.navButton}
                style={{ left: "10px" }}
              >
                ‹
              </button>
              <button
                onClick={goToNextImage}
                className={styles.navButton}
                style={{ right: "10px" }}
              >
                ›
              </button>
            </>
          )}
        </div>
        {project.images.length > 1 && (
          <div className={styles.dotsContainer}>
            {project.images.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentImageIndex ? styles.activeDot : ""
                }`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        )}
        <div className={styles.buttons}>
          {project.respositoryLink && (
            <Link target="_blank" href={project.respositoryLink}>
              Repositório
            </Link>
          )}
          <Link target="_blank" href={project.deployLink || "#"}>
            Deploy
          </Link>
        </div>
      </div>

      <div className={styles.rightContent}>
        <div className={styles.titleContainer}>
          <Link href={"/"} className={styles.backToHomeIcon}>
            <FaArrowAltCircleLeft />
          </Link>
          <h1>{project.titleProject}</h1>
        </div>
        <h3>Sobre</h3>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <h3>Habilidades</h3>
        <ul className={styles.ul}>
          {project.techs.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
