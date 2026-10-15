import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

interface JobsState {
  jobs: Job[];
  total: number;
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentJob: Job | null;
  isJobLoading: boolean;
  jobError: string | null;
}

const initialState: JobsState = {
  jobs: [],
  total: 0,
  isLoading: false,
  error: null,
  totalPages: 1,
  currentJob: null,
  isJobLoading: false,
  jobError: null,
};

export const fetchJobs = createAsyncThunk<JobsResponse, JobsQueryParams>(
  'jobs/fetchJobs',
  async (params, { rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams();

      if (params.search) searchParams.append('search', params.search);
      if (params.city && params.city !== 'Все')
        searchParams.append('city', params.city);
      if (params.skills) searchParams.append('skills', params.skills);
      if (params.page) searchParams.append('page', params.page.toString());
      searchParams.append('limit', (params.limit || 10).toString());

      const API_URL = 'https://kata-jobs.onrender.com/api/jobs';

      const response = await fetch(`${API_URL}?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error('Ошибка при загрузке вакансий');
      }

      const data: JobsResponse = await response.json();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  }
);

export const fetchJobById = createAsyncThunk<Job, string>(
  'jobs/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://kata-jobs.onrender.com/api/jobs/${id}`
      );
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные вакансии');
      }
      const data = await response.json();
      return data.job || data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ошибка при загрузке вакансии');
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearCurrentJob: (state) => {
      state.currentJob = null;
      state.jobError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchJobs.fulfilled,
        (state, action: PayloadAction<JobsResponse>) => {
          state.isLoading = false;
          state.jobs = action.payload.jobs;
          state.total = action.payload.pagination.totalItems;
          state.totalPages = action.payload.pagination.totalPages;
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || 'Не удалось загрузить данные';
      })
      .addCase(fetchJobById.pending, (state) => {
        state.isJobLoading = true;
        state.jobError = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action: PayloadAction<Job>) => {
        state.isJobLoading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.isJobLoading = false;
        state.jobError =
          (action.payload as string) || 'Не удалось загрузить вакансию';
      });
  },
});

export default jobsSlice.reducer;
export const { clearCurrentJob } = jobsSlice.actions;
