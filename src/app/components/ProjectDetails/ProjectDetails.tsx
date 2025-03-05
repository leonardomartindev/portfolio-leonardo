"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [fadeClass, setFadeClass] = useState("");
  const [preloaded, setPreloaded] = useState(false);

  // Pré-carregar imagens
  useEffect(() => {
    const preloadImages = async () => {
      const promises = project.images.map((image) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = image.url;
          img.onload = resolve;
          img.onerror = resolve; // Resolve mesmo em erro para não travar
        });
      });
      await Promise.all(promises);
      setPreloaded(true);
    };
    preloadImages();
  }, [project.images]);

  // Debounce para troca de imagens
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleImageChange = useCallback((newIndex: number) => {
    if (isLoading) return;
    setIsLoading(true);
    setFadeClass("fade-out");
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setFadeClass("fade-in");
    }, 200);
  }, [isLoading]);

  const goToNextImage = debounce(() => {
    handleImageChange((currentImageIndex + 1) % project.images.length);
  }, 300);

  const goToPreviousImage = debounce(() => {
    handleImageChange(
      currentImageIndex === 0 ? project.images.length - 1 : currentImageIndex - 1
    );
  }, 300);

  const goToImage = (index: number) => {
    handleImageChange(index);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const paragraphs = project.aboutProject
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");

  return (
    <main className={styles.main}>
      <div className={styles.leftContent}>
        <div className={styles.imageContainer}>
          <div className={`${styles.imageWrapper} ${styles[fadeClass]}`}>
            <Image
              alt="imagem do projeto"
              width={400}
              height={400}
              src={project.images[currentImageIndex]?.url || "/default-image.png"}
              className={styles.projectImage}
              priority={currentImageIndex === 0} // Prioridade para a primeira imagem
              loading={currentImageIndex === 0 ? "eager" : "lazy"} // Lazy para as demais
              unoptimized={true}
              onLoadingComplete={handleImageLoad}
            />
            {isLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loader}></div>
              </div>
            )}
          </div>
          {project.images.length > 1 && (
            <>
              <button
                onClick={goToPreviousImage}
                className={styles.navButton}
                style={{ left: "10px" }}
                disabled={isLoading || !preloaded}
              >
                ‹
              </button>
              <button
                onClick={goToNextImage}
                className={styles.navButton}
                style={{ right: "10px" }}
                disabled={isLoading || !preloaded}
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
                onClick={() => !isLoading && preloaded && goToImage(index)}
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