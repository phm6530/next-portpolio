"use client";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchDetailResult } from "@/app/_services/client/templateResult";
import LoadingSpier from "@/app/_components/ui/loading/LoadingSpiner";

export default function SurveyResult({ id }: { id: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["default", id],
    queryFn: () => fetchDetailResult(id),
    staleTime: 10000,
  });

  if (isLoading) {
    return <LoadingSpier />;
  }

  if (isError) {
    notFound();
  }

  if (data) {
    console.log(data);
    return <>11</>;
  }
}
