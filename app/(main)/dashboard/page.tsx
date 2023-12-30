import { type NextPage } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRightIcon, TrashIcon } from '@radix-ui/react-icons';

import { CreateWorkspaceForm } from '@/components/dashboard/create-workspace-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { findUserWorkspaces } from '@/db/cached-query';
import { workspace } from '@/db/schema/public';
import { getPageSession } from '@/lib/auth/session';

const Page: NextPage = async () => {
  const session = await getPageSession();
  if (!session) {
    return redirect('/login');
  }

  const { user } = session;
  const workspaces = await findUserWorkspaces(user.userId);

  return (
    <div className="container flex max-w-lg flex-col gap-4">
      {workspaces.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Create a workspace</CardTitle>
            <CardDescription>You don&apos;t have any workspaces yet create one!</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateWorkspaceForm
              onSubmit={async (value) => {
                'use server';
                const [{ workspaceId }] = await db
                  .insert(workspace)
                  .values({ ...value, owner: user.userId })
                  .returning({ workspaceId: workspace.id });
                return redirect(`/dashboard/${workspaceId}`);
              }}
            />
          </CardContent>
        </Card>
      ) : (
        workspaces.map((item) => (
          <Card key={item.id}>
            <div className="flex items-center justify-between p-4">
              <CardTitle className="grow">
                <span>{item.icon}</span> {item.name}
              </CardTitle>
              <div className="flex items-center">
                <Button size="icon" variant="ghost">
                  <TrashIcon />
                </Button>
                <Button size="icon" variant="ghost" asChild>
                  <Link href={`/dashboard/${item.id}`}>
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default Page;
