import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  TextInput,
  Button,
  Group,
  Title,
  Pagination,
  Stack,
  Loader,
  Text,
  Grid,
  Box,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { JobCard } from './components/JobCard';
import { fetchJobs } from './store/jobsSlice';
import type { AppDispatch, RootState } from './store/store';
import styles from './App.module.css';

export function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, isLoading, error } = useSelector(
    (state: RootState) => state.jobs
  );

  const [search, setSearch] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [city, setCity] = useState('Все');
  const [skills, setSkills] = useState<string[]>([
    'JavaScript',
    'React',
    'Redux',
    'Python',
  ]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchJobs({
        search: activeSearch,
        city: city === 'Все' || city === 'Все города' ? '' : city,
        skills: skills.join(','),
        page,
        limit: 10,
      })
    );
  }, [dispatch, activeSearch, city, skills, page]);

  const handleSearch = () => {
    setActiveSearch(search);
    setPage(1);
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <Container size="xl" mt="xl">
        <Grid align="flex-end" mb="xl">
          <Grid.Col span={{ base: 12, md: 4, lg: 3.5 }}>
            <Title order={1} size="h2" fw={700}>
              Список вакансий
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              по профессии Frontend-разработчик
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8, lg: 8.5 }}>
            <Box pl={{ base: 0, md: 'md', lg: 'lg' }}>
              <Group gap="xs" style={{ width: '100%' }}>
                <TextInput
                  placeholder="Должность или название компании"
                  value={search}
                  leftSection={<IconSearch size={18} color="#adb5bd" />}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{ flex: 1 }}
                  radius="md"
                  bg="white"
                />
                <Button onClick={handleSearch} color="blue" radius="md">
                  Найти
                </Button>
              </Group>
            </Box>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 4, lg: 3.5 }}>
            <Filters
              skills={skills}
              onSkillsChange={(newSkills) => {
                setSkills(newSkills);
                setPage(1);
              }}
              city={city}
              onCityChange={(newCity) => {
                setCity(newCity);
                setPage(1);
              }}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8, lg: 8.5 }}>
            {isLoading && (
              <Loader size="xl" mx="auto" my="xl" display="block" />
            )}

            {!isLoading && error && (
              <Text c="red" size="lg">
                {error}
              </Text>
            )}

            {!isLoading && !error && jobs.length === 0 && (
              <Text size="lg" c="dimmed" mt="md">
                Вакансии не найдены
              </Text>
            )}

            {!isLoading && !error && jobs.length > 0 && (
              <Stack gap="md">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}

                {jobs.length > 0 && (
                  <Group justify="center" mt="xl" mb="xl">
                    <Pagination
                      total={2}
                      value={page}
                      onChange={setPage}
                      withEdges
                      radius="xs"
                      size="sm"
                      styles={{
                        control: {
                          border: '1px solid #dee2e6',
                          backgroundColor: '#ffffff',
                          color: '#212529',
                          fontWeight: 500,
                          '&[data-active]': {
                            backgroundColor: '#ffffff',
                            borderColor: '#adb5bd',
                            color: '#000000',
                            fontWeight: 700,
                          },
                        },
                      }}
                    />
                  </Group>
                )}
              </Stack>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
