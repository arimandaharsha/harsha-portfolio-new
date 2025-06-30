'use client';

import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaBrain, FaCode, FaEnvelopeOpenText } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabaseClient';

// Add keyframes for blinking and scaling animation
const blink = keyframes`
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 12px 2px #00ff6a, 0 0 0 2px #1a2b1e;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    box-shadow: 0 0 24px 6px #00ff6a, 0 0 0 2px #1a2b1e;
    transform: scale(0.7);
  }
`;

// Add keyframes for animated flowing gradient
const gradientFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BG = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Satoshi', 'Inter', sans-serif;
`;

const HeroWrap = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 44px;
  padding: 0 32px;
  @media (max-width: 600px) {
    padding: 0 16px;
    gap: 28px;
  }
`;

const Badge = styled(motion.div)`
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  opacity: 0.7;
  margin-bottom: 8px;
  @media (max-width: 600px) {
    font-size: 0.82rem;
    margin-bottom: 4px;
  }
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 12px 0;
  line-height: 1.08;
  letter-spacing: -2px;
  @media (max-width: 600px) {
    font-size: 2.1rem;
    margin-bottom: 8px;
  }
`;

const GradientName = styled.span`
  background: linear-gradient(90deg, #4f8cff, #a259ff, #ff6a88, #ff99ac);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  animation: ${gradientFlow} 7s ease-in-out infinite;
`;

const Divider = styled.div`
  width: 48px;
  height: 2px;
  background: #222;
  margin: 18px 0 18px 0;
  @media (max-width: 600px) {
    width: 32px;
    margin: 12px 0;
  }
`;

const ContactBlock = styled(motion.div)`
  color: #e0e0e0;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 8px;
  a { color: #fff; text-decoration: none; border-bottom: 1px solid #222; transition: border 0.2s; }
  a:hover { border-bottom: 1px solid #fff; }
  @media (max-width: 600px) {
    font-size: 0.98rem;
    line-height: 1.5;
  }
`;

const Section = styled.section`
  padding: 120px 0;
  background: #000;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 64px;
  letter-spacing: -1px;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 48px;
`;

const ProjectCard = styled(motion.a)`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 32px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1);
    background: linear-gradient(151deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 50%, rgba(0, 212, 255, 1) 100%);
    box-shadow: 0 0 32px 8px rgba(0, 212, 255, 0.4), 0 0 64px 16px rgba(9, 9, 121, 0.3), 0 0 96px 24px rgba(2, 0, 36, 0.2);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1);
    background: linear-gradient(90deg, #4f8cff, #a259ff, #ff6a88, #ff99ac);
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 0.1;
  }

  /* Ensure content is above the gradient/glow */
  > * {
    position: relative;
    z-index: 2;
  }

  &:hover {
    border-color: transparent;
    transform: scale(1.045);
    background: linear-gradient(151deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 50%, rgba(0, 212, 255, 1) 100%);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  transition: color 0.2s;
`;

const ProjectDescription = styled.p`
  color: #999;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  /* No transition for instant effect */
  ${ProjectCard}:hover & {
    color: #fff;
  }
`;

const ProjectLink = styled.div`
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

const ExperienceSection = styled(Section)`
  background: #000;
`;

const ExperienceGrid = styled.div`
  display: grid;
  gap: 48px;
  margin-top: 48px;
`;

const ExperienceCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
  padding: 32px;
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  transition: border 0.2s;

  &:hover {
    border: 1px solid #fff;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CompanyName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #999;
  margin: 0;
`;

const Role = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const Duration = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-top: 4px;
`;

const ExperienceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Description = styled.p`
  color: #999;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const TechTag = styled.span`
  background: #222;
  color: #fff;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const SkillsSection = styled(Section)`
  background: #000;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 48px;
`;

const SkillCategory = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: border 0.2s;

  &:hover {
    border: 1px solid #fff;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CategoryIcon = styled.div`
  font-size: 1.5rem;
  color: #fff;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const TechChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const TechChip = styled(motion.span)`
  background: #222;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #333;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(151deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 50%, rgba(0, 212, 255, 1) 100%);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 0 32px 8px rgba(0, 212, 255, 0.4), 0 0 64px 16px rgba(9, 9, 121, 0.3), 0 0 96px 24px rgba(2, 0, 36, 0.2);
  }
