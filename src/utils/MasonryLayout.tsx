import LoadingWrapper from "@/components/shared/loading/loading-wrapper";
import React, { ReactNode } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// The number of columns change by resizing the window
export default function MasonryLayout({
  loading,
  pending,
  gutter = 20,
  children,
}: {
  loading?: boolean;
  pending?: boolean;
  gutter?: number;
  children: ReactNode;
}) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter={`${gutter}px`}>
        {children}

        {(loading || pending) && <LoadingWrapper />}
      </Masonry>
    </ResponsiveMasonry>
  );
}
