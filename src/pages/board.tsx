import { DndContext} from "@dnd-kit/core";
import type {DragEndEvent } from "@dnd-kit/core";

import { useTaskStore } from "../store/task-store";
import BoardColumn from "../components/board/board-column";
import TaskDialog from "../components/task/task-dialog";

export default function Board() {
  const { moveTask } = useTaskStore();

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over) {
      moveTask(active.id as string, over.id as any);
    }
  }

  return (
    <>
      <TaskDialog />

      <DndContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <BoardColumn status="ideas" title="Ideas" />
          <BoardColumn status="planned" title="Planned" />
          <BoardColumn status="progress" title="In Progress" />
          <BoardColumn status="done" title="Done" />
        </div>
      </DndContext>
    </>
  );
}
