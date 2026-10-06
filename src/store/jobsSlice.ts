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
}

const initialState: JobsState = {
  jobs: [],
  total: 0,
  isLoading: false,
  error: null,
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

      const response = await fetch(
        `${API_URL}?${searchParams.toString()}`
      );

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

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
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
          state.total = action.payload.total;
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || 'Не удалось загрузить данные';
      });
  },
});

export default jobsSlice.reducer;
