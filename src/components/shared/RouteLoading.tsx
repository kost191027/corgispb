import { cn } from "@/lib/utils";

type RouteLoadingProps = {
  modal?: boolean;
};

export function RouteLoading({ modal = false }: RouteLoadingProps) {
  if (modal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
        <div className="w-full max-w-3xl rounded-[2rem] bg-surface-container-lowest shadow-2xl p-8 md:p-10">
          <div className="animate-pulse space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="h-4 w-24 rounded-full bg-surface-container-high" />
                <div className="h-10 w-48 rounded-full bg-surface-container-high" />
              </div>
              <div className="h-10 w-10 rounded-full bg-surface-container-high" />
            </div>
            <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
              <div className="h-72 rounded-[1.75rem] bg-surface-container-high" />
              <div className="space-y-4">
                <div className="h-5 w-32 rounded-full bg-surface-container-high" />
                <div className="h-4 w-full rounded-full bg-surface-container-high" />
                <div className="h-4 w-[88%] rounded-full bg-surface-container-high" />
                <div className="h-4 w-[76%] rounded-full bg-surface-container-high" />
                <div className="flex flex-wrap gap-2 pt-3">
                  <div className="h-8 w-24 rounded-full bg-surface-container-high" />
                  <div className="h-8 w-28 rounded-full bg-surface-container-high" />
                  <div className="h-8 w-20 rounded-full bg-surface-container-high" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] w-full px-6 py-24">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="space-y-4">
          <div className="h-4 w-32 rounded-full bg-surface-container-high" />
          <div className="h-14 w-full max-w-2xl rounded-[2rem] bg-surface-container-high" />
          <div className="h-5 w-full max-w-3xl rounded-full bg-surface-container-high" />
          <div className="h-5 w-full max-w-2xl rounded-full bg-surface-container-high" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "rounded-[2rem] bg-surface-container-lowest p-6 shadow-sm",
                index === 0 && "md:col-span-2",
              )}
            >
              <div className="h-56 rounded-[1.5rem] bg-surface-container-high" />
              <div className="mt-5 space-y-3">
                <div className="h-6 w-2/3 rounded-full bg-surface-container-high" />
                <div className="h-4 w-full rounded-full bg-surface-container-high" />
                <div className="h-4 w-4/5 rounded-full bg-surface-container-high" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
