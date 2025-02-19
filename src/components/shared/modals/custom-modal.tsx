import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className={cn("overflow-hidden", className)}>
        <DialogHeader>
          <DialogTitle>자세히 보기</DialogTitle>
          {children}
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} onClick={onClose} type="submit">
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
