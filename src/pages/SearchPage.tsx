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
import { ChangeEvent, useEffect, useState } from "react";
import { type Videos } from "~/types";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const searchQuery = router.query.q; // Initialize searchQuery based on router query
  const { data, isLoading, error } = api.video.getRandomVideos.useQuery(100);

  const [searchData, setSearchData] = useState<Videos[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchInput(term);

    if (term.length > 0) {
      void (await router.push({
        pathname: "/SearchPage",
        query: { q: term },
      }));
    } else {
      void (await router.push({
        pathname: "/SearchPage",
        query: { q: "" }, // Reset query to empty string
      }));
    }

    const filteredVideos = data?.videos
      ? data.videos.filter(
          (video) => video?.title?.toLowerCase().includes(term.toLowerCase()),
        )
      : [];

    setSearchData(filteredVideos as Videos[]);
  };

  const NoData = () => {
    if (searchData.length === 0 && searchInput.length > 0) {
      return (
        <ErrorMessage
          icon="GreenPlay"
          message={`No results found for ${searchInput}`}
          description="Please make sure your words are spelled correctly, or use fewer or different keywords."
        />
      );
    } else {
      return <></>;
    }
  };

  const Error = () => {
    if (isLoading) {
      return <LoadingMessage />;
    } else if (error ?? !data) {
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
      <Layout searchInput={searchInput} handleChange={handleChange}>
        <>
          {/* social dilema netflix */}
          {!searchData.length && searchInput.length > 0 ? <NoData /> : ""}

          {!data ? (
            <Error />
          ) : (
            <SingleColumnVideo
              videos={searchData?.map((video) => ({
                id: video?.id || "",
                title: video?.title || "",
                thumbnailUrl: video?.thumbnailUrl || "",
                createdAt: video?.createdAt || new Date(),
                views: video?.views || 0,
              }))}
              users={data.users.map((user) => ({
                name: user?.name ?? "",
                image: user?.image ?? "",
              }))}
            />
          )}
        </>
      </Layout>
    </>
  );
};

export default SearchPage;
