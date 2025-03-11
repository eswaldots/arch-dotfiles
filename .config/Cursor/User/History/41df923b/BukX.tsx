import { createFileRoute, Outlet, useLocation, useRouter } from "@tanstack/react-router";
import "@/styles/stack-transition.css";
import { useMemo } from "react";
import { ChevronDownIcon } from "@/assets/icons/chevron-down";
export const Route = createFileRoute(
  "/_app/analysis/_layout/management/bounding"
)({
  component: RouteComponent
}); 

function RouteComponent() {
  const location = useLocation();

  const router = useRouter()

  const match = useMemo(() => {
    return location.pathname === "/analysis/management/bounding/band"
  }, [location.pathname]) 

  return (
    <main style={{
      viewTransitionName: "stack"
    }} className="flex flex-col pb-24 py-3 min-h-[calc(100vh-32px)]">
      <Outlet />
      <button disabled={match} onClick={() => router.history.back()} className="flex gap-1 items-center transition delay-100 absolute bottom-8 left-8 text-primary text-md font-medium cursor-pointer disabled:opacity-30">
       <ChevronDownIcon className="rotate-90 size-6 font-bold"/> 
        Regresar</button>
    </main>
  );
}
