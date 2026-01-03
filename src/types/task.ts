export type Status = "ideas" | "planned" | "progress" | "done";

export type Task = {
  id: string;
  title: string;
  status: Status;
  createdAt: string;
};
