import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, FollowButton } from "./button/Buttons";
import { useSession } from "next-auth/react";
import { GrEdit } from "react-icons/gr";
import { ErrorMessage, LoadingMessage, UserImage } from "./Component";
import Head from "next/head";

export default function ProfileHeader() {
  const router = useRouter();
  const { userId } = router.query;
  const { data: sessionData } = useSession();

  if (userId == sessionData?.user.id) {
    console.log("This is your profile");
  }
  const tabs = [
    {
      name: "Videos",
      path: `/${String(userId)}/ProfileVideos`,
      current: router.pathname === `/[userId]/ProfileVideos`,
    },

    {
      name: "Playlists",
      path: `/${String(userId)}/ProfilePlaylist`,
      current: router.pathname === `/[userId]/ProfilePlaylist`,
    },
    {
      name: "Annoucements",
      path: `/${String(userId)}/ProfileAnnouncement`,
      current: router.pathname === `/[userId]/ProfileAnnouncement`,
    },
    {
      name: "Following",
      path: `/${String(userId)}/ProfileFollowing`,
      current: router.pathname === `/[userId]/ProfileFollowing`,
    },
  ];

  useEffect(() => {
    tabs.forEach((tab) => {
      tab.current = tab.path === router.pathname;
    });
  }, [router.pathname]);

  const { data, isLoading, refetch, error } = api.user.getChannelById.useQuery({
    id: userId as string,
    viewerId: sessionData?.user?.id,
  });

  const channel = data?.user;
  const viewer = data?.viewer;
  const errorTypes = !channel || !viewer || error;

  const Error = () => {
    if (isLoading) {
      return "";
    } else if (errorTypes) {
      return (
        <ErrorMessage
          icon="GreenPeople"
          message="Error loading Channel"
          description="Sorry there is a error loading channel at this time."
        />
      );
    } else {
      return <></>;
    }
  };
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Head>
        <title>{channel?.name ? channel.name + "Vstrim Channel" : ""}</title>
        <meta name="description" content={channel?.description ?? ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {errorTypes ? (
        <Error />
      ) : (
        <>
          <Image
            className="h-32 w-full object-cover lg:h-64"
            src={channel.backgroundImage ?? "/background.jpg"}
            width={2000}
            height={2000}
            alt="error"
          />
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="!-mt-6 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <UserImage
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  image={channel.image ?? ""}
                />
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm: mt-6 min-w-0 flex-1 md:block">
                  <h1 className="truncate text-2xl font-bold text-gray-900">
                    {channel.name}
                  </h1>
                  <p className="text-regular text-gray-600">{channel.handle}</p>
                  <div className="mt-1 flex items-start text-xs">
                    <p className="text-sm text-gray-600">
                      {channel.followers} Followers
                    </p>
                    <li className="pl-2 text-sm text-gray-500"></li>
                    <p className="text-sm text-gray-600">
                      {channel.followings} Following
                    </p>
                  </div>
                </div>
                <div className=" mt-6 flex justify-stretch space-y-3 sm:space-x-4 sm:space-y-0">
                  {userId == sessionData?.user.id ? (
                    <Button
                      variant="primary"
                      size="2xl"
                      href="/Settings"
                      className="!-5 ml-2 flex"
                    >
                      <GrEdit className="mr-2 h-5 w-5 shrink-0 stroke-white" />
                      Edit
                    </Button>
                  ) : (
                    <FollowButton
                      refetch={refetch}
                      followingId={userId as string}
                      viewer={{
                        hasFollowed: viewer.hasFollowed,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* BELOW ARE TABS    */}
          <div className="mb-8 mt-4 border-b border-gray-200">
            <nav
              className=" scrollbar-hide s colsmoo -mb-px flex
              w-full overflow-x-scroll  whitespace-nowrap"
              aria-label="Tabs"
            >
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.path}
                  onClick={(e) => {
                    e.preventDefault();
                    void router.push(tab.path);
                  }}
                  className={classNames(
                    tab.current
                      ? "border-primary-500 bg-primary-50 text-primary-600"
                      : "border-transparent text-gray-500 transition-all duration-300 ease-in-out hover:border-primary-400 hover:bg-primary-200/20 hover:text-gray-700",
                    "w-full place-content-evenly border-b-2 px-1 py-4 text-center text-sm font-medium ",
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
