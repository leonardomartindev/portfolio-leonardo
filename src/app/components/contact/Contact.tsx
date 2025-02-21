"use client";
import { useState } from 'react';
import { useTypingEffect } from '@/utils/useTypingEffect';
import { z } from 'zod';
import styles from './style.module.css';

// Esquema de validação com Zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.string().email({ message: 'Email inválido' }),
  message: z.string().min(1, { message: 'Mensagem é obrigatória' }),
});

export default function Contact() {
  const titleText = "Contato";
  const typedTitle = useTypingEffect([titleText], 100, 50, 2000);
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);

    const form = event.currentTarget; // Armazenamos o formulário em uma variável
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    // Validação dos dados
    try {
      formSchema.parse(data); // Valida os dados
      setErrors({}); // Limpa os erros se a validação for bem-sucedida
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          errorMessages[err.path[0]] = err.message;
        });
        setErrors(errorMessages); // Define os erros de validação
        setIsSending(false);
        return; // Interrompe o envio se houver erros
      }
    }

    // Simulação de progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Email enviado com sucesso!');
        form.reset(); // Usamos a variável "form" para resetar o formulário
      } else {
        alert('Erro ao enviar email');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar email');
    } finally {
      setIsSending(false);
      setProgress(0);
    }
  };

  // Função para gerar a barra de progresso com traços verticais
  const renderProgressBar = () => {
    const progressBarWidth = 20; // Número de traços na barra
    const filledCount = Math.floor((progress / 100) * progressBarWidth);
    const progressBar = '|'.repeat(filledCount).padEnd(progressBarWidth, ' ');
    return `[${progressBar}] ${progress}%`;
  };

  return (
    <section id='contato' className={styles.contactSection}>
      <h1>&gt; {typedTitle}</h1>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div>
          <input type="text" name="name" placeholder='&gt; Nome' />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div>
          <input type="text" name="email" placeholder='&gt; Email' />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div>
          <textarea name="message" id="message" placeholder='&gt; Mensagem'></textarea>
          {errors.message && <span className={styles.error}>{errors.message}</span>}
        </div>
        <button type="submit" disabled={isSending}>
          {isSending ? `Enviando... ${renderProgressBar()}` : 'Enviar requisição'}
        </button>
      </form>
    </section>
  );
}