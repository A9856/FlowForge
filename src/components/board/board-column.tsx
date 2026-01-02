import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./task-card";
import { cn } from "@/lib/utils";
import { useTaskStore } from "../../store/task-store";
import type { Status } from "../../types/task";

type Props = {
  status: Status;
  title: string;
};

export default function BoardColumn({ status, title }: Props) {
  const tasks = useTaskStore((s) => s.tasks);

  const columnTasks = tasks.filter((t) => t.status === status);

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "w-64 min-h-[400px] rounded-lg border p-3 space-y-3 transition-colors",
        isOver
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
          : "border-gray-200 dark:border-gray-700"
      )}
    >
      <h3 className="font-semibold text-sm">{title}</h3>

      {columnTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
