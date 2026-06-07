
export function CardTask({ task, onDelete, onCheck }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        margin: "10px 0",
        alignItems: "center",
      }}
    >
      <span>{task.description}</span>

      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onCheck(task)}
      />

      <button onClick={() => onDelete(task.objectId)}>
        Excluir
      </button>
    </div>
  );
}