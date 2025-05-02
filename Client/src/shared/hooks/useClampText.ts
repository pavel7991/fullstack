export const useClampText = (rows: number) => {
	return {
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: `${rows}`,
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	}
}
