import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { api } from "~/utils/api";

import Link from "next/link";
import { type NextPage } from "next";
import {
  FollowButton,
  LikeDisLikeBtn,
  SaveBtn,
} from "~/component/button/Buttons";
import {
  Description,
  SmallSingleColumnVideo,
  Comment,
  Layout,
  ErrorMessage,
  LoadingMessage,
  VideoTitle,
  VideoInfo,
  UserImage,
  UserName,
} from "~/component/Component";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRef } from "react";
import { PiShareFatLight } from "react-icons/pi";
import ShareBtn from "~/component/button/ShareBtn";

const VideoPage: NextPage = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const { data: sessionData } = useSession();

  const {
    data: videoData,
    isLoading: videoLoading,
    error: videoError,
    refetch: refetchVideoData,
  } = api.video.getVideoById.useQuery(
    {
      id: videoId as string,
      viewerId: sessionData?.user?.id,
    },
    {
      enabled: !!videoId && !!sessionData?.user?.id, // run the query when videoId and sessionData?.user?.id are both defined
    },
  );

  const {
    data: sidebarVideos,
    isLoading: sidebarLoading,
    error: sidebarError,
    refetch: refetchSidebarVideos,
  } = api.video.getRandomVideos.useQuery(20, {
    enabled: false, // this query will not run automatically
  });
  const addViewMutation = api.videoEngagement.addViewCount.useMutation();
  const addView = (input: { id: string; userId: string }) => {
    addViewMutation.mutate(input);
  };

  const isViewAdded = useRef(false);

  useEffect(() => {
    if (videoId && !isViewAdded.current) {
      void refetchVideoData();
      addView({
        id: videoId as string,
        userId: sessionData ? sessionData.user.id : " ",
      });

      isViewAdded.current = true; // Set the flag to true once the view is added
    }
  }, [videoId]);

  useEffect(() => {
    if (!sidebarVideos) {
      void refetchSidebarVideos(); // manually refetch sidebarVideos if they do not exist
    }
  }, []);

  const video = videoData?.video;
  const user = videoData?.user;
  const comments = videoData?.comments;
  const viewer = videoData?.viewer;
  const errorTypes = !videoData || !user || !video || !comments || !viewer;
  const [ifShare, setIfShare] = useState(false);

  const DataError = () => {
    if (videoLoading) {
      return <LoadingMessage />;
    } else if (errorTypes) {
      return (
        <ErrorMessage
          icon="GreenPlay"
          message="No Video"
          description="Sorry there is an error with video ."
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Head>
        <title>{video?.title}</title>
        <meta name="description" content={user?.description ?? ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout closeSidebar={true}>
        <main className="mx-auto lg:flex">
          {errorTypes ? (
            <DataError />
          ) : (
            <>
              <div className="w-full sm:px-4 lg:w-3/5 ">
                <div className="py-4">
                  <ReactPlayer
                    controls={true}
                    style={{ borderRadius: "1rem", overflow: "hidden" }}
                    width={"100%"}
                    height={"50%"}
                    url={video.videoUrl ?? ""}
                  />
                </div>
                <div className="flex space-x-3 rounded-2xl border border-gray-200 p-4 shadow-sm">
                  <div className="min-w-0 flex-1 space-y-3 ">
                    <div className="xs:flex-wrap flex flex-row justify-between gap-4 max-md:flex-wrap">
                      <div className="flex flex-col items-start justify-center gap-1 self-stretch ">
                        <VideoTitle title={video.title} />
                        <VideoInfo
                          views={video.views}
                          createdAt={video.createdAt}
                        />
                      </div>
                      <div className="flex-inline flex items-end justify-start gap-4 self-start overflow-x-scroll scrollbar-hide">
                        <LikeDisLikeBtn
                          EngagementData={{
                            id: video.id,
                            likes: video.likes,
                            dislikes: video.dislikes,
                          }}
                          viewer={{
                            hasDisliked: viewer.hasDisliked,
                            hasLiked: viewer.hasLiked,
                          }}
                        />
                        <SaveBtn videoId={video.id} />
                        <ShareBtn
                          videoId={video.id}
                          ifShare={ifShare}
                          setIfShare={setIfShare}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col place-content-between  gap-x-4 sm:flex-row ">
                      <Link
                        href={`/${video.userId}/ProfileVideos`}
                        key={video.userId}
                      >
                        <div className="flex flex-row gap-2">
                          <UserImage image={user.image ?? ""} />
                          <button className="flex flex-col">
                            <UserName name={user.name ?? ""} />
                            <p className=" text-sm text-gray-600">
                              {user.followers}
                              <span> Followers</span>
                            </p>
                          </button>
                        </div>
                      </Link>
                      <FollowButton
                        followingId={user.id}
                        refetch={refetchVideoData}
                        viewer={{
                          hasFollowed: viewer.hasFollowed,
                        }}
                      />
                    </div>
                    <Description
                      text={video.description ?? ""}
                      length={200}
                      border={true}
                    />
                  </div>
                </div>

                <Comment
                  videoId={video.id}
                  comments={comments.map(({ user, comment }) => ({
                    comment: {
                      id: comment.id,
                      message: comment.message,
                      createdAt: comment.createdAt,
                    },
                    user: {
                      id: user.id,
                      name: user.name,
                      image: user.image,
                      handle: user.handle,
                    },
                  }))}
                  refetch={refetchVideoData}
                />
              </div>
            </>
          )}
          <div className="px-4 lg:w-2/5 lg:px-0   ">
            {!sidebarVideos ? (
              <DataError />
            ) : (
              <SmallSingleColumnVideo
                refetch={refetchSidebarVideos}
                videos={sidebarVideos.videos.map((video) => ({
                  id: video?.id ?? "",
                  title: video?.title ?? "",
                  thumbnailUrl: video?.thumbnailUrl ?? "",
                  createdAt: video?.createdAt ?? new Date(),
                  views: video?.views ?? 0,
                }))}
                users={sidebarVideos.users.map((user) => ({
                  name: user?.name ?? "",
                  image: user?.image ?? "",
                }))}
              />
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default VideoPage;
