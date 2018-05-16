# Overview
FDC3 API standards support the following goals:
- Create consistent developer interface for working with FDC3 
- Standardize interfaces for reference implementations
- Standardize interfaces between Desktop Agents
# 1. Components
## 1.1 Desktop Agent
A Desktop Agent is a desktop component (or aggregate of components) that serves as a launcher and message router (broker) for applications in its domain.  A Desktop Agent can be connected to one or more App Directories and will use directories for application identity and discovery. Typically, a Desktop Agent will contain the proprietary logic of a given platform, handling functionality like explicit application interop workflows where security, consistency, and implementation requirements are proprietary.  

Examples of Desktop Agents include:

- OpenFin
- Autobahn
- ThomsonReuters Eikon

Desktop Agents expose an FDC3 standard API to applications in their own domain.  
## 1.2 Application
An application is any endpoint on the desktop that is:
- Registered with/known by a Desktop Agent
- Launchable by a Desktop Agent
- Addressable by a Desktop Agent

Examples of End Points include:
- Native Applications
- PWA/Web Applications
- Headless “services” running on the desktop 
# 2. Functional Use Cases
## 2.1 Open an Application by Name
Linking from one application to another is a critical basic workflow that the web revolutionized via the hyperlink.  Supporting semantic addressing of applications across different technologies and platform domains greatly reduces friction in linking different applications into a single workflow.
## 2.2 Link to functionality by Intent
Often, we want to link from one app to another to chain together workflow.  Enabling this without apps needing prior knowledge of each other is a key goal of FDC3.   Intent workflows fall into the following types:
- Chain:  in this case the workflow is completely handed off from one app to another (similar to linking).   Currently, this is the primary focus in FDC3
- Client-Service: In these cases,  a Client invokes a Service via the Intent, the Service performs some function, then passes the workflow back to the Client.  Usually, there is a data payload associated with this workflow and a request/response pattern.
## 2.3 Register an Intent
Applications need to let the system know the Intents they can support.  Typically, this is done via registration with the App Directory.  It is also possible for Intents to be registered at the application level as well to support ad-hoc registration which may be helpful at development time.  While, dynamic registration is not part of this specification, a Desktop Agent agent may choose to support any number of registration paths.
## 2.4 Send/broadcast context  
On the financial desktop, applications often want to broadcast context to any number of applications.  Context sharing needs to support concepts of different groupings of applications as well as data privacy concerns.  Each Desktop Agent will have its own rules for supporting these features.  
# 3. Resolvers
Intents functionality is dependent on resolver functionality to map the intent to a specific App.  This will often require end-user input.  Resolution can either be performed by the Desktop Agent (raising UI to pick the desired App for the intent) or by the app launching the intent - in which case the calling App will handle the resolution itself (using the resolve API below) and then invoke an explicit Intent object.
# 4. APIs
Note - these APIs are specified in pseudo-code and for convenience written in a synchronous style.  Many or all implementations would be expected to be async using a Promise or callback pattern.  
## 4.1 Agent Namespace

Each Desktop Agent will expose the defined APIs via namespacing of its choosing.  For example, a global javascript object can be defined with the API, or the API could be imported into a local scope via a module. For the sake of illustration, the API in the examples in this spec are referred to via the (fictional) **fdc3** object.

## 4.2 open
Launches/links to an app by name.
Returns a Promise - resolving if the app is opened, rejecting if an error occurs.
```script
fdc3.open(name: String, context: Object) > Promise
```

### 4.2.1 Error States
- App not found
- Error on App launch
- App timeout
- Resolver crashed / unavailable

*Note:* open no longer takes an ‘intent’ argument.  This is now moved to the more specific Intent API below.
## 4.3 resolve
Resolves a intent & context pair to a list of App names/metadata. 

Resolve is effectively granting programmatic access to the Desktop Agent's resolver.  Returns a promise, resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific. The returned array of objects should support a Name property that is the name of the app.
```script
fdc3.resolve(intent: String, context: Object) > Promise
```
### 4.3.1 Error States
- No Apps found
- Resolver crashed / unavailable
- Timeout from Resolver

*Note:* This method could also be used by federated Desktop Agents to query for resolution from other Desktop Agents (and then aggregate results).
## 4.4 broadcast
Publishes context to other apps on the desktop.  
```script
fdc3.broadcast(context: Object) 
```
## 4.5 Intent Object
### 4.5.1 Constructor
```script
new fdc3.Intent(intent: String, context: Object, target: String)
```
All arguments to constructor are optional.

### 4.5.2 intent
Getter/Setter for name of the intent.
```script
Intent.intent = "...";
```

### 4.5.2 context
Getter/Setter for context data on the intent.
```script
Intent.context = {...};
```
### 4.5.3 target
Getter/Setter.  Name of app to target for the Intent. Use if creating an explicit intent that bypasses resolver and goes directly to an app.

### 4.5.4 send
Dispatches the intent with the Desktop Agent.  Accepts context data and target (if an explicit Intent) as optional args.  Returns a Promise - resolving if the intent successfully results in launching an App, rejecting if an error state occurs.
```script	
	Intent.send(context: Object, target: String) > Promise
```


#### 4.5.4.1 Error States
- No Apps found
- Resolver crashed / unavailable
- Timeout from Resolver

## 4.6 IntentListener Object
Listens to incoming Intents from the Agent.
### 4.6.1 Constructor
Accepts name of Intent to handle and handler function
```script
var listen =  new fdc3.IntentListener(“ViewChart”, context => {...});
```
## 4.7 ContextListener Object
Listens to incoming context broadcast from the Desktop Agent.
### 4.7.1 Constructor 

Channel discovery and joining to be investigated further.  Currently, this would be handled by the Desktop Agent and external to the App.
```script
var listen =  new fdc3.ContextListener( handler: Function);
```
# 5. Appendix
## 5.1 Proposed Selector Syntax
A selector syntax for app discovery and connectivity.  For example:
```script
fdc3.publish("group .topic",{ctx}) 
```
Publishes on the declared topic within the group. 

Listeners could declare similar selectors:
```script
new fdc3.contextListener("#RSRCHXChange",function(){}) 
```
Listens to a context sent from the RSRCHXchange app


