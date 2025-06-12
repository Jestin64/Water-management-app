import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { WaterUsage, WaterMeter } from '../../types';
import WaterUsageForm from './WaterUsageForm';

const UsageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const UsageList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const UsageCard = styled.div`
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

const FilterContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const DateInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const StatusBadge = styled.span<{ status: string }>`
  background: ${({ theme, status }) => {
    switch (status) {
      case 'paid':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      case 'overdue':
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

const WaterUsageList: React.FC = () => {
  const [usage, setUsage] = useState<WaterUsage[]>([]);
  const [meters, setMeters] = useState<WaterMeter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUsage, setSelectedUsage] = useState<WaterUsage | undefined>();
  const [selectedMeter, setSelectedMeter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const fetchData = async () => {
    try {
      const [metersData, usageData] = await Promise.all([
        api.getWaterMeters(),
        api.getWaterUsage()
      ]);
      setMeters(metersData);
      setUsage(usageData);
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

  const handleCreate = async (data: Omit<WaterUsage, 'id'>) => {
    try {
      await api.createWaterUsage(data);
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError('Failed to create water usage record');
      console.error(err);
    }
  };

  const handleUpdate = async (data: Omit<WaterUsage, 'id'>) => {
    if (!selectedUsage) return;
    try {
      await api.updateWaterUsage(selectedUsage.id, data);
      setShowForm(false);
      setSelectedUsage(undefined);
      fetchData();
    } catch (err) {
      setError('Failed to update water usage record');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this water usage record?')) return;
    try {
      await api.deleteWaterUsage(id);
      fetchData();
    } catch (err) {
      setError('Failed to delete water usage record');
      console.error(err);
    }
  };

  const handleEdit = (usage: WaterUsage) => {
    setSelectedUsage(usage);
    setShowForm(true);
  };

  const handleFilter = async () => {
    try {
      let data;
      if (selectedMeter) {
        data = await api.getWaterUsageByMeter(selectedMeter);
      } else if (startDate && endDate) {
        data = await api.getWaterUsageByDateRange(startDate, endDate);
      } else {
        data = await api.getWaterUsage();
      }
      setUsage(data);
    } catch (err) {
      setError('Failed to filter water usage records');
      console.error(err);
    }
  };

  const getMeterInfo = (meterId: string) => {
    const meter = meters.find(m => m.id === meterId);
    return meter ? `Meter #${meter.meterNumber} - ${meter.location}` : 'Unknown Meter';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <UsageContainer>
      <Title>Water Usage</Title>
      <Button onClick={() => {
        setSelectedUsage(undefined);
        setShowForm(true);
      }}>
        Add New Reading
      </Button>

      {showForm && (
        <WaterUsageForm
          initialData={selectedUsage}
          onSubmit={selectedUsage ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setSelectedUsage(undefined);
          }}
          meters={meters}
        />
      )}

      <FilterContainer>
        <Select
          value={selectedMeter}
          onChange={(e) => setSelectedMeter(e.target.value)}
        >
          <option value="">All Meters</option>
          {meters.map(meter => (
            <option key={meter.id} value={meter.id}>
              Meter #{meter.meterNumber} - {meter.location}
            </option>
          ))}
        </Select>
        <DateInput
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <DateInput
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <Button onClick={handleFilter}>Filter</Button>
      </FilterContainer>

      <UsageList>
        {usage.map((record) => (
          <UsageCard key={record.id}>
            <h3>
              Reading #{record.id}
              <StatusBadge status={record.status}>
                {record.status}
              </StatusBadge>
            </h3>
            <p>Meter: {getMeterInfo(record.meterId)}</p>
            <p>Reading: {record.reading} liters</p>
            <p>Date: {record.readingDate}</p>
            <p>Consumption: {record.consumption} liters</p>
            <p>Bill Amount: ${record.billAmount.toFixed(2)}</p>
            <div>
              <ActionButton onClick={() => handleEdit(record)}>
                Edit
              </ActionButton>
              <ActionButton 
                className="delete"
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </ActionButton>
            </div>
          </UsageCard>
        ))}
      </UsageList>
    </UsageContainer>
  );
};

export default WaterUsageList; 