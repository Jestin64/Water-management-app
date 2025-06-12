import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { WaterMeter, House } from '../../types';
import WaterMeterForm from './WaterMeterForm';

const MetersContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const MeterList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const MeterCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const ActionButton = styled.button`
  background: ${({ theme }) => theme.colors.info};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.small};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  &.delete {
    background: ${({ theme }) => theme.colors.error};
    &:hover {
      background: ${({ theme }) => theme.colors.error};
      opacity: 0.9;
    }
  }
`;

const ThresholdWarning = styled.span<{ exceeded: boolean }>`
  color: ${({ theme, exceeded }) => 
    exceeded ? theme.colors.error : theme.colors.success};
  font-weight: bold;
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const StatusBadge = styled.span<{ status: string }>`
  background: ${({ theme, status }) => {
    switch (status) {
      case 'active':
        return theme.colors.success;
      case 'inactive':
        return theme.colors.warning;
      case 'maintenance':
        return theme.colors.error;
      default:
        return theme.colors.info;
    }
  }};
  color: ${({ theme }) => theme.colors.white};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const WaterMeters: React.FC = () => {
  const [meters, setMeters] = useState<WaterMeter[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState<WaterMeter | undefined>();

  const fetchData = async () => {
    try {
      const [metersData, housesData] = await Promise.all([
        api.getWaterMeters(),
        api.getHouses()
      ]);
      setMeters(metersData);
      setHouses(housesData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (data: Omit<WaterMeter, 'id'>) => {
    try {
      await api.createWaterMeter(data);
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError('Failed to create water meter');
      console.error(err);
    }
  };

  const handleUpdate = async (data: Omit<WaterMeter, 'id'>) => {
    if (!selectedMeter) return;
    try {
      await api.updateWaterMeter(selectedMeter.id, data);
      setShowForm(false);
      setSelectedMeter(undefined);
      fetchData();
    } catch (err) {
      setError('Failed to update water meter');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this water meter?')) return;
    try {
      await api.deleteWaterMeter(id);
      fetchData();
    } catch (err) {
      setError('Failed to delete water meter');
      console.error(err);
    }
  };

  const handleEdit = (meter: WaterMeter) => {
    setSelectedMeter(meter);
    setShowForm(true);
  };

  const getHouseAddress = (houseId: string) => {
    const house = houses.find(h => h.id === houseId);
    return house ? house.address : 'Unknown House';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <MetersContainer>
      <Title>Water Meters</Title>
      <Button onClick={() => {
        setSelectedMeter(undefined);
        setShowForm(true);
      }}>
        Add New Meter
      </Button>

      {showForm && (
        <WaterMeterForm
          initialData={selectedMeter}
          onSubmit={selectedMeter ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setSelectedMeter(undefined);
          }}
          houses={houses}
        />
      )}

      <MeterList>
        {meters.map((meter) => (
          <MeterCard key={meter.id}>
            <h3>
              Meter #{meter.meterNumber}
              <StatusBadge status={meter.status}>
                {meter.status}
              </StatusBadge>
            </h3>
            <p>House: {getHouseAddress(meter.houseId)}</p>
            <p>Location: {meter.location}</p>
            <p>Installation Date: {meter.installationDate}</p>
            <p>Last Reading: {meter.lastReading} liters</p>
            <p>Last Reading Date: {meter.lastReadingDate}</p>
            <p>
              Threshold: {meter.threshold} liters
              <ThresholdWarning exceeded={meter.lastReading > meter.threshold}>
                {meter.lastReading > meter.threshold ? ' (Threshold Exceeded)' : ' (Normal)'}
              </ThresholdWarning>
            </p>
            <div>
              <ActionButton onClick={() => handleEdit(meter)}>
                Edit
              </ActionButton>
              <ActionButton 
                className="delete"
                onClick={() => handleDelete(meter.id)}
              >
                Delete
              </ActionButton>
            </div>
          </MeterCard>
        ))}
      </MeterList>
    </MetersContainer>
  );
};

export default WaterMeters; 