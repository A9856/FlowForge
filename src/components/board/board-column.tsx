import { useDroppable } from "@dnd-kit/core";
import { useTaskStore } from "../../store/task-store";
import TaskCard from "./task-card";
import type { Status } from "../../types/task";

export default function BoardColumn({
  status,
  title,
}: {
  status: Status;
  title: string;
}) {
  const { tasks } = useTaskStore();
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg p-3 space-y-3 border min-h-[300px]
        ${isOver ? "bg-muted" : ""}`}
    >
      <h3 className="font-semibold">{title}</h3>

      {tasks
        .filter((t) => t.status === status)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </div>
  );
}
