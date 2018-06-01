[fdc3-api](../README.md) > ["interface"](../modules/_interface_.md) > [Intent](../interfaces/_interface_.intent.md)

# Interface: Intent

## Hierarchy

**Intent**

## Index

### Properties

* [context](_interface_.intent.md#context)
* [intent](_interface_.intent.md#intent)
* [target](_interface_.intent.md#target)

### Methods

* [send](_interface_.intent.md#send)

---

## Properties

<a id="context"></a>

###  context

**● context**: *[Context](../modules/_interface_.md#context)*

*Defined in [interface.ts:20](https://github.com/ColinEberhardt/API/blob/eac0696/src/interface.ts#L20)*

___
<a id="intent"></a>

###  intent

**● intent**: *[IntentName](../modules/_interface_.md#intentname)*

*Defined in [interface.ts:19](https://github.com/ColinEberhardt/API/blob/eac0696/src/interface.ts#L19)*

___
<a id="target"></a>

### `<Optional>` target

**● target**: *[AppIdentifier](../modules/_interface_.md#appidentifier)*

*Defined in [interface.ts:25](https://github.com/ColinEberhardt/API/blob/eac0696/src/interface.ts#L25)*

Name of app to target for the Intent. Use if creating an explicit intent that bypasses resolver and goes directly to an app.

___

## Methods

<a id="send"></a>

###  send

▸ **send**(context: *[Context](../modules/_interface_.md#context)*, target?: *[AppIdentifier](../modules/_interface_.md#appidentifier)*): `Promise`<`void`>

*Defined in [interface.ts:34](https://github.com/ColinEberhardt/API/blob/eac0696/src/interface.ts#L34)*

Dispatches the intent with the Desktop Agent.

Accepts context data and target (if an explicit Intent) as optional args. Returns a Promise - resolving if the intent successfully results in launching an App. If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.

**Parameters:**

| Param | Type |
| ------ | ------ |
| context | [Context](../modules/_interface_.md#context) |
| `Optional` target | [AppIdentifier](../modules/_interface_.md#appidentifier) |

**Returns:** `Promise`<`void`>

___

