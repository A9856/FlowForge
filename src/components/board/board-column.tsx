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
      className={`rounded-lg p-3 space-y-3 border min-h-[70vh] transition
        ${isOver ? "bg-muted" : "bg-background"}`}
    >
      <h3 className="font-semibold text-sm md:text-base">
        {title}
      </h3>

      {tasks
        .filter((t) => t.status === status)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </div>
  );
}
