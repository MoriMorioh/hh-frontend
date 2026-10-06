import { Badge, Paper, Text, Button, Group, Stack } from '@mantine/core';
import styles from './JobCard.module.css';

const SPACE_LABELS: Record<string, string> = {
  remote: 'МОЖНО УДАЛЁННО',
  hybrid: 'ГИБРИД',
  office: 'ОФИС',
};

export const JobCard = ({ job }: JobCardProps) => {
  const spaceKey = job.space || 'office';
  const label = SPACE_LABELS[spaceKey] || 'ОФИС';

  return (
    <Paper p="lg" radius="md" withBorder className={styles.card}>
      <Stack gap="xs">
        <Text fw={700} size="lg" className={styles.title}>
          {job.name}
        </Text>

        <Group gap="xs">
          <Text fw={600} size="md">
            {job.salary
              ? `${Number(job.salary).toLocaleString()} ₽`
              : 'З/П не указана'}
          </Text>
          <Text size="sm" c="dimmed">
            {job.experience}
          </Text>
        </Group>

        <Text size="sm" c="dimmed">
          {job.company_name}
        </Text>

        <div>
          <Badge
            radius="xs"
            size="sm"
            className={styles.badge}
            data-space={spaceKey}
          >
            {label}
          </Badge>
        </div>

        <Text size="sm">{job.city}</Text>

        <Button color="dark" radius="md" mt="xs" className={styles.button}>
          Смотреть вакансию
        </Button>
      </Stack>
    </Paper>
  );
};
