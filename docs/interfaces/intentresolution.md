[fdc3-api](../README.md) > [IntentResolution](../interfaces/intentresolution.md)

# Interface: IntentResolution

IntentResolution provides a standard format for data returned upon resolving an intent.

```javascript
//resolve a "Chain" type intent
var intentR = await agent.raiseIntent("intentName", context);
//resolve a "Client-Service" type intent with data response
var intentR = await agent.raiseIntent("intentName", context);
var dataR = intentR.data;
```

## Hierarchy

**IntentResolution**

## Index

### Properties

* [data](intentresolution.md#data)
* [source](intentresolution.md#source)
* [version](intentresolution.md#version)

---

## Properties

<a id="data"></a>

### `<Optional>` data

**● data**: *`Object`*

*Defined in [interface.ts:56](/src/interface.ts#L56)*

___
<a id="source"></a>

###  source

**● source**: *`String`*

*Defined in [interface.ts:55](/src/interface.ts#L55)*

___
<a id="version"></a>

###  version

**● version**: *`String`*

*Defined in [interface.ts:57](/src/interface.ts#L57)*

___

