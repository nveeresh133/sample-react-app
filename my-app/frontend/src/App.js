import React, { useState } from 'react';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin, AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js';
import { ClickAnalyticsPlugin } from '@microsoft/applicationinsights-clickanalytics-js';
import { createBrowserHistory } from "history";
import { withAITracking } from '@microsoft/applicationinsights-react-js';

const browserHistory = createBrowserHistory({ basename: '' });
const reactPlugin = new ReactPlugin();
const clickPluginInstance = new ClickAnalyticsPlugin();
const clickPluginConfig = {
    autoCapture: true,
};

const appInsights = new ApplicationInsights({
    config: {
        connectionString: 'InstrumentationKey=63f4ae2d-d364-448f-9bbc-842f18e40c24;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/;ApplicationId=2c935603-2d5f-4911-972b-5f92f01fcfc3', // Replace with your actual connection string
        extensions: [reactPlugin, clickPluginInstance],
        extensionConfig: {
            [reactPlugin.identifier]: { history: browserHistory },
            [clickPluginInstance.identifier]: clickPluginConfig,
        }
    }
});
appInsights.loadAppInsights();

function MyComponent() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setData(result);
            setError(null);
        } catch (error) {
            setError(error.message);
            setData(null);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Information Dashboard</h1>
            <button onClick={() => fetchData('/api/contact')}>Get Contact Details</button>
            <button onClick={() => fetchData('/api/company')}>Get Company Details</button>
            <button onClick={() => fetchData('/api/project')}>Get Project Details</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {data && (
                <div style={{ marginTop: '20px' }}>
                    {Object.keys(data).map((key) => (
                        <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {data[key]}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

const TrackedComponent = withAITracking(reactPlugin, MyComponent);

function App() {
    return (
        <AppInsightsErrorBoundary onError={() => <h1>I believe something went wrong</h1>} appInsights={reactPlugin}>
            <TrackedComponent />
        </AppInsightsErrorBoundary>
    );
}

export default withAITracking(ReactPlugin, App);


























// // import React, { useState } from 'react';

// // function App() {
// //   const [data, setData] = useState(null);
// //   const [error, setError] = useState(null);

// //   const fetchData = async (endpoint) => {
// //     try {
// //       const response = await fetch(endpoint);
// //       if (!response.ok) {
// //         throw new Error('Failed to fetch data');
// //       }
// //       const result = await response.json();
// //       setData(result);
// //       setError(null);
// //     } catch (error) {
// //       setError(error.message);
// //       setData(null);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: '20px' }}>
// //       <h1>Information Dashboard</h1>
// //       <button onClick={() => fetchData('/api/contact')}>Get Contact Details</button>
// //       <button onClick={() => fetchData('/api/company')}>Get Company Details</button>
// //       <button onClick={() => fetchData('/api/project')}>Get Project Details</button>

// //       {error && <p style={{ color: 'red' }}>{error}</p>}

// //       {data && (
// //         <div style={{ marginTop: '20px' }}>
// //           {Object.keys(data).map((key) => (
// //             <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {data[key]}</p>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;
