import Grid from "@/components/ui/Grid";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Grid.smallCenter>
      <Grid.center>{children}</Grid.center>
    </Grid.smallCenter>
  );
}
