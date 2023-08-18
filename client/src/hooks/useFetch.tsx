// Import Third-party Modules
import { useState, useEffect } from "react";

// Import User-Defined Modules
import { IUseFetchHookTypes } from "../types/hooks/useFetch.types";

// Defining a variable for Giphy API KEY
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

/**
 * This is a custom hook which is used to
 * search for gif's based on the search keyword.
 * @param {IUseFetchHookTypes} param0 Gifs searching keyword.
 * @returns {string} Keyword specific search url for gif's.
 */
const useFetch = ({ keyword }: IUseFetchHookTypes): string => {
  const [gifUrl, setGifUrl] = useState<string>("");

  const fetchGifs = async () => {
    try {
      const fetchResponse = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}
          &limit=1`
      );
      const { data } = await fetchResponse.json();
      setGifUrl(data[0]?.images?.downsized_medium?.url);
    } catch (_error) {
      setGifUrl(
        "https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif"
      );
    }
  };

  useEffect(() => {
    keyword && fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;
