import { useState } from "react";
import { useTaskStore } from "../../store/task-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TaskDialog() {
  const [title, setTitle] = useState("");
  const { addTask } = useTaskStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button
          onClick={() => {
            addTask(title);
            setTitle("");
          }}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
