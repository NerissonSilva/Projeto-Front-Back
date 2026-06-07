"use client";

import { registerUser } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Cadastro realizado com sucesso! Faça login para acessar sua biblioteca.");
      router.push("/login");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || error.message || "Erro desconhecido";
      alert("Erro ao cadastrar: " + errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    signupMutation.mutate({
      username,
      email,
      password,
    });
  };

  return (
    <>
      <div className="hero-section">
        <div className="book-icon">📖</div>
        <h1>Bem-vindo à Biblioteca Pessoal</h1>
        <p>
          Crie sua conta e comece a organizar sua coleção de livros hoje mesmo.
          Marque livros lidos, adicione notas e acompanhe seu progresso de leitura.
        </p>
      </div>

      <div className="container">
        <h1>Criar Conta</h1>
        <p className="subtitle">Inicie sua biblioteca digital</p>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={signupMutation.isPending}>
            {signupMutation.isPending ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <div className="divider"></div>

        <p className="link-text">
          Já tem uma conta? <Link href="/login">Faça login</Link>
        </p>
      </div>
    </>
  );
}
