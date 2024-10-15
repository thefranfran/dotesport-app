import { type Feed, type Leagues, type Team } from "@/types";

import ApiMethods from "./api-methods";
import ENDPOINTS from "./endpoints";

type ApiResponse<T> = {
  data: T[];
};

type ApiResponsePaginated<T> = {
  data: T[];
  total: number;
  nextPage: number;
  lastPage: number;
  hasMore: boolean;
};

/**
 * The ApiManager class provides static methods to interact with the esports API.
 * It includes methods to fetch leagues and teams data.
 * @class ApiManager
 */
class ApiManager {
  /**
   * Fetches the list of leagues from the esports API.
   *
   * @returns {Promise<ApiResponse<LeaguesResponse>>} A promise that resolves to the response containing the leagues data.
   */
  static getLeagues = (): Promise<ApiResponse<Leagues>> => {
    const url = ENDPOINTS.ESPORTS.GET_LEAGUES();
    return ApiMethods.get(url) as Promise<ApiResponse<Leagues>>;
  };

  /**
   * Fetches the list of esports teams.
   *
   * @returns {Promise<ApiResponse<Team>>} A promise that resolves to the response containing the list of teams.
   */
  static getTeams = (): Promise<ApiResponse<Team>> => {
    const url = ENDPOINTS.ESPORTS.GET_TEAMS();
    return ApiMethods.get(url) as Promise<ApiResponse<Team>>;
  };

  /**
   * Fetches the feed data.
   *
   * @param {number} page - The page number of the feed data to fetch.
   * @param {string} locale - The locale user of the feed data to fetch.
   * @returns {Promise<ApiResponse<FeedResponse>>} A promise that resolves to the response containing the feed data.
   */
  static getFeed = (
    page: number,
    locale: string,
    search: string,
  ): Promise<ApiResponsePaginated<Feed>> => {
    const url = ENDPOINTS.FEED(page, locale, search);
    return ApiMethods.get(url) as Promise<ApiResponsePaginated<Feed>>;
  };
}

export default ApiManager;
