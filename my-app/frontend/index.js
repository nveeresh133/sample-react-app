import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';

// Create a history object
const browserHistory = createBrowserHistory({ basename: '' });

// Initialize the ReactPlugin
const reactPlugin = new ReactPlugin();

// Initialize Application Insights
const appInsights = new ApplicationInsights({
  config: {
    connectionString: 'YOUR_CONNECTION_STRING_GOES_HERE',
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory }
    }
  }
});

// Load Application Insights
appInsights.loadAppInsights();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export { appInsights, reactPlugin };
