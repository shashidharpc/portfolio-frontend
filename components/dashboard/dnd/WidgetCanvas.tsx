"use client";

import * as React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { saveDashboardLayout } from "@/features/layout/actions";
import { StatsWidget } from "@/components/dashboard/widgets/StatsWidget";
import { QuickActionsWidget } from "@/components/dashboard/widgets/QuickActionsWidget";
import { ProjectsWidget } from "@/components/dashboard/widgets/ProjectsWidget";
import { MessagesWidget } from "@/components/dashboard/widgets/MessagesWidget";
import { SkillsWidget } from "@/components/dashboard/widgets/SkillsWidget";
import { ActivityWidget } from "@/components/dashboard/widgets/ActivityWidget";
import { AppearanceWidget } from "@/components/dashboard/widgets/AppearanceWidget";
import { Button } from "@/components/ui/button";
import { GripVertical, Maximize2, Minimize2, EyeOff, RotateCcw } from "lucide-react";

export interface WidgetConfig {
  id: string;
  colSpan: number; // 4, 6, 8, 12
  isVisible: boolean;
  order: number;
}

interface WidgetCanvasProps {
  initialWidgets: WidgetConfig[];
  data: {
    stats: {
      totalPageViews: number;
      totalProjectViews: number;
      totalMessages: number;
      totalProjects: number;
    };
    availableForHire: boolean;
    projects: any[];
    messages: any[];
    skills: any[];
    auditLogs: any[];
    appearance: {
      accentGradient: string;
      fontSize: string;
      motionEnabled: boolean;
    };
  };
}

function SortableWidgetCard({
  widget,
  onResize,
  onHide,
  children,
}: {
  widget: WidgetConfig;
  onResize: (id: string, colSpan: number) => void;
  onHide: (id: string) => void;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: widget.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.7 : 1,
  };

  const colClasses: Record<number, string> = {
    4: "col-span-12 lg:col-span-4",
    6: "col-span-12 md:col-span-6",
    8: "col-span-12 lg:col-span-8",
    12: "col-span-12",
  };

  const colClass = colClasses[widget.colSpan] || "col-span-12";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${colClass} relative group transition-all duration-200`}
    >
      {/* Control overlay strip for drag handle & resize */}
      <div className="absolute top-2 right-2 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--card)]/90 backdrop-blur-sm border border-[var(--border)] rounded-[8px] p-0.5 shadow-sm">
        <button
          {...attributes}
          {...listeners}
          className="p-1 rounded hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
          aria-label="Drag widget"
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>

        {widget.colSpan < 12 ? (
          <button
            onClick={() => onResize(widget.id, Math.min(12, widget.colSpan + 4))}
            className="p-1 rounded hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)]"
            title="Expand widget width"
            aria-label="Expand width"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            onClick={() => onResize(widget.id, 6)}
            className="p-1 rounded hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)]"
            title="Compact widget width"
            aria-label="Compact width"
          >
            <Minimize2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {children}
    </div>
  );
}

export function WidgetCanvas({ initialWidgets, data }: WidgetCanvasProps) {
  const [widgets, setWidgets] = React.useState<WidgetConfig[]>(initialWidgets);
  const [isPersisting, setIsPersisting] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function persist(newWidgets: WidgetConfig[]) {
    setWidgets(newWidgets);
    setIsPersisting(true);
    await saveDashboardLayout(JSON.stringify(newWidgets));
    setIsPersisting(false);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = widgets.findIndex((w) => w.id === active.id);
    const newIndex = widgets.findIndex((w) => w.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(widgets, oldIndex, newIndex).map((w, idx) => ({
        ...w,
        order: idx,
      }));
      persist(reordered);
    }
  }

  function handleResize(id: string, colSpan: number) {
    const updated = widgets.map((w) => (w.id === id ? { ...w, colSpan } : w));
    persist(updated);
  }

  function handleHide(id: string) {
    const updated = widgets.map((w) =>
      w.id === id ? { ...w, isVisible: false } : w
    );
    persist(updated);
  }

  function renderWidgetContent(id: string) {
    switch (id) {
      case "stats":
        return <StatsWidget stats={data.stats} />;
      case "quick_actions":
        return (
          <QuickActionsWidget
            initialAvailable={data.availableForHire}
            onResetLayout={() => window.location.reload()}
          />
        );
      case "projects":
        return <ProjectsWidget projects={data.projects} />;
      case "messages":
        return <MessagesWidget messages={data.messages} />;
      case "skills":
        return <SkillsWidget skills={data.skills} />;
      case "activity":
        return <ActivityWidget logs={data.auditLogs} />;
      case "appearance":
        return (
          <AppearanceWidget
            initialGradient={data.appearance.accentGradient}
            initialFontSize={data.appearance.fontSize}
            initialMotion={data.appearance.motionEnabled}
          />
        );
      default:
        return null;
    }
  }

  const visibleWidgets = widgets.filter((w) => w.isVisible);

  return (
    <div className="space-y-4">
      {/* Canvas notification header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--foreground-muted)]">
            Hover over any widget to drag, resize, or reorganize your workspace.
          </span>
          {isPersisting && (
            <span className="text-[11px] font-mono text-[#7C3AED] animate-pulse">
              Persisting layout...
            </span>
          )}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={visibleWidgets.map((w) => w.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-12 gap-6">
            {visibleWidgets.map((widget) => (
              <SortableWidgetCard
                key={widget.id}
                widget={widget}
                onResize={handleResize}
                onHide={handleHide}
              >
                {renderWidgetContent(widget.id)}
              </SortableWidgetCard>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
