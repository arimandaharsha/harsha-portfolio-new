'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

const PostWrap = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 16px 96px 16px;
  color: #fff;
  margin-top: 80px;
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

const AuthorName = styled(Link)`
  color: #fff;
  font-weight: 600;
  font-size: 1.05rem;
  margin-right: 10px;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: #6c2bff;
  }
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
  
  & h2, & h3, & h4 { 
    color: #fff; 
    margin-top: 2.2em; 
  }
  
  & a { 
    color: #6c2bff; 
    text-decoration: underline; 
  }
  
  & p code {
    background: #18181c;
    color: #fff;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.9em;
    border: 1px solid #333;
  }
  
  & pre {
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 0;
    margin: 1.5em 0;
    overflow: hidden;
    position: relative;
    
    & code {
      display: block;
      padding: 16px 20px;
      overflow-x: auto;
      color: #e6edf3;
      background: transparent;
      border: none;
      border-radius: 0;
      font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', monospace;
      font-size: 0.9em;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-wrap: break-word;
      
      /* Custom scrollbar for code blocks */
      &::-webkit-scrollbar {
        height: 8px;
      }
      
      &::-webkit-scrollbar-track {
        background: #161b22;
        border-radius: 4px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: #30363d;
        border-radius: 4px;
      }
      
      &::-webkit-scrollbar-thumb:hover {
        background: #484f58;
      }
    }
  }
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

const StickyHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(0,0,0,0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border-bottom: 1px solid #222;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.10);
  margin-top: 0 !important;
  padding-top: 0 !important;
  @media (max-width: 600px) {
    height: 56px;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 600px) {
    padding: 0 6px;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

const HeaderSpacer = styled.div`
  width: 120px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const HeaderName = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  color: #fff;
  letter-spacing: -1px;
  user-select: none;
  & a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      color: #6c2bff;
    }
  }
  @media (max-width: 600px) {
    font-size: 1.35rem;
    margin-top: 0.5rem;
    text-align: left;
    flex: initial;
  }
`;

const ContactHeaderBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #111;
  color: #fff;
  border: 1.5px solid #222;
  border-radius: 999px;
  padding: 12px 28px;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  box-shadow: none;
  transition: background 0.18s, box-shadow 0.18s, border 0.18s, transform 0.18s;
  margin-left: 0;
  @media (max-width: 600px) {
    padding: 8px 16px;
    font-size: 0.95rem;
    margin-top: 0;
    position: static;
    transform: none;
    right: auto;
    top: auto;
  }
  &:hover {
    background: #191970;
    color: #fff;
    border: 1.5px solid #4f8cff;
    box-shadow: 0 4px 24px 0 rgba(79,140,255,0.18);
    @media (max-width: 600px) {
      transform: scale(1.06);
    }
  }
`;

export default function BlogPostPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const { data } = await supabase
        .from('blogs')
        .select('id, title, slug, excerpt, author, created_at, content, cover_image')
        .eq('slug', slug)
        .single();
      setPost(data as BlogPost | null);
      setLoading(false);
    }
    if (slug) fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post && contentRef.current) {
      // Handle external links
      const links = contentRef.current.querySelectorAll('a');
      links.forEach(link => {
        const href = link.getAttribute('href');
        // Check if it's an external link
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer'); // Important for security
        }
      });

      // Handle code blocks - add copy buttons
      const preElements = contentRef.current.querySelectorAll('pre');
      preElements.forEach((pre) => {
        // Skip if already processed
        if (pre.parentElement?.classList.contains('code-block-wrapper')) {
          return;
        }

        const code = pre.querySelector('code');
        if (code) {
          // Process the code content to handle escape sequences and line breaks
          const codeContent = code.innerHTML;
          
          // Convert HTML entities and escape sequences
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = codeContent;
          let processedContent = tempDiv.textContent || tempDiv.innerText || '';
          
          // Handle common escape sequences
          processedContent = processedContent
            .replace(/\\n/g, '\n')        // Convert \n to actual newlines
            .replace(/\\t/g, '\t')        // Convert \t to actual tabs
            .replace(/\\"/g, '"')         // Convert \" to "
            .replace(/\\'/g, "'")         // Convert \' to '
            .replace(/\\\\/g, '\\')       // Convert \\ to \
            .replace(/\\r/g, '\r');       // Convert \r to actual carriage returns
          
          // Update the code content
          code.textContent = processedContent;

          // Create wrapper
          const wrapper = document.createElement('div');
          wrapper.className = 'code-block-wrapper';
          wrapper.style.position = 'relative';
          wrapper.style.margin = '1.5em 0';

          // Create copy button
          const copyButton = document.createElement('button');
          copyButton.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            Copy
          `;
          copyButton.style.cssText = `
            position: absolute;
            top: 12px;
            right: 12px;
            background: #21262d;
            border: 1px solid #30363d;
            border-radius: 6px;
            padding: 8px 12px;
            color: #f0f6fc;
            font-size: 0.875rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
            z-index: 10;
            font-family: inherit;
          `;

          copyButton.addEventListener('mouseenter', () => {
            copyButton.style.background = '#30363d';
            copyButton.style.borderColor = '#484f58';
          });

          copyButton.addEventListener('mouseleave', () => {
            copyButton.style.background = '#21262d';
            copyButton.style.borderColor = '#30363d';
          });

          copyButton.addEventListener('click', async () => {
            const textToCopy = code.textContent || '';
            try {
              await navigator.clipboard.writeText(textToCopy);
              copyButton.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
                Copied!
              `;
              setTimeout(() => {
                copyButton.innerHTML = `
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Copy
                `;
              }, 2000);
            } catch (err) {
              console.error('Failed to copy text: ', err);
            }
          });

          // Wrap the pre element
          pre.parentNode?.insertBefore(wrapper, pre);
          wrapper.appendChild(pre);
          wrapper.appendChild(copyButton);
        }
      });
    }
  }, [post]);

  if (loading) return <PostWrap>Loading...</PostWrap>;
  if (!post) return <PostWrap>Not found.</PostWrap>;

  return (
    <PostWrap>
      <StickyHeader>
        <HeaderContent>
          <HeaderSpacer />
          <HeaderName>
            <Link href="/">Harsha Arimanda</Link>
          </HeaderName>
          <ContactHeaderBtn href="mailto:arimandaharsha@outlook.com">
            <FaEnvelope style={{ fontSize: '1.1em' }} /> Contact
          </ContactHeaderBtn>
        </HeaderContent>
      </StickyHeader>
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
          <AuthorName href="/">{post.author}</AuthorName>
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
        <Content ref={contentRef} dangerouslySetInnerHTML={{ __html: post.content }} />
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
            </ContactActions>
          </ContactLeft>
        </ContactCard>
      </ContactCardSection>
    </PostWrap>
  );
} 