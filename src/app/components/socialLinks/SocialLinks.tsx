"use client";
import { useTypingEffect } from "@/utils/useTypingEffect";
import styles from "./style.module.css";
import { SocialLinksType } from "@/types/pageData";
import Image from "next/image";
import Link from "next/link";

interface SocialLinksProps {
  id?: string; 

  socialLinksData: SocialLinksType["landingpage"]["sociallinks"];
}

export default function SocialLinks({ socialLinksData }: SocialLinksProps) {
  const titleText = "Conecte-se comigo!";
  const typedSubTitle = useTypingEffect([titleText], 100, 50, 2000);

  return (
    <section className={styles.socialLinksContainer}>
      <h1>Leonardo Martin de Oliveira</h1>
      <h2>&gt; {typedSubTitle}</h2>
      <div className={styles.linksContainer}>
        {socialLinksData.map((link, i) => (
          <Link key={i} target="_blank" href={link.link}>
            <Image alt={link.nome} width={50} height={50} src={link.logo.url} />
          </Link>
        ))}
      </div>
    </section>
  );
}
