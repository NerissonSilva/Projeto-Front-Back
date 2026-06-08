"use client";

import { addTask, deleteTask, getTasks, updateTask, logoutUser } from "../../api";

import { useState } from "react";

import { CardTask } from "../../components/CardTask";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function Home() {
export default function Usuario() {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const queryClient = useQueryClient();

@@ -44,60 +44,88 @@ export default function Home() {
  });

  const logoutMutation = useMutation({
  mutationFn: logoutUser,
  onSuccess: () => {
    queryClient.clear(); 
  },
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });
   

  if (isLoading) {
    return <p>Carregando...</p>;
    return (
      <div className="container">
        <p style={{ textAlign: "center" }}>Carregando sua biblioteca...</p>
      </div>
    );
  }

  if (error) {
    return <p>Erro ao carregar tarefas.</p>;
    return (
      <div className="container">
        <p style={{ textAlign: "center", color: "red" }}>Erro ao carregar livros.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <button onClick={() => logoutMutation.mutate()}>
        Logout
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Nova tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={() =>
          addMutation.mutate({
            description,
            done: false,
          })
        }
      >
        Adicionar
      </button>

      <hr />

      {data?.results?.map((task) => (
        <CardTask
          key={task.objectId}
          task={task}
          onDelete={deleteMutation.mutate}
          onCheck={updateMutation.mutate}
    <>
      <div className="hero-section">
        <div className="book-icon">📚</div>
        <h1>Minha Biblioteca Pessoal</h1>
        <p>
          Organize sua coleção de livros e marque aqueles que já leu.
          Mantenha um registro completo de sua jornada literária.
        </p>
      </div>

      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0 }}>Meus Livros</h1>
          <button
            onClick={() => logoutMutation.mutate()}
            style={{ width: "auto", padding: "10px 20px", fontSize: "0.9rem" }}
          >
            Sair
          </button>
        </div>

        <p className="subtitle">Adicione livros à sua coleção</p>

        <input
          type="text"
          placeholder="Nome do livro..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ))}
    </div>

        <button
          onClick={() =>
            addMutation.mutate({
              description,
              done: false,
            })
          }
        >
          📖 Adicionar Livro
        </button>

        <div className="divider"></div>

        {data?.results?.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}>
            Sua biblioteca está vazia. Adicione seu primeiro livro!
          </p>
        ) : (
          data?.results?.map((task) => (
            <CardTask
              key={task.objectId}
              task={task}
              onDelete={deleteMutation.mutate}
              onCheck={updateMutation.mutate}
            />
          ))
        )}
      </div>
    </>
  );
}
