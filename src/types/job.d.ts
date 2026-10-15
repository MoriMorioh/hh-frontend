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
    description?: string;
    about_company?: string;
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

  interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }

  interface JobsResponse {
    jobs: Job[];
    pagination: PaginationInfo;
    success: boolean;
  }
}
export {};
