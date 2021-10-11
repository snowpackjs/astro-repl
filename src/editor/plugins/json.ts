// Based on https://github.com/okikio/bundle/blob/main/src/ts/plugins/json.ts
import { CDN_NAMESPACE } from './cdn';
import { fetchPkg } from './http';

import type { Plugin } from 'esbuild';

export const JSON_NAMESPACE = 'json-file';
export const JSON_PLUGIN = (): Plugin => {
    return {
        name: 'json',
        setup(build) {
            build.onLoad({ namespace: CDN_NAMESPACE, filter: /\.json$/ }, async (args) => {
                const pathUrl = new URL(args.path, args.pluginData.parentUrl).toString();
                const { content, url } = await fetchPkg(pathUrl);

                return {
                    contents: `\
export const value = ${content};
export default value;`,
                    pluginData: {
                        parentUrl: url,
                    },
                };
            });
        }
    };
};