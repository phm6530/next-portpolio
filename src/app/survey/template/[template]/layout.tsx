import { ReactNode } from "react";

export default function layOut({
  params,
  children,
}: {
  params: { template: string };
  children: ReactNode;
}) {
  return (
    <>
      <h1>{params.template} 템플릿</h1>
      {children}
    </>
  );
}
