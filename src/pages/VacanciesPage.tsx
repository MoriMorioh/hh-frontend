import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
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
import { Header } from '../components/Header';
import { Filters } from '../components/Filters';
import { JobCard } from '../components/JobCard';
import { fetchJobs } from '../store/jobsSlice';
import type { AppDispatch, RootState } from '../store/store';
import styles from '../App.module.css';

const LIMIT = 10;

export function VacanciesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.jobs
  );

  const paramSearch = searchParams.get('search') || '';
  const paramCity = searchParams.get('city') || 'Все';
  const paramSkills = searchParams.get('skills')
    ? searchParams.get('skills')!.split(',')
    : ['JavaScript', 'React', 'Redux', 'Python'];
  const paramPage = Number(searchParams.get('page')) || 1;

  const [search, setSearch] = useState(paramSearch);
  const [activeSearch, setActiveSearch] = useState(paramSearch);
  const [city, setCity] = useState(paramCity);
  const [skills, setSkills] = useState<string[]>(paramSkills);
  const [page, setPage] = useState(paramPage);

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlCity = searchParams.get('city') || 'Все';
    const urlSkills = searchParams.get('skills')
      ? searchParams.get('skills')!.split(',')
      : ['JavaScript', 'React', 'Redux', 'Python'];
    const urlPage = Number(searchParams.get('page')) || 1;

    setSearch(urlSearch);
    setActiveSearch(urlSearch);
    setCity(urlCity);
    setSkills(urlSkills);
    setPage(urlPage);
  }, [searchParams]);

  const updateQueryParams = (newParams: {
    search?: string;
    city?: string;
    skills?: string[];
    page?: number;
  }) => {
    const params: Record<string, string> = {};

    const currentSearch =
      newParams.search !== undefined ? newParams.search : activeSearch;
    const currentCity = newParams.city !== undefined ? newParams.city : city;
    const currentSkills =
      newParams.skills !== undefined ? newParams.skills : skills;
    const currentPage = newParams.page !== undefined ? newParams.page : page;

    if (currentSearch) params.search = currentSearch;
    if (currentCity && currentCity !== 'Все' && currentCity !== 'Все города') {
      params.city = currentCity;
    }
    if (currentSkills.length > 0) {
      params.skills = currentSkills.join(',');
    }
    if (currentPage > 1) {
      params.page = currentPage.toString();
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateQueryParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(
      fetchJobs({
        search: activeSearch,
        city: city === 'Все' || city === 'Все города' ? '' : city,
        skills: skills.join(','),
        page,
        limit: LIMIT,
      })
    );
  }, [dispatch, activeSearch, city, skills, page]);

  const handleSearch = () => {
    setActiveSearch(search);
    setPage(1);
    updateQueryParams({ search, page: 1 });
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <Container size="xl" mt="xl">
        <Grid justify="space-between" align="flex-end" mb="xl">
          <Grid.Col span={{ base: 12, md: 5, lg: 3.5 }}>
            <Title order={1} size="h2" fw={700}>
              Список вакансий
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              по профессии Frontend-разработчик
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8, lg: 8.5 }}>
            <Box pl={{ base: 0, md: 'md', lg: 'lg' }}>
              <Group gap="xs" style={{ width: '65%' }}>
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
                updateQueryParams({ skills: newSkills, page: 1 });
              }}
              city={city}
              onCityChange={(newCity) => {
                setCity(newCity);
                setPage(1);
                updateQueryParams({ city: newCity, page: 1 });
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

                {totalPages > 1 && (
                  <Group justify="center" mt="xl" mb="xl">
                    <Pagination
                      total={totalPages}
                      value={page}
                      onChange={handlePageChange}
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
