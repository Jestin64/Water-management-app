import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WaterUsage, WaterMeter } from '../../types';

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

interface WaterUsageFormProps {
  initialData?: WaterUsage;
  onSubmit: (data: Omit<WaterUsage, 'id'>) => void;
  onCancel: () => void;
  meters: WaterMeter[];
}

const WaterUsageForm: React.FC<WaterUsageFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  meters 
}) => {
  const [formData, setFormData] = useState<Omit<WaterUsage, 'id'>>({
    meterId: '',
    reading: 0,
    readingDate: new Date().toISOString().split('T')[0],
    consumption: 0,
    billAmount: 0,
    status: 'pending',
    ...initialData
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
      [name]: name === 'reading' || name === 'consumption' || name === 'billAmount' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.meterId || !formData.reading || !formData.readingDate || 
        formData.consumption === undefined || formData.billAmount === undefined || !formData.status) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="meterId">Water Meter</Label>
        <Select
          id="meterId"
          name="meterId"
          value={formData.meterId}
          onChange={handleChange}
          required
        >
          <option value="">Select a meter</option>
          {meters.map(meter => (
            <option key={meter.id} value={meter.id}>
              Meter #{meter.meterNumber} - {meter.location}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="reading">Reading (liters)</Label>
        <Input
          type="number"
          id="reading"
          name="reading"
          value={formData.reading}
          onChange={handleChange}
          required
          min="0"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="readingDate">Reading Date</Label>
        <Input
          type="date"
          id="readingDate"
          name="readingDate"
          value={formData.readingDate}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="consumption">Consumption (liters)</Label>
        <Input
          type="number"
          id="consumption"
          name="consumption"
          value={formData.consumption}
          onChange={handleChange}
          required
          min="0"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="billAmount">Bill Amount</Label>
        <Input
          type="number"
          id="billAmount"
          name="billAmount"
          value={formData.billAmount}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
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
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </Select>
      </FormGroup>

      <Button type="submit">{initialData ? 'Update Reading' : 'Add Reading'}</Button>
      <Button type="button" onClick={onCancel} style={{ marginLeft: '10px', background: '#757575' }}>
        Cancel
      </Button>
    </Form>
  );
};

export default WaterUsageForm; 