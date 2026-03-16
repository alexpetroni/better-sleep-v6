import { n as noop, g as getContext, e as escape_html } from "../../chunks/index.js";
import "clsx";
import { w as writable } from "../../chunks/exports.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../chunks/utils.js";
function create_updated_store() {
  const { set, subscribe } = writable(false);
  {
    return {
      subscribe,
      // eslint-disable-next-line @typescript-eslint/require-await
      check: async () => false
    };
  }
}
const is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
const placeholder_url = "a:";
if (is_legacy) {
  ({
    data: {},
    form: null,
    error: null,
    params: {},
    route: { id: null },
    state: {},
    status: -1,
    url: new URL(placeholder_url)
  });
}
const stores = {
  updated: /* @__PURE__ */ create_updated_store()
};
({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="min-h-screen bg-gray-50 flex items-center justify-center px-4"><div class="bg-white rounded-xl p-8 shadow-lg max-w-lg w-full"><h1 class="text-2xl font-bold text-red-600 mb-4">Error ${escape_html(page.status)}</h1> <p class="text-gray-700 mb-4">${escape_html(page.error?.message)}</p> <a href="/" class="text-indigo-600 hover:text-indigo-800">Go back home</a></div></div>`);
  });
}
export {
  _error as default
};
