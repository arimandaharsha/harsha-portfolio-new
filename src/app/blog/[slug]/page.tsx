'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import { BlogPost } from '@/types/blog';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styled from 'styled-components';

const PostWrap = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 16px 96px 16px;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
  margin: 0 0 18px 0;
`;

const Meta = styled.div`
  color: #bbb;
  font-size: 1rem;
  margin-bottom: 32px;
`;

const CoverImage = styled.img`
  width: 100%;
  max-height: 340px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 32px;
  background: #18181c;
`;

const Content = styled.div`
  font-size: 1.15rem;
  line-height: 1.7;
  color: #e0e0e0;
  margin-top: 12px;
  word-break: break-word;
  & h2, & h3, & h4 { color: #fff; margin-top: 2.2em; }
  & a { color: #7fffa7; text-decoration: underline; }
  & pre, & code { background: #18181c; color: #fff; border-radius: 6px; padding: 2px 6px; }
`;

export default function BlogPostPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const { data } = await supabase.from('blogs').select('*').eq('slug', slug).single();
      setPost(data as BlogPost | null);
      setLoading(false);
    }
    if (slug) fetchPost();
  }, [slug]);

  if (loading) return <PostWrap>Loading...</PostWrap>;
  if (!post) return <PostWrap>Not found.</PostWrap>;

  return (
    <PostWrap>
      <Title>{post.title}</Title>
      <Meta>
        {new Date(post.created_at).toLocaleDateString()} &mdash; {post.author}
      </Meta>
      {post.cover_image && <CoverImage src={post.cover_image} alt={post.title} />}
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
    </PostWrap>
  );
} 