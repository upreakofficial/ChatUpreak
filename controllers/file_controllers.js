const db = require("../../upreak.com/config/dbconfig");
const { sendMessageToWhatsApp } = require('./../../upreak.com/controllers/whatsappSender');
const { sendWelcomeEmail } = require('./../../upreak.com/controllers/emailSender');

exports.error_500 = async (req, res) => {
  res.render('error-500');
};
exports.error_file = async (req, res) => {
 res.render('error-404');
};
exports.thankyou_file = async (req, res) => {
 res.render('thankyou');
};
exports.chatbot = async (req, res) => {
  try {
    const questions = await db.questions.findAll({ order: [['order_id', 'ASC']] });
    const firstQuestion = questions.shift();
    const chatHistory = [];
    const user_resp = [];
	
        // Check if the terms and conditions checkbox is already accepted
        // const termsAccepted = localStorage.getItem('termsAccepted') === 'true';

    res.render('chatbot', { question: firstQuestion, questions, chatHistory, user_resp});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
var i=0;
exports.save_chatbot = ( async (req, res) => {
  try {
    const questionId = req.body.question_id;
    const response = req.body.response;
    const questions = await db.questions.findAll({ order: [['order_id', 'ASC']] });
    const currentQuestionIndex = questions.findIndex((question) => question.id === parseInt(questionId));
    const nextQuestion = questions[currentQuestionIndex + 1];
    const user_resp=req.body.user_resp ? JSON.parse(req.body.user_resp) : [];
    const previousQuestion = req.body.previous_question;
    const previousResponse = req.body.previous_response;
    const chatHistory = req.body.chat_history ? JSON.parse(req.body.chat_history) : [];
    if (previousQuestion) {
      chatHistory.push({ type: 'question', text: previousQuestion });
      chatHistory.push({ type: 'response', text: previousResponse });
      // user_resp.push({ questionId,previousResponse });
    }

    const currentQuestion = await db.questions.findByPk(questionId);
    
    const chatEntry = { type: 'question', text: currentQuestion.question , remarks: currentQuestion.remarks, important: currentQuestion.important, options: currentQuestion.options};
    chatHistory.push(chatEntry);
    chatHistory.push({ type: 'response', questionId:questionId,text: response });
    user_resp.push({ questionId, response });

    if (nextQuestion) {
      let f=0;
      if (questionId == 14 && f == 0) {
        f = f + 1;
        
        try {
          const existUser = await db.responses.findOne({ where: { emailid: user_resp[3].response } });
      
          if (existUser !== null) {
            // Handle the case where the user already exists, e.g., by sending a response or throwing an error
            console.log('User Already Exists!');
            let msg = "User Already Exists!";
            return res.render('error-500', {msg});
          }
        } catch (error) {
          console.error('Error checking user existence:', error);
          // Handle the error, e.g., by sending a response or throwing a different error
        }
      }
      
      res.render('chatbot', { question: nextQuestion, questions, chatHistory,user_resp });
    } else {
      i=i+1;
      await db.responses.create({
        alldata:user_resp,        
        phonenumber:user_resp[0].response,
        whatsappnumber:user_resp[1].response,
        name:user_resp[2].response,
        emailid:user_resp[3].response,
        password:user_resp[4].response,
        dob:user_resp[5].response,
        city:user_resp[6].response,
        skill1:user_resp[10].response,
      	experience:user_resp[11].response,
      	job_role:user_resp[12].response,
        job_type:user_resp[13].response,
		    referee_name:user_resp[14].response,
      	referee_num:user_resp[15].response,
      	urole:'User',
      	phone_verify:'unverified',
        whatsapp_verify:'unverified',
      	email_verify:'unverified'
      });
   
      let data =  await db.responses.findOne({where:{emailid:user_resp[3].response}});
      
      let userUpdateData;

      if(user_resp[7].response == '10'){      
        userUpdateData ={
          application_id:'UP1000'+data.id,
          qualification_10: user_resp[8].response,
          yoc_10:user_resp[9].response,
        }
      } else if(user_resp[7].response == '12'){
        userUpdateData ={
          application_id:'UP1000'+data.id,
          qualification_12: user_resp[8].response,
          yoc_12:user_resp[9].response,
        }

      } else if(user_resp[7].response == 'DIPLOMA'){
        userUpdateData ={
          application_id:'UP1000'+data.id,
          qualification_diploma: user_resp[8].response,
          yoc_diploma:user_resp[9].response,
        }

      } else if(user_resp[7].response == 'UG'){
        userUpdateData ={
          application_id:'UP1000'+data.id,
          ugqualification: user_resp[8].response,
          ugyoc:user_resp[9].response,
        }

      } else if(user_resp[7].response == 'PG'){
        userUpdateData ={
          application_id:'UP1000'+data.id,
          pgqualification: user_resp[8].response,
          pgyoc:user_resp[9].response,
        }
      }
      
      await db.responses.update(userUpdateData,{where:{emailid:user_resp[3].response}});
      await db.user.create({
        phonenumber: user_resp[1].response,
        username:user_resp[2].response,
        email:user_resp[3].response,
        password:user_resp[4].response,
        role:'User',
        createdby:'User'
      });
      
      const thankYouMessage = "Thank You";
      chatHistory.push({ type: 'question', text: thankYouMessage });
     
      const recipientName = user_resp[2].response;
      const recipientEmail = user_resp[3].response;
  	  const recipientPassword = user_resp[4].response;
      await Promise.all([
        sendMessageToWhatsApp(`91${user_resp[1].response}`, `Welcome to Upreak \n\nDear ${recipientName},Congratulations on taking a significant step towards your career success! We're excited to have you join us at upreak. You are all set to login , your credentials are given below: \n\nEmail : ${recipientEmail} \nPassword : ${recipientPassword} \n\nThanks And Regards, \nTeam Upreak`),
        sendWelcomeEmail(recipientEmail, recipientPassword)
      ])
     .then(() => {
       res.render('thankyou');
    })
    .catch((error) => {
      console.error('Error sending or submitting via chatbot:', error);
      res.render('error-404');
    });
      
    }
  } catch (error) {
    console.log(error);
    res.render('error-404');
  }
});
