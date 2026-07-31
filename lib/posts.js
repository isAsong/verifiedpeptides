import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 文章存放目录
const postsDirectory = path.join(process.cwd(), 'content/blog');

// 获取所有文章（用于列表页）
export function getAllPosts() {
    // 1. 读取目录下所有 .md 文件
    const fileNames = fs.readdirSync(postsDirectory);

    const allPosts = fileNames.map((fileName) => {
        // 文件名作为 slug（去掉 .md 后缀）
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // 2. 解析 frontmatter 和正文
        const { data, content } = matter(fileContents);

        // 返回文章数据（正文 content 留到详情页再解析，这里不转 HTML 以节省内存）
        return {
            slug,
            ...data,          // title, category, tags, publishedAt, author, image, excerpt 等
            content,          // 原始 Markdown 字符串
        };
    });

    // 3. 按发布时间倒序排列（最新的在前）
    return allPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

// 根据 slug 获取单篇文章（用于详情页）
export async function getPostBySlug(slug) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    console.log('🔍 Looking for:', fullPath);
    console.log('📁 File exists?', fs.existsSync(fullPath));
    // 检查文件是否存在，若不存在则返回 null（用于 404）
    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 4. 将 Markdown 编译为 HTML
    const processedContent = await remark()
        .use(html, { sanitize: false }) // sanitize: false 允许使用 HTML 标签
        .process(content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        ...data,
        content: contentHtml, // 返回编译好的 HTML
    };
}

// 获取所有分类（用于筛选下拉/按钮）
export function getAllCategories() {
    const posts = getAllPosts();
    const categories = posts.map((post) => post.category).filter(Boolean);
    return [...new Set(categories)]; // 去重
}

// 根据分类筛选文章
export function getPostsByCategory(category) {
    const posts = getAllPosts();
    if (!category) return posts;
    return posts.filter((post) => post.category === category);
}