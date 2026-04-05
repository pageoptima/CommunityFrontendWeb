"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const requiredConsentCount = activeConsents.filter(
    (consent) => consent.required,
  ).length;
  const hasAcceptedAllRequired = requiredConsentCount === acceptedRequiredCount;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isSubmitting) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="max-h-[calc(100vh-2rem)] gap-0 overflow-hidden p-0 sm:max-h-[calc(100vh-3rem)]"
        onEscapeKeyDown={(event) => {
          if (isSubmitting) {
            event.preventDefault();
          }
        }}
        onInteractOutside={(event) => {
          if (isSubmitting) {
            event.preventDefault();
          }
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#dbe5df] px-5 py-5 sm:px-8 sm:py-6">
          <DialogHeader>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#1f8ca5] uppercase">
              Enrollment Consent
            </p>
            <DialogTitle className="mt-2">
              Review and accept the active consents
            </DialogTitle>
            <DialogDescription className="mt-2">
              Required consents must be accepted before the member can continue
              to Step 1 of enrollment.
            </DialogDescription>
          </DialogHeader>

          <button
            aria-label="Close consent dialog"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#d5e1da] bg-white text-slate-500 transition-colors hover:bg-[#f4faf8] hover:text-[#12393d] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
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
                  <Checkbox
                    checked={isSelected}
                    className="mt-1"
                    disabled={isSubmitting}
                    onCheckedChange={() => onToggleConsent(consent.id)}
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

        <DialogFooter className="border-t border-[#dbe5df] bg-white/88 px-5 py-5 sm:px-8 sm:py-6">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
