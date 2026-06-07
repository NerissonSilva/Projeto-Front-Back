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
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
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
    <div className="container">
      <h1>Cadastrar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome de Usuário"
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
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" style={{ width: "100%" }} disabled={signupMutation.isPending}>
          {signupMutation.isPending ? "Cadastrando..." : "Cadastrar (Sign Up)"}
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
        Já tem uma conta? <Link href="/login" style={{ color: "#0070f3", textDecoration: "underline" }}>Faça Login</Link>
      </p>
    </div>
  );
}
