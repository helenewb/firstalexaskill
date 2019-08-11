//BACKEND - in AMAZON WEB SERVICES, LAMBDA - ANSWERS

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Servus bei Bier Empfehlung, was möchtest du trinken?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Servus bei Bierempfehlung, was möchtest du trinken?', speechText)
      .getResponse();
  },
};

const BeerRecommendationIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BeerRecommendationIntent';
  },
  handle(handlerInput) {
    const beerRecommendation = [
      'Ich empfehle dir ein kühles Zillertaler Bier',
      'Am besten schmeckt einfach das Gösser im Speisewagen',
      'Das Augustiner ist spitze'];

    return handlerInput.responseBuilder
      .speak(beerRecommendation[Math.floor(Math.random()*beerRecommendation.length)]).reprompt()
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Frag mich nach einer bier empfehlung!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Frag mich nach einer Bier empfehlung', speechText)
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
    const speechText = 'Tschüss, bis zum nächsten Mal!';

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
      .speak('Tut mir Leid, ich habe dich leider nicht verstanden. Kannst du bitte wiederholen?')
      .reprompt('Es tut mir Leid, ich bin noch ein bisschen doof. Kannst du bitte wiederholen?')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    BeerRecommendationIntent,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();