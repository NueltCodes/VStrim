import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Thumbnail } from "./Component";
import { BiDotsVerticalRounded } from "react-icons/Bi";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSession } from "next-auth/react";

interface VideoComponentProps {
  videos: {
    id: string;
    title: string;
    thumbnailUrl: string;
    createdAt: Date;
    views: number;
  }[];
  users: {
    image: string;
    name: string;
  }[];
  refetch?: () => Promise<unknown>;
}

export const MuliColumnVideo: React.FC<VideoComponentProps> = ({
  videos,
  users,
}) => (
  <div className=" mx-auto grid grid-cols-1 gap-x-4 gap-y-8 md:mx-0 md:max-w-none md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:max-w-none xl:grid-cols-3 2xl:mx-0 2xl:max-w-none 2xl:grid-cols-3  ">
    {videos.map((video, index) => {
      const user = users[index];
      if (!user) {
        return null;
      }
      return (
        <Link
          href={`/video/${video.id}`}
          className="flex flex-col items-start justify-between hover:bg-gray-100"
          key={video.id}
        >
          <div className="relative w-full">
            <Thumbnail thumbnailUrl={video.thumbnailUrl} />
            <div className="max-w-xl">
              <div className="relative mt-4 flex items-start gap-x-4 ">
                <div>
                  <UserImage image={user.image || ""} />
                </div>
                <div className="w-full">
                  <VideoTitle title={video.title} limitHeight={true} />
                  <VideoInfo views={video.views} createdAt={video.createdAt} />
                  <UserName name={user.name || ""} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    })}
  </div>
);

export const SingleColumnVideo: React.FC<VideoComponentProps> = ({
  videos,
  users,
}) => (
  <div>
    {videos.map((video, index) => {
      const user = users[index];
      if (!user) {
        return null;
      }
      return (
        <Link href={`/video/${video.id}`} key={video.id}>
          <div className="my-5 flex flex-col gap-4 hover:bg-gray-100 lg:flex-row">
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:w-64 lg:shrink-0">
              <Thumbnail thumbnailUrl={video.thumbnailUrl} />
            </div>
            <div>
              <VideoTitle title={video.title} />
              <VideoInfo views={video.views} createdAt={video.createdAt} />

              <div className="relative mt-2 flex flex-row items-center gap-x-4">
                <UserImage image={user.image || ""} />
                <UserName name={user.name || ""} />
              </div>
            </div>
          </div>
        </Link>
      );
    })}
  </div>
);

interface NavigationItem {
  icon: (className: string) => JSX.Element;
  name: string;
  path: string;
  lineAbove: boolean;
}

const signedInNavigation: NavigationItem[] = [
  {
    icon: (className) => <BiUserCircle className={className} />,
    name: "View Profile",
    path: `/${String(userId)}/ProfileVideos`,
    lineAbove: true,
  },
  {
    icon: (className) => <MdSlowMotionVideo className={className} />,
    name: "Creator Studio",
    path: "/Dashboard",
    lineAbove: false,
  },
  {
    icon: (className) => <BiHelpCircle className={className} />,
    name: "Help",
    path: "/Blog/Help",
    lineAbove: true,
  },
  {
    icon: (className) => <AiOutlineSetting className={className} />,
    name: "Settings",
    path: "/Settings",
    lineAbove: false,
  },
];

export const SmallSingleColumnVideo: React.FC<VideoComponentProps> = ({
  videos,
  users,
  refetch,
}) => (
  <>
    {videos.map((video, index) => {
      const user = users[index];
      if (!user) {
        return null;
      }

      const { data: sessionData } = useSession();
      const userId = sessionData?.user.id;

      return (
        <div key={video.id}>
          <Link href={`/video/${video.id}`} key={video.id} onClick={refetch}>
            <div className=" relative isolate my-4 flex flex-col gap-4 rounded-2xl border hover:bg-gray-100 lg:flex-row ">
              <div className=" aspect-[16/9] sm:aspect-[2/1] lg:w-52  lg:shrink-0">
                <Thumbnail thumbnailUrl={video.thumbnailUrl} />
              </div>
              <div className="mt-2 flex w-full flex-col items-start overflow-hidden text-xs  max-lg:mx-2">
                <VideoTitle
                  title={video.title}
                  limitHeight={true}
                  limitSize={true}
                />
                <VideoInfo views={video.views} createdAt={video.createdAt} />
                <UserName name={user.name || ""} />
              </div>
              <div>
                <BiDotsVerticalRounded className="mt-1 h-5 w-5" />
              </div>

              <div className="m-0 hidden w-max px-0 lg:flex lg:items-center lg:justify-end xl:col-span-2">
                <Menu as="div" className="relative ml-5 flex-shrink-0">
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {Navigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              onClick={(e) => {
                                e.preventDefault();
                                if (item.path === "sign-out") {
                                  void signOut();
                                } else {
                                  void router.push(item.path || "/");
                                }
                              }}
                              href={item.path || "/"}
                              className={classNames(
                                active ? "bg-gray-100 " : "",
                                "block px-4 py-2 text-sm text-gray-700",
                                item.lineAbove
                                  ? "border-t border-gray-200"
                                  : "",
                              )}
                            >
                              <div className="flex items-center ">
                                {item.icon("h-4 w-4 stroke-gray-700")}
                                <div className="pl-2">{item.name}</div>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                {/*Sign up login buttons*/}
                {sessionData ? (
                  ""
                ) : (
                  <div className="flex flex-row space-x-3 ">
                    <Button
                      variant="tertiary-gray"
                      size="md"
                      onClick={!sessionData ? () => void signIn() : () => ""}
                    >
                      Log in
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={!sessionData ? () => void signIn() : () => ""}
                    >
                      Sign up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      );
    })}
  </>
);

export function VideoTitle({
  title,
  limitHeight,
  limitSize,
}: {
  title: string;
  limitHeight?: boolean;
  limitSize?: boolean;
}) {
  return (
    <h1
      className={`max-w-md font-semibold leading-6 text-gray-900 group-hover:text-gray-600 ${
        limitSize ? "text-base" : "text-lg"
      } ${limitHeight ? "max-h-12 w-full overflow-hidden" : ""}`}
    >
      {title}
    </h1>
  );
}

export function VideoDescription({ description }: { description: string }) {
  return (
    <p className="mt-2 h-5 max-w-md overflow-hidden text-sm leading-6 text-gray-600">
      {description}
    </p>
  );
}
export function VideoInfo({
  views,
  createdAt,
}: {
  createdAt: Date | string;
  views: number;
}) {
  return (
    <div className="mt-1 flex max-h-6 items-start overflow-hidden text-sm">
      <p className=" text-gray-600">
        {views}
        <span> Views</span>
      </p>
      <li className="pl-2 text-sm text-gray-500"></li>
      <p className=" text-gray-600">{moment(createdAt).fromNow()}</p>
    </div>
  );
}

export function UserImage({
  image,
  className = "",
}: {
  image: string;
  className?: string;
}) {
  return (
    <div className={`relative h-[36px] w-[36px]  ${className}`}>
      <Image
        src={image || "/profile.jpg"}
        alt=""
        className="h-[36px] w-[36px] rounded-full object-cover"
        fill
      />
    </div>
  );
}
export function UserName({ name }: { name: string }) {
  return (
    <p className="max-h-6 overflow-hidden text-sm font-semibold leading-6 text-gray-900">
      {name}
    </p>
  );
}
