import mongoose from 'mongoose'

export const safeFindOneById = async (model, id, select) => {
	if (!mongoose.Types.ObjectId.isValid(id)) return null

	try {
		let query = model.findOne({ _id: id })

		if (select) {
			if (Array.isArray(select)) {
				select = select.join(' ')
			}
			query = query.select(select)
		}

		return await query
	} catch (error) {
		console.error('Error for find', error.message)
		return null
	}
}
