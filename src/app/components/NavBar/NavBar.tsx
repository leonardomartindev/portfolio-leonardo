'use client';
import Link from "next/link";
import { useEffect } from "react";
import styles from "./style.module.css";

export default function NavBar() {
  useEffect(() => {
    const handleHomeClick = (e: Event) => {
      e.preventDefault(); // Previne o comportamento padrão do link

      // Redireciona para a página inicial (/)
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      } else {
        // Se já estivermos na página inicial, rola para o topo
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    // Adiciona o evento de clique ao link da home
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