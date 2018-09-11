[fdc3-api](../README.md) > [Intent](../interfaces/intent.md)

# Interface: Intent

## Hierarchy

**Intent**

## Index

### Properties

* [context](intent.md#context)
* [intent](intent.md#intent-1)
* [target](intent.md#target)

### Methods

* [send](intent.md#send)

---

## Properties

<a id="context"></a>

###  context

**● context**: *[Context](../#context)*

*Defined in [interface.ts:20](../../src/interface.ts#L20)*

___
<a id="intent-1"></a>

###  intent

**● intent**: *[IntentName](../#intentname)*

*Defined in [interface.ts:19](../../src/interface.ts#L19)*

___
<a id="target"></a>

### `<Optional>` target

**● target**: *[AppIdentifier](../#appidentifier)*

*Defined in [interface.ts:25](../../src/interface.ts#L25)*

Name of app to target for the Intent. Use if creating an explicit intent that bypasses resolver and goes directly to an app.

___

## Methods

<a id="send"></a>

###  send

▸ **send**(context: *[Context](../#context)*, target?: *[AppIdentifier](../#appidentifier)*): `Promise`<`void`>

*Defined in [interface.ts:34](../../src/interface.ts#L34)*

Dispatches the intent with the Desktop Agent.

Accepts context data and target (if an explicit Intent) as optional args. Returns a Promise - resolving if the intent successfully results in launching an App. If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.

**Parameters:**

| Param | Type |
| ------ | ------ |
| context | [Context](../#context) |
| `Optional` target | [AppIdentifier](../#appidentifier) |

**Returns:** `Promise`<`void`>

___

