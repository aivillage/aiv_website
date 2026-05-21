import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../data/site";
import { canonicalPostPath, excerptFromBody, sortPosts } from "../utils/site";

export async function GET() {
  const posts = sortPosts(await getCollection("blog", ({ data }) => !data.draft));

  return rss({
    title: site.title,
    description: site.description,
    site: site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? excerptFromBody(post.body ?? "", 30),
      link: canonicalPostPath(post),
    })),
  });
}
