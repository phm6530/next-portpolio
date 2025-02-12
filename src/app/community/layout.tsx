import Grid from "@/components/ui/Grid";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Grid.center>
      <Grid.smallCenter>{children}</Grid.smallCenter>
    </Grid.center>
  );
}
