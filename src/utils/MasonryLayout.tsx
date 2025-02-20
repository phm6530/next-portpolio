import { LoadingItem } from "@/components/loading/LoadingTextSkeleton";
import React, { ReactNode } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// The number of columns change by resizing the window
export default function MasonryLayout({
  loading,
  pending,
  children,
  cnt = 6,
}: {
  loading: boolean;
  pending: boolean;
  children: ReactNode;
  cnt?: number;
}) {
  const tempArr = Array.from({ length: cnt });

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="20px">
        {children}
        {(loading || pending) &&
          tempArr.map((_, idx) => {
            return <LoadingItem key={`${idx}-item`} />;
          })}
      </Masonry>
    </ResponsiveMasonry>
  );
}
