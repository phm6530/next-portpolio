import { VerifiedIcon } from "lucide-react";

export default function AuthComplete({
  complateText,
}: {
  complateText: string;
}) {
  return (
    <div
      className="text-indigo-400  flex gap-3 items-center text-base
    "
    >
      <VerifiedIcon />
      {complateText}
    </div>
  );
}
