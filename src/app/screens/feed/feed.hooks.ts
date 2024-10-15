import { useDebouncedValue } from "@shopify/react-hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import ApiManager from "@/api";

const STALE_TIME = 1000 * 60 * 60 * 6;

const fetchFeed = async ({ pageParam = 1, search = "" }) => {
    console.log("fetchFeed", pageParam, search);
    return ApiManager.getFeed(
        pageParam,
        "en-us",
        search,
    );
};

export const useFeed = (search: string) => {
    const debouncedSearch = useDebouncedValue(search, {
        timeoutMs: 500,
    });

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["feed", "en-us", debouncedSearch],
        queryFn: ({ pageParam }) =>
            fetchFeed({
                pageParam,
                search: debouncedSearch.length >= 3 ? debouncedSearch : "",
            }),
        staleTime: STALE_TIME,
        initialPageParam: 1,
        getNextPageParam: (lastPage, _pages) => lastPage.nextPage,
    });

    const fetchMore = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage || isLoading) return;

        fetchNextPage();
    }, [isFetchingNextPage, hasNextPage, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        data,
        isLoading,
        fetchMore,
    };
};
