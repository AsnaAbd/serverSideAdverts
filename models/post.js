'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	titre: { type: String },
	prix: { type: Number },
	email: { type: String },
	ville: { type: String },
	Dateannonce: { type: Date },
	surface: { type: Number},
	typeBien: { type: String},
	classe: { type: String},
	plus: { type: String},
	description: {type: String}
};

var postSchema = new Schema(fields);

module.exports = mongoose.model('Post', postSchema);
