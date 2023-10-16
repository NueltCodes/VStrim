import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import { ErrorMessage, Layout, LoadingMessage } from "~/component/Component";
import { type NextPage } from "next/types";
import { PlaylistPage } from "~/component/PlaylistComponent";

const Playlist: NextPage = () => {
  const router = useRouter();
  const { playlistId } = router.query;

  const { data, isLoading, error } = api.playList.getPlaylistById.useQuery(
    playlistId as string,
  );
  console.log("Error:", error);
  console.log("Data:", data);

  const errorTypes = !data || error;

  const Error = () => {
    if (isLoading) {
      return <LoadingMessage />;
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    } else if (error || !data) {
      console.error("Error fetching playlist:", error); // Log the error

      return (
        <ErrorMessage icon="GreenPlay" message="No Playlists avaliable." />
      );
    } else {
      return <></>;
    }
  };

  // const playlist = data?.playlist;

  return (
    <>
      <Layout>
        {errorTypes ? (
          <Error />
        ) : (
          <PlaylistPage
            playlist={{
              id: data?.playlist?.id || "",
              title: data?.playlist?.title || "",
              description: data?.playlist?.description ?? "",
              videoCount: data?.videos.length || 0,
              playlistThumbnail: data?.videos[0]?.thumbnailUrl ?? "",
              createdAt: data?.playlist?.createdAt || new Date(),
            }}
            videos={data?.videos.map((video) => ({
              id: video?.id ?? "",
              title: video?.title ?? "",
              thumbnailUrl: video?.thumbnailUrl ?? "",
              createdAt: video?.createdAt ?? new Date(),
              views: video?.views || 0,
            }))}
            authors={data?.authors.map((author) => ({
              id: author?.id ?? "",
              name: author?.name ?? "",
              image: author?.image ?? "",
            }))}
            user={{
              id: data?.user?.id ?? "",
              image: data?.user?.image ?? "",
              name: data?.user?.name ?? "",
              followers: data?.user?.followers || 0,
            }}
          />
        )}
      </Layout>
    </>
  );
};

export default Playlist;
