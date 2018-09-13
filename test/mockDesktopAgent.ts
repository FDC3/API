// MOCK desktop agent

import {AppMetadata, Context, RaiseIntentResults, ResolveIntentResults, ResolveContextResults, ResolveContextResult, DesktopAgent, Intent, Listener} from "../src/interface"

const appMetaDataList:AppMetadata[] = [
    { name: 'myChatApp'}
    ,{ name: 'myChartApp'}
    ,{ name: 'myAppThatSupportsAllContexts'}
];

const intents2ResolveResultsMap = {
    'viewChart' : [ 
        appMetaDataList[1]
        ,appMetaDataList[2]
    ],
    'startChat' : [
        appMetaDataList[0]
        ,appMetaDataList[2]
    ],
    'viewContact' : [
        appMetaDataList[0]
        ,appMetaDataList[2]
    ]
};


export const desktopAgent:DesktopAgent = {

    open: async function(app: AppMetadata, intent: Intent): Promise<void> {
        return;        
    },

    newIntent: function(name: string, context: Context, target?: AppMetadata): Intent {
        return {
            name: name,
            context: context,
            target: target
        };
    },
    
    resolveIntent: async function(intent: Intent): Promise<ResolveIntentResults> {
        const rr:ResolveIntentResults = { targets: intents2ResolveResultsMap[intent.name.valueOf()] }
        return rr;
    },

    resolveContext: async function(context: Context): Promise<ResolveContextResults> {
        if ( typeof context.userid !== 'undefined' ) {
            const resolver1 = { intentName: 'startChat', targets: intents2ResolveResultsMap['startChat'] };
            const resolver2 = { intentName: 'viewContact', targets: intents2ResolveResultsMap['viewContact'] };
            return { intents: [resolver1, resolver2] };
        } else if ( typeof context.symbol !== 'undefined' ) {
            return { intents: [{ intentName: 'viewChart', targets: intents2ResolveResultsMap['viewChart'] }] };
        }
    },

    raiseIntent: async function(intent: Intent): Promise<RaiseIntentResults> {
        return;
    },

    broadcast: function() {
    },

    newIntentListener: function(intent: string, handler: (context: Context) => void):Listener {
        return { unsubscribe: () => {} };
    },
    
    newContextListener: function(handler: (context: Context) => void):Listener {
        return { unsubscribe: () => {} };
    }
}
