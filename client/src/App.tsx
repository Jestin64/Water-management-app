import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Dashboard from './components/Dashboard/Dashboard';
import Houses from './components/Houses/Houses';
import WaterMeters from './components/WaterMeters/WaterMeters';
import WaterUsageList from './components/WaterUsage/WaterUsage';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  margin-right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContainer>
          {/* headers */}
          <Nav>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/houses">Houses</NavLink>
            <NavLink to="/meters">Water Meters</NavLink>
            <NavLink to="/usage">Water Usage</NavLink>
          </Nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/meters" element={<WaterMeters />} />
            <Route path="/usage" element={<WaterUsageList />} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
