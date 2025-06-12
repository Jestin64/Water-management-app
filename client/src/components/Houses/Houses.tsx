import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { House } from '../../types';
import HouseForm from './HouseForm';

const HousesContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const HouseList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const HouseCard = styled.div`
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

const StatusBadge = styled.span<{ status: string }>`
  background: ${({ theme, status }) => 
    status === 'active' ? theme.colors.success : theme.colors.warning};
  color: ${({ theme }) => theme.colors.white};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const Houses: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<House | undefined>();

  const fetchHouses = async () => {
    try {
      const data = await api.getHouses();
      setHouses(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch houses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleCreate = async (data: Omit<House, 'id'>) => {
    try {
      await api.createHouse(data);
      setShowForm(false);
      fetchHouses();
    } catch (err) {
      setError('Failed to create house');
      console.error(err);
    }
  };

  const handleUpdate = async (data: Omit<House, 'id'>) => {
    if (!selectedHouse) return;
    try {
      await api.updateHouse(selectedHouse.id, data);
      setShowForm(false);
      setSelectedHouse(undefined);
      fetchHouses();
    } catch (err) {
      setError('Failed to update house');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this house?')) return;
    try {
      await api.deleteHouse(id);
      fetchHouses();
    } catch (err) {
      setError('Failed to delete house');
      console.error(err);
    }
  };

  const handleEdit = (house: House) => {
    setSelectedHouse(house);
    setShowForm(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <HousesContainer>
      <Title>Houses</Title>
      <Button onClick={() => {
        setSelectedHouse(undefined);
        setShowForm(true);
      }}>
        Add New House
      </Button>

      {showForm && (
        <HouseForm
          initialData={selectedHouse}
          onSubmit={selectedHouse ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setSelectedHouse(undefined);
          }}
        />
      )}

      <HouseList>
        {houses.map((house) => (
          <HouseCard key={house.id}>
            <h3>
              {house.address}
              <StatusBadge status={house.status}>
                {house.status}
              </StatusBadge>
            </h3>
            <p>Owner: {house.ownerName}</p>
            <p>Contact: {house.contactNumber}</p>
            <p>Email: {house.email}</p>
            <div>
              <ActionButton onClick={() => handleEdit(house)}>
                Edit
              </ActionButton>
              <ActionButton 
                className="delete"
                onClick={() => handleDelete(house.id)}
              >
                Delete
              </ActionButton>
            </div>
          </HouseCard>
        ))}
      </HouseList>
    </HousesContainer>
  );
};

export default Houses; 