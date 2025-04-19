const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },
  FILES: {
    BASE: `${API_BASE_URL}/api/files`,
  },
};
