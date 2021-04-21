'use strict';

const { App } = require('jovo-framework');
const { NlpjsNlu } = require('jovo-nlu-nlpjs');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { getProducts, listProductByName } = require('./api')
const { WebPlatform } = require('jovo-platform-web');

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

const webPlatform = new WebPlatform();
webPlatform.use(new NlpjsNlu());

app.use(webPlatform, new FileDb(), new JovoDebugger());

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {
    this.ask(
      `Hello, I am here to assist you in understanding our product features in depth, ` +
      `as well as informing you the list of products currently available. ` +
      `What would you like to do?`
    )
    this.$webApp.showQuickReplies([
      'List all products',
      'Learn more',
      'Sign Up'
    ]);
  },

  async LearnMoreIntent() {
    this.ask('Which product would you like to know more about?')
    let names = []
    await getProducts().then(res => {
      res.data.map(product => {
        names.push(product.name)
      })
    }).catch(error => {
      console.log(error)
    })
    this.$webApp.showQuickReplies(names);
  },

  async SingleProductIntent() {
    await listProductByName(this.$nlu.NlpjsNlu.utterance).then(res => {
      this.tell(`The ${res.data.name} can be described as ${res.data.description}. It is priced at $${res.data.price}. There are ${res.data.quantity} remaining.`)
    }).catch(error => {
      console.log(error)
    })
  },

  async ProductsIntent() {
    let names = []
    await getProducts().then(res => {
      res.data.map(product => {
        names.push(product.name)
      })
    }).catch(error => {
      console.log(error)
    })
    this.tell("The available products are " + names.join(", "))
  },

  SignUpIntent() {
    this.$webApp.addActions([
      {
        type: 'CUSTOM',
        command: 'redirect',
        value: 'https://blacksunhotsauce.herokuapp.com/signup',
      }
    ]);
    this.tell('Great! Opening now...');
  },

  HelloWorldIntent() {
    return this.toIntent('LAUNCH')
  },

  Unhandled() {
    this.tell("Sorry, I didn't catch that. Can you say that again?")
  }
});

module.exports = { app };