`;

const ContactCardSection = styled(Section)`
  background: #000;
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

const ResearchSection = styled(Section)`
  background: #000;
`;

const ResearchCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 40px;
  margin-top: 48px;
  transition: border 0.2s;

  &:hover {
    border: 1px solid #fff;
  }
`;

const ResearchTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 24px 0;
  line-height: 1.3;
`;

const ResearchDescription = styled.p`
  color: #999;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 32px 0;
`;

const ResearchPoints = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ResearchPoint = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #fff;
  font-size: 1.1rem;
  line-height: 1.5;

  &::before {
    content: "•";
    color: #fff;
    font-size: 1.5rem;
    line-height: 1;
  }
`;

// Add styled component for the green glowing dot and status
const StatusWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  @media (max-width: 600px) {
    gap: 8px;
    margin-top: 6px;
  }
`;

const GreenDot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #00ff6a;
  box-shadow: 0 0 12px 2px #00ff6a, 0 0 0 2px #1a2b1e;
  display: inline-block;
  animation: ${blink} 1.6s infinite cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, box-shadow, transform;
`;

const StatusText = styled.span`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

// Blog section styles
const BlogSection = styled(Section)`
  background: #000;
  padding: 80px 0 100px 0;
`;
const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-top: 48px;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const BlogCard = styled(motion(Link))`
  background: #111;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 32px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px;
    pointer-events: none;
    background: linear-gradient(90deg, #4f8cff, #a259ff, #ff6a88, #ff99ac);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1);
    z-index: 2;
  }

  &:hover {
    box-shadow: 0 4px 32px 0 rgba(79,140,255,0.10);
    transform: translateY(-4px);
  }
  &:hover::before {
    opacity: 1;
  }
`;
const BlogTitle = styled.h3`
  font-size: 1.2rem;
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
  gap: 10px;
  color: #888;
  font-size: 0.95rem;
  margin-top: auto;
`;
const AuthorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #222;
`;
const AuthorName = styled.span`
  color: #fff;
  font-weight: 600;
  font-size: 1.01rem;
`;
const BlogButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #191970;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 40px auto 0 auto;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 2px 16px 0 rgba(25,25,112,0.10);
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #6c2bff;
    color: #fff;
  }
`;

