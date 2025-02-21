import { useState, useEffect } from "react";

export const useTypingEffect = (
  texts: string[], // Array de textos para digitar
  typingSpeed: number = 100, // Velocidade da digitação (em ms)
  eraseSpeed: number = 50, // Velocidade de apagar (em ms)
  pauseDuration: number = 3000 // Tempo de pausa após digitar (em ms)
) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Se o array de textos estiver vazio, não faz nada
    if (texts.length === 0) return;

    if (isTyping) {
      // Efeito de digitação
      if (currentText.length < texts[currentIndex].length) {
        const timeout = setTimeout(() => {
          setCurrentText(
            (prevText) => prevText + texts[currentIndex][prevText.length]
          );
        }, typingSpeed);

        return () => clearTimeout(timeout);
      } else {
        // Aguarda antes de apagar o texto
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);

        return () => clearTimeout(timeout);
      }
    } else {
      // Efeito de apagar o texto
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText((prevText) => prevText.slice(0, -1));
        }, eraseSpeed);

        return () => clearTimeout(timeout);
      } else {
        // Passa para o próximo texto
        setIsTyping(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }
  }, [currentText, currentIndex, isTyping, texts, typingSpeed, eraseSpeed, pauseDuration]);

  return currentText; // Retorna o texto atual
};