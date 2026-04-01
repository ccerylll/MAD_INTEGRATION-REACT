import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

export default function HomeScreen() {
	const [employees, setEmployees] = useState<Employee[]>([]);
 	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	const filteredEmployees = employees.filter((employee) => Number(employee.employee_salary) > 500000);

	const getCardBackgroundColor = (age: number) => {
		if (age >= 50) {
			return '#C8E6C9';
		}
		if (age >= 40) {
			return '#FFF9C4';
		}
		if (age >= 30) {
			return '#BBDEFB';
		}
		if (age >= 20) {
			return '#FFCDD2';
		}
		return '#F5F5F5';
	};

	const fetchEmployees = async () => {
		try {
			setLoading(true);
			setError(false);

			const response = await fetch('https://dummy.restapiexample.com/api/v1/employees');
			const json: ApiResponse = await response.json();
			setEmployees(json.data);
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,
	},
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
	},
	card: {
		borderRadius: 10,
		padding: 12,
		marginBottom: 10,
	},
	name: {
		fontWeight: '700',
	},
});
