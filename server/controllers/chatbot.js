const dialogflow = require('@google-cloud/dialogflow')
const structjson = require('structjson')
const Product = require('../models/product')
const { v4: uuidv4 } = require('uuid')

const projectID = process.env.DIALOGFLOW_PROJECT_ID
const sessionID = process.env.DIALOGFLOW_SESSION_ID
const languageCode = process.env.DIALOGFLOW_SESSION_LANGUAGE_CODE

// create new session
const sessionClient = new dialogflow.SessionsClient({ credentials: JSON.parse(process.env.DIALOGFLOW_CREDS) })

module.exports = {
    textQuery: async function(text) {
        let sessionPath = sessionClient.projectAgentSessionPath(projectID, uuidv4())
        let self = module.exports
        // The text query reque st.
        const request = {
          session: sessionPath,
          queryInput: {
            text: {
              // The query to send to the dialogflow agent
              text: text,
              // The language used by the client (en-US)
              languageCode: languageCode
            }
            // queryParams: {
            //   payload: {
            //     data: parameters
            //   }
            // }
          }
        };
        let responses = await sessionClient.detectIntent(request)
        responses = await self.handleAction(responses)
        return responses
    },

    eventQuery: async function(event, userId, paramenetrs = {}) {
        let self = module.exports
        let sessionPath = sessionClient.sessionPath(projectID, sessionID + userId)
        // The event query request.
        const request = {
          session: sessionPath,
          queryInput: {
            event: {
              // The query to send to the dialogflow agent
              name: event,
              parameters: structjson.jsonToStructProto(parameters),
              // The language used by the client (en-US)
              languageCode: languageCode
            }
          }
        };
        let responses = await sessionClient.detectIntent(request)
        responses = await self.handleAction(responses)
        return responses
    },

    handleAction: function(responses) {
        let self = module.exports;
        console.log(responses)
        // switch (queryResult.action) {
        //   case "recommendcourses-yes":
        //     if (queryResult.allRequiredParamsPresent) {
        //       self.saveRegistration(queryResult.parameters.fields);
        //     }
        //     break;
        // }
        // return responses;
    },

    getProducts: async function() {
        await Product.find().exec((error, products) => {
            if (error || !products) {
                return res.status(400).json({ error: 'Unable to load products' })
            }
            // Return the Result as json 
            return res.json(products)
        })
    },

    saveRegistration: async function(fields) {
        const registration = new Registration({
          name: fields.name.stringValue,
          email: fields.email.stringValue,
          phone: fields.phone.stringValue,
          address: fields.address.stringValue,
          registerDate: Date.now()
        });
        try {
          let reg = await registration.save();
          console.log(reg);
        } catch (err) {
          console.log(err);
        }
    }
}
