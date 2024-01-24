const express = require("express");
const router = express.Router();
const {get,deleted,put,posted} =require  ('../controllers/controller.js')



  router.get('/get',get)
  router.post('/post',posted)
  router.delete('/delete/:id',deleted)
  router.put('/put/:id',put)

  module.exports=router