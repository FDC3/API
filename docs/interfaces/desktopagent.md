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
* [intent](desktopagent.md#intent)
* [intentListener](desktopagent.md#intentlistener)
* [open](desktopagent.md#open)
* [resolve](desktopagent.md#resolve)

---

## Methods

<a id="broadcast"></a>

###  broadcast

▸ **broadcast**(context: *[Context](../#context)*): `void`

*Defined in [interface.ts:80](/src/interface.ts#L80)*

Publishes context to other apps on the desktop.

**Parameters:**

| Param | Type |
| ------ | ------ |
| context | [Context](../#context) |

**Returns:** `void`

___
<a id="contextlistener"></a>

###  contextListener

▸ **contextListener**(handler: *`function`*): [Listener](listener.md)

*Defined in [interface.ts:95](/src/interface.ts#L95)*

Listens to incoming context broadcast from the Desktop Agent.

**Parameters:**

| Param | Type |
| ------ | ------ |
| handler | `function` |

**Returns:** [Listener](listener.md)

___
<a id="intent"></a>

###  intent

▸ **intent**(intent: *[IntentName](../#intentname)*, context: *[Context](../#context)*, target: *`String`*): [Intent](intent.md)

*Defined in [interface.ts:85](/src/interface.ts#L85)*

Constructs a new intent

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | [IntentName](../#intentname) |
| context | [Context](../#context) |
| target | `String` |

**Returns:** [Intent](intent.md)

___
<a id="intentlistener"></a>

###  intentListener

▸ **intentListener**(intent: *[IntentName](../#intentname)*, handler: *`function`*): [Listener](listener.md)

*Defined in [interface.ts:90](/src/interface.ts#L90)*

Listens to incoming Intents from the Agent.

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | [IntentName](../#intentname) |
| handler | `function` |

**Returns:** [Listener](listener.md)

___
<a id="open"></a>

###  open

▸ **open**(name: *`String`*, context: *[Context](../#context)*): `Promise`<`void`>

*Defined in [interface.ts:66](/src/interface.ts#L66)*

Launches/links to an app by name.

If opening errors, it returns an `Error` with a string from the `OpenError` enumeration.

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `String` |
| context | [Context](../#context) |

**Returns:** `Promise`<`void`>

___
<a id="resolve"></a>

###  resolve

▸ **resolve**(intent: *[IntentName](../#intentname)*, context: *[Context](../#context)*): `Promise`<`Array`<[AppMetadata](appmetadata.md)>>

*Defined in [interface.ts:75](/src/interface.ts#L75)*

Resolves a intent & context pair to a list of App names/metadata.

Resolve is effectively granting programmatic access to the Desktop Agent's resolver. Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific. If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | [IntentName](../#intentname) |
| context | [Context](../#context) |

**Returns:** `Promise`<`Array`<[AppMetadata](appmetadata.md)>>

___

