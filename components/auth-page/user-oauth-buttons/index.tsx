'use client';

import { type FC } from 'react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

interface UserOAuthButtonsProps {
  onGitHubClick: () => void;
}
export const UserOAuthButtons: FC<UserOAuthButtonsProps> = ({ onGitHubClick }) => {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" onClick={() => onGitHubClick()}>
        <GitHubLogoIcon className="mr-2 h-4 w-4" />
        Github
      </Button>
    </div>
  );
};
