export type Context = any;
export type AppIdentifier = String;
export type IntentName = String;

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

/**
 * the result of calling desktopAgent.resolve() is `Promise<ResolveResults>`
 * the ResolveResult contains the list of apps which support the intent
 */
export interface RaiseIntentResults {
    data: any;
}

/**
 * the result of calling desktopAgent.resolve() is `Promise<ResolveResults>`
 * the ResolveResult contains the list of apps which support the intent
 */
export interface ResolveIntentResults {
    targets: AppMetadata[];
}

/**
 * the result of calling desktopAgent.resolveContext() is `Promise<ResolveContextResults>`
 * the ResolveContextResults contains the list of intents for the given context type
 */
export interface ResolveContextResults {
    intents: ResolveContextResult[];
}

/**
 * a ResolveContextResult models an intent and supported app targets
 */
export interface ResolveContextResult {
    intentName: IntentName;
    targets: Array<AppMetadata>;
}

/**
 * an FDC3 Intent
 */
export interface Intent {
  /**
   * name of the intent verb
   */
  name: IntentName;
  /**
   * context for the intent
   */
  context: Context;
  /**
   * target application meta data, (ex: from a call to resolve)
   */
  target?: AppMetadata;
}

/**
 * App metadata is Desktop Agent specific - but should support a name property.
 * This could be an application as defined by the FDC3 working group.
 */
export interface AppMetadata {
  name: AppIdentifier;
}

export interface Listener {
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
export interface DesktopAgent {
  /**
   * Launches/links to an app by name, this is typically called after a call to resolveIntent
   * 
   * If opening errors, it returns an `Error` with a string from the `OpenError` enumeration.
   */
  open(app: AppMetadata, intent: Intent): Promise<void>;

  /**
   * Resolves a intent & context pair to a list of App names/metadata.
   *
   * Resolve is effectively granting programmatic access to the Desktop Agent's resolver. 
   * Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific.
   * If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.
   */
  resolveIntent(intent: Intent): Promise<ResolveIntentResults>;

  /**
   * Resolves a context to a list of intents supported by the subsystem.
   *
   * ResolveContext is effectively granting programmatic access to the Desktop Agent's resolver. 
   * Returns a promise of type `ResolveContextResults`.  The resolved list of intents is Desktop Agent-specific.
   * If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.
   */
  resolveContext(context: Context): Promise<ResolveContextResults>;

  /**
   * sends an intent, containing a context and optional target
   * 
   * If firing errors, it returns an `Error` with a string from the `ResolveError` or `OpenError` enumerations.
   */
  raiseIntent(intent: Intent): Promise<RaiseIntentResults>;

  /**
   * Publishes context to other apps on the desktop.
   */
  broadcast(context: Context): void;

  /**
   * Constructs a new intent
   */
  newIntent(intent: string, context: Context, target?: AppMetadata): Intent;

  /**
   * Listens to incoming Intents from the Agent.
   */
  newIntentListener(intent: string, handler: (context: Context) => void): Listener;

  /**
   * Listens to incoming context broadcast from the Desktop Agent.
   */
  newContextListener(handler: (context: Context) => void): Listener;
}
