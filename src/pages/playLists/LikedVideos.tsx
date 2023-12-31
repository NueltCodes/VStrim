import React from "react";
import { api } from "~/utils/api";
import { ErrorMessage, Layout, LoadingMessage } from "~/component/Component";
import { type NextPage } from "next/types";
import { useSession } from "next-auth/react";
import { PlaylistPage } from "~/component/PlaylistComponent";

const LikedVideos: NextPage = () => {
  const { data: sessionData } = useSession();
  const QueryTitle = "Liked Videos" as string;
  const { data, isLoading, error } = api.playList.getPlaylistsByTitle.useQuery({
    title: QueryTitle,
    userId: sessionData ? sessionData.user.id : ("none" as string),
  });

  const Error = () => {
    if (isLoading) {
      return <LoadingMessage />;
    } else if (error ?? !data) {
      return (
        <ErrorMessage
          icon="GreenPlay"
          message="No like videos"
          description="Go like some videos."
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
          {!data ? (
            <Error />
          ) : (
            <PlaylistPage
              playlist={{
                id: data.playlist?.id || "",
                title: data.playlist?.title || "",
                description: data.playlist?.description ?? "",
                videoCount: data.videos.length || 0,
                playlistThumbnail: data.videos[0]?.thumbnailUrl ?? "",
                createdAt: data.playlist?.createdAt || new Date(),
              }}
              videos={data.videos.map((video) => ({
                id: video?.id ?? "",
                title: video?.title ?? "",
                thumbnailUrl: video?.thumbnailUrl ?? "",
                createdAt: video?.createdAt ?? new Date(),
                views: video?.views || 0,
              }))}
              authors={data.authors.map((author) => ({
                id: author?.id ?? "",
                name: author?.name ?? "",
                image: author?.image ?? "",
              }))}
              user={{
                id: data.user?.id ?? "",
                image: data.user?.image ?? "",
                name: data.user?.name ?? "",
                followers: data.user?.followers || 0,
              }}
            />
          )}
        </>
      </Layout>
    </>
  );
};

export default LikedVideos;
