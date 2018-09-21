[fdc3-api](../README.md) > ["interface"](../modules/_interface_.md) > [DesktopAgent](../interfaces/_interface_.desktopagent.md)

# Interface: DesktopAgent

A Desktop Agent is a desktop component (or aggregate of components) that serves as a launcher and message router (broker) for applications in its domain.

A Desktop Agent can be connected to one or more App Directories and will use directories for application identity and discovery. Typically, a Desktop Agent will contain the proprietary logic of a given platform, handling functionality like explicit application interop workflows where security, consistency, and implementation requirements are proprietary.

## Hierarchy

**DesktopAgent**

## Index

### Methods

* [broadcast](_interface_.desktopagent.md#broadcast)
* [contextListener](_interface_.desktopagent.md#contextlistener)
* [intentListener](_interface_.desktopagent.md#intentlistener)
* [open](_interface_.desktopagent.md#open)
* [raiseIntent](_interface_.desktopagent.md#raiseintent)
* [resolve](_interface_.desktopagent.md#resolve)

---

## Methods

<a id="broadcast"></a>

###  broadcast

▸ **broadcast**(context: *[Context](../modules/_interface_.md#context)*): `void`

*Defined in [interface.ts:86](https://github.com/nkolba/API/blob/d58cd4b/src/interface.ts#L86)*

Publishes context to other apps on the desktop.

**Parameters:**

| Param | Type |
| ------ | ------ |
| context | [Context](../modules/_interface_.md#context) |

**Returns:** `void`

___
<a id="contextlistener"></a>

###  contextListener

▸ **contextListener**(handler: *`function`*): [Listener](_interface_.listener.md)

*Defined in [interface.ts:101](https://github.com/nkolba/API/blob/d58cd4b/src/interface.ts#L101)*

Listens to incoming context broadcast from the Desktop Agent.

**Parameters:**

| Param | Type |
| ------ | ------ |
| handler | `function` |

**Returns:** [Listener](_interface_.listener.md)

___
<a id="intentlistener"></a>

###  intentListener

▸ **intentListener**(intent: *[IntentName](../modules/_interface_.md#intentname)*, handler: *`function`*): [Listener](_interface_.listener.md)

*Defined in [interface.ts:96](https://github.com/nkolba/API/blob/d58cd4b/src/interface.ts#L96)*

Listens to incoming Intents from the Agent.

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | [IntentName](../modules/_interface_.md#intentname) |
| handler | `function` |

**Returns:** [Listener](_interface_.listener.md)

___
<a id="open"></a>

###  open

▸ **open**(name: *`String`*, context?: *[Context](../modules/_interface_.md#context)*): `Promise`<`void`>

*Defined in [interface.ts:71](https://github.com/nkolba/API/blob/d58cd4b/src/interface.ts#L71)*

Launches/links to an app by name.

If a Context object is passed in, this object will be provided to the opened application via a contextListener. The Context argument is functionally equivalent to opening the target app with no context and broadcasting the context directly to it.

If opening errors, it returns an `Error` with a string from the `OpenError` enumeration.

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `String` |
| `Optional` context | [Context](../modules/_interface_.md#context) |

**Returns:** `Promise`<`void`>

___
<a id="raiseintent"></a>

###  raiseIntent

▸ **raiseIntent**(intent: *[IntentName](../modules/_interface_.md#intentname)*, context: *[Context](../modules/_interface_.md#context)*, target?: *`String`*): `Promise`<[IntentResolution](_interface_.intentresolution.md)>

*Defined in [interface.ts:91](https://github.com/nkolba/API/blob/d58cd4b/src/interface.ts#L91)*

Raises an intent to the desktop agent to resolve.

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | [IntentName](../modules/_interface_.md#intentname) |
| context | [Context](../modules/_interface_.md#context) |
| `Optional` target | `String` |

**Returns:** `Promise`<[IntentResolution](_interface_.intentresolution.md)>

___
<a id="resolve"></a>

###  resolve

▸ **resolve**(intent: *[IntentName](../modules/_interface_.md#intentname)*, context?: *[Context](../modules/_interface_.md#context)*): `Promise`<`Array`<[ActionMetadata](_interface_.actionmetadata.md)>>

*Defined in [interface.ts:81](https://github.com/nkolba/API/blob/d58cd4b/src/interface.ts#L81)*

Resolves an intent & context pair to a mapping of Intents and Apps (action metadata).

Resolve is effectively granting programmatic access to the Desktop Agent's resolver. Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific. If intent argument is falsey, then all possible intents - and apps corresponding to the intents - are resolved for the provided context. If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | [IntentName](../modules/_interface_.md#intentname) |
| `Optional` context | [Context](../modules/_interface_.md#context) |

**Returns:** `Promise`<`Array`<[ActionMetadata](_interface_.actionmetadata.md)>>

___

