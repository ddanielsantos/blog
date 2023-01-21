import type { MarkdownInstance } from "astro";
import type { PostCardProps } from "@types";

export const sortPostByDate = (
  a: MarkdownInstance<PostCardProps>,
  b: MarkdownInstance<PostCardProps>
): number => {
  const firstDate = new Date(a.frontmatter.date);
  const secondDate = new Date(b.frontmatter.date);

  switch (true) {
    case firstDate > secondDate:
      return -1;
    case secondDate > firstDate:
      return 1;
    default:
      return 0;
  }
};
