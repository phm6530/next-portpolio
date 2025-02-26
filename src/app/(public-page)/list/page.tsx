import Grid from "@/components/ui/Grid";
import ListFilterControls from "./components/ListFilterControls";
import ListPageBanner from "./components/ListPageBanner";
import { default as loadDynamic } from "next/dynamic";

import SkeletonTemplateItemList from "@/components/shared/loading/skeleton-template-itemlist";

const TemplateList = loadDynamic(
  () => import("./components/TemplateItemList"),
  {
    ssr: false,
    loading: () => <SkeletonTemplateItemList />,
  }
);

export default async function page() {
  return (
    <div>
      {/* 페이지 Banner */}
      <ListPageBanner />

      <Grid.center>
        {/* 검색 or 정렬 */}
        <div className=" pt-[50px]  mb-8">
          <ListFilterControls />
        </div>

        {/**
         * vercel 서버리스 Cold Start 때문에 prefetch에서 Client로 변경함
         */}

        <TemplateList />
      </Grid.center>
    </div>
  );
}
