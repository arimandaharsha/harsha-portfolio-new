'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Section = styled.section`
  padding: 120px 0 80px 0;
  background: #000;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 64px;
  letter-spacing: -1px;
`;

const Divider = styled.div`
  width: 48px;
  height: 2px;
  background: #222;
  margin: 0 0 48px 0;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-top: 48px;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
`;

// Add keyframes for gradient animation
const borderGradientFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const BlogCard = styled(motion(Link))`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 32px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border 0.2s, transform 0.2s;
  cursor: pointer;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(90deg, #4f8cff, #a259ff, #ff6a88, #ff99ac);
    background-size: 200% 200%;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 2;
    pointer-events: none;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  &:hover {
    border: 1px solid transparent;
    transform: translateY(-4px);
  }
  &:hover::after {
    opacity: 1;
    animation: ${borderGradientFlow} 2.5s linear infinite;
  }
`;

const BlogTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const BlogExcerpt = styled.p`
  color: #999;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #888;
  font-size: 0.95rem;
  margin-top: auto;
`;

const AuthorAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
  border: 2px solid #222;
`;

const AuthorName = styled.span`
  color: #fff;
  font-weight: 600;
  font-size: 1.05rem;
  margin-right: 10px;
`;

const BlogLink = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #222;
`;

const GradientTitle = styled.span`
  background: linear-gradient(90deg, #4f8cff, #a259ff, #ff6a88, #ff99ac);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

export const revalidate = 60;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, slug, excerpt, author, created_at')
        .order('created_at', { ascending: false })
        .range(0, 9); // Fetch 10 posts at a time
      if (error) setError(error.message);
      setPosts(data || []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <Section>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientTitle>Blog</GradientTitle>
        </SectionTitle>
        <Divider />
        {loading ? (
          <div style={{ color: '#bbb', textAlign: 'center', marginTop: 64, fontSize: 20 }}>Loading...</div>
        ) : error ? (
          <div style={{ color: '#ff5e62', textAlign: 'center', marginTop: 64, fontSize: 20 }}>{error}</div>
        ) : posts.length === 0 ? (
          <div style={{ color: '#fff', textAlign: 'center', marginTop: 64, fontSize: 20 }}>No blog posts found.</div>
        ) : (
          <BlogGrid>
            {posts.map((post, i) => (
              <BlogCard
                key={post.id}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * i }}
              >
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <BlogMeta>
                  <AuthorAvatar src="/harsha-image.jpeg" alt="Harsha Arimanda" />
                  <AuthorName>{post.author}</AuthorName>
                  {new Date(post.created_at).toLocaleDateString()}
                </BlogMeta>
                <BlogLink>
                  Read Post <FaArrowRight />
                </BlogLink>
              </BlogCard>
            ))}
          </BlogGrid>
        )}
      </Container>
    </Section>
  );
} 