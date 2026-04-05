"use client";

import { useEffect, useId, useRef } from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ActiveConsent } from "@/types/enrollment";

type DashboardConsentDialogProps = Readonly<{
  acceptedRequiredCount: number;
  activeConsents: readonly ActiveConsent[];
  errorMessage: string | null;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onToggleConsent: (consentId: string) => void;
  selectedConsentIds: readonly string[];
}>;

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

export function DashboardConsentDialog({
  acceptedRequiredCount,
  activeConsents,
  errorMessage,
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
  onToggleConsent,
  selectedConsentIds,
}: DashboardConsentDialogProps) {
  const dialogId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!isSubmitting) {
          event.preventDefault();
          onClose();
        }

        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(dialogRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements.at(-1);

      if (!lastFocusableElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocusedElement?.focus();
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) {
    return null;
  }

  const requiredConsentCount = activeConsents.filter(
    (consent) => consent.required,
  ).length;
  const hasAcceptedAllRequired = requiredConsentCount === acceptedRequiredCount;

  return (
    <div
      aria-describedby={descriptionId}
      aria-labelledby={dialogId}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#08211f]/65 px-4 py-4 backdrop-blur-[2px] sm:py-6"
      role="dialog"
      onClick={isSubmitting ? undefined : onClose}
    >
      <div
        ref={dialogRef}
        className="my-auto flex max-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-[#d5e1da] bg-[#fffdec] shadow-[0_32px_70px_-42px_rgba(8,33,31,0.6)] sm:max-h-[calc(100vh-3rem)]"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#dbe5df] px-5 py-5 sm:px-8 sm:py-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#1f8ca5] uppercase">
              Enrollment Consent
            </p>
            <h2
              className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#12393d] sm:text-[2rem]"
              id={dialogId}
            >
              Review and accept the active consents
            </h2>
            <p
              className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]"
              id={descriptionId}
            >
              Required consents must be accepted before the member can continue
              to Step 1 of enrollment.
            </p>
          </div>

          <button
            aria-label="Close consent dialog"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#d5e1da] bg-white text-slate-500 transition-colors hover:bg-[#f4faf8] hover:text-[#12393d] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
          <div className="rounded-[22px] border border-[#d5e1da] bg-white/85 px-4 py-4 sm:px-5">
            <p className="text-sm font-semibold tracking-[-0.02em] text-[#12393d]">
              Required accepted: {acceptedRequiredCount}/{requiredConsentCount}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Optional items can be selected or skipped. Only required items are
              enforced before continuing.
            </p>
          </div>

          {errorMessage ? (
            <div className="mt-4 rounded-[20px] border border-[#e7c6c2] bg-[#fff3f1] px-4 py-3 text-sm font-medium text-[#9e493f]">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-5 space-y-4">
            {activeConsents.map((consent) => {
              const isSelected = selectedConsentIds.includes(consent.id);

              return (
                <label
                  key={consent.id}
                  className={cn(
                    "flex cursor-pointer gap-4 rounded-[24px] border px-4 py-4 transition-colors sm:px-5 sm:py-5",
                    isSelected
                      ? "border-[#0b625d] bg-[#edf7f4]"
                      : "border-[#d5e1da] bg-white",
                  )}
                >
                  <input
                    checked={isSelected}
                    className="mt-1 size-4 rounded border-[#8aa7a4] accent-[#0b625d]"
                    disabled={isSubmitting}
                    type="checkbox"
                    onChange={() => onToggleConsent(consent.id)}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-base font-semibold tracking-[-0.03em] text-[#12393d]">
                        {consent.title}
                      </p>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase",
                          consent.required
                            ? "bg-[#ffe8c8] text-[#9c5d08]"
                            : "bg-[#e6f1ff] text-[#3167a3]",
                        )}
                      >
                        {consent.required ? "Required" : "Optional"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
                      {consent.content}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[#dbe5df] bg-white/88 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
          <Button
            className="h-11 rounded-xl border-[#d5e1da] px-5 shadow-none"
            disabled={isSubmitting}
            size="lg"
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="h-11 rounded-xl bg-[#0b625d]! px-5 text-white! shadow-[0_18px_38px_-22px_rgba(11,98,93,0.85)] hover:bg-[#0b625d]! hover:text-white!"
            disabled={!hasAcceptedAllRequired}
            loading={isSubmitting}
            loadingText="Saving consent..."
            size="lg"
            type="button"
            onClick={onSubmit}
          >
            Accept and Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
