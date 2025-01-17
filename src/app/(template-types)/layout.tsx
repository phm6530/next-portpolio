import Grid from "@/components/ui/Grid";
import { ReactNode } from "react";

export default function templatelayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Grid.center>{children}</Grid.center>;
}
