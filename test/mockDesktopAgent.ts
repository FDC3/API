// MOCK desktop agent

import {AppMetadata, Context, ResolveResult, ResolveContextResult, DesktopAgent, Intent, Listener} from "../src/interface"

const appMetaDataList:AppMetadata[] = [
    { id: 'myChatApp', name: 'myChatApp'}
    ,{ id: 'myChartApp', name: 'myChartApp'}
    ,{ id: 'myAppThatSupportsAllContexts', name: 'myAppThatSupportsAllContexts'}
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

    open: async function(app: AppMetadata, context: Context): Promise<void> {
        return;        
    },

    newIntent: function(name: string, context: Context, target?: AppMetadata): Intent {
        return {
            name: name,
            context: context,
            target: target
        };
    },
    
    resolve: async function(intent: Intent): Promise<Array<ResolveResult>> {
        return intents2ResolveResultsMap[intent.name];
    },

    resolveContext: async function(context: Context): Promise<Array<ResolveContextResult>> {
        if ( typeof context.userid !== 'undefined' ) {
            const resolver1 = { intentName: 'startChat', targets: intents2ResolveResultsMap['startChat'] };
            const resolver2 = { intentName: 'viewContact', targets: intents2ResolveResultsMap['viewContact'] };
            return [resolver1, resolver2];
        } else if ( typeof context.symbol !== 'undefined' ) {
            return [{ intentName: 'viewChart', targets: intents2ResolveResultsMap['viewChart'] }];
        }
    },

    fire: async function(intent: Intent) {
        return;
    },

    broadcast: function() {
    },

    intentListener: function(intent: string, handler: (context: Context) => void):Listener {
        return { unsubscribe: () => {} };
    },
    
    contextListener: function(handler: (context: Context) => void):Listener {
        return { unsubscribe: () => {} };
    }
}
