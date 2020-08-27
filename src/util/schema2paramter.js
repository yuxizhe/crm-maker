import { getParameters } from 'codesandbox/lib/api/define';
import generageCode from './DSL';
import enrichSchema from './schemaEnrich';

export default function Code2Params (schema) {
  const enriched = enrichSchema(schema);
  const DSLcode = generageCode(enriched);
  const parameters = getParameters({
    files: {
      'maker/index.js': {
        content: DSLcode.panelDisplay[0].panelValue,
      },
      'maker/store.js': {
        content: DSLcode.panelDisplay[1].panelValue,
      },
      'src/utils/httpclient.js': {
        content: `export default {
          get() {
            return new Promise((resolve, reject) => {
              setTimeout(
                () =>
                  resolve({
                    data: "",
                    error_description: null,
                    error_code: 0,
                    success: true
                  }),
                1000
              );
            });
          },
          post() {
            return new Promise((resolve, reject) => {
              setTimeout(
                () =>
                  resolve({
                    data: "",
                    error_description: null,
                    error_code: 0,
                    success: true
                  }),
                1000
              );
            });
          }
        };
        `
      },
      'package.json': {
        content: {
          "dependencies": {
            "antd": "3.26.18",
            "mobx": "5.15.6",
            "mobx-react": "6.2.5",
            "moment": "2.27.0",
            "react": "latest",
            "react-dom": "latest"
          },
          "keywords": [],
          "name": "antd-maker",
          "description": ""
        }
      },
      'index.html': {
        content: `<div id="container"></div>`,
      },
      'index.js': {
        content: `
        import React from "react";
        import ReactDOM from "react-dom";
        import "antd/dist/antd.css";
        import Maker from "./maker";
        
        ReactDOM.render(<Maker />, document.getElementById("container"));
        `
      }
    }
  });
  return parameters;
}