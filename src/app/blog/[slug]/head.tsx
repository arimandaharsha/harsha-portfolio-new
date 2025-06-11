import { supabase } from '@/utils/supabaseClient';
import { BlogPost } from '@/types/blog';

export default async function Head({ params }: { params: { slug: string } }) {
  const { data } = await supabase.from('blogs').select('*').eq('slug', params.slug).single();
  const post = data as BlogPost | null;
  if (!post) {
    return (
      <>
        <title>Blog Post Not Found | Harshavardhan Reddy Arimanda</title>
        <meta name="robots" content="noindex" />
      </>
    );
  }
  return (
    <>
      <title>{post.meta_title || post.title}</title>
      <meta name="description" content={post.meta_description || post.excerpt} />
      <meta name="keywords" content={post.meta_keywords || ''} />
      <meta property="og:title" content={post.meta_title || post.title} />
      <meta property="og:description" content={post.meta_description || post.excerpt} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://arimandaharsha.me/blog/${post.slug}`} />
      {post.cover_image && <meta property="og:image" content={post.cover_image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.meta_title || post.title} />
      <meta name="twitter:description" content={post.meta_description || post.excerpt} />
      {post.cover_image && <meta name="twitter:image" content={post.cover_image} />}
      <link rel="canonical" href={`https://arimandaharsha.me/blog/${post.slug}`} />
    </>
  );
} 