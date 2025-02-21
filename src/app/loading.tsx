"use client";
import styles from './page.module.css'
import { useTypingEffect } from "@/utils/useTypingEffect";
import { useEffect, useState } from "react";

export default function LoadingTerminal() {
  const [progress, setProgress] = useState(0);

  // Texto que será "digitado" no terminal
  const loadingText = useTypingEffect(
    ["Carregando projeto...", "Inicializando sistema...", "Preparando dados..."],
    100,
    50,
    2000
  );

  // Simulação de progresso
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.terminalLoading}>
      <div className={styles.terminalText}>
        <span>&gt; {loadingText}</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}