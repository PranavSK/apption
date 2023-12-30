import { cache } from 'react';

import { db } from '..';

export const findUserProfile = cache((username: string) =>
  db.query.profile.findFirst({
    where(fields, { eq }) {
      return eq(fields.username, username);
    },
  }),
);

export const findUserWorkspaces = cache((owner: string) =>
  db.query.workspace.findMany({
    where(fields, { eq }) {
      return eq(fields.owner, owner);
    },
  }),
);
