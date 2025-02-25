import LoadingWrapper from "@/components/shared/loading/loading-wrapper";
import React, { ReactNode, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function MasonryLayout({
  gutter = 20,
  children,
}: {
  loading?: boolean;
  pending?: boolean;
  gutter?: number;
  children: ReactNode;
}) {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter={`${gutter}px`}>
        {initialLoad ? <LoadingWrapper /> : children}
      </Masonry>
    </ResponsiveMasonry>
  );
}
