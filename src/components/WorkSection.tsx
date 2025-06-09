import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 4rem;
  text-align: center;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProjectImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #888;
  font-size: 1rem;
  line-height: 1.5;
`;

const projects = [
  {
    title: 'iOS App - Glide',
    description: 'Navigate the world of web technology',
    image: '/projects/glide.jpg'
  },
  {
    title: 'Web App - Vaultflow',
    description: 'Modern analytics for the modern world',
    image: '/projects/vaultflow.jpg'
  },
  {
    title: 'React Native App - Coinstar',
    description: 'Manage your finances with ease',
    image: '/projects/coinstar.jpg'
  },
  {
    title: 'iOS App - Bookshelf',
    description: 'A beautiful home for your books',
    image: '/projects/bookshelf.jpg'
  }
];

export default function WorkSection() {
  return (
    <Section id="work">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Selected Work
        </Title>
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <ProjectImage>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </ProjectImage>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </Section>
  );
} 