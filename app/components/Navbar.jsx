"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px" }}>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
      <Link href="/esqueci-senha">Esqueci minha senha</Link>
      <Link href="/usuario">Usuário</Link>
    </nav>
  );
}