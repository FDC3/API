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

*Defined in [interface.ts:128](/src/interface.ts#L128)*

Publishes context to other apps on the desktop.

```javascript
agent.broadcast(context);
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

*Defined in [interface.ts:149](/src/interface.ts#L149)*

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

*Defined in [interface.ts:144](/src/interface.ts#L144)*

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

*Defined in [interface.ts:90](/src/interface.ts#L90)*

Launches/links to an app by name.

If a Context object is passed in, this object will be provided to the opened application via a contextListener. The Context argument is functionally equivalent to opening the target app with no context and broadcasting the context directly to it.

If opening errors, it returns an `Error` with a string from the `OpenError` enumeration.

```javascript
//no context
    agent.open('myApp');
    //with context
    agent.open('myApp', context);
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

*Defined in [interface.ts:139](/src/interface.ts#L139)*

Raises an intent to the desktop agent to resolve.

```javascript
//raise an intent to start a chat with a given contact
const intentR = await agent.resolve("StartChat", context);
//use the IntentResolution object to target the same chat app with a new context
agent.raiseIntent("StartChat", newContext, intentR.source);
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

*Defined in [interface.ts:120](/src/interface.ts#L120)*

Resolves an intent & context pair to a mapping of Intents and Apps (action metadata).

Resolve is effectively granting programmatic access to the Desktop Agent's resolver. Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific. If intent argument is falsey, then all possible intents - and apps corresponding to the intents - are resolved for the provided context. If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.

```javascript
// find what intents and apps are supported for a given context
const actionMetadata = await agent.resolve(null, context);
// e.g.:
// [{
//     intent: { name: "StartCall", displayName: "Call" },
//     apps: [{ name: "Skype" }]
// },
// {
//     intent: { name: "StartChat", displayName: "Chat" },
//     apps: [{ name: "Skype" }, { name: "Symphony" }, { name: "Slack" }]
// }];

// select a particular intent to raise, targeted at a particular app
const selectedAction = actionMetadata[1];
const selectedApp = selectedAction.apps[0];

await agent.raiseIntent(selectedAction.intent.name, context, selectedApp.name);
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | `String` |
| `Optional` context | [Context](../#context) |

**Returns:** `Promise`<`Array`<[ActionMetadata](actionmetadata.md)>>

___

