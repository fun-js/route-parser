export type RouteNamedSegments = { [key: string]: string };

export interface RouteMatcher {
  route: string;
  match(route?: string): RouteNamedSegments | false;
}

export interface RouterOptions {
  delimiter?: string;
  namedSegment?: string;
}

export default function Router(route?: string, options?: RouterOptions): RouteMatcher;
