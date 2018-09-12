var Brower = require('zombie');
var assert = require('chai').assert;
var brower;

suite('crossPage tests',function(){
  setup(function(){
    brower = new Brower();
  });
  test('requesting a group rate quote from the hood river tour page' + 
        'should populate the referrer field',function(done){
          var referrer = 'http://localhost:3000/tours/hood-river';
          brower.visit(referrer,function(){
            brower.clickLink('.requestGroupRate',function(){
              assert(brower.field('referrer').value === referrer);
              done();
            });
          });
  });
  test('requesting a group rate quote from the hood river tour page' + 
        'should populate the referrer field',function(done){
          var referrer = 'http://localhost:3000/tours/oregon-coast';
          brower.visit(referrer,function(){
            brower.clickLink('.requestGroupRate',function(){
              assert(brower.field('referrer').value === referrer);
              done();
            });
          });
  });
  test('visiting this "request group rate" page dirctly should result' + 
        'in an empty referrer field',function(done){
          var referrer = 'http://localhost:3000/tours/request-group-rate';
          brower.visit(referrer,function(){
            brower.clickLink('.requestGroupRate',function(){
              assert(brower.field('referrer').value === referrer);
              done();
            });
          });
  });
});