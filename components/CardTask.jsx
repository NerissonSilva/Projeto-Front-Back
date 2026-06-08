export function CardTask({ task, onDelete, onCheck, isEditing, editingText, onEditStart, onEditChange, onEditSave, onEditCancel }) {
  return (
    <div className="task">
      {isEditing ? (
     
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
          <input
            type="text"
            value={editingText}
            onChange={(e) => onEditChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onEditSave();
              if (e.key === "Escape") onEditCancel();
            }}
            autoFocus
            style={{ flex: 1, padding: "8px", fontSize: "14px" }}
          />
          <button
            onClick={onEditSave}
            style={{ width: "auto", padding: "8px 15px", fontSize: "13px", margin: 0, background: "#4caf50" }}
          >
            Salvar
          </button>
          <button
            onClick={onEditCancel}
            style={{ width: "auto", padding: "8px 15px", fontSize: "13px", margin: 0, background: "#999" }}
          >
            Cancelar
          </button>
        </div>
      ) : (
      
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onCheck(task)}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{
              textDecoration: task.done ? "line-through" : "none",
              color: task.done ? "#999" : "#333"
            }}>
              {task.done ? "✓ " : "📖 "}
              {task.description}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={onEditStart}
              style={{ width: "auto", padding: "8px 15px", fontSize: "13px", margin: 0, background: "#f0ad4e" }}
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(task.objectId)}
              style={{ width: "auto", padding: "8px 15px", fontSize: "13px", margin: 0, background: "#c0504d" }}
            >
              Remover
            </button>
          </div>
        </>
      )}
    </div>
  );
}
