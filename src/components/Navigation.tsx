import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  mix-blend-mode: difference;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(motion.a)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: white;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export default function Navigation() {
  return (
    <Nav>
      <Logo
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Harsha
      </Logo>
      <NavLinks>
        <NavLink
          href="#work"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Work
        </NavLink>
        <NavLink
          href="#resume"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Resume
        </NavLink>
        <NavLink
          href="#contact"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Contact
        </NavLink>
      </NavLinks>
    </Nav>
  );
} 