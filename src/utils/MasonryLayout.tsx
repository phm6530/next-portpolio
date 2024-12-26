import React, { ReactNode } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// The number of columns change by resizing the window
export default function MasonryLayout({ children }: { children: ReactNode }) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}>
      <Masonry gutter="20px">{children}</Masonry>
    </ResponsiveMasonry>
  );
}
