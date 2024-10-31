export const ROUTE_PARAMS_KEYS = {
  address: "address",
} as const;

export type RouteParamKey = keyof typeof ROUTE_PARAMS_KEYS;
export type RouteParams<P extends RouteParamKey> = Record<P, string>;
export type MakePageProps<P extends RouteParamKey> = {
  params: RouteParams<P>;
};
