'use client';

import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaGlobe, FaDownload, FaArrowRight, FaBriefcase, FaCode, FaBrain, FaTools, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFlask, FaEnvelopeOpenText } from 'react-icons/fa';
import { useEffect, useState } from 'react';

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
`;

const Badge = styled(motion.div)`
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  opacity: 0.7;
  margin-bottom: 8px;
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 12px 0;
  line-height: 1.08;
  letter-spacing: -2px;
`;

const Divider = styled.div`
  width: 48px;
  height: 2px;
  background: #222;
  margin: 18px 0 18px 0;
`;

const ContactBlock = styled(motion.div)`
  color: #e0e0e0;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 8px;
  a { color: #fff; text-decoration: none; border-bottom: 1px solid #222; transition: border 0.2s; }
  a:hover { border-bottom: 1px solid #fff; }
`;

const Socials = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 10px;
`;

const SocialIcon = styled(motion.a)`
  color: #fff;
  font-size: 1.7rem;
  opacity: 0.7;
  border: 1.5px solid #222;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s, border 0.2s, background 0.2s;
  &:hover {
    opacity: 1;
    border: 1.5px solid #fff;
    background: #111;
  }
`;

const ResumeBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #000;
  color: #fff;
  border: 1.5px solid #fff;
  border-radius: 10px;
  padding: 12px 28px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 18px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  text-decoration: none;
  &:hover {
    background: #fff;
    color: #000;
    border: 1.5px solid #fff;
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
  transition: border 0.2s, transform 0.2s;
  cursor: pointer;

  &:hover {
    border: 1px solid #fff;
    transform: translateY(-4px);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const ProjectDescription = styled.p`
  color: #999;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const Role = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #999;
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
    background: #333;
    border-color: #fff;
    transform: translateY(-2px);
  }
`;

const ContactCardSection = styled(Section)`
  background: #000;
  padding: 80px 0;
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
`;

const ContactLeft = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px 48px;
  @media (max-width: 600px) {
    padding: 36px 18px;
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

const ContactSection = styled(Section)`
  background: #000;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-top: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #fff;
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: #fff;
  opacity: 0.8;
`;

const ContactText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContactLabel = styled.span`
  font-size: 0.9rem;
  color: #999;
`;

const ContactValue = styled.span`
  font-size: 1.1rem;
  color: #fff;
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #999;
`;

const Input = styled.input`
  background: #111;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 12px 16px;
  color: #fff;
  font-size: 1rem;
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: #fff;
  }
`;

const TextArea = styled.textarea`
  background: #111;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 12px 16px;
  color: #fff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: #fff;
  }
`;

const SubmitButton = styled(motion.button)`
  background: #000;
  color: #fff;
  border: 1.5px solid #fff;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-start;

  &:hover {
    background: #fff;
    color: #000;
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

export default function Home() {
  // Animated badge loop
  const badgeTitles = [
    'Generative AI Engineer',
    'Full Stack Developer',
    'Mobile App Developer',
  ];
  const [badgeIdx, setBadgeIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeIdx((prev) => (prev + 1) % badgeTitles.length);
    }, 2200);
    return () => clearInterval(interval);
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
            Harshavardhan Reddy Arimanda ✌️
          </Name>
          <Divider />
          <ContactBlock
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          >
            Delray Beach, FL<br />
            <a href="mailto:arimandaharsha@outlook.com">arimandaharsha@outlook.com</a> &nbsp;|&nbsp; +1 561 875 2402<br />
            {/* <a href="https://arimandaharsha.me" target="_blank" rel="noopener noreferrer">arimandaharsha.me</a><br /> */}
            <a href="https://linkedin.com/in/arimanda-harsha" target="_blank" rel="noopener noreferrer">linkedin.com/in/arimanda-harsha</a> &nbsp;|&nbsp; <a href="https://github.com/arimandaharsha" target="_blank" rel="noopener noreferrer">github.com/arimandaharsha</a>
          </ContactBlock>
          <StatusWrap>
            <GreenDot />
            <StatusText>Available for work</StatusText>
          </StatusWrap>
          <ResumeBtn
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaDownload /> Download Resume
          </ResumeBtn>
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
            Latest Work
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
              <ProjectTitle>AI-Powered Portfolio Generator</ProjectTitle>
              <ProjectDescription>
                A generative AI system that creates personalized portfolio websites based on user input and preferences.
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
              <ProjectTitle>Neural Style Transfer</ProjectTitle>
              <ProjectDescription>
                Deep learning model that applies artistic styles to images using convolutional neural networks.
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
              <ProjectTitle>Text-to-Image Generation</ProjectTitle>
              <ProjectDescription>
                Advanced AI system that generates high-quality images from textual descriptions using diffusion models.
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
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ProjectTitle>Voice Cloning System</ProjectTitle>
              <ProjectDescription>
                Real-time voice synthesis and cloning system using deep learning and neural vocoders.
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
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <ProjectTitle>3D Scene Generation</ProjectTitle>
              <ProjectDescription>
                AI-powered system that generates detailed 3D scenes from text descriptions using neural rendering.
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
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ProjectTitle>Code Generation Assistant</ProjectTitle>
              <ProjectDescription>
                Advanced code generation and completion system using transformer-based language models.
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
            Work Experience
          </SectionTitle>
          
          <ExperienceGrid>
            <ExperienceCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ExperienceHeader>
                <CompanyName>Google</CompanyName>
                <Role>Senior AI Engineer</Role>
                <Duration>2022 - Present</Duration>
              </ExperienceHeader>
              <ExperienceContent>
                <Description>
                  Leading the development of next-generation AI models for natural language processing and computer vision. 
                  Spearheading research in transformer architectures and implementing scalable ML solutions.
                </Description>
                <TechStack>
                  <TechTag>Python</TechTag>
                  <TechTag>TensorFlow</TechTag>
                  <TechTag>PyTorch</TechTag>
                  <TechTag>BERT</TechTag>
                  <TechTag>GPT</TechTag>
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
                <CompanyName>OpenAI</CompanyName>
                <Role>AI Research Engineer</Role>
                <Duration>2020 - 2022</Duration>
              </ExperienceHeader>
              <ExperienceContent>
                <Description>
                  Contributed to the development of large language models and generative AI systems. 
                  Implemented novel training methodologies and optimization techniques for transformer-based architectures.
                </Description>
                <TechStack>
                  <TechTag>Python</TechTag>
                  <TechTag>PyTorch</TechTag>
                  <TechTag>CUDA</TechTag>
                  <TechTag>Transformers</TechTag>
                  <TechTag>Docker</TechTag>
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
                <CompanyName>DeepMind</CompanyName>
                <Role>Machine Learning Engineer</Role>
                <Duration>2018 - 2020</Duration>
              </ExperienceHeader>
              <ExperienceContent>
                <Description>
                  Developed reinforcement learning algorithms for complex decision-making systems. 
                  Implemented and optimized deep learning models for various applications in robotics and game playing.
                </Description>
                <TechStack>
                  <TechTag>Python</TechTag>
                  <TechTag>TensorFlow</TechTag>
                  <TechTag>RL</TechTag>
                  <TechTag>C++</TechTag>
                  <TechTag>Kubernetes</TechTag>
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
            Skills & Technologies
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

      <ResearchSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Research Work
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
            <ContactHeading>Let's Work Together?</ContactHeading>
            <ContactSub>
            You're just one step away from your next great teammate. I'm open to work and eager to get started!
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
              <ShortcutChip>S</ShortcutChip>
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