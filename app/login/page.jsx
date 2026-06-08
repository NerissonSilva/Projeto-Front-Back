"use client";

import { loginUser } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/usuario");
    },

    onError: () => {
      alert("Usuário ou senha inválidos");
    },
  });

  return (
    <>
      <div className="hero-section">
        <div className="book-icon">📚</div>
        <h1>Biblioteca Pessoal</h1>
        <p>
          Organize sua coleção de livros, marque os já lidos e mantenha um
          registro pessoal de sua jornada literária. Sua biblioteca digital
          completa em um só lugar.
        </p>
      </div>

      <div className="container">
        <h1>Entrar na Biblioteca</h1>
        <p className="subtitle">Acesse sua coleção de livros</p>

        <input
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() =>
            loginMutation.mutate({
              username,
              password,
            })
          }
        >
          Entrar
        </button>

        <div className="divider"></div>

        <p className="link-text">
          Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
        </p>

        <p className="link-text">
          <Link href="/esqueci-senha">Esqueci minha senha</Link>
        </p>
      </div>
    </>
  );
}