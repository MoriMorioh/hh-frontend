declare global {
  interface Job {
    id: number | string;
    name: string;
    company_name: string;
    city: string;
    salary: string | number;
    published_at?: string;
    short_description?: string;
    space?: string;
    workFormat?: string;
    skills?: string;
    experience: string;
  }

  interface JobCardProps {
    job: Job;
  }

  interface JobsQueryParams {
    search?: string;
    city?: string;
    skills?: string;
    page?: number;
    limit?: number;
  }

  interface JobsResponse {
    jobs: Job[];
    total: number;
  }
}
export {};
