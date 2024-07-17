import { getUserInfo } from '@/lib/queries/users';
import { toTitleCase } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export async function ProfileCard() {
  const userInfo = await getUserInfo();
  return (
    <Card className='w-full max-w-lg'>
      <CardContent className='grid gap-6 p-8'>
        <div className='flex items-center gap-4'>
          <Avatar className='h-20 w-20'>
            {userInfo?.image ? <AvatarImage src={userInfo?.image} /> : null}
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className='grid gap-1'>
            <h3 className='text-3xl font-bold'>
              {toTitleCase(userInfo?.name ?? '')}
            </h3>
            <p className='text-sm text-muted-foreground'>{userInfo?.email}</p>
          </div>
        </div>
        {userInfo?.accounts && userInfo.accounts.length > 0 ? (
          <div className='grid gap-4'>
            <h3 className='text-lg font-semibold'>Connected Accounts</h3>
            {userInfo.accounts.map((account) => {
              return (
                <div
                  className='grid gap-2 bg-muted rounded-md p-4'
                  key={account.providerAccountId}
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex-1'>
                      <h4 className='font-medium'>
                        {toTitleCase(account.provider)}
                      </h4>
                    </div>
                    <Button
                      variant='destructive'
                      size='sm'
                      disabled={userInfo.accounts.length < 2}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
