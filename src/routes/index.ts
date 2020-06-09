export const HomePath = '/';

export const UserPath = '/user';
export const UserEditPath = '/user/:id';
export const UserAddPath = '/user/new';
export const buildUserDetailPath = (id: unknown) => `/user/${id}`;
