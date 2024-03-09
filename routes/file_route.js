module.exports = app => {
  
  const dash_path = require("../controllers/file_controllers"); 
  var router = require("express").Router();

  router.get("/", dash_path.chatbot);
  router.get("/error-500", dash_path.error_500);
  router.get("/error-404", dash_path.error_file);
  router.get("/thankyou", dash_path.thankyou_file);
  router.post("/save_chatbot", dash_path.save_chatbot);

  app.use('/', router);
};