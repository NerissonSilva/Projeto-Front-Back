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

      
      router.push("/");
    },

    onError: () => {
      alert("Usuário ou senha inválidos");
    },
  });

  return (
    <div className="container">
      <h1>Login</h1>

      <input
        placeholder="Usuário"
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

      <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
        Não tem uma conta? <Link href="/signup" style={{ color: "#0070f3", textDecoration: "underline" }}>Cadastre-se (Sign Up)</Link>
      </p>
    </div>
  );
}