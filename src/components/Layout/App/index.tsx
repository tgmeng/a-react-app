import styled from '@emotion/styled';

export const SideBar = styled('aside')`
  width: 150px;
  flex-shrink: 0;
`;

export const Main = styled('main')`
  flex-grow: 1;
  min-width: 0;
`;

export const Container = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
`;
