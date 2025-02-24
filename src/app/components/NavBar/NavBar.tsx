'use client';
import Link from "next/link";
import { useEffect } from "react";
import styles from "./style.module.css";

export default function NavBar() {
  useEffect(() => {
    const handleHomeClick = (e: Event) => {
      e.preventDefault();

      if (window.location.pathname !== "/") {
        window.location.href = "/";
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    const homeLink = document.querySelector(`.${styles.nav} a[href="/"]`);
    if (homeLink) {
      homeLink.addEventListener("click", handleHomeClick);
    }

    return () => {
      if (homeLink) {
        homeLink.removeEventListener("click", handleHomeClick);
      }
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <Link href="/">&gt; Home</Link>
      <Link href="/#sobre">&gt; Sobre</Link>
      <Link href="/#skills">&gt; Skills</Link>
      <Link href="/#projetos">&gt; Projetos</Link>
      <Link href="/#contato">&gt; Contato</Link>
    </nav>
  );
}