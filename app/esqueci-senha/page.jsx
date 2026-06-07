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
    <>
      <div className="hero-section">
        <div className="book-icon">🔐</div>
        <h1>Recuperar Acesso</h1>
        <p>
          Esqueceu sua senha? Não se preocupe! Digite seu e-mail cadastrado
          e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      <div className="container">
        <h1>Recuperar Senha</h1>
        <p className="subtitle">Digite seu e-mail para continuar</p>

        <input
          type="email"
          placeholder="Seu e-mail cadastrado"
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
          {forgotPasswordMutation.isPending ? "Enviando..." : "Enviar Link de Recuperação"}
        </button>

        <div className="divider"></div>

        <p className="link-text">
          Lembrou sua senha? <a href="/login">Voltar para login</a>
        </p>
      </div>
    </>
  );
}
