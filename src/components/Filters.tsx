import { useState, type KeyboardEvent } from 'react';
import {
  Stack,
  TextInput,
  ActionIcon,
  Select,
  Group,
  Pill,
  Text,
  Paper,
} from '@mantine/core';
import { IconMapPin, IconPlus } from '@tabler/icons-react';
import styles from './Filters.module.css';

interface FiltersProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
  city: string;
  onCityChange: (city: string) => void;
}

const CITIES = ['Все города', 'Москва', 'Санкт-Петербург'];

export const Filters = ({
  skills,
  onSkillsChange,
  city,
  onCityChange,
}: FiltersProps) => {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onSkillsChange([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <Stack gap="md">
      <Paper radius="lg" p="md" className={styles.filterCard}>
        <Text size="xs" fw={700} c="dimmed" mb="xs" className={styles.title}>
          КЛЮЧЕВЫЕ НАВЫКИ
        </Text>

        <Group gap="xs" mb="sm" wrap="nowrap">
          <TextInput
            placeholder="Навык"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.inputWrapper}
            radius="md"
            size="sm"
          />
          <ActionIcon
            onClick={handleAddSkill}
            size="36px"
            radius="md"
            color="blue"
            variant="filled"
          >
            <IconPlus size={18} />
          </ActionIcon>
        </Group>

        <Pill.Group gap={6}>
          {skills.map((skill) => (
            <Pill
              key={skill}
              withRemoveButton
              onRemove={() => handleRemoveSkill(skill)}
              bg="#f1f3f5"
              size="sm"
              className={styles.pill}
            >
              {skill}
            </Pill>
          ))}
        </Pill.Group>
      </Paper>

      <Paper radius="lg" p="xs" px="md" className={styles.filterCard}>
        <Select
          leftSection={<IconMapPin size={18} color="#adb5bd" />}
          placeholder="Все города"
          data={CITIES}
          value={city}
          onChange={(val) => onCityChange(val || 'Все города')}
          variant="unstyled"
          size="sm"
          comboboxProps={{ shadow: 'md', radius: 'md' }}
          className={styles.citySelect}
        />
      </Paper>
    </Stack>
  );
};
