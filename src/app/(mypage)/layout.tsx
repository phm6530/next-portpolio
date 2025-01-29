import Grid from "@/components/ui/Grid";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Grid.center>
      <Grid.smallCenter>{children}</Grid.smallCenter>
    </Grid.center>
  );
}
