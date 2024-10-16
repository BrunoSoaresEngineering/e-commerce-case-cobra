'use server';

import { db } from '@/db/client';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

async function logInUser() {
  const currentUser = await getKindeServerSession().getUser();

  if (!currentUser || !currentUser.id || !currentUser.email) {
    throw new Error('Invalid user data from authentication provider.');
  }

  const user = await db.user.findUnique({
    where: { id: currentUser.id },
  });

  if (!user) {
    await db.user.create({
      data: {
        id: currentUser.id,
        email: currentUser.email,
      },
    });
  }

  return { success: true };
}

export default logInUser;
