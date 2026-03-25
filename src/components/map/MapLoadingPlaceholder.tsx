import { cn } from "@/lib/utils";

type MapLoadingPlaceholderProps = {
  className?: string;
  height?: string;
  label?: string;
};

export function MapLoadingPlaceholder({
  className,
  height = "500px",
  label = "Подготавливаем карту...",
}: MapLoadingPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[2rem] bg-surface-container-high shadow-ambient",
        className,
      )}
      style={{ minHeight: height }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(144,77,0,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(42,103,110,0.16),transparent_35%)]" />
      <div className="absolute inset-0 animate-pulse">
        <div className="absolute left-[18%] top-[20%] h-16 w-16 rounded-full bg-white/40" />
        <div className="absolute left-[44%] top-[36%] h-12 w-12 rounded-full bg-white/35" />
        <div className="absolute left-[66%] top-[24%] h-14 w-14 rounded-full bg-white/30" />
        <div className="absolute left-[28%] top-[62%] h-10 w-10 rounded-full bg-white/35" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-lg">
          <span className="material-symbols-outlined text-primary">map</span>
        </div>
        <p className="text-sm font-bold text-on-surface">{label}</p>
        <p className="max-w-xs text-xs text-on-surface-variant">
          Сначала грузим интерфейс страницы, затем подключаем карту без блокировки перехода.
        </p>
      </div>
    </div>
  );
}
