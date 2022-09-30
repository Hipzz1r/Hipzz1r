var express = require('express');
var router = express.Router();

router.get('/user', function(req, res, next) {
    var result = {};
    // console.log(req.session);
    if(req.session.avatar == undefined){
        req.session.avatar = "Images/Monster1.png";
        // console.log("t");
    }
    if(req.session.nickname == undefined) req.session.nickname = "익명의 래퍼";
    result.sessionID = req.sessionID;
    result.avatar = req.session.avatar;
    result.nickname = req.session.nickname;
    // console.log(result);
    res.send(result);
});

router.get('/user/avatar', function(req, res, next) {
    if(req.session.avatar == undefined) req.session.avatar = "Images/Monster1.png";
    res.send(req.session.avatar);
});

router.get('/user/nickname', function(req, res, next) {
    if(req.session.nickname == undefined) req.session.nickname = "익명의 래퍼";
    res.send(req.session.nickname);
});

router.post('/user/avatar', function(req, res, next) {
    req.session.avatar = req.body.avatar;
    res.send(req.session.avatar);
});

router.post('/user/nickname', function(req, res, next) {
    req.session.nickname = req.body.nickname;
    res.send(req.session.nickname);
});

router.get('/room', function(req, res, next) {
    res.send(global.roomList);
});

router.post('/room', function(req, res, next) {
    var newRoomJson = {};
    newRoomJson.owner = req.sessionID;
    newRoomJson.roomName = req.body.roomName;
    roomList.push(newRoomJson);
    res.send(global.roomList);
});

router.get('/', function(req, res, next) {
    console.log(req.session)
    console.log(req.sessionID)
    res.render('index', { title: 'Express' });
});

module.exports = router;