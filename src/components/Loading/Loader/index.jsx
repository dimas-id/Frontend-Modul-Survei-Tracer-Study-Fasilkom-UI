import React from "react";
import ContentLoader, { Facebook } from "react-content-loader";

export function LinesLoader(props) {
  return (
    <ContentLoader {...props}>
      <rect width="120" height="4" />
      <rect y="10" width="90" height="4" />
      <rect y="20" width="64" height="4" />
    </ContentLoader>
  );
}

export const ProfileLoader = Facebook;
