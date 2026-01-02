import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { useTaskStore } from "../../store/task-store";
import type { Task } from "../../types/task";

export default function TaskCard({ task }: { task: Task }) {
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const [open, setOpen] = useState(false);

  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: task.id,
  });

  const isDone = task.status === "done";

  return (
    <>
      {/* TASK CARD */}
      <motion.div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        layout
        style={{
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        }}
        className="bg-white dark:bg-gray-700 rounded shadow p-2 text-sm cursor-grab space-y-2"
      >
        <p
          className={
            isDone
              ? "text-red-500 line-through font-medium"
              : "text-gray-800 dark:text-gray-100"
          }
        >
          {task.title}
        </p>

        {isDone && (
          <Button variant="destructive" size="sm" onPointerDown={(e) => e.stopPropagation()}onClick={(e) => {e.stopPropagation();
              setOpen(true);
            }}>Delete</Button>
        )}
      </motion.div>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this task?
          </p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive"onClick={() => {deleteTask(task.id);setOpen(false);}}>OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
