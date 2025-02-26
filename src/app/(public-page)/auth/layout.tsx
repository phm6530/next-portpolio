import Grid from "@/components/ui/Grid";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Grid.extraSmall className="min-h-calc-screen"> {children}</Grid.extraSmall>
  );
}
