import { Info } from "lucide-react";
export default function SubheaderDescrition({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <div className="pt-[100px] flex flex-col gap-5 ">
        <h1 className="text-2xl md:text-3xl whitespace-pre-line">{title}</h1>
        {description && (
          <div className="w-full bg-[#f5f7f8] dark:bg-[#1f2124] flex items-center rounded-lg text-sm mb:text-base ">
            <div className="w-10 h-10  flex justify-center items-center">
              <Info className="w-5 h-5 " />
            </div>
            {description}
          </div>
        )}
      </div>
    </>
  );
}
