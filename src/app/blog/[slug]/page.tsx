'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import { BlogPost } from '@/types/blog';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelopeOpenText } from 'react-icons/fa';

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
  display: flex;
  align-items: center;
  gap: 12px;
  color: #bbb;
  font-size: 1rem;
  margin-bottom: 32px;
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

const GlowingCard = styled.div`
  width: 100%;
  min-height: 320px;
  max-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  margin-bottom: 32px;
  background: radial-gradient(circle at 20% 20%, #191970 0%, #6c2bff 100%);
  box-shadow: 0 4px 32px 0 #6c2bff33, 0 1.5px 16px 0 #6c2bff22;
  color: #fff;
  font-size: 2.7rem;
  font-weight: 800;
  text-align: center;
  letter-spacing: 0.02em;
  position: relative;
  overflow: hidden;
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

const ContactCardSection = styled.section`
  padding: 80px 0;
  @media (max-width: 700px) {
    padding: 36px 0;
  }
`;

const ContactCard = styled(motion.div)`
  background: #111;
  border: 1.5px solid #222;
  border-radius: 28px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 2px 32px 0 rgba(0,0,0,0.10);
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
  @media (max-width: 700px) {
    border-radius: 18px;
  }
`;

const ContactLeft = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px 48px;
  @media (max-width: 900px) {
    padding: 48px 32px;
  }
  @media (max-width: 700px) {
    padding: 28px 14px;
  }
`;

const ContactHand = styled.div`
  font-size: 2.2rem;
  margin-bottom: 18px;
`;

const ContactHeading = styled.h2`
  font-size: 2.6rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 18px 0;
  line-height: 1.15;
`;

const ContactSub = styled.p`
  color: #bbb;
  font-size: 1.25rem;
  margin: 0 0 36px 0;
  line-height: 1.6;
`;

const ContactActions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
`;

const ContactBtn = styled(motion.a)`
  background: #111;
  color: #fff;
  border: 1.5px solid #fff;
  border-radius: 14px;
  padding: 16px 36px;
  font-size: 1.15rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border 0.2s;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: #000;
  }
`;

const OrPress = styled.span`
  color: #bbb;
  font-size: 1.1rem;
  margin-left: 8px;
  @media (max-width: 700px) {
    display: none;
  }
`;

const ShortcutChip = styled.span`
  background: #222;
  color: #fff;
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-left: 8px;
  border: 1.5px solid #333;
  letter-spacing: 1px;
  @media (max-width: 700px) {
    display: none;
  }
`;

const ContactRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;
  min-height: 320px;
  @media (max-width: 900px) {
    min-height: 180px;
    padding: 32px 0;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const BigIcon = styled(FaEnvelopeOpenText)`
  font-size: 13vw;
  min-font-size: 180px;
  color: #fff;
  opacity: 0.85;
  transform: rotate(-18deg);
  filter: drop-shadow(0 2px 16px #000);
  @media (max-width: 900px) {
    font-size: 32vw;
  }
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
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0 0 18px 0', color: '#fff' }}
      >
        {post.title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <Meta>
          <AuthorAvatar src="/harsha-image.jpeg" alt="Harsha Arimanda" />
          <AuthorName>{post.author}</AuthorName>
          {new Date(post.created_at).toLocaleDateString()}
        </Meta>
      </motion.div>
      {post.cover_image && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <GlowingCard>{post.cover_image}</GlowingCard>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      >
        <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      </motion.div>
      <ContactCardSection>
        <ContactCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ContactLeft>
            <ContactHand>👋</ContactHand>
            <ContactHeading>Let&apos;s Work Together?</ContactHeading>
            <ContactSub>
              You&apos;re just one step away from your next great teammate. I&apos;m open to work and eager to get started!
            </ContactSub>
            <ContactActions>
              <ContactBtn
                href="mailto:arimandaharsha@outlook.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </ContactBtn>
              <OrPress>Or Press</OrPress>
              <ShortcutChip>C</ShortcutChip>
            </ContactActions>
          </ContactLeft>
        </ContactCard>
      </ContactCardSection>
    </PostWrap>
  );
} 