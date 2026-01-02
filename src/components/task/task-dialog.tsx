import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTaskStore } from "../../store/task-store";

export default function TaskDialog() {
  const [title, setTitle] = useState("");
  const addTask = useTaskStore((s) => s.addTask);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <Input placeholder="Task title"value={title}onChange={(e) => setTitle(e.target.value)}/>
        <Button onClick={() => {addTask(title);setTitle("");}}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
