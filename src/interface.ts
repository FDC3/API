export type Context = any;

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
 * the result of calling desktopAgent.resolve() is `Promise<Array<ResolveResult>>`
 * the IntentResolution contains the app meta data for apps
 * which support the intent
 */
export interface ResolveResult {
    metaData: AppMetadata;
}

/**
 * the result of calling desktopAgent.resolveContext() is `Promise<Array<ResolveContextResult>>`
 * the ResolveContextResult contains the intent name and and array of
 * app meta data for apps which support the intent
 */
export interface ResolveContextResult {
    intentName: string;
    targets: Array<AppMetadata>;
}

/**
 * an FDC3 Intent
 */
export interface Intent {
  /**
   * name of the intent verb
   */
  name: string;
  /**
   * name of the intent verb
   */
  context: Context;
  /**
   * the application meta data, typically from an IntentResolution
   */
  target?: AppMetadata;
}

/**
 * App metadata is Desktop Agent specific - but should support a name property.
 */
export interface AppMetadata {
  id: string;
  name: string;
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
   * Launches/links to an app by name.
   * 
   * If opening errors, it returns an `Error` with a string from the `OpenError` enumeration.
   */
  open(app: AppMetadata, context: Context): Promise<void>;

  /**
   * fire an intent and forget about it
   * 
   * If firing errors, it returns an `Error` with a string from the `ResolveError` or `OpenError` enumerations.
   */
  fire(intent: Intent): Promise<void>;

  /**
   * Resolves a intent & context pair to a list of App names/metadata.
   *
   * Resolve is effectively granting programmatic access to the Desktop Agent's resolver. 
   * Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific.
   * If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.
   */
  resolve(intent: Intent): Promise<Array<ResolveResult>>;

  /**
   * Resolves a intent & context pair to a list of App names/metadata.
   *
   * Resolve is effectively granting programmatic access to the Desktop Agent's resolver. 
   * Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific.
   * If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.
   */
  resolveContext(context: Context): Promise<Array<ResolveContextResult>>;

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
  intentListener(intent: string, handler: (context: Context) => void): Listener;

  /**
   * Listens to incoming context broadcast from the Desktop Agent.
   */
  contextListener(handler: (context: Context) => void): Listener;
}
