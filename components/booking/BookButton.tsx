"use client";

import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { useBooking } from "./BookingContext";
import type { ComponentProps, ReactNode } from "react";

type Props = Omit<ComponentProps<typeof Button>, "onClick" | "href" | "children"> & {
  children?: ReactNode;
  treatmentId?: string;
  message?: string;
  label?: string;
  onClick?: () => void;
  magnetic?: boolean;
};

export function BookButton({
  treatmentId,
  message,
  label = "Book an Appointment",
  children,
  onClick,
  magnetic = true,
  ...rest
}: Props) {
  const { openBooking } = useBooking();
  const btn = (
    <Button
      type="button"
      onClick={() => {
        onClick?.();
        openBooking({ treatmentId, message });
      }}
      {...rest}
    >
      {children ?? label}
    </Button>
  );

  if (!magnetic || rest.variant === "ghost" || rest.variant === "outline") {
    return btn;
  }

  return <Magnetic className="inline-flex">{btn}</Magnetic>;
}
