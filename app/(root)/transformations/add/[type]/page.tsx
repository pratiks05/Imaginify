import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';



const AddTransformationTypePage = async ({ params }: SearchParamProps) => {
  const { type } = await params;
  const { userId } = await auth();
  const transformation = transformationTypes[type];

  if (!userId) redirect('/sign-in');

  let user = await getUserById(userId);

  // If user doesn't exist in database, create them from Clerk data
  if (!user) {
    const { clerkClient } = await import('@clerk/nextjs/server');
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    const { createUser } = await import('@/lib/actions/user.actions');
    user = await createUser({
      clerkId: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
      username: clerkUser.username || clerkUser.emailAddresses[0].emailAddress.split('@')[0],
      firstName: clerkUser.firstName || undefined,
      lastName: clerkUser.lastName || undefined,
      photo: clerkUser.imageUrl,
    });
  }
  return (
    <>
      <Header title={transformation.title}
        subtitle={transformation.subTitle} />

        <section className='mt-10'>
           <TransformationForm
            action="Add"
            userId={user._id}
            creditBalance={user.creditBalance}
            type={transformation.type as TransformationTypeKey} />
        </section>
     
    </>

  )
}

export default AddTransformationTypePage
