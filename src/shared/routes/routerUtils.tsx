import React from "react";
import qs from "qs";
import {
  RouteProps,
  RouteComponentProps,
  generatePath,
} from "react-router-dom";

type RenderContentProps = RouteProps & {
  props: RouteComponentProps;
};

export const renderContent = ({
  component: Component,
  render,
  children,
  props,
}: RenderContentProps) => {
  if (children) {
    return children;
  }

  if (Component) {
    return <Component {...props} />;
  }

  if (typeof render === "function") {
    return render(props);
  }

  return null;
};

// TODO: BuildUrlPath = all string values from URLType
// type URLType = typeof APP_URL;

export type BuildUrlPath = string;

export type BuildUrlOptions = {
  queryParams?: Record<string, any>;
  pathParams?: Record<string, string | number | boolean | undefined>;
};

/**
 * Build url with query and path params.
 *
 * @example
 * buildUrl('/products/:id', { pathParams: { id: 123 }, queryParams: { filter: 'someFilter' } }) // "/products/123?filter=someFilter"
 */
export const buildUrl = (
  path: BuildUrlPath,
  { pathParams, queryParams }: BuildUrlOptions
) => {
  let query = "";
  if (queryParams) {
    const queryParamsString = qs.stringify(queryParams);
    query = queryParamsString.length > 0 ? `?${queryParamsString}` : "";
  }

  const generatedPath = generatePath(path, pathParams);

  return `${generatedPath}${query}`;
};

export function getLocationPaths(
  pathname: string,
  fixedPathNumber = 0
): string[] {
  return pathname
    .replace(/\/$/, "")
    .split("/")
    .filter(Boolean)
    .reduce(
      (result: string[], path: string, index: number) => [
        ...result,
        index < 2 - fixedPathNumber
          ? `/${path}`
          : `${result[result.length - 1]}/${path}`,
      ],
      []
    );
}
