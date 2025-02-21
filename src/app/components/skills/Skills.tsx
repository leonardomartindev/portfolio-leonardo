"use client";
import { useState } from "react"; 
import { useTypingEffect } from "@/utils/useTypingEffect";
import styles from "./style.module.css";
import { SkillsType } from "@/types/pageData";
import Image from "next/image";

interface SkillsProps {
  id?: string; 

  skillsData: SkillsType["landingpage"]["skills"]["skills"];
}

export default function Skills({ skillsData }: SkillsProps) {
  const titleText = "Skills";
  const titleText2 = "Aprofundando";
  const typedTitle = useTypingEffect([titleText], 100, 50, 2000);
  const typedTitle2 = useTypingEffect([titleText2], 100, 50, 2000);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null); 

  return (
    <section id='skills' className={styles.skillsSection}>
      <div className={styles.skillsContainer}>
        <div>
          <h1 className={styles.title}>&gt; {typedTitle}</h1>

          <div className={styles.skills}>
            {skillsData.map(
              (skill, i) =>
                !skill.studying && (
                  <div
                    key={i}
                    className={styles.skillItem}
                    onMouseEnter={() => setHoveredSkill(i)} // Ativa o hover
                    onMouseLeave={() => setHoveredSkill(null)} // Desativa o hover
                  >
                    <Image
                      className={styles.skillLogo}
                      src={skill.logoskill.url}
                      alt={skill.nametech}
                      width={70}
                      height={70}
                    />
                    {/* Card que aparece no hover */}
                    {hoveredSkill === i && (
                      <div className={styles.skillCard}>
                        <span>{skill.nametech}</span>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
        <div>
          <h1 className={styles.title} >&gt; {typedTitle2}</h1>
          <div className={styles.skills}>
            {skillsData.map(
              (skill, i) =>
                skill.studying && (
                  <div
                    key={i}
                    className={styles.skillItem}
                    onMouseEnter={() => setHoveredSkill(i)}
                    onMouseLeave={() => setHoveredSkill(null)} 
                  >
                    <Image
                      className={styles.skillLogo}
                      src={skill.logoskill.url}
                      alt={skill.nametech}
                      width={70}
                      height={70}
                    />
                    {hoveredSkill === i && (
                      <div className={styles.skillCard}>
                        <span>{skill.nametech}</span>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}