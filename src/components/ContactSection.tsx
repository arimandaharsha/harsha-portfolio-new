import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const ContactButton = styled(motion.a)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const SocialLink = styled(motion.a)`
  color: #888;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

export default function ContactSection() {
  return (
    <Section id="contact">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Get in touch
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </Description>
        <ContactButton
          href="mailto:your.email@example.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Say Hello
        </ContactButton>
        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </SocialLink>
          <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </SocialLink>
          <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </SocialLink>
        </SocialLinks>
      </Container>
    </Section>
  );
} 