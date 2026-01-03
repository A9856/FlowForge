import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  
} from "@dnd-kit/core";
import type{ DragEndEvent } from "@dnd-kit/core";

import { useTaskStore } from "../store/task-store";
import BoardColumn from "../components/board/board-column";
import TaskDialog from "../components/task/task-dialog";

export default function Board() {
  const { moveTask } = useTaskStore();

  // ✅ Desktop + Mobile drag support
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveTask(active.id as string, over.id as any);
    }
  }

  return (
    <>
      <TaskDialog />

      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 mt-4">
          <div className="min-w-[280px] md:min-w-0 md:flex-1">
            <BoardColumn status="ideas" title="Ideas" />
          </div>
          <div className="min-w-[280px] md:min-w-0 md:flex-1">
            <BoardColumn status="planned" title="Planned" />
          </div>
          <div className="min-w-[280px] md:min-w-0 md:flex-1">
            <BoardColumn status="progress" title="In Progress" />
          </div>
          <div className="min-w-[280px] md:min-w-0 md:flex-1">
            <BoardColumn status="done" title="Done" />
          </div>
        </div>
      </DndContext>
    </>
  );
}
