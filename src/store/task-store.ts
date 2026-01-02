import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, Status } from "../types/task";

type Store = {
  tasks: Task[];
  addTask: (title: string) => void;
  moveTask: (id: string, status: Status) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<Store>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (title) =>
        set((s) => ({
          tasks: [
            ...s.tasks,
            {
              id: crypto.randomUUID(),
              title,
              status: "ideas",
            },
          ],
        })),

      moveTask: (id, status) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, status } : t
          ),
        })),

      deleteTask: (id) =>
        set((s) => ({
          tasks: s.tasks.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "flowforge-tasks",
    }
  )
);
