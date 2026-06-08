"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTask, deleteTask, getTasks, updateTask, logoutUser } from "../../api";
import { CardTask } from "../../components/CardTask";
 
export default function Usuario() {
  const [description, setDescription] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
 
  // Busca os livros (tarefas) do banco
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
 
  // Mutação para adicionar livro
  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setDescription(""); // Limpa o input após adicionar
    },
  });
 
  // Mutação para deletar livro
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
 
  // Mutação para marcar como lido (check)
  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
 
  // Mutação para deslogar
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });
 
  if (isLoading) {
    return (
      <div className="container">
        <p style={{ textAlign: "center" }}>Carregando sua biblioteca...</p>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="container">
        <p style={{ textAlign: "center", color: "red" }}>Erro ao carregar livros.</p>
      </div>
    );
  }
 
  return (
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
 
        <button
          onClick={() => {
            if (description.trim() === "") return;
            addMutation.mutate({
              description,
              done: false,
            });
          }}
        >
          📚 Adicionar Livro
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
