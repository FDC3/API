
API
===

API Working Group repository.

See the [specification draft](/Specification-Draft.MD) for the current working documentation, and the [FDC3 Confluence page](https://finosfoundation.atlassian.net/wiki/spaces/FDC3) for further information.

### Development

```
yarn install
```

When making changes to the TypeScript interfaces, run `yarn test` to ensure there are no syntax errors, and `yarn run doc` to regenerate the documentation.

## Index

### Enumerations

* [OpenError](enums/openerror.md)
* [ResolveError](enums/resolveerror.md)

### Interfaces

* [ActionMetadata](interfaces/actionmetadata.md)
* [AppMetadata](interfaces/appmetadata.md)
* [DesktopAgent](interfaces/desktopagent.md)
* [IntentMetadata](interfaces/intentmetadata.md)
* [IntentResolution](interfaces/intentresolution.md)
* [Listener](interfaces/listener.md)

### Type aliases

* [ActionMap](#actionmap)
* [AppIdentifier](#appidentifier)
* [Context](#context)
* [IntentName](#intentname)

---

## Type aliases

<a id="actionmap"></a>

###  ActionMap

**Ƭ ActionMap**: *[ActionMetadata](interfaces/actionmetadata.md)[]*

*Defined in [interface.ts:18](/src/interface.ts#L18)*

___
<a id="appidentifier"></a>

###  AppIdentifier

**Ƭ AppIdentifier**: *`String`*

*Defined in [interface.ts:3](/src/interface.ts#L3)*

___
<a id="context"></a>

###  Context

**Ƭ Context**: *`Object`*

*Defined in [interface.ts:1](/src/interface.ts#L1)*

___
<a id="intentname"></a>

###  IntentName

**Ƭ IntentName**: *`String`*

*Defined in [interface.ts:2](/src/interface.ts#L2)*

___

