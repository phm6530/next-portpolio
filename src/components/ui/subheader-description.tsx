import { MessageSquareMore } from "lucide-react";
export default function SubheaderDescrition({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <div className="pt-[100px] flex flex-col gap-5">
        <h1>{title}</h1>
        {description && (
          <div className="dark:bg-[rgb(47,50,79)] bg-[#f1f3ff] p-3 w-full flex items-center my-2 rounded-lg text-sm mb:text-base">
            <div className="w-10 h-10  flex justify-center items-center">
              <MessageSquareMore className="w-5 h-5 fill-[#7557cf] text-zinc-300 dark:text-white" />
            </div>
            {description}
          </div>
        )}
      </div>
    </>
  );
}
