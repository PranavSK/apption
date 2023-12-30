import { type NextPage } from 'next';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { getPageSession } from '@/lib/auth/session';

const Page: NextPage<{ params: { username: string } }> = async ({ params: { username } }) => {
  const session = await getPageSession();
  if (!session) {
    return redirect('/login');
  }

  const { user } = session;
  const userProfile = await db.query.profile.findFirst({
    where({ id }, { eq }) {
      return eq(id, user.userId);
    },
  });

  if (!userProfile || userProfile.username !== username) {
    return redirect('/404');
  }

  return <div>Profile</div>;
};

export default Page;
