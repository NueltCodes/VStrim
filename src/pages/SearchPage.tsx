import { useRouter } from "next/router";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Head from "next/head";
import {
  SingleColumnVideo,
  Layout,
  LoadingMessage,
  ErrorMessage,
} from "../component/Component";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const searchQuery = router.query.q;
  const { data, isLoading, error } = api.video.getVideosBySearch.useQuery(
    searchQuery as string,
  );

  const Error = () => {
    if (isLoading) {
      return <LoadingMessage />;
    } else if (error || !data) {
      return (
        <ErrorMessage
          icon="GreenPlay"
          message="No Videos"
          description="Sorry try another search result ."
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Head>
        <title>{searchQuery?.toString()}</title>
        <meta name="description" content="Video streaming app by Vstrim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <>
          {!data ? (
            <Error />
          ) : (
            <SingleColumnVideo
              videos={data.videos.map((video) => ({
                id: video?.id || "",
                title: video?.title || "",
                thumbnailUrl: video?.thumbnailUrl || "",
                createdAt: video?.createdAt || new Date(),
                views: video?.views || 0,
              }))}
              users={data.users.map((user) => ({
                name: user?.name || "",
                image: user?.image || "",
              }))}
            />
          )}
        </>
      </Layout>
    </>
  );
};

export default SearchPage;
