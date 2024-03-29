import request, { RequestDocument } from "graphql-request";
import { QueryClient } from "react-query";

type AnyObject = {
  [key: string]: any;
};

export const getQueryClient = () => {
  let client: QueryClient | null = null;
  if (!client) client = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: Infinity,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
      }
    }
  });
  return client;
};

const BASE_URL = "http://localhost:8181/graphql";

export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: AnyObject;
  params?: AnyObject;
}) => {
  try {
    let url = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
    };

    if (params) {
      const searchParams = new URLSearchParams(params);
      url += '?' + searchParams.toString();
    }

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export const graphqlFetcher = <T = unknown>(query: RequestDocument, variables = {}): Promise<T> =>
  request(BASE_URL, query, variables)

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: 'CART'
};
