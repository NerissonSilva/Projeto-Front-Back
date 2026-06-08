export function CardTask({ task, onDelete, onCheck }) {
  return (
    <div className="task">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onCheck(task)}
          style={{ 
            width: "18px", 
            height: "18px", 
            cursor: "pointer"
          }}
        />
        <span style={{ 
          textDecoration: task.done ? "line-through" : "none",
          color: task.done ? "#999" : "#333"
        }}>
          {task.done ? "✓ " : "📖 "}
          {task.description}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.objectId)}
        style={{
          width: "auto",
          padding: "8px 15px",
          fontSize: "13px",
          margin: 0,
          background: "#c0504d"
        }}
      >
        Remover
      </button>
    </div>
  );
}
