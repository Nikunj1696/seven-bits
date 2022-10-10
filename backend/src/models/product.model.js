const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            required: true,
		},
        description: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: true,
        },
		quantity: {
			type: Number,
			required: true,
		},
		/**
		 * 0 => Inactive, 1 => Active
		 */
		status: {
			type: Number,
			required: true,
			default: 0
		},
		image: {
			type: String,
			required: false,
		},
		deleted_at: { type: Date, required: false, default: null },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

