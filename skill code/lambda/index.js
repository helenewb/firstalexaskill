//FRONTEND - INTERACTION MODEL - UTTERANCES AND POSSIBLE QUESTIONS


/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Servus, frag mich nach einer Bierempfehlung!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Servus bei der Bierempfehlung. Frag mich nach einer Bierempfehlung', speechText)
      .getResponse();
  },
};

const BeerRecommodationIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BeerRecommodationIntent';
  },
  handle(handlerInput) {
    const speechText = 'Servus bei deiner Getränke Empfehlung. Was willst du trinken?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Servus bei deiner Getränke Empfehlung. Was willst du trinken?', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Du kannst mich nach einer Bierempfehlung fragen. Sag einfach ich möchte bier trinken';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Servus, hallo bei der Bierempfehlung. Sprich ich möche bier trinken und ich werde dir eine empfehlung nennen', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Bis zum nächsten mal. Tschüss!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Servus', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Es tut mir Leid, ich habe dich leider nicht verstanden. Kannst du bitte wiederholen?')
      .reprompt('Es tut mir sehr leid, dass ich dich nicht verstehe. Bitte wiederhole doch nochmal.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
