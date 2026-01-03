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
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              status: "ideas",
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      moveTask: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status } : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
    }),
    { name: "flowforge-tasks" }
  )
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import type { Task, Status } from "../types/task";
// // import { api } from "../lib/api"; // 🔌 Future backend API

// type Store = {
//   tasks: Task[];

//   addTask: (title: string) => void;
//   moveTask: (id: string, status: Status) => void;
//   deleteTask: (id: string) => void;

//   // 🔌 Backend-ready (currently disabled)
//   // fetchTasks: () => Promise<void>;
// };

// export const useTaskStore = create<Store>()(
//   persist(
//     (set /* , get */) => ({
//       tasks: [],

//       addTask: (title) =>
//         set((s) => ({
//           tasks: [
//             ...s.tasks,
//             {
//               id: crypto.randomUUID(),
//               title,
//               status: "ideas",
//               createdAt: new Date().toISOString(),
//             },
//           ],
//         })),

//       moveTask: (id, status) =>
//         set((s) => ({
//           tasks: s.tasks.map((t) =>
//             t.id === id ? { ...t, status } : t
//           ),
//         })),

//       deleteTask: (id) =>
//         set((s) => ({
//           tasks: s.tasks.filter((t) => t.id !== id),
//         })),

//       /*
//       ===============================
//       🔌 BACKEND MODE (FUTURE USE)
//       ===============================

//       fetchTasks: async () => {
//         const res = await api.get("/tasks");
//         set({ tasks: res.data });
//       },
//       */

//     }),
//     {
//       name: "flowforge-tasks", // LocalStorage key
//     }
//   )
// );
