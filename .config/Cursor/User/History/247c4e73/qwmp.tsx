import Button from "@/components/buttons/button";
import Stepper from "@/components/stepper";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation
} from "@tanstack/react-router";
import { steps } from "./-constants";
import {
  MultiStepFormContextProvider,
  useMultiStepForm
} from "./-context/multi-step-form-context";
import { useMemo } from "react";

export const Route = createFileRoute(
  "/_app/analysis/_layout/management/repein-personal"
)({
  component: RouteComponent
});
function RouteComponent() {
  return (
    <MultiStepFormContextProvider steps={steps}>
      <MultiStepForm />
    </MultiStepFormContextProvider>
  );
}

function MultiStepForm() {
  const location = useLocation();

  const currentStep = useMemo(
    () => steps.findIndex((step) => location.pathname.includes(step)),
    [location]
  );

  const { submitHandler } = useMultiStepForm();

  return (
    <div
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          e.preventDefault(); // Prevent default Enter key behavior

          // Get all focusable elements
          const focusableElements = document.querySelectorAll(
            'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
          );

          // Find the currently focused element
          const currentElement = document.activeElement;

          // Find the index of the currently focused element
          const currentIndex =
            Array.from(focusableElements).indexOf(currentElement);

          // Calculate the next focusable element
          const nextIndex = (currentIndex + 1) % focusableElements.length;

          // Focus the next element
          focusableElements[nextIndex].focus();
        }
      }}
      className="bg-neutral-900 w-full flex flex-col gap-8 px-24 py-6 items-center h-[calc(100vh_-_32px)]"
    >
      <Stepper steps={steps} />

      <article className="p-8 w-[668px] bg-neutral-950 rounded-lg shadow-lg overflow-y-auto">
        <Outlet />
      </article>

      <Link
        to={`/analysis/management/bounding/${steps[currentStep - 1]}/`}
        disabled={currentStep === 0}
        viewTransition={true}
        className={
          "disabled:text-neutral-950 absolute bottom-6 left-6 transition-colors group active:opacity-30 cursor-default rounded-md bg-neutral-800 text-neutral-100 font-bold " +
          (currentStep === 0 ? "opacity-50" : "")
        }
      >
        <span
          className={
            "text-neutral-100 font-bold transition " +
            (currentStep === 0
              ? "cursor-default"
              : "group-hover:text-neutral-500 cursor-pointer")
          }
        >
          Retroceder
        </span>
      </Link>

      {currentStep === steps.length - 1 ? (
        <></>
      ) : (
        <Button
          onClick={submitHandler}
          type="submit"
          className="absolute bottom-6 right-6 px-6 py-2 transition-colors active:opacity-30 rounded-md hover:opacity-60 bg-primary"
        >
          <span className="text-neutral-900 font-bold">Continuar</span>
        </Button>
      )}
    </div>
  );
}
