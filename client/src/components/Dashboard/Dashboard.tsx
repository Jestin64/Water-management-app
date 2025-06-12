import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { House, WaterMeter, WaterUsage } from '../../types';

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalHouses: 0,
    totalMeters: 0,
    totalUsage: 0,
    activeMeters: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [houses, meters, usage] = await Promise.all([
          api.getHouses(),
          api.getWaterMeters(),
          api.getWaterUsage(),
        ]);

        setStats({
          totalHouses: houses.length,
          totalMeters: meters.length,
          totalUsage: usage.length,
          activeMeters: meters.filter((m: WaterMeter) => m.status === 'active').length,
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      <StatsGrid>
        <StatCard>
          <StatLabel>Total Houses</StatLabel>
          <StatValue>{stats.totalHouses}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Meters</StatLabel>
          <StatValue>{stats.totalMeters}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Active Meters</StatLabel>
          <StatValue>{stats.activeMeters}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Usage Records</StatLabel>
          <StatValue>{stats.totalUsage}</StatValue>
        </StatCard>
      </StatsGrid>
    </DashboardContainer>
  );
};

export default Dashboard; 