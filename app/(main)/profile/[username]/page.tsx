import { type NextPage } from 'next';

import { findUserProfile } from '@/db/cached-query';

const Page: NextPage<{ params: { username: string } }> = async ({ params: { username } }) => {
  const userProfile = await findUserProfile(username);

  return <section className="flex grow flex-col justify-center"></section>;
};
export default Page;
