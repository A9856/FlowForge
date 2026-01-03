export function filterByRange(tasks: any[], range: "week" | "month") {
  const now = new Date();
  const days = range === "week" ? 7 : 30;

  return tasks.filter((t) => {
    const d = new Date(t.createdAt);
    const diff =
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= days;
  });
}
