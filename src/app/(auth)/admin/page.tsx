import { auth } from "@/auth";

export default async function page() {
  const test = await auth();
  console.log(test);

  return <>h1</>;
}
