/**
 * Created by yketd on 4-10-2016.
 */
var Movie = require("./movieModel");

new Movie({
    title: 'Deepwater Horizon',
    imdb: 'tt1860357',
    date: new Date('2016-09-29'),
    length: 107,
    director: 'Peter Berg',
    description: 'A dramatization of the April 2010 disaster when the offshore drilling rig, ' +
                 'Deepwater Horizon, exploded and created the worst oil spill in U.S. history.'
}).save();

new Movie({
    title: 'Game of Thrones',
    imdb: 'tt0944947',
    date: new Date('2011-04-17'),
    length: 56,
    director: 'David Benioff',
    description: 'While a civil war brews between several noble families in Westeros, ' +
                 'the children of the former rulers of the land attempt to rise to power.'
}).save();

new Movie({
    title: 'The Strain',
    imdb: 'tt2654620',
    date: new Date('2014-07-13'),
    length: 43,
    director: 'Chuck Hogan',
    description: 'A mysterious viral outbreak with hallmarks of an ancient and evil ' +
                 'strain of vampirism ravages the city of New York.'
}).save();

new Movie({
    title: 'The Man in the High Castle',
    imdb: 'tt1740299',
    date: new Date('2015-01-15'),
    length: 60,
    director: 'Frank Spotnitz',
    description: 'A glimpse into an alternate history of North America. ' +
                 'What life after WWII may have been like if the Nazis had won the war.'
}).save();

new Movie({
    title: 'The Big Bang Theory',
    imdb: 'tt0898266',
    date: new Date('2006-05-01'),
    length: 22,
    director: 'Chuck Lorre',
    description: 'A woman who moves into an apartment across the hall from two brilliant ' +
                 'but socially awkward physicists shows them how little they know about life ' +
                 'outside of the laboratory.'
}).save();

new Movie({
    title: 'Breaking Bad',
    imdb: 'tt0903747',
    date: new Date('2008-01-20'),
    length: 49,
    director: 'Vince Gilligan',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns ' +
                 'to manufacturing and selling methamphetamine in order to secure his family\'s future.'
}).save();

new Movie({
    title: 'The Walking Dead',
    imdb: 'tt1520211',
    date: new Date('2010-10-31'),
    length: 44,
    director: 'Frank Darabont',
    description: 'Sheriff Deputy Rick Grimes leads a group of survivors in a world overrun by the walking dead. ' +
                 'Fighting the dead, fearing the living.'
}).save();

new Movie({
    title: 'Zombieland',
    imdb: 'tt1156398',
    date: new Date('2009-10-02'),
    length: 88,
    director: 'Ruben Fleischer',
    description: 'A shy student trying to reach his family in Ohio, a gun-toting tough guy trying to find the last Twinkie, ' +
                 'and a pair of sisters trying to get to an amusement park join forces to travel across a zombie-filled America.'
}).save();

new Movie({
    title: 'Limitless',
    imdb: 'tt4422836',
    date: new Date('2015-09-22'),
    length: 42,
    director: 'Craig Sweeny',
    description: 'An average 28-year old man who gains the ability to use the full extent of his brain\'s capabilities is hired  ' +
                 'by the FBI as a consultant.'
}).save();

new Movie({
    title: 'Race',
    imdb: 'tt3499096',
    date: new Date('2016-02-19'),
    length: 134,
    director: 'Stephen Hopkins',
    description: 'Jesse Owens\' quest to become the greatest track and field athlete in history thrusts him onto the world stage of ' +
                 'the 1936 Olympics, where he faces off against Adolf Hitler\'s vision of Aryan supremacy.'
}).save();