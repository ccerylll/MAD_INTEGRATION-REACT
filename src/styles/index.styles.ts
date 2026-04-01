import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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