[fdc3-api](../README.md) > [DesktopAgent](../interfaces/desktopagent.md)

# Interface: DesktopAgent

A Desktop Agent is a desktop component (or aggregate of components) that serves as a launcher and message router (broker) for applications in its domain.

A Desktop Agent can be connected to one or more App Directories and will use directories for application identity and discovery. Typically, a Desktop Agent will contain the proprietary logic of a given platform, handling functionality like explicit application interop workflows where security, consistency, and implementation requirements are proprietary.

## Hierarchy

**DesktopAgent**

## Index

### Methods

* [broadcast](desktopagent.md#broadcast)
* [contextListener](desktopagent.md#contextlistener)
* [intentListener](desktopagent.md#intentlistener)
* [open](desktopagent.md#open)
* [raiseIntent](desktopagent.md#raiseintent)
* [resolve](desktopagent.md#resolve)

---

## Methods

<a id="broadcast"></a>

###  broadcast

▸ **broadcast**(context: *[Context](../#context)*): `void`

*Defined in [interface.ts:162](/src/interface.ts#L162)*

Publishes context to other apps on the desktop.

```javascript
agent.broadcast({version:'1.0.0',
     entities:[
       {
        "type": "Security",
          "name": "Apple",
        "id":
        {
          "ticker" : "aapl"
          "ISIN" : "US0378331005",
          "CUSIP" : "037833100",
         "FIGI" : "BBG000B9XRY4",
          "default" : "aapl"
        }
      }
  ]});
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| context | [Context](../#context) |

**Returns:** `void`

___
<a id="contextlistener"></a>

###  contextListener

▸ **contextListener**(handler: *`function`*): [Listener](listener.md)

*Defined in [interface.ts:201](/src/interface.ts#L201)*

Listens to incoming context broadcast from the Desktop Agent.

**Parameters:**

| Param | Type |
| ------ | ------ |
| handler | `function` |

**Returns:** [Listener](listener.md)

___
<a id="intentlistener"></a>

###  intentListener

▸ **intentListener**(intent: *`String`*, handler: *`function`*): [Listener](listener.md)

*Defined in [interface.ts:196](/src/interface.ts#L196)*

Listens to incoming Intents from the Agent.

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | `String` |
| handler | `function` |

**Returns:** [Listener](listener.md)

___
<a id="open"></a>

###  open

▸ **open**(name: *`String`*, context?: *[Context](../#context)*): `Promise`<`void`>

*Defined in [interface.ts:104](/src/interface.ts#L104)*

Launches/links to an app by name.

If a Context object is passed in, this object will be provided to the opened application via a contextListener. The Context argument is functionally equivalent to opening the target app with no context and broadcasting the context directly to it.

If opening errors, it returns an `Error` with a string from the `OpenError` enumeration.

```javascript
//no context
    agent.open('myApp');
    //with context
    agent.open('myApp',{version:'1.0.0',
     entities:[
       {
        "type": "Security",
          "name": "Apple",
        "id":
        {
          "ticker" : "aapl"
          "ISIN" : "US0378331005",
          "CUSIP" : "037833100",
         "FIGI" : "BBG000B9XRY4",
          "default" : "aapl"
        }
      }
  ]});
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `String` |
| `Optional` context | [Context](../#context) |

**Returns:** `Promise`<`void`>

___
<a id="raiseintent"></a>

###  raiseIntent

▸ **raiseIntent**(intent: *`String`*, context: *[Context](../#context)*, target?: *`String`*): `Promise`<[IntentResolution](intentresolution.md)>

*Defined in [interface.ts:191](/src/interface.ts#L191)*

Raises an intent to the desktop agent to resolve.

```javascript
//raise an intent to start a chat with a given contact
var intentR = await agent.resolve("StartChat",{version:"1.0.0",entities:[
   {
      "type":"Contact",
      "name":"Nick",
      "id":{
           "default":"nick@openfin.co",
           "email":"nick@openfin.co"
      }
   }
]});
//use the IntentResolution object to target the same chat app with a new context
agent.resolve("StartChat",{version:"1.0.0",entities:[
   {
      "type":"Contact",
      "name":"Joe",
      "id":{
           "default":"joe@fintech.com",
           "email":"joe@fintech.com"
      }
   }
]},intentR.source);
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | `String` |
| context | [Context](../#context) |
| `Optional` target | `String` |

**Returns:** `Promise`<[IntentResolution](intentresolution.md)>

___
<a id="resolve"></a>

###  resolve

▸ **resolve**(intent: *`String`*, context?: *[Context](../#context)*): `Promise`<`Array`<[ActionMetadata](actionmetadata.md)>>

*Defined in [interface.ts:140](/src/interface.ts#L140)*

Resolves an intent & context pair to a mapping of Intents and Apps (action metadata).

Resolve is effectively granting programmatic access to the Desktop Agent's resolver. Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific. If intent argument is falsey, then all possible intents - and apps corresponding to the intents - are resolved for the provided context. If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.

```javascript
//find what Apps can support SartChat with the given context structure
var intentR = await agent.resolve("StartChat",{version:"1.0.0",entities:[
   {
      "type":"Contact",
      "name":"Nick",
      "id":{
           "default":"nick@openfin.co",
           "email":"nick@openfin.co"
      }
   }
]});

//find what Intents and Apps are supported for a given context
var actionR = await agent.resolve(false,{version:"1.0.0",entities:[
   {
      "type":"Contact",
      "name":"Nick",
      "id":{
           "default":"nick@openfin.co",
           "email":"nick@openfin.co"
      }
   }
]});
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | `String` |
| `Optional` context | [Context](../#context) |

**Returns:** `Promise`<`Array`<[ActionMetadata](actionmetadata.md)>>

___

