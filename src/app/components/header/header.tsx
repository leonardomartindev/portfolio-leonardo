"use client";

import { HeaderType } from "@/types/pageData";
import styles from "./style.module.css";
import Link from "next/link";
import Image from "next/image";
import { useTypingEffect } from "@/utils/useTypingEffect"; // Importe o hook

interface HeaderProps {
  headerData: HeaderType["landingpage"]["header"];
}

export default function Header({ headerData }: HeaderProps) {
  const subtitles = headerData.subtitle.map((item) => item.text);

  const currentText = useTypingEffect(subtitles);

  return (
    <header className={styles.header} id="home">
      <div className={styles.leftContent}>
        <div className={styles.leftTexts}>
          <h2 className={styles.subtitle}>
            &lt;{currentText}
            <span className={styles.cursor}>|{" /"}</span>&gt;
          </h2>
          <h1 className={styles.name}>{headerData.nome}</h1>
          <div className={styles.actionButtons}>
            <button className={styles.button}>
              &gt;{" "}
              <Link target="_blank" href={headerData.cv.url}>
                Download CV
              </Link>
            </button>
            <button>
              &gt;{" "}
              <Link
                target="_blank"
                href="https://api.whatsapp.com/send/?phone=5511915630912&text&type=phone_number&app_absent=0"
              >
                Contato
              </Link>
            </button>
          </div>
        </div>
        <div>
          <Image
            className={styles.profilePicture}
            alt="Foto de Perfil"
            width={200}
            height={400}
            src={headerData.profilephoto.url}
            quality={100}
          />
          <Image
            src="/lineHeader.svg"
            alt="Linha decorativa"
            width={600}
            height={350}
            className={styles.decorativeLine}
          />
        </div>
      </div>
    </header>
  );
}