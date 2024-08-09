import ClientTester from "@/app/(auth)/admin/Client";

import { auth } from "@/auth";

export default async function page() {
  return (
    <>
      <ClientTester />
    </>
  );
}
