import { ButtonHTMLAttributes } from "react";

export default function SvginButton({
  Svg,
  alt,
  ...rest
}: {
  Svg: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  alt: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <button
        type="button"
        {...rest}
        className={`flex items-center justify-center [&>svg]:hover:fill-[#647487]`}
      >
        <Svg className="w-5 h-5 fill-[#a7b9cd]">
          <desc>{alt}</desc>
        </Svg>
      </button>
    </>
  );
}
