/**
 * Created by yketd on 4-10-2016.
 */
var Rating = require('./RatingModel.js');
var UserModel = require('./UserModel');

var defaultrating = new Rating({
    rating: 0,
    user: UserModel.find() ,
    date: new Date('2016-09-29'),
    length: 107,
    director: 'Peter Berg',
    description:'A dramatization of the April 2010 disaster when the offshore drilling rig,' +
    'Deepwater Horizon, exploded and created the worst oil spill in U.S. history.',
});

