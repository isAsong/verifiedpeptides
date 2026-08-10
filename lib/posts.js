import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 文章目录
const postsDirectory = path.join(process.cwd(), 'content/blog');

/**
 * 获取所有文章
 */
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    return {
      ...data,
      // slug 始终以文件名为准，避免与 frontmatter 中的 slug 不一致导致链接 404
      slug,
      content,
    };
  });

  return allPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  );
}

/**
 * 根据 slug 获取文章（支持文件名 slug 与 frontmatter 中的 slug）
 */
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  let fileContents = null;
  // 规范 slug 始终以文件名为准（用于 301 规范化，避免重复内容）
  let canonicalSlug = slug;

  if (fs.existsSync(fullPath)) {
    // 1. 文件名即 slug
    fileContents = fs.readFileSync(fullPath, 'utf8');
    canonicalSlug = slug;
  } else {
    // 2. 兼容 frontmatter 中的 slug（文件名与 frontmatter slug 不一致的情况）
    const fileNames = fs.readdirSync(postsDirectory);
    for (const fileName of fileNames) {
      if (!fileName.endsWith('.md')) continue;
      const candidateContents = fs.readFileSync(
        path.join(postsDirectory, fileName),
        'utf8'
      );
      const { data } = matter(candidateContents);
      if (data.slug === slug) {
        fileContents = candidateContents;
        canonicalSlug = fileName.replace(/\.md$/, '');
        break;
      }
    }
    if (fileContents === null) {
      return null;
    }
  }

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);

  return {
    ...data,
    slug: canonicalSlug,
    content: processedContent.toString(),
  };
}

/**
 * 获取所有分类
 */
export function getAllCategories() {
  const posts = getAllPosts();

  return [
    ...new Set(
      posts
        .map((post) => post.category)
        .filter(Boolean)
    ),
  ];
}

/**
 * 根据分类获取文章
 */
export function getPostsByCategory(category) {
  const posts = getAllPosts();

  if (!category) {
    return posts;
  }

  return posts.filter((post) => post.category === category);
}