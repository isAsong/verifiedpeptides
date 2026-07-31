// app/api/search/route.js
import { products } from '@/lib/data/products';
import { getAllPosts } from '@/lib/posts';
import { coasList } from '@/lib/data/coas';

export async function GET() {
  const searchData = [];

  // 1. 产品
  products.forEach((p) => {
    searchData.push({
      id: `product-${p.id}`,
      title: p.name,
      url: `/products/${p.slug}`,
      type: 'Product',
      excerpt: p.description?.slice(0, 120) || '',
      category: p.category || '',
    });
  });

  // 2. 文章
  const posts = getAllPosts();
  posts.forEach((p) => {
    searchData.push({
      id: `post-${p.slug}`,
      title: p.title,
      url: `/blog/${p.slug}`,
      type: 'Article',
      excerpt: p.excerpt?.slice(0, 120) || '',
      category: p.category || '',
    });
  });

  // 3. COAS
  if (coasList && coasList.length > 0) {
    coasList.forEach((c) => {
      searchData.push({
        id: `coa-${c.id}`,
        title: `COA: ${c.productName}`,
        url: `/coas`,
        type: 'COA',
        excerpt: `Batch: ${c.batchNumber} | Purity: ${c.purity}`,
        category: '',
      });
    });
  }

  return Response.json(searchData);
}