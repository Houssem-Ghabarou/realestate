import FlatList from "./FlatList";
import React, { useContext, useEffect } from "react";
import { SearchResultContext } from "../context/SearchContext";
import useProgressBar from "./useProgressBar";
import { Helmet } from "react-helmet";
import { homeMetadata } from "../data/metadata";

const Home = ({ setProgress }) => {
  useProgressBar(setProgress);
  const { isSearching, finishedSearch } = useContext(SearchResultContext);
  useEffect(() => {
    finishedSearch();
    return () => {
      finishedSearch();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{homeMetadata?.title}</title>
        <link rel="canonical" href={homeMetadata?.canonicalLink} />
      </Helmet>
      {isSearching ? (
        <FlatList type={6} />
      ) : (
        <>
          <FlatList type={0} />
          <FlatList type={3} />
          <FlatList type={4} />
        </>
      )}
    </React.Fragment>
  );
};

export default Home;
