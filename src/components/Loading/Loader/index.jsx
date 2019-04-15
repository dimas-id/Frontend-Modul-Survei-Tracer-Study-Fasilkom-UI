import React from "react";
import ContentLoader, {
  Facebook,
  Instagram,
  BulletList,
  List
} from "react-content-loader";

export function LineLoader(props) {
  return (
    <ContentLoader {...props}>
      <rect width={props.width} height={props.height} />
    </ContentLoader>
  );
}

export function LinesLoader(props) {
  return (
    <ContentLoader {...props}>
      <rect width="120" height="4" />
      <rect y="10" width="90" height="4" />
      <rect y="20" width="64" height="4" />
    </ContentLoader>
  );
}

export function LinesLoaderEmailTemplate(props) {
  return (
    <ContentLoader {...props}>
      <rect width="120" height="4" />
      <rect y="10" width="90" height="4" />
    </ContentLoader>
  );
}
export const ProfileLoader = Facebook;
export const CardLoader = Instagram;

export const BulletListLoader = BulletList;
export const ListLoader = List;
export const List2Loader = props => (
  <div style={{ transform: 'rotate(180deg)'}}>
    <BulletList {...props} />
  </div>
);
