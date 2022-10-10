const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        full_name: {
            type: String,
            required: true,
		},
		/**
         * 1 => Admin , 2 => User 
         */
		type: {
			type: Number,
			required: false,
			default: 2,
		},
        email: {
            type: String,
            required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profile: {
            type: String,
            required: false,
		},
        token: {
			type: String,
			required: false,
		},
		deleted_at: { type: Date, required: false, default: null },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
