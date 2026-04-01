import { fetchEmployeesApi } from '@/src/api/employee';
import { employeeCardColors } from '@/src/constants/colors';
import { styles } from '@/src/styles/index.styles';
import type { Employee } from '@/src/types/employee';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
	const [employees, setEmployees] = useState<Employee[]>([]);
 	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	const filteredEmployees = employees.filter((employee) => Number(employee.employee_salary) > 500000);

	const getCardBackgroundColor = (age: number) => {
		if (age >= 50) {
			return employeeCardColors.age50Plus;
		}
		if (age >= 40) {
			return employeeCardColors.age40Plus;
		}
		if (age >= 30) {
			return employeeCardColors.age30Plus;
		}
		if (age >= 20) {
			return employeeCardColors.age20Plus;
		}
		return employeeCardColors.default;
	};

	const fetchEmployees = async () => {
		try {
			setLoading(true);
			setError(false);

			const data = await fetchEmployeesApi();
			setEmployees(data);
		} catch (fetchError) {
			console.error(fetchError);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEmployees();
	}, []);

	if (loading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" />
				<Text>Loading employees...</Text>
				<Button title="Reload" onPress={fetchEmployees} />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.center}>
				<Text>Failed to load data</Text>
				<Button title="Reload" onPress={fetchEmployees} />
			</View>
		);
	}

	if (filteredEmployees.length === 0) {
		return (
			<View style={styles.center}>
				<Text>No employees found</Text>
				<Button title="Reload" onPress={fetchEmployees} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.headerRow}>
				<Text style={styles.title}>Employees (Salary &gt; 500000)</Text>
				<Button title="Reload" onPress={fetchEmployees} />
			</View>
			<FlatList<Employee>
				data={filteredEmployees}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={[styles.card, { backgroundColor: getCardBackgroundColor(item.employee_age) }]}>
						<Text style={styles.name}>Name: {item.employee_name}</Text>
						<Text>Age: {item.employee_age}</Text>
						<Text>Salary: ${item.employee_salary}</Text>
					</View>
				)}
			/>
		</View>
	);
}