const GradientTitle = styled.span`
  background: linear-gradient(90deg, #4f8cff, #a259ff, #ff6a88, #ff99ac);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

// Add this type for homepage previews
type BlogPostPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  created_at: string;
};

export default function Home() {
  // Animated badge loop
  const badgeTitles = [
    'Generative AI Engineer',
    'Full Stack Developer',
  ];
  const [badgeIdx, setBadgeIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeIdx((prev) => (prev + 1) % badgeTitles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [badgeTitles.length]);

  // Blog posts state
  const [blogPosts, setBlogPosts] = useState<BlogPostPreview[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('blogs')
        .select('id, title, slug, excerpt, author, created_at')
        .order('created_at', { ascending: false })
        .limit(3);
      setBlogPosts(data || []);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <BG>
        <HeroWrap>
          <AnimatePresence mode="wait">
            <Badge
              key={badgeIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {badgeTitles[badgeIdx]}
            </Badge>
          </AnimatePresence>
          <Name
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          >
            <GradientName>Harshavardhan Reddy Arimanda</GradientName> ✌️
          </Name>
          <Divider />
          <ContactBlock
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          >
            Delray Beach, FL<br />
            <a href="mailto:arimandaharsha@outlook.com">arimandaharsha@outlook.com</a> &nbsp;<br />
            {/* <a href="https://arimandaharsha.me" target="_blank" rel="noopener noreferrer">arimandaharsha.me</a><br /> */}
            <a href="https://linkedin.com/in/arimanda-harsha" target="_blank" rel="noopener noreferrer">linkedin.com/in/arimanda-harsha</a> &nbsp;|&nbsp; <a href="https://github.com/arimandaharsha" target="_blank" rel="noopener noreferrer">github.com/arimandaharsha</a>
          </ContactBlock>
          <StatusWrap>
            <GreenDot />
            <StatusText>Available for work</StatusText>
          </StatusWrap>
        </HeroWrap>
      </BG>
      
      <Section>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GradientTitle>Latest Work</GradientTitle>
          </SectionTitle>
          
          <ProjectGrid>
            <ProjectCard
              href="https://github.com/arimandaharsha"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ProjectTitle>Automated Flutter App Builder</ProjectTitle>
              <ProjectDescription>
                Fully automated system that generates complete Flutter applications from natural language descriptions.
              </ProjectDescription>
              <ProjectLink>
                View Project <FaArrowRight />
              </ProjectLink>
            </ProjectCard>

            <ProjectCard
              href="https://github.com/arimandaharsha"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ProjectTitle>Professional Headshot Generator</ProjectTitle>
              <ProjectDescription>
                Generative AI system that creates personalized professional headshots by fine-tuning an image generation model.
              </ProjectDescription>
              <ProjectLink>
                View Project <FaArrowRight />
              </ProjectLink>
            </ProjectCard>

            <ProjectCard
              href="https://github.com/arimandaharsha"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ProjectTitle>Presentation Generator AI</ProjectTitle>
              <ProjectDescription>
                LLM powered generative AI system that generates presentations from text inputs.
              </ProjectDescription>
              <ProjectLink>
                View Project <FaArrowRight />
              </ProjectLink>
            </ProjectCard>
          </ProjectGrid>
        </Container>
      </Section>

      <ExperienceSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GradientTitle>Work Experience</GradientTitle>
          </SectionTitle>
          
          <ExperienceGrid>
            <ExperienceCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ExperienceHeader>
                <CompanyName>Self-employed</CompanyName>
                <Role>Generative AI Engineer</Role>
                <Duration>Jan 2023 - Jul 2023</Duration>
              </ExperienceHeader>
              <ExperienceContent>
                <Description>
                  Designed and deployed a secure Retrieval Augmented Generation (RAG) chatbot using LLAMA and LangChain to provide instant answers from internal documentation across departments. Integrated enterprise knowledge sources including Confluence, PDF SOPs, and Jira tickets with ChromaDB vector search for semantic retrieval. Reduced employee query resolution time by 60% and improved onboarding efficiency by automating access to tribal knowledge.
                </Description>
                <TechStack>
                  <TechTag>LLAMA</TechTag>
                  <TechTag>LangChain</TechTag>
                  <TechTag>RAG</TechTag>
                  <TechTag>ChromaDB</TechTag>
                  <TechTag>Vector Search</TechTag>
                  <TechTag>Confluence</TechTag>
                  <TechTag>Jira</TechTag>
                </TechStack>
              </ExperienceContent>
            </ExperienceCard>

            <ExperienceCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ExperienceHeader>
                <CompanyName>Self-employed</CompanyName>
                <Role>Generative AI Engineer</Role>
                <Duration>Jan 2023 - Jul 2023</Duration>
              </ExperienceHeader>
              <ExperienceContent>
                <Description>
                  Built a GenAI content generation engine that creates brand-aligned social media posts, ad copy, and product descriptions using prompt templates and OpenAI&apos;s GPT-4 API. Integrated Canva API and brand style libraries to ensure consistent tone and visuals across marketing channels. Accelerated content production by 400%, allowing marketing teams to launch campaigns faster while maintaining brand consistency.
                </Description>
                <TechStack>
                  <TechTag>OpenAI GPT-4</TechTag>
                  <TechTag>Prompt Engineering</TechTag>
                  <TechTag>Canva API</TechTag>
                  <TechTag>Brand Alignment</TechTag>
                  <TechTag>Content Generation</TechTag>
                  <TechTag>Social Media</TechTag>
                  <TechTag>Marketing Automation</TechTag>
                </TechStack>
              </ExperienceContent>
            </ExperienceCard>

            <ExperienceCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ExperienceHeader>
                <CompanyName>Self-employed</CompanyName>
                <Role>Full Stack Developer</Role>
                <Duration>Mar 2020 - Jan 2023</Duration>
              </ExperienceHeader>
              <ExperienceContent>
                <Description>
                  Designed and developed a full stack appointment scheduling system with real-time slot management, allowing users to book, modify, and cancel appointments via a user-friendly React frontend. Implemented back-end APIs using FastAPI with PostgreSQL for time-slot validation, user authentication, and conflict resolution. Built an admin dashboard with role-based access and automated email notifications using SendGrid API. Optimized performance to handle 10k+ appointments/month with minimal latency.
                </Description>
                <TechStack>
                  <TechTag>React</TechTag>
                  <TechTag>FastAPI</TechTag>
                  <TechTag>PostgreSQL</TechTag>
                  <TechTag>FullCalendar</TechTag>
                  <TechTag>SendGrid API</TechTag>
                  <TechTag>Authentication</TechTag>
                </TechStack>
              </ExperienceContent>
            </ExperienceCard>
          </ExperienceGrid>
        </Container>
      </ExperienceSection>

      <SkillsSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GradientTitle>Skills & Technologies</GradientTitle>
          </SectionTitle>
          
          <SkillsGrid>
            <SkillCategory
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <CategoryHeader>
                <CategoryIcon><FaBrain /></CategoryIcon>
                <CategoryTitle>Core Skills</CategoryTitle>
              </CategoryHeader>
              <TechChips>
                <TechChip>Generative AI</TechChip>
                <TechChip>Prompt Engineering</TechChip>
                <TechChip>AI Red-Teaming</TechChip>
                <TechChip>AI Security</TechChip>
                <TechChip>Full-Stack Development</TechChip>
                <TechChip>Machine Learning</TechChip>
                <TechChip>RAG</TechChip>
                <TechChip>LLM Model Finetuning</TechChip>
                <TechChip>Deep Learning</TechChip>
                <TechChip>Data Analysis</TechChip>
                <TechChip>Agentic AI</TechChip>
              </TechChips>
            </SkillCategory>

            <SkillCategory
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CategoryHeader>
                <CategoryIcon><FaCode /></CategoryIcon>
                <CategoryTitle>Technologies</CategoryTitle>
              </CategoryHeader>
              <TechChips>
                <TechChip>LangChain</TechChip>
                <TechChip>LlamaIndex</TechChip>
                <TechChip>Ollama</TechChip>
                <TechChip>Hugging Face</TechChip>
                <TechChip>Vector Database</TechChip>
                <TechChip>SQL</TechChip>
                <TechChip>NoSQL</TechChip>
                <TechChip>TensorFlow</TechChip>
                <TechChip>LLM</TechChip>
                <TechChip>Python</TechChip>
                <TechChip>Java</TechChip>
                <TechChip>JavaScript</TechChip>
                <TechChip>ReactJs</TechChip>
                <TechChip>NodeJs</TechChip>
                <TechChip>REST API</TechChip>
                <TechChip>Git</TechChip>
              </TechChips>
            </SkillCategory>
          </SkillsGrid>
        </Container>
      </SkillsSection>

      {/* Blog Section */}
      <BlogSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GradientTitle>Latest Blog Posts</GradientTitle>
          </SectionTitle>
          <Divider />
          <BlogGrid>
            {blogPosts.map((post, i) => (
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
              </BlogCard>
            ))}
          </BlogGrid>
          <BlogButton href="/blog">
            View All Blog Posts <FaArrowRight />
          </BlogButton>
        </Container>
      </BlogSection>

      <ResearchSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GradientTitle>Research Work</GradientTitle>
          </SectionTitle>
          
          <ResearchCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <ResearchTitle>
              Leveraging Curiosity-Driven Red-Teaming with Reinforcement Learning to Improve LLM Safety
            </ResearchTitle>
            
            <ResearchDescription>
              A novel approach to enhancing Large Language Model safety through autonomous red-teaming and reinforcement learning techniques.
            </ResearchDescription>

            <ResearchPoints>
              <ResearchPoint
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Currently working on a research paper on using curiosity-driven reinforcement learning to enhance LLM safety.
              </ResearchPoint>

              <ResearchPoint
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Developing an autonomous red-teaming framework for detecting and mitigating harmful LLM outputs.
              </ResearchPoint>

              <ResearchPoint
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Exploring the use of reinforcement learning to autonomously generate adversarial inputs for LLMs.
              </ResearchPoint>
            </ResearchPoints>
          </ResearchCard>
        </Container>
      </ResearchSection>

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
          <ContactRight>
            <BigIcon />
          </ContactRight>
        </ContactCard>
      </ContactCardSection>
    </>
  );
}