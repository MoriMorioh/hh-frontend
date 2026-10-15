import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Text,
  Title,
  Badge,
  Group,
  Stack,
  Loader,
  Button,
  Box,
} from '@mantine/core';
import { Header } from '../components/Header';
import { fetchJobById, clearCurrentJob } from '../store/jobsSlice';
import type { AppDispatch, RootState } from '../store/store';
import styles from '../App.module.css';

const SPACE_LABELS: Record<string, string> = {
  remote: 'МОЖНО УДАЛЁННО',
  hybrid: 'ГИБРИД',
  office: 'ОФИС',
};

export function JobPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentJob, isJobLoading, jobError } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
    return () => {
      dispatch(clearCurrentJob());
    };
  }, [dispatch, id]);

  const spaceKey = currentJob?.space || 'office';
  const label = SPACE_LABELS[spaceKey] || 'ОФИС';

  return (
    <div className={styles.pageWrapper}>

      <Header />

      <Container size="md" mt="xl" pb="xl">
        {isJobLoading && <Loader size="xl" mx="auto" my="xl" display="block" />}

        {!isJobLoading && jobError && (
          <Stack align="center" mt="xl">
            <Text c="red" size="lg">
              {jobError}
            </Text>
            <Button component={Link} to="/vacancies" variant="outline">
              Назад к вакансиям
            </Button>
          </Stack>
        )}

        {!isJobLoading && currentJob && (
          <Stack gap="lg">
            <Paper p="xl" radius="md" bg="white">
              <Stack gap="xs">
                <Title order={1} size="h2" c="blue.7" fw={700}>
                  {currentJob.name}
                </Title>

                <Group gap="xs">
                  <Text fw={700} size="lg">
                    {currentJob.salary
                      ? `${Number(currentJob.salary).toLocaleString()} ₽`
                      : 'З/П не указана'}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Опыт {currentJob.experience}
                  </Text>
                </Group>

                <Text size="sm" c="dimmed">
                  {currentJob.company_name}
                </Text>

                <Box mt={4}>
                  <Badge radius="xs" size="sm" color="blue" variant="filled">
                    {label}
                  </Badge>
                </Box>

                <Text size="sm" mt={4}>
                  {currentJob.city}
                </Text>
              </Stack>
            </Paper>

            <Paper p="xl" radius="md" bg="white">
              <Stack gap="md">
                {currentJob.about_company && (
                  <Box>
                    <Title order={3} size="h3" fw={600} mb="xs">
                      Компания
                    </Title>
                    <Text style={{ whiteSpace: 'pre-line' }}>
                      {currentJob.about_company}
                    </Text>
                  </Box>
                )}

                {currentJob.description && (
                  <Box mt={currentJob.about_company ? 'md' : 0}>
                    <Title order={4} size="h4" fw={600} mb="xs">
                      О вакансии:
                    </Title>
                    <Text style={{ whiteSpace: 'pre-line' }}>
                      {currentJob.description}
                    </Text>
                  </Box>
                )}
              </Stack>
            </Paper>
          </Stack>
        )}
      </Container>
    </div>
  );
}
