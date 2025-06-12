import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WaterMeter } from '../../types';

const Form = styled.form`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: ${({ theme }) => theme.spacing.md} auto;
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

interface WaterMeterFormProps {
  initialData?: WaterMeter;
  onSubmit: (data: Omit<WaterMeter, 'id'>) => void;
  onCancel: () => void;
  houses: Array<{ id: string; address: string }>;
}

const WaterMeterForm: React.FC<WaterMeterFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  houses 
}) => {
  const [formData, setFormData] = useState<Omit<WaterMeter, 'id'>>({
    houseId: '',
    meterNumber: '',
    location: '',
    installationDate: new Date().toISOString().split('T')[0],
    lastReading: 0,
    lastReadingDate: new Date().toISOString().split('T')[0],
    status: 'active',
    threshold: 1000,
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'lastReading' || name === 'threshold' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="houseId">House</Label>
        <Select
          id="houseId"
          name="houseId"
          value={formData.houseId}
          onChange={handleChange}
          required
        >
          <option value="">Select a house</option>
          {houses.map(house => (
            <option key={house.id} value={house.id}>
              {house.address}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="meterNumber">Meter Number</Label>
        <Input
          type="text"
          id="meterNumber"
          name="meterNumber"
          value={formData.meterNumber}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="location">Location</Label>
        <Input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="installationDate">Installation Date</Label>
        <Input
          type="date"
          id="installationDate"
          name="installationDate"
          value={formData.installationDate}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="lastReading">Last Reading</Label>
        <Input
          type="number"
          id="lastReading"
          name="lastReading"
          value={formData.lastReading}
          onChange={handleChange}
          required
          min="0"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="lastReadingDate">Last Reading Date</Label>
        <Input
          type="date"
          id="lastReadingDate"
          name="lastReadingDate"
          value={formData.lastReadingDate}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="threshold">Threshold (liters)</Label>
        <Input
          type="number"
          id="threshold"
          name="threshold"
          value={formData.threshold}
          onChange={handleChange}
          required
          min="0"
        />
      </FormGroup>

      <Button type="submit">{initialData ? 'Update Meter' : 'Create Meter'}</Button>
      <Button type="button" onClick={onCancel} style={{ marginLeft: '10px', background: '#757575' }}>
        Cancel
      </Button>
    </Form>
  );
};

export default WaterMeterForm; 