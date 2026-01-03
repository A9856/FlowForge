import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { useTaskStore } from "../../store/task-store";
import type { Task } from "../../types/task";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function TaskCard({ task }: { task: Task }) {
  const { deleteTask } = useTaskStore();
  const [open, setOpen] = useState(false);

  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: task.id,
  });

  return (
    <>
      <motion.div
        ref={setNodeRef}
        layout
        style={{
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        }}
        className={`rounded border bg-background p-3 md:p-4 text-sm md:text-base
    ${task.status === "done" ? "line-through text-red-500" : ""}
  `}
      >

        {/* 🔹 DRAG HANDLE (ONLY THIS PART DRAGS) */}
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab font-medium"
        >
          {task.title}
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>

          {task.status === "done" && (
            <Button
              variant="destructive"
              size="sm"
              onPointerDown={(e) => e.stopPropagation()} // 🔥 IMPORTANT
              onClick={() => setOpen(true)}             // ✅ WORKS NOW
            >
              Delete
            </Button>
          )}
        </div>
      </motion.div>

      {/*  CONFIRM DELETE DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to permanently delete this task?
          </p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteTask(task.id);
                setOpen(false);
              }}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
