// app/sitemap.js
import { products } from '@/lib/data/products';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap() {
    // 基础 URL（根据你的实际部署域名修改）
    const baseUrl = 'https://verifiedpeptides.vip';

    // 静态页面列表
    const staticPages = [
        '',
        '/products',
        '/blog',
        '/coas',
        '/about',
        '/contact',
        '/calculator',
    ].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: path === '' ? 1.0 : 0.8,
    }));

    // 产品详情页
    const productPages = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // 博客文章页
    const posts = getAllPosts();
    const blogPages = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt || Date.now()).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    // 合并所有页面
    return [...staticPages, ...productPages, ...blogPages];
}