const { Schema, model } = require('mongoose');


const UsersSchema = new Schema (
    {
    userName: {
        type: String,
        unique: true,
         required: 'Username is required',
         trim
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
    }
)

UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;                             
});

const Users =model('Users',UsersSchema);


module.exports = Users
