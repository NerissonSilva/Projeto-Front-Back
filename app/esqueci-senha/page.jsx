"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { forgotPassword } from "../../api";
import { useRouter } from "next/navigation";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      alert("Se o e-mail estiver cadastrado, um link de redefinição foi enviado!");
      router.push("/login");
    },
    onError: (error) => {
      const message = error.response?.data?.error || error.message || "Erro desconhecido";
      alert("Erro ao solicitar redefinição: " + message);
    },
  });

  return (
    <div className="container">
      <h1>Recuperar Senha</h1>

      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={() => {
          if (email.trim() === "") {
            alert("Por favor, preencha o e-mail.");
            return;
          }
          forgotPasswordMutation.mutate(email);
        }}
        disabled={forgotPasswordMutation.isPending}
      >
        {forgotPasswordMutation.isPending ? "Enviando..." : "Enviar link de redefinição"}
      </button>
    </div>
  );
}
