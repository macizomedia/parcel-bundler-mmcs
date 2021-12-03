const evSpaRendered = (to: string) =>
  new CustomEvent("spa-rendered", { detail: { to } });

// window.addEventListener('spa-rendered', console.log)

export const ROUTER_MODE = "__routerMode__" as string;

export function parseUrl(mode = ROUTER_MODE) {
  let url = location.hash.substr(1);

  if (mode === "history") {
    url = location.pathname;
  }

  const output = {
    url,
    path: "",
    queryString: "",
    hash: "",
    query: {} as Record<string, string | string[]>,
  };

  const isReading = () => {
    return ["path", "queryString", "hash"][isReadingIndex] || "hash";
  };
  let isReadingIndex = 0;
  let toRead = url;

  if (url.startsWith("/")) {
    isReadingIndex = 0;
  } else if (url.startsWith("?")) {
    isReadingIndex = 1;
    toRead = url.substr(1);
  } else if (url.startsWith("#")) {
    isReadingIndex = 2;
    toRead = url.substr(1);
  } else {
    isReadingIndex = 2;
  }

  toRead.split("").map((c) => {
    if (c === "?" && isReadingIndex < 1) {
      isReadingIndex = 1;
      return;
    } else if (c === "#" && isReadingIndex < 2) {
      isReadingIndex = 2;
      return;
    }

    (output as any)[isReading()] = (output as any)[isReading()] + c;
  });

  for (const kv of output.queryString.split("&")) {
    const [k, v] = kv.split("=");
    if (!output.query[k]) {
      output.query[k] = v;
    } else if (Array.isArray(output.query[k])) {
      output.query[k] = [...output.query[k], v];
    } else {
      output.query[k] = [output.query[k] as string, v];
    }
  }

  return output;
}
