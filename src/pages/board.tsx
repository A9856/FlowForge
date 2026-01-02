import { useState } from "react";
import { DndContext} from "@dnd-kit/core";
import type {DragEndEvent } from "@dnd-kit/core";

import BoardColumn from "../components/board/board-column";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useTaskStore } from "../store/task-store";
import type { Status } from "../types/task";

export default function BoardPage() {
  const moveTask = useTaskStore((s) => s.moveTask);
  const addTask = useTaskStore((s) => s.addTask);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    moveTask(active.id as string, over.id as Status);
  }

  function handleAddTask() {
    if (!title.trim()) return;
    addTask(title);
    setTitle("");
    setOpen(false);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto pt-5 px-4 justify-between mb-6">
        <h2 className="text-xl font-semibold">Workflow Board</h2>
      </div>
       <div className="max-w-7xl mx-auto px-4 pt-5 justify-between mb-6">
        <Button onClick={() => setOpen(true)}>Add Task</Button>
      </div>

      {/* BOARD */}
      <div className="justify-between flex gap-6 max-w-7xl mx-auto overflow-x-auto pb-4">
        <BoardColumn status="ideas" title="Ideas" />
        <BoardColumn status="planned" title="Planned" />
        <BoardColumn status="progress" title="In Progress" />
        <BoardColumn status="done" title="Done" />
      </div>

      {/* ADD TASK DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>

          <Input placeholder="Enter task title" value={title}onChange={(e) => setTitle(e.target.value)}/>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel
            </Button>
            <Button onClick={handleAddTask}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DndContext>
  );
}
