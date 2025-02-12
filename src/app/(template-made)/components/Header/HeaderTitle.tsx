import InfoSvg from "/public/asset/icon/info_8.svg";

export default function HeaderTitle({
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
          <div className=" bg-[#f1f3ff] p-3 w-full flex items-center my-2 rounded-lg">
            <div className="w-10 h-10  flex justify-center items-center">
              <InfoSvg className="w-5 h-5 fill-[#7557cf]" />
            </div>
            {description}
          </div>
        )}
      </div>
    </>
  );
}
