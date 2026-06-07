"use client";

import { addTask, deleteTask, getTasks, updateTask, logoutUser } from "../../api";

import { useState } from "react";

import { CardTask } from "../../components/CardTask";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function Home() {
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTasks,
  });

  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setDescription("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
   
  const logoutMutation = useMutation({
  mutationFn: logoutUser,
  onSuccess: () => {
    queryClient.clear(); 
  },
  });
   

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar tarefas.</p>;
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
        />
      ))}
    </div>
  );
}