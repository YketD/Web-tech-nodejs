/**
 * Created by yketd on 4-10-2016.
 */
var Movie = require('./moviemodel');

var post = new Movie({
    title: 'Deepwater Horizon',
    imdb:'tt1860357',
    date: new Date('2016-09-29'),
    length: 107,
    director: 'Peter Berg',
    description:'A dramatization of the April 2010 disaster when the offshore drilling rig,' +
                'Deepwater Horizon, exploded and created the worst oil spill in U.S. history.',
});

post.save(function (err, result) {
    if (err)
        return console.error(err);
    else
        console.log('moviesave', "movie has been saved succesfully, result + " + result);
});
