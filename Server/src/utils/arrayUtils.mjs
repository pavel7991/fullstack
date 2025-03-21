export const findObjectById = (arr, id) => arr.find((obj) => obj.id === +id)

export const removeObjectById = (arr, id) => {
	const index = arr.findIndex((obj) => obj.id === +id)
	if (index !== -1) {
		arr.splice(index, 1)
	}
}
