import githubData from "./github.json";
import { GithubRepo, GithubStats } from "../types";

export const githubSection = {
  username: githubData.username,
  profileUrl: githubData.profileUrl,
  contributionsCount: githubData.contributionsCount,
  pinnedRepositories: githubData.pinnedRepositories as GithubRepo[],
  stats: githubData.stats as GithubStats
};
