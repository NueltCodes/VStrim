import { type NextPage } from "next";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import {
  ErrorMessage,
  Layout,
  LoadingMessage,
  ProfileHeader,
  UserImage,
} from "~/component/Component";
import { FollowButton } from "~/component/button/Buttons";
import { useSession } from "next-auth/react";
const ProfileFollowigs: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: sessionData } = useSession();

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = api.user.getUserFollowings.useQuery({
    id: userId as string,
    viewerId: sessionData?.user.id,
  });
  const errorTypes =
    !user?.followings ?? error ?? user?.followings?.length === 0;

  const Error = () => {
    if (isLoading) {
      return <LoadingMessage />;
    } else if (userId == sessionData?.user.id && errorTypes) {
      return (
        <ErrorMessage
          icon="GreenHorn"
          message="No following"
          description="You are yet to follow anyone. Follow at choice!"
        />
      );
    } else if (errorTypes) {
      return (
        <ErrorMessage
          icon="GreenPeople"
          message="No people followed"
          description="This page has yet to follow a new person. "
        />
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      <Layout>
        <>
          <ProfileHeader />
          {errorTypes ? (
            <div>
              <Error />
            </div>
          ) : (
            <ul role="list" className="-mt-8 divide-y divide-gray-200">
              {user?.followings.map((following) => (
                <li className="py-4" key={following.following.id}>
                  <div className="flex gap-2">
                    <UserImage
                      className="!h-10 !w-10 "
                      image={following.following?.image ?? ""}
                    />
                    <div className="flex w-full flex-row justify-between">
                      <div className="flex flex-col text-sm">
                        <p className="font-semibold text-gray-900">
                          {following.following.name}
                        </p>
                        <p className="text-gray-600">
                          {following.following?.handle}
                        </p>
                      </div>
                      <FollowButton
                        refetch={refetch}
                        followingId={following.following.id}
                        viewer={{ hasFollowed: following.viewerHasFollowed }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      </Layout>
    </>
  );
};

export default ProfileFollowigs;
