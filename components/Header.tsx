'use client';
import React from 'react';
import { cn, getInitials } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
//AvatarImage is not used in this component, but it is imported for future use
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Session } from 'next-auth';

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/books"
            className={cn(
              'cursor-pointer text-base capitalize',
              pathname === '/books' ? 'text-light-200' : 'text-light-100'
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || 'IN')}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
