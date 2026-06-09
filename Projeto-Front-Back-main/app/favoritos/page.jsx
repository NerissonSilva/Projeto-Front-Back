"use client";

import { getTasks, deleteTask, updateTask, logoutUser } from "../../api";
import { CardTask } from "../../components/CardTask";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function Favoritos() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });

  const favoritosLivros = data?.results?.filter((task) => task.done) || [];

  if (isLoading) {
    return (
      <div className="container">
        <p style={{ textAlign: "center" }}>Carregando seus favoritos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p style={{ textAlign: "center", color: "red" }}>Erro ao carregar favoritos.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hero-section">
        <div className="book-icon">⭐</div>
        <h1>Livros Favoritos</h1>
        <p>
          Aqui estão todos os livros que você marcou como lidos.
          Sua coleção especial de histórias concluídas.
        </p>
      </div>

      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0 }}>Meus Favoritos</h1>
          <button
            onClick={() => logoutMutation.mutate()}
            style={{ width: "auto", padding: "10px 20px", fontSize: "0.9rem" }}
          >
            Sair
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <Link href="/usuario" style={{ flex: 1 }}>
            <button style={{ width: "100%", background: "#6b4423" }}>
              📚 Todos os Livros
            </button>
          </Link>
        </div>

        <div className="divider"></div>

        {favoritosLivros.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}>
            Você ainda não marcou nenhum livro como lido.
            Vá para "Todos os Livros" e marque seus favoritos!
          </p>
        ) : (
          <>
            <p className="subtitle">
              {favoritosLivros.length} {favoritosLivros.length === 1 ? "livro marcado" : "livros marcados"}
            </p>
            {favoritosLivros.map((task) => (
              <CardTask
                key={task.objectId}
                task={task}
                onDelete={deleteMutation.mutate}
                onCheck={updateMutation.mutate}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
