import React from 'react';
import './App.css';
import {useNavigate} from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App({children}) {

  // stretch goal // think about if the user should have a backend end point ready to be queried on component load
  // they would provide the api endpoint to be fetched by touchless wrapper module to load the routes for the UI
  
  // TODO: create global api and provider for child component data sharing and logic
  // - Split component up into reusable pieces and look into prop passing with children (render props) and seeing if HOC pattern is better
  // - test module structure first with app and see if app should hold logic for if it should provide routing for child comps
  // - handler funcs to update state from context, or local state with useState as starting data for module??
  // - what will happen if we update state, will the child render too or only the container not containing the child component..?
  // - think about how/when to pass the updated routes to child when updateRoute function is called by display route comp
  // - display route comp - should display a list <could be either [{}]/{}> of active routes for a specific user on the page
  // - display route comp - should get the current route from the url (?clicked)
  // - display route comp - how should we handle editing routes or deleting routes in a non envasive way, should we consider inline or modal maybe
  // - logic to think about for display comp... 
  // - try state management with context first before moving to reducer logic
  // - think about what configurable data is going to be needed to make the features more configurable... 
  // - the only way you'll know if any of this works is to get up and build it and find out
  // should I pass container that takes children and have app call container... should app take children and let container just hanndle other logic like loading
  // would just calling container, automatically call app when the toucless module is imported in another module so that the app doesn't crash.


  const navi = useNavigate()
  const handleRoute = (routeArg) => {
    console.log('what is routes args', routeArg)
    let routes = {
       home: {
        name: 'home',
        userRoute: '/home/user/account/home',
        action: () => {
          const { userRoute } = routes.home;
          navi(userRoute, {replace: true})
        }
      },
      profile: {
        name: 'profile',
        userRoute: '/home/user/account/profile',
        action: () => {
          const { userRoute } = routes.profile;
          navi(userRoute, {replace: true})
        }
      } 
    } 
    return routes[routeArg].action() || false;
  }

  const commands = [
      {
        command: 'Hey joe send me to *',
        callback: (route) => handleRoute(route),
      }
    ]

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
   } = useSpeechRecognition({commands})
  
  

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

// SpeechRecognition.startListening({ continuous: false });


  
  return (
    <div className="App">
      <div>
        {children}
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening({continuous: false})}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>transcript text: {`"${transcript}"`}</p>
    </div>
    </div>
  );
}

export default App;
