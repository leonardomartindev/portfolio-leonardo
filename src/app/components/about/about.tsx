"use client";

import { AboutType } from "@/types/pageData";
import styles from './style.module.css';
import { useTypingEffect } from "@/utils/useTypingEffect";

interface AboutProps {
  aboutData: AboutType["landingpage"]["aboutMe"];
}

export default function About({ aboutData }: AboutProps) {
  const titleText = "Sobre";
  const typedTitle = useTypingEffect([titleText], 100, 50, 2000);

  return (
    <section id='sobre'  className={styles.aboutSection}>
      <h1 className={styles.aboutTitle}>&gt; {typedTitle}</h1>
      {aboutData.paragraph.map((paragraph, i) => (
        <p className={styles.paragraph} key={i}>{paragraph.paragraph}</p>
      ))}
    </section>
  );
}