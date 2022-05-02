const { Schema, model } = require('mongoose');
const moment = require ('moment')



const ReactionSchema = new  Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        ReactionBody: {
            type: String, 
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: 'Username is required',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMMM Do YYYY, h:mm:ss a'),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);



const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: [1, ' A Thought must have at least one character'],
            maxlength: [280, 'A Thought may not have more than 280 chacters'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMMM Do YYYY, h:mm:ss a'),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

ThoughtsSchema.virtual('reactioncount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtsSchema);

module.exports = Thought;