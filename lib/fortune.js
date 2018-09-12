var fortunes = [
  'conquer your',
  'river need',
  'do not fear',
  'you will',
  'whenever possible',
];

exports.getFortune = function(){
  var index = Math.floor(Math.random() * fortunes.length);
  return fortunes[index];
};