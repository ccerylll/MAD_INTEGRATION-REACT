export type Employee = {
	id: number;
	employee_name: string;
	employee_age: number;
	employee_salary: number;
};

export type ApiResponse = {
	status: string;
	data: Employee[];
	message: string;
};