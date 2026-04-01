import type { ApiResponse, Employee } from '@/src/types/employee';

const EMPLOYEE_API_URL = 'https://dummy.restapiexample.com/api/v1/employees';

export const fetchEmployeesApi = async (): Promise<Employee[]> => {
	const response = await fetch(EMPLOYEE_API_URL);
	const json: ApiResponse = await response.json();
	return json.data;
};