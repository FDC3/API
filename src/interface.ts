type Context = Object;

enum OpenError {
  AppNotFound = "AppNotFound",
  ErrorOnLaunch = "ErrorOnLaunch",
  AppTimeout = "AppTimeout",
  ResolverUnavailable = "ResolverUnavailable"
}

enum ResolveError {
  NoAppsFound = "NoAppsFound",
  ResolverUnavailable = "ResolverUnavailable",
  ResolverTimeout = "ResolverTimeout"
}

type ActionMap = ActionMetadata[]

 /**
 * Intent descriptor
 */ 
interface IntentMetadata {
  name:String;
  displayName:String;
}

 /**
 * Provides a mapping of Apps to Intents
 */ 
interface ActionMetadata {
  intent:IntentMetadata;
  apps:AppMetadata[];
}


/**
 * App metadata is Desktop Agent specific - but should support a name property.
 */
interface AppMetadata {
  name: String;
}

/**
 * IntentResolution provides a standard format for data returned upon resolving an intent.
 * ```javascript
 * //resolve a "Chain" type intent
 * var intentR = await agent.raiseIntent("intentName", context);
 * //resolve a "Client-Service" type intent with data response
 * var intentR = await agent.raiseIntent("intentName", context);
 * var dataR = intentR.data;
 * ```
 */
interface IntentResolution {
  source: String;
  data?: Object; 
  version: String;
}

interface Listener {
  /**
   * Unsubscribe the listener object.
   */
  unsubscribe();
}

/**
 * A Desktop Agent is a desktop component (or aggregate of components) that serves as a
 * launcher and message router (broker) for applications in its domain.
 * 
 * A Desktop Agent can be connected to one or more App Directories and will use directories for application
 * identity and discovery. Typically, a Desktop Agent will contain the proprietary logic of
 * a given platform, handling functionality like explicit application interop workflows where
 * security, consistency, and implementation requirements are proprietary.
 */
interface DesktopAgent {
  /**
   * Launches/links to an app by name.
   * 
   * If a Context object is passed in, this object will be provided to the opened application via a contextListener.
   * The Context argument is functionally equivalent to opening the target app with no context and broadcasting the context directly to it.
   *
   * If opening errors, it returns an `Error` with a string from the `OpenError` enumeration.
   * 
   *  ```javascript
   *     //no context
   *     agent.open('myApp');
   *     //with context
   *     agent.open('myApp', context);
   * ```
   */
  open(name: String, context?: Context): Promise<void>;

  /**
   * Resolves an intent & context pair to a mapping of Intents and Apps (action metadata).
   *
   * Resolve is effectively granting programmatic access to the Desktop Agent's resolver. 
   * Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific.
   * If intent argument is falsey, then all possible intents - and apps corresponding to the intents - are resolved for the provided context.
   * If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.
   * 
   * ```javascript
   * //find what Apps can support SartChat with the given context structure
   * var intentR = await agent.resolve("StartChat", context);
   * 
   * //find what Intents and Apps are supported for a given context
   * var actionR = await agent.resolve(false, context);
   * ```
   */
  resolve(intent: String, context?: Context): Promise<Array<ActionMetadata>>;

  /**
   * Publishes context to other apps on the desktop.
   * ```javascript
   *  agent.broadcast(context);
   * ```
   */
  broadcast(context: Context): void;

  /**
   * Raises an intent to the desktop agent to resolve.
   * ```javascript
   * //raise an intent to start a chat with a given contact
   * var intentR = await agent.resolve("StartChat", context);
   * //use the IntentResolution object to target the same chat app with a new context
   * agent.resolve("StartChat", newContext, intentR.source);
   * ```
   */
  raiseIntent(intent: String, context: Context, target?: String): Promise<IntentResolution>;

  /**
   * Listens to incoming Intents from the Agent.
   */
  intentListener(intent: String, handler: (context: Context) => void): Listener;

  /**
   * Listens to incoming context broadcast from the Desktop Agent.
   */
  contextListener(handler: (context: Context) => void): Listener;
}