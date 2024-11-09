import Grid from "@/components/ui/Grid";
import WithProtectedComponent from "@/hoc/WithProtectedComponent";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <WithProtectedComponent>
      <Grid.center>{children}</Grid.center>
    </WithProtectedComponent>
  );
}