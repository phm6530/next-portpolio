import SubheaderDescrition from "@/components/ui/subheader-description";
import SelectTemplateList from "../components/SelectTemplateList";

export const dynamic = "force-dynamic";

export default function page() {
  return (
    <div>
      <SubheaderDescrition
        title={`만드실 템플릿을 선택해주세요`}
        description="현재 Survey 만 제공하고 있으며 개발 중 입니다."
      />

      <SelectTemplateList />
    </div>
  );
}
