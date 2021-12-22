import { renderPage } from '../@astro/internal/index';

import { b64EncodeUnicode } from "./b64";

export async function renderAstroToHTML(content: string, ModuleWorkerSupported: boolean): Promise<string | { errors: string[] }> {
  let mod;
  let html;

  var bundler;
  try {
      if (ModuleWorkerSupported) {
          const url = `data:application/javascript;base64,${b64EncodeUnicode(content)}`;
          ({ default: mod } = await import(url));
      } else {
          ({ default: mod } = new Function(`${content} return bundler;`)());
      }
  } catch (e) {
      return {
          errors: e
      }
  }
  if (!mod) {
      return;
  }

  try {
    html = await renderPage(
      {
        styles: new Set(),
        scripts: new Set(),
        /** This function returns the `Astro` faux-global */
        createAstro(astroGlobal: any, props: Record<string, any>, slots: Record<string, any> | null) {
          const url = new URL('http://localhost:3000/');
          const canonicalURL = url;
          return {
            __proto__: astroGlobal,
            props,
            request: {
              canonicalURL,
              params: {},
              url,
            },
            slots: Object.fromEntries(Object.entries(slots || {}).map(([slotName]) => [slotName, true])),
          };
        },
      },
      await mod, {}, {});
  } catch (e) {
    return {
      errors: e // [e],
    };
  }
  return html;
}
