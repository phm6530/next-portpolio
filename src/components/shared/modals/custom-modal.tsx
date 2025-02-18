import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function CustomModal({
  open,
  onClose,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Dialog open={open}>
      <DialogContent className={cn(className)}>
        <DialogHeader>{children}</DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} onClick={onClose} type="submit">
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
