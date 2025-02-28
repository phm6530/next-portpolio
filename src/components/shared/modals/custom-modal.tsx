import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ModalMode = "confirm" | "default";

export default function CustomModal({
  // mode = "default",
  title,
  description,
  open,
  onClose,
  className,
  children,
}: {
  mode?: ModalMode;
  title?: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "custom-scroll overflow-y-scroll max-h-calc-screen-xs",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="whitespace-pre-line text-xl mb-3 text-left">
            {title}
          </DialogTitle>
          <DialogDescription className="whitespace-pre-line  text-left text-[12px] leading-5 md:text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter>
          <Button variant={"outline"} onClick={onClose} type="submit">
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
