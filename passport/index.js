const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User  = require('../models/user');

module.exports = () => {
  // 로그인 시 실행 
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 매 요청마다 실행
  passport.deserializeUser((id, done) => {
    User.findOne({
       where: { id },
       include: [{
         model: User,
         attributes: ['id', 'nick'],
         as: 'Followers',
       }, {
         model: User,
         attributes: ['id', 'nick'],
         as: 'Followings',
       }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
};
