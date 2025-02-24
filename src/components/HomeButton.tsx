import React from 'react';
import { LucideMessageCirclePlus } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const HomeButton = () => {
  return (
    <Link href="/pages/home" passHref>
      <Button variant="ghost" size="icon">
        <LucideMessageCirclePlus></LucideMessageCirclePlus>
      </Button>
    </Link>
  );
};

export default HomeButton;
