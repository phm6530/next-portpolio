import { ReactNode } from "react";

export default function NotFoundContents({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex justify-center gap-2 items-center text-center p-14 text-xl animate-fadein">
      {children}
    </div>
  );
}
