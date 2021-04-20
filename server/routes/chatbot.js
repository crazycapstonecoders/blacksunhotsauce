const router = require('express').Router()
const chatbot = require('../controllers/chatbot')

router.post('/text-query', async (req, res) => {
    const { text } = req.body;

    const responses = await chatbot
    .textQuery(text)
    .catch(err => {
        console.log("ERROR:", err);
        res.status(400).send("error");
      });
    
    console.log(responses)
})

module.exports = router