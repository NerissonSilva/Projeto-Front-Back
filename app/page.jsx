"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="container">
      <p style={{ textAlign: "center" }}>Redirecionando...</p>
    </div>
  );
}