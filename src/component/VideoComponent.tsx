import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Thumbnail } from "./Component";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { GoTrash } from "react-icons/go";
import { AiOutlineSave } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { useState } from "react";
import SaveBtn from "./button/SaveBtn";
import { IoMdClose } from "react-icons/io";
import ShareBtn from "./button/ShareBtn";

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
  handleDelete?: (videoId: string) => void | undefined;
  ifHistory?: boolean;
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
    {videos?.map((video, index) => {
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

export const SmallSingleColumnVideo: React.FC<VideoComponentProps> = ({
  videos,
  users,
  refetch,
  handleDelete,
  ifHistory,
}) => {
  const [playList, setPlayList] = useState(false);
  const [ifShare, setIfShare] = useState(false);

  return (
    <>
      {videos.map((video, index) => {
        const user = users[index];
        if (!user) {
          return null;
        }

        return (
          <div key={video.id} className="relative">
            <Link href={`/video/${video.id}`} key={video.id} onClick={refetch}>
              <div className=" relative isolate my-4 flex flex-col gap-4 rounded-2xl border hover:bg-gray-100 lg:flex-row ">
                <div className=" aspect-[16/9] sm:aspect-[2/1] lg:w-52  lg:shrink-0">
                  <Thumbnail thumbnailUrl={video.thumbnailUrl} />
                </div>
                <div className="mt-2 flex w-full flex-col items-start overflow-hidden text-xs max-lg:mx-2 lg:mr-5">
                  <VideoTitle
                    title={video.title}
                    limitHeight={true}
                    limitSize={true}
                  />
                  <VideoInfo views={video.views} createdAt={video.createdAt} />
                  <UserName name={user.name || ""} />
                </div>
              </div>
            </Link>
            {playList && (
              <SaveBtn videoId={video.id} playList setPlayList={setPlayList} />
            )}

            {/* Sharing options to socials */}
            {ifShare && (
              <ShareBtn
                videoId={video.id}
                ifShare={ifShare}
                setIfShare={setIfShare}
              />
            )}

            <div
              className="absolute right-0 top-0 mx-1 mt-2"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    className=""
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    {/* Options */}
                    <BsThreeDotsVertical
                      className="ml-2 mr-0 h-6 w-6 rounded-lg bg-gray-700/70 text-violet-200 hover:text-violet-100 md:-mr-1 lg:bg-transparent"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => setIfShare(true)}
                          >
                            <PiShareFatLight
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                            Share
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setPlayList(true)}
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <AiOutlineSave
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                            Save playlist
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    {ifHistory && (
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleDelete?.(video?.id)}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <GoTrash
                                className="mr-2 h-5 w-5 text-violet-400"
                                aria-hidden="true"
                              />
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        );
      })}
    </>
  );
};

export function VideoTitle({
  title,
  limitHeight,
  limitSize,
}: {
  title: string | null;
  limitHeight?: boolean;
  limitSize?: boolean;
}) {
  return (
    <h1
      className={`line-clamp-1 max-w-md font-semibold leading-6 text-gray-900 group-hover:text-gray-600 sm:line-clamp-2 ${
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
    <div className="mt-1 flex max-h-6 items-start gap-2 overflow-hidden text-sm">
      <p className=" text-gray-600">
        {views}
        <span> Views</span>
      </p>
      <p className="text-gray-400">●</p>
      <div className="text-gray-600">
        {(() => {
          let timeAgo = moment(createdAt).fromNow();
          timeAgo = timeAgo.replace("months", "mons");
          timeAgo = timeAgo.replace("month", "mon");
          timeAgo = timeAgo.replace("years", "yrs");
          timeAgo = timeAgo.replace("year", "yr");
          return timeAgo;
        })()}
      </div>
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
