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
      slug,
      ...data,
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
 * 根据 slug 获取文章
 */
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);

  return {
    slug,
    ...data,
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