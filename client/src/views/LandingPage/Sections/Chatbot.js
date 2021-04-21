import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Widget, addResponseMessage, setQuickButtons } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

export default function Chatbot() {
    const makeRequestToJovo = () => {
        axios.post('https://webhook.jovo.cloud/3a9b43a5-3fb1-49a0-a0e3-975eb0b3f303', {
            version: "3.2.4",
            type: "jovo-platform-web",
            request: {
              id: "d86f9fdf-6762-4acf-8d1d-ce330a29d592",
              timestamp: "2020-11-23T12:50:21.009Z",
              type: "LAUNCH",
              body: {},
              locale: "en",
              data: {}
            },
            context: {
              device: { 
                type: "BROWSER", 
                capabilities: { AUDIO: true, HTML: true, TEXT: true } 
            },
              session: {
                id: "1e4076b8-539a-48d5-8b14-1ec3cf651b7b",
                data: {},
                new: true,
                lastUpdatedAt: "2020-11-23T12:35:21.345Z"
              },
              user: { id: "67fed000-9f11-4acf-bbbc-1e52e5ea22a9", data: {} }
            }
        }).then(response => {
            addResponseMessage(response.data.actions[0].plain)
            setQuickButtons(response.data.actions[1].replies)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        makeRequestToJovo()
    }, [])

    const handleNewUserMessage = newMessage => {
        axios.post("https://webhook.jovo.cloud/3a9b43a5-3fb1-49a0-a0e3-975eb0b3f303", {
            version: "3.2.4",
            type: "jovo-platform-web",
            request: {
              id: "d86f9fdf-6762-4acf-8d1d-ce330a29d592",
              timestamp: "2020-11-23T12:50:21.009Z",
              type: "TRANSCRIBED_TEXT",
              body: { text: newMessage },
              locale: "en",
              data: {}
            },
            context: {
              device: { type: "BROWSER", capabilities: { AUDIO: true, HTML: true, TEXT: true } },
              session: {
                id: "1e4076b8-539a-48d5-8b14-1ec3cf651b7b",
                data: {},
                lastUpdatedAt: "2020-11-23T12:35:21.345Z"
              },
              user: { id: "67fed000-9f11-4acf-bbbc-1e52e5ea22a9", data: {} }
            }
          }).then(response => {
              addResponseMessage(response.data.actions[0].plain)
              if(response.data.actions.length >= 2) {
                  if(response.data.actions[1].type === 'QUICK_REPLY') {
                      setQuickButtons(response.data.actions[1].replies)
                  } else if(response.data.actions[1].type === 'CUSTOM') {
                      setTimeout(() => {
                          window.location.href = response.data.actions[1].value
                      }, 800)
                  }
              }
        })
    }

    const handleQuickButtonClicked = message => {
        handleNewUserMessage(message);
    }

    return (
        <div>
            <Widget
            subtitle='Ask your questions here!'
            handleNewUserMessage={handleNewUserMessage}
            handleQuickButtonClicked={handleQuickButtonClicked}
             />
        </div>
    )
}
