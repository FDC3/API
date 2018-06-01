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
* [intent](_interface_.desktopagent.md#intent)
* [intentListener](_interface_.desktopagent.md#intentlistener)
* [open](_interface_.desktopagent.md#open)
* [resolve](_interface_.desktopagent.md#resolve)

---

## Methods

<a id="broadcast"></a>

###  broadcast

▸ **broadcast**(context: *[Context](../modules/_interface_.md#context)*): `void`

*Defined in [interface.ts:80](https://github.com/ColinEberhardt/API/blob/eac0696/src/interface.ts#L80)*

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

*Defined in [interface.ts:95](https://github.com/ColinEberhardt/API/blob/eac0696/src/interface.ts#L95)*

Listens to incoming context broadcast from the Desktop Agent.

**Parameters:**

| Param | Type |
| ------ | ------ |
| handler | `function` |

**Returns:** [Listener](_interface_.listener.md)

___
<a id="intent"></a>

###  intent

▸ **intent**(intent: *[IntentName](../modules/_interface_.md#intentname)*, context: *[Context](../modules/_interface_.md#context)*, target: *`String`*): [Intent](_interface_.intent.md)

*Defined in [interface.ts:85](https://github.com/ColinEberhardt/API/blob/eac0696/src/interface.ts#L85)*

Constructs a new intent

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | [IntentName](../modules/_interface_.md#intentname) |
| context | [Context](../modules/_interface_.md#context) |
| target | `String` |

**Returns:** [Intent](_interface_.intent.md)

___
<a id="intentlistener"></a>

###  intentListener

▸ **intentListener**(intent: *[IntentName](../modules/_interface_.md#intentname)*, handler: *`function`*): [Listener](_interface_.listener.md)

*Defined in [interface.ts:90](https://github.com/ColinEberhardt/API/blob/eac0696/src/interface.ts#L90)*

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

▸ **open**(name: *`String`*, context: *[Context](../modules/_interface_.md#context)*): `Promise`<`void`>

*Defined in [interface.ts:66](https://github.com/ColinEberhardt/API/blob/eac0696/src/interface.ts#L66)*

Launches/links to an app by name.

If opening errors, it returns an `Error` with a string from the `OpenError` enumeration.

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `String` |
| context | [Context](../modules/_interface_.md#context) |

**Returns:** `Promise`<`void`>

___
<a id="resolve"></a>

###  resolve

▸ **resolve**(intent: *[IntentName](../modules/_interface_.md#intentname)*, context: *[Context](../modules/_interface_.md#context)*): `Promise`<`Array`<[AppMetadata](_interface_.appmetadata.md)>>

*Defined in [interface.ts:75](https://github.com/ColinEberhardt/API/blob/eac0696/src/interface.ts#L75)*

Resolves a intent & context pair to a list of App names/metadata.

Resolve is effectively granting programmatic access to the Desktop Agent's resolver. Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific. If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | [IntentName](../modules/_interface_.md#intentname) |
| context | [Context](../modules/_interface_.md#context) |

**Returns:** `Promise`<`Array`<[AppMetadata](_interface_.appmetadata.md)>>

___

