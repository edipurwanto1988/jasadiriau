type Props = {
  message: Record<string, (params: any) => string>;
  label?: Record<string, string>;
  param?: {
    type: string;
    path: string;
  };
};

const dProp = {
  label: {},
  message: {},
  param: {
    type: "type",
    path: "path",
  },
};

const useParseError = (props: Props) => {
  const prop = {
    ...dProp,
    ...props,
  };

  const parse = (resp: any, error: Record<string, string> = {}) => {
    if (Array.isArray(resp)) {
      resp.forEach((r) => parse(r, error));
    } else {
      if (prop.hasOwnProperty("message")) {
        const hasType = prop.message.hasOwnProperty(resp[prop.param.type]);
        if (hasType) {
          Object.assign(error, {
            [resp[prop.param.path]]: prop.message[resp[prop.param.type]]({
              ...resp,
              label: prop.label[resp[prop.param.path]] || resp[prop.param.path],
            }),
          });
        }
      }
    }
    return error;
  };

  return { parse };
};

export default useParseError;
