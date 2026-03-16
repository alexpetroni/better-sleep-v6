import "clsx";
import { g as getContext, a0 as ensure_array_like, e as escape_html, a1 as attr, a2 as attr_class, a3 as stringify, a4 as bind_props, $ as derived, a5 as attr_style, a6 as clsx, _ as setContext } from "../../chunks/index.js";
const FORM_STATE_KEY = /* @__PURE__ */ Symbol("form-state");
const TRANSLATE_KEY = /* @__PURE__ */ Symbol("form-translate");
const STEP_ID_KEY = /* @__PURE__ */ Symbol("form-step-id");
function createFormState(config, options = {}) {
  const {
    persist = "sessionStorage",
    storageKey = "formcomp-state",
    debounceMs = 300
  } = options;
  const initial = {};
  for (const step of config.steps) {
    initial[step.id] = {};
  }
  let hydrated = initial;
  let hydratedIndex = 0;
  if (persist && typeof window !== "undefined") {
    try {
      const storage = persist === "sessionStorage" ? sessionStorage : localStorage;
      const stored = storage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.responses) hydrated = { ...initial, ...parsed.responses };
        if (typeof parsed.currentStepIndex === "number") hydratedIndex = parsed.currentStepIndex;
      }
    } catch {
    }
  }
  let responses = hydrated;
  let currentStepIndex = hydratedIndex;
  let saveTimer;
  function scheduleSave() {
    if (!persist || typeof window === "undefined") return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(
      () => {
        try {
          const storage = persist === "sessionStorage" ? sessionStorage : localStorage;
          storage.setItem(storageKey, JSON.stringify({ responses, currentStepIndex }));
        } catch {
        }
      },
      debounceMs
    );
  }
  return {
    get currentStepIndex() {
      return currentStepIndex;
    },
    set currentStepIndex(v) {
      currentStepIndex = v;
      scheduleSave();
    },
    get currentStepId() {
      return config.steps[currentStepIndex]?.id ?? "";
    },
    get stepCount() {
      return config.steps.length;
    },
    nextStep() {
      if (currentStepIndex < config.steps.length - 1) {
        currentStepIndex++;
        scheduleSave();
      }
    },
    prevStep() {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        scheduleSave();
      }
    },
    goToStep(index) {
      if (index >= 0 && index < config.steps.length) {
        currentStepIndex = index;
        scheduleSave();
      }
    },
    getResponse(stepId, questionId) {
      return responses[stepId]?.[questionId];
    },
    setResponse(stepId, questionId, value) {
      if (!responses[stepId]) {
        responses[stepId] = {};
      }
      responses[stepId][questionId] = value;
      scheduleSave();
    },
    getStepResponses(stepId) {
      return responses[stepId] ?? {};
    },
    get allResponses() {
      return responses;
    }
  };
}
function isCompound(c) {
  return "conditions" in c;
}
function evaluateSimple(condition, getResponse, currentStepId) {
  const stepId = condition.stepId ?? currentStepId;
  const response = getResponse(stepId, condition.questionId);
  switch (condition.operator) {
    case "equals":
      return response === condition.value;
    case "not-equals":
      return response !== condition.value;
    case "includes": {
      if (Array.isArray(response)) {
        return response.includes(condition.value);
      }
      return false;
    }
    case "not-includes": {
      if (Array.isArray(response)) {
        return !response.includes(condition.value);
      }
      return true;
    }
  }
}
function evaluateCondition(condition, getResponse, currentStepId) {
  if (isCompound(condition)) {
    const results = condition.conditions.map((c) => evaluateCondition(c, getResponse, currentStepId));
    return condition.operator === "and" ? results.every(Boolean) : results.some(Boolean);
  }
  return evaluateSimple(condition, getResponse, currentStepId);
}
function ProgressBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { steps, currentIndex } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    $$renderer2.push(`<nav aria-label="Progress" class="mb-8"><ol role="list" class="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"><!--[-->`);
    const each_array = ensure_array_like(steps);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let step = each_array[i];
      const isCompleted = i < currentIndex;
      const isCurrent = i === currentIndex;
      const isUpcoming = i > currentIndex;
      $$renderer2.push(`<li class="relative md:flex md:flex-1">`);
      if (isCompleted) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button type="button" class="group flex w-full items-center"><span class="flex items-center px-6 py-4 text-sm font-medium"><span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800"><svg class="size-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg></span> <span class="ml-4 text-sm font-medium text-gray-900">${escape_html(translate2(step.label))}</span></span></button>`);
      } else if (isCurrent) {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`<span class="flex items-center px-6 py-4 text-sm font-medium" aria-current="step"><span class="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-indigo-600"><span class="text-indigo-600">${escape_html(String(i + 1).padStart(2, "0"))}</span></span> <span class="ml-4 text-sm font-medium text-indigo-600">${escape_html(translate2(step.label))}</span></span>`);
      } else if (isUpcoming) {
        $$renderer2.push("<!--[2-->");
        $$renderer2.push(`<span class="group flex items-center"><span class="flex items-center px-6 py-4 text-sm font-medium"><span class="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300"><span class="text-gray-500">${escape_html(String(i + 1).padStart(2, "0"))}</span></span> <span class="ml-4 text-sm font-medium text-gray-500">${escape_html(translate2(step.label))}</span></span></span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (i < steps.length - 1) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true"><svg class="size-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none"><path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round"></path></svg></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></li>`);
    }
    $$renderer2.push(`<!--]--></ol></nav>`);
  });
}
function NavigationButtons($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      showBack = true,
      showNext = true,
      nextLabel = "Next",
      backLabel = "Back"
    } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    $$renderer2.push(`<div class="flex justify-between pt-6 border-t border-gray-200 mt-8"><div>`);
    if (showBack) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button type="button" class="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50">${escape_html(translate2(backLabel))}</button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div>`);
    if (showNext) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button type="button" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">${escape_html(translate2(nextLabel))}</button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function StepContainer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { title, intro, children } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    $$renderer2.push(`<div class="space-y-8">`);
    if (title || intro) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mb-6">`);
      if (title) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<h2 class="text-xl font-bold text-gray-900">${escape_html(translate2(title))}</h2>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (intro) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p class="mt-2 text-sm text-gray-600">${escape_html(translate2(intro))}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    children($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function QuestionGroupWrapper($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { id, label, warning = false, children } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    $$renderer2.push(`<div${attr("id", id)} class="scroll-mt-8">`);
    if (label) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<h3 class="text-base font-semibold text-gray-900 mb-4">${escape_html(translate2(label))}</h3>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`transition-all duration-200 rounded-lg ${stringify(warning ? "ring-2 ring-red-300 bg-red-50/50 p-4" : "")}`)}>`);
    children($$renderer2);
    $$renderer2.push(`<!----></div></div>`);
  });
}
function RadioListGroup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      options,
      value = void 0,
      onchange,
      name = "radio",
      label,
      warning = false
    } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    $$renderer2.push(`<fieldset${attr("aria-label", label ? translate2(label) : void 0)}><div${attr_class("space-y-5", void 0, {
      "ring-2": warning,
      "ring-red-300": warning,
      "rounded-lg": warning,
      "p-4": warning
    })}><!--[-->`);
    const each_array = ensure_array_like(options);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      const checked = value === option.value;
      const id = `${name}-${option.value}`;
      $$renderer2.push(`<div class="relative flex items-start"><div class="flex h-6 items-center"><input${attr("id", id)}${attr("aria-describedby", option.description ? `${id}-desc` : void 0)}${attr("name", name)} type="radio"${attr("checked", checked, true)} class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 forced-colors:appearance-auto forced-colors:before:hidden"/></div> <div class="ml-3 text-sm/6"><label${attr("for", id)} class="font-medium text-gray-900">${escape_html(translate2(option.label))}</label> `);
      if (option.description) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p${attr("id", `${stringify(id)}-desc`)} class="text-gray-500">${escape_html(translate2(option.description))}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></fieldset>`);
    bind_props($$props, { value });
  });
}
function RadioCardGroup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      options,
      value = void 0,
      onchange,
      name = "radio-card",
      label,
      warning = false,
      columns = 3
    } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    const gridCols = {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3"
    };
    $$renderer2.push(`<fieldset>`);
    if (label) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<legend class="text-sm/6 font-semibold text-gray-900">${escape_html(translate2(label))}</legend>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`mt-4 grid grid-cols-1 gap-y-6 ${stringify(gridCols[columns])} sm:gap-x-4`, void 0, {
      "ring-2": warning,
      "ring-red-300": warning,
      "rounded-lg": warning,
      "p-2": warning
    })}><!--[-->`);
    const each_array = ensure_array_like(options);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      const checked = value === option.value;
      $$renderer2.push(`<label${attr("aria-label", translate2(option.label))}${attr("title", option.description ? translate2(option.description) : void 0)}${attr_class(`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-xs focus-within:outline-hidden ${stringify(checked ? "border-indigo-600 ring-2 ring-indigo-600" : "border-gray-300")}`)}><input type="radio"${attr("name", name)}${attr("value", option.value)}${attr("checked", checked, true)} class="sr-only"/> <span class="flex flex-1"><span class="flex flex-col"><span class="block text-sm font-medium text-gray-900">${escape_html(translate2(option.label))}</span> `);
      if (option.description) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="mt-1 flex items-center text-sm text-gray-500">${escape_html(translate2(option.description))}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></span></span> <svg${attr_class(`size-5 text-indigo-600 ${stringify(checked ? "" : "invisible")}`)} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"></path></svg> <span${attr_class(`pointer-events-none absolute -inset-px rounded-lg ${stringify(checked ? "border-2 border-indigo-600" : "border-2 border-transparent")}`)} aria-hidden="true"></span></label>`);
    }
    $$renderer2.push(`<!--]--></div></fieldset>`);
    bind_props($$props, { value });
  });
}
function CheckboxGroup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      options,
      value = [],
      onchange,
      name = "checkbox",
      label,
      warning = false
    } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    $$renderer2.push(`<fieldset${attr("aria-label", label ? translate2(label) : void 0)}><div${attr_class("space-y-5", void 0, {
      "ring-2": warning,
      "ring-red-300": warning,
      "rounded-lg": warning,
      "p-4": warning
    })}><!--[-->`);
    const each_array = ensure_array_like(options);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      const checked = value.includes(option.value);
      const id = `${name}-${option.value}`;
      $$renderer2.push(`<div class="flex gap-3"><div class="flex h-6 shrink-0 items-center"><div class="group grid size-4 grid-cols-1"><input${attr("id", id)}${attr("aria-describedby", option.description ? `${id}-desc` : void 0)}${attr("name", `${stringify(name)}[]`)} type="checkbox"${attr("checked", checked, true)} class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 forced-colors:appearance-auto"/> <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white" viewBox="0 0 14 14" fill="none"><path class="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></div> <div class="text-sm/6"><label${attr("for", id)} class="font-medium text-gray-900">${escape_html(translate2(option.label))}</label> `);
      if (option.description) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p${attr("id", `${stringify(id)}-desc`)} class="text-gray-500">${escape_html(translate2(option.description))}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></fieldset>`);
    bind_props($$props, { value });
  });
}
function ScaleInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      min = 1,
      max = 10,
      value = void 0,
      onchange,
      name = "scale",
      minLabel,
      maxLabel,
      warning = false
    } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    const numbers = derived(() => Array.from({ length: max - min + 1 }, (_, i) => min + i));
    $$renderer2.push(`<fieldset${attr("aria-label", name)}><div${attr_class("flex flex-col gap-2", void 0, {
      "ring-2": warning,
      "ring-red-300": warning,
      "rounded-lg": warning,
      "p-3": warning
    })}><div class="flex flex-wrap gap-2 justify-center"><!--[-->`);
    const each_array = ensure_array_like(numbers());
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let n = each_array[$$index];
      const selected = value === n;
      $$renderer2.push(`<label${attr_class(`flex cursor-pointer items-center justify-center rounded-full size-10 text-sm font-semibold focus-within:outline-hidden ${stringify(selected ? "bg-indigo-600 text-white ring-2 ring-indigo-600" : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50")}`)}><input type="radio"${attr("name", name)}${attr("value", n)}${attr("checked", selected, true)} class="sr-only"/> <span>${escape_html(n)}</span></label>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (minLabel || maxLabel) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex justify-between text-xs text-gray-500 px-1"><span>${escape_html(minLabel ? translate2(minLabel) : "")}</span> <span>${escape_html(maxLabel ? translate2(maxLabel) : "")}</span></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></fieldset>`);
    bind_props($$props, { value });
  });
}
function TimeInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = void 0,
      onchange,
      name = "time",
      label,
      step = 900,
      placeholder,
      warning = false
    } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<label${attr("for", name)} class="block text-sm/6 font-medium text-gray-900">${escape_html(translate2(label))}</label>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class("mt-2", void 0, {
      "ring-2": warning,
      "ring-red-300": warning,
      "rounded-md": warning
    })}><input type="time"${attr("name", name)}${attr("id", name)}${attr("step", step)}${attr("value", value ?? "")}${attr("placeholder", placeholder)} class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/></div></div>`);
    bind_props($$props, { value });
  });
}
function NumberInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = void 0,
      onchange,
      name = "number",
      label,
      min,
      max,
      step,
      placeholder,
      unit,
      warning = false
    } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<label${attr("for", name)} class="block text-sm/6 font-medium text-gray-900">${escape_html(translate2(label))}</label>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class("mt-2 relative", void 0, {
      "ring-2": warning,
      "ring-red-300": warning,
      "rounded-md": warning
    })}><input type="number"${attr("name", name)}${attr("id", name)}${attr("min", min)}${attr("max", max)}${attr("step", step)}${attr("value", value ?? "")}${attr("placeholder", placeholder)}${attr_class(`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${stringify(unit ? "pr-12" : "")}`)}/> `);
    if (unit) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><span class="text-gray-500 sm:text-sm">${escape_html(translate2(unit))}</span></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { value });
  });
}
function TextInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = void 0,
      onchange,
      name = "text",
      label,
      placeholder,
      type = "text",
      warning = false
    } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<label${attr("for", name)} class="block text-sm/6 font-medium text-gray-900">${escape_html(translate2(label))}</label>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class("mt-2", void 0, {
      "ring-2": warning,
      "ring-red-300": warning,
      "rounded-md": warning
    })}><input${attr("type", type)}${attr("name", name)}${attr("id", name)}${attr("value", value ?? "")}${attr("placeholder", placeholder)} class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/></div></div>`);
    bind_props($$props, { value });
  });
}
function TextArea($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = void 0,
      onchange,
      name = "textarea",
      label,
      placeholder,
      rows = 4,
      warning = false
    } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const translate2 = (key) => t ? t(key) : key;
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<label${attr("for", name)} class="block text-sm/6 font-medium text-gray-900">${escape_html(translate2(label))}</label>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class("mt-2", void 0, {
      "ring-2": warning,
      "ring-red-300": warning,
      "rounded-md": warning
    })}><textarea${attr("name", name)}${attr("id", name)}${attr("rows", rows)}${attr("placeholder", placeholder)} class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">`);
    const $$body = escape_html(value ?? "");
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div></div>`);
    bind_props($$props, { value });
  });
}
function QuestionRenderer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { question, warning = false } = $$props;
    const state = getContext(FORM_STATE_KEY);
    const stepId = getContext(STEP_ID_KEY);
    function getValue() {
      return state.getResponse(stepId, question.id);
    }
    function setValue(v) {
      state.setResponse(stepId, question.id, v);
    }
    if (question.type === "single-select") {
      $$renderer2.push("<!--[0-->");
      if (question.displayVariant === "card") {
        $$renderer2.push("<!--[0-->");
        RadioCardGroup($$renderer2, {
          options: question.options ?? [],
          value: getValue(),
          onchange: (v) => setValue(v),
          name: question.id,
          label: question.label,
          warning,
          columns: question.layout?.columns
        });
      } else {
        $$renderer2.push("<!--[-1-->");
        RadioListGroup($$renderer2, {
          options: question.options ?? [],
          value: getValue(),
          onchange: (v) => setValue(v),
          name: question.id,
          label: question.label,
          warning
        });
      }
      $$renderer2.push(`<!--]-->`);
    } else if (question.type === "multi-select") {
      $$renderer2.push("<!--[1-->");
      CheckboxGroup($$renderer2, {
        options: question.options ?? [],
        value: getValue() ?? [],
        onchange: (v) => setValue(v),
        name: question.id,
        label: question.label,
        warning
      });
    } else if (question.type === "scale") {
      $$renderer2.push("<!--[2-->");
      ScaleInput($$renderer2, {
        min: question.min ?? 1,
        max: question.max ?? 10,
        value: getValue(),
        onchange: (v) => setValue(v),
        name: question.id,
        minLabel: question.minLabel,
        maxLabel: question.maxLabel,
        warning
      });
    } else if (question.type === "time-input") {
      $$renderer2.push("<!--[3-->");
      TimeInput($$renderer2, {
        value: getValue(),
        onchange: (v) => setValue(v),
        name: question.id,
        label: question.label,
        step: question.step,
        placeholder: question.placeholder,
        warning
      });
    } else if (question.type === "number-input") {
      $$renderer2.push("<!--[4-->");
      NumberInput($$renderer2, {
        value: getValue(),
        onchange: (v) => setValue(v),
        name: question.id,
        label: question.label,
        min: question.min,
        max: question.max,
        step: question.step,
        placeholder: question.placeholder,
        unit: question.unit,
        warning
      });
    } else if (question.type === "text-input") {
      $$renderer2.push("<!--[5-->");
      TextInput($$renderer2, {
        value: getValue(),
        onchange: (v) => setValue(v),
        name: question.id,
        label: question.label,
        placeholder: question.placeholder,
        warning
      });
    } else if (question.type === "textarea") {
      $$renderer2.push("<!--[6-->");
      TextArea($$renderer2, {
        value: getValue(),
        onchange: (v) => setValue(v),
        name: question.id,
        label: question.label,
        placeholder: question.placeholder,
        rows: question.rows,
        warning
      });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function LikertGroup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { questions, warning = false } = $$props;
    const t = getContext(TRANSLATE_KEY);
    const state = getContext(FORM_STATE_KEY);
    const stepId = getContext(STEP_ID_KEY);
    const translate2 = (key) => t ? t(key) : key;
    const scaleOptions = derived(() => questions[0]?.options ?? []);
    function getQuestionValue(questionId) {
      return state.getResponse(stepId, questionId);
    }
    $$renderer2.push(`<div${attr_class("space-y-4", void 0, {
      "ring-2": warning,
      "ring-red-300": warning,
      "rounded-lg": warning,
      "p-4": warning
    })}>`);
    if (scaleOptions().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="hidden sm:grid sm:gap-2"${attr_style(`grid-template-columns: 1fr repeat(${stringify(scaleOptions().length)}, minmax(0, 1fr))`)}><div></div> <!--[-->`);
      const each_array = ensure_array_like(scaleOptions());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let option = each_array[$$index];
        $$renderer2.push(`<div class="text-center text-xs text-gray-500 font-medium">${escape_html(translate2(option.label))}</div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array_1 = ensure_array_like(questions);
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let question = each_array_1[$$index_2];
      const currentValue = getQuestionValue(question.id);
      $$renderer2.push(`<div class="sm:grid sm:gap-2 sm:items-center"${attr_style(`grid-template-columns: 1fr repeat(${stringify(scaleOptions().length)}, minmax(0, 1fr))`)}><div class="text-sm text-gray-900 mb-2 sm:mb-0">${escape_html(translate2(question.label))}</div> <div class="flex flex-wrap gap-2 sm:contents"><!--[-->`);
      const each_array_2 = ensure_array_like(scaleOptions());
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let option = each_array_2[$$index_1];
        const selected = currentValue === option.value;
        $$renderer2.push(`<label${attr_class(`flex cursor-pointer items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus-within:outline-hidden sm:flex-1 ${stringify(selected ? "bg-indigo-600 text-white" : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50")}`)}><input type="radio"${attr("name", question.id)}${attr("value", option.value)}${attr("checked", selected, true)} class="sr-only"/> <span class="sm:hidden">${escape_html(translate2(option.label))}</span> <span class="hidden sm:inline">•</span></label>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function GroupRenderer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { group, warningGroupId = null } = $$props;
    const state = getContext(FORM_STATE_KEY);
    const stepId = getContext(STEP_ID_KEY);
    const isWarning = derived(() => warningGroupId === group.id);
    const visibleQuestions = derived(() => group.questions.filter((q) => {
      if (!q.condition) return true;
      return evaluateCondition(q.condition, (sid, qid) => state.getResponse(sid, qid), stepId);
    }));
    const groupVisible = derived(() => !group.condition || evaluateCondition(group.condition, (sid, qid) => state.getResponse(sid, qid), stepId));
    const gridColsClass = derived(() => group.layout?.columns === 2 ? "grid grid-cols-1 sm:grid-cols-2 gap-6" : group.layout?.columns === 3 ? "grid grid-cols-1 sm:grid-cols-3 gap-6" : "");
    if (groupVisible() && visibleQuestions().length > 0) {
      $$renderer2.push("<!--[0-->");
      QuestionGroupWrapper($$renderer2, {
        id: group.id,
        label: group.label,
        warning: isWarning(),
        children: ($$renderer3) => {
          if (group.renderMode === "likert-batch") {
            $$renderer3.push("<!--[0-->");
            LikertGroup($$renderer3, { questions: visibleQuestions(), warning: isWarning() });
          } else if (group.renderMode === "inline") {
            $$renderer3.push("<!--[1-->");
            $$renderer3.push(`<div${attr_class(clsx(gridColsClass() || "space-y-6"))}><!--[-->`);
            const each_array = ensure_array_like(visibleQuestions());
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let question = each_array[$$index];
              QuestionRenderer($$renderer3, { question });
            }
            $$renderer3.push(`<!--]--></div>`);
          } else {
            $$renderer3.push("<!--[-1-->");
            $$renderer3.push(`<div${attr_class(clsx(gridColsClass() || "space-y-6"))}><!--[-->`);
            const each_array_1 = ensure_array_like(visibleQuestions());
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let question = each_array_1[$$index_1];
              QuestionRenderer($$renderer3, { question, warning: isWarning() });
            }
            $$renderer3.push(`<!--]--></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function FormStep($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { stepConfig, warningGroupId = null } = $$props;
    setContext(STEP_ID_KEY, stepConfig.id);
    StepContainer($$renderer2, {
      title: stepConfig.label,
      intro: stepConfig.intro,
      children: ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(stepConfig.groups);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let group = each_array[$$index];
          GroupRenderer($$renderer3, { group, warningGroupId });
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
  });
}
function MultiStepForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      config,
      translate: translateFn,
      state: externalState
    } = $$props;
    const formState = externalState ?? createFormState(config);
    let warningGroupId = null;
    setContext(FORM_STATE_KEY, formState);
    if (translateFn) {
      setContext(TRANSLATE_KEY, translateFn);
    }
    const currentStep = derived(() => config.steps[formState.currentStepIndex]);
    const isFirstStep = derived(() => formState.currentStepIndex === 0);
    const isLastStep = derived(() => formState.currentStepIndex === config.steps.length - 1);
    $$renderer2.push(`<div class="mx-auto max-w-4xl">`);
    ProgressBar($$renderer2, {
      steps: config.steps,
      currentIndex: formState.currentStepIndex
    });
    $$renderer2.push(`<!----> `);
    if (currentStep()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<!---->`);
      {
        FormStep($$renderer2, { stepConfig: currentStep(), warningGroupId });
      }
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    NavigationButtons($$renderer2, {
      showBack: !isFirstStep(),
      showNext: true,
      nextLabel: isLastStep() ? "Submit" : "Next"
    });
    $$renderer2.push(`<!----></div>`);
  });
}
const NOT_SURE$5 = { value: "unsure", label: "common.not_sure" };
const ISI_SEVERITY = [
  { value: "0", label: "assessment.step1.isi.none" },
  { value: "1", label: "assessment.step1.isi.mild" },
  { value: "2", label: "assessment.step1.isi.moderate" },
  { value: "3", label: "assessment.step1.isi.severe" },
  { value: "4", label: "assessment.step1.isi.very_severe" }
];
const ISI_SATISFACTION = [
  { value: "0", label: "assessment.step1.isi.very_satisfied" },
  { value: "1", label: "assessment.step1.isi.satisfied" },
  { value: "2", label: "assessment.step1.isi.neutral" },
  { value: "3", label: "assessment.step1.isi.dissatisfied" },
  { value: "4", label: "assessment.step1.isi.very_dissatisfied" }
];
const ISI_NOTICEABILITY = [
  { value: "0", label: "assessment.step1.isi.not_at_all" },
  { value: "1", label: "assessment.step1.isi.a_little" },
  { value: "2", label: "assessment.step1.isi.somewhat" },
  { value: "3", label: "assessment.step1.isi.much" },
  { value: "4", label: "assessment.step1.isi.very_much" }
];
const step1 = {
  id: "step-1",
  label: "assessment.steps.1",
  groups: [
    {
      id: "schedule",
      label: "assessment.step1.schedule",
      renderMode: "inline",
      layout: { columns: 2 },
      questions: [
        { id: "bedtime_work", type: "time-input", label: "assessment.step1.bedtime_work", required: true },
        { id: "bedtime_free", type: "time-input", label: "assessment.step1.bedtime_free", required: true },
        { id: "waketime_work", type: "time-input", label: "assessment.step1.waketime_work", required: true },
        { id: "waketime_free", type: "time-input", label: "assessment.step1.waketime_free", required: true }
      ]
    },
    {
      id: "onset",
      label: "assessment.step1.onset",
      questions: [
        {
          id: "sleep_onset",
          type: "single-select",
          label: "assessment.step1.sleep_onset",
          required: true,
          options: [
            { value: "immediate", label: "assessment.step1.sleep_onset.immediate" },
            { value: "10_20", label: "assessment.step1.sleep_onset.10_20" },
            { value: "20_40", label: "assessment.step1.sleep_onset.20_40" },
            { value: "40_60", label: "assessment.step1.sleep_onset.40_60" },
            { value: "over_60", label: "assessment.step1.sleep_onset.over_60" },
            NOT_SURE$5
          ]
        }
      ]
    },
    {
      id: "wakings",
      label: "assessment.step1.wakings",
      questions: [
        {
          id: "night_wakings",
          type: "single-select",
          label: "assessment.step1.night_wakings",
          required: true,
          options: [
            { value: "0", label: "assessment.step1.night_wakings.0" },
            { value: "1_2", label: "assessment.step1.night_wakings.1_2" },
            { value: "3_4", label: "assessment.step1.night_wakings.3_4" },
            { value: "5_plus", label: "assessment.step1.night_wakings.5_plus" },
            NOT_SURE$5
          ]
        }
      ]
    },
    {
      id: "total_sleep",
      label: "assessment.step1.total_sleep",
      questions: [
        {
          id: "sleep_hours",
          type: "single-select",
          label: "assessment.step1.sleep_hours",
          required: true,
          options: [
            { value: "under_4", label: "assessment.step1.sleep_hours.under_4" },
            { value: "4_5", label: "assessment.step1.sleep_hours.4_5" },
            { value: "5_6", label: "assessment.step1.sleep_hours.5_6" },
            { value: "6_7", label: "assessment.step1.sleep_hours.6_7" },
            { value: "7_8", label: "assessment.step1.sleep_hours.7_8" },
            { value: "over_8", label: "assessment.step1.sleep_hours.over_8" },
            { value: "no_idea", label: "assessment.step1.sleep_hours.no_idea" }
          ]
        }
      ]
    },
    {
      id: "primary_complaint",
      label: "assessment.step1.primary_complaint",
      questions: [
        {
          id: "main_struggle",
          type: "single-select",
          label: "assessment.step1.main_struggle",
          required: true,
          options: [
            { value: "cant_fall_asleep", label: "assessment.step1.main_struggle.cant_fall_asleep" },
            { value: "wake_during_night", label: "assessment.step1.main_struggle.wake_during_night" },
            { value: "wake_too_early", label: "assessment.step1.main_struggle.wake_too_early" },
            { value: "unrestorative", label: "assessment.step1.main_struggle.unrestorative" },
            { value: "excessive_sleepiness", label: "assessment.step1.main_struggle.excessive_sleepiness" },
            { value: "parasomnias", label: "assessment.step1.main_struggle.parasomnias" },
            { value: "irregular_schedule", label: "assessment.step1.main_struggle.irregular_schedule" },
            { value: "multiple", label: "assessment.step1.main_struggle.multiple" }
          ]
        }
      ]
    },
    {
      id: "duration_frequency",
      label: "assessment.step1.duration_frequency",
      questions: [
        {
          id: "duration",
          type: "single-select",
          label: "assessment.step1.duration",
          required: true,
          options: [
            { value: "weeks", label: "assessment.step1.duration.weeks" },
            { value: "months", label: "assessment.step1.duration.months" },
            { value: "6_12_months", label: "assessment.step1.duration.6_12_months" },
            { value: "over_year", label: "assessment.step1.duration.over_year" },
            { value: "always", label: "assessment.step1.duration.always" },
            NOT_SURE$5
          ]
        },
        {
          id: "frequency",
          type: "single-select",
          label: "assessment.step1.frequency",
          required: true,
          options: [
            { value: "every_night", label: "assessment.step1.frequency.every_night" },
            { value: "most_nights", label: "assessment.step1.frequency.most_nights" },
            { value: "couple_nights", label: "assessment.step1.frequency.couple_nights" },
            { value: "unpredictable", label: "assessment.step1.frequency.unpredictable" },
            NOT_SURE$5
          ]
        }
      ]
    },
    {
      id: "isi",
      label: "assessment.step1.isi",
      intro: "assessment.step1.isi.intro",
      renderMode: "likert-batch",
      questions: [
        { id: "isi_falling_asleep", type: "likert", label: "assessment.step1.isi.falling_asleep", required: true, min: 0, max: 4, options: ISI_SEVERITY },
        { id: "isi_staying_asleep", type: "likert", label: "assessment.step1.isi.staying_asleep", required: true, min: 0, max: 4, options: ISI_SEVERITY },
        { id: "isi_waking_early", type: "likert", label: "assessment.step1.isi.waking_early", required: true, min: 0, max: 4, options: ISI_SEVERITY },
        { id: "isi_satisfaction", type: "likert", label: "assessment.step1.isi.satisfaction", required: true, min: 0, max: 4, options: ISI_SATISFACTION },
        { id: "isi_noticeable", type: "likert", label: "assessment.step1.isi.noticeable", required: true, min: 0, max: 4, options: ISI_NOTICEABILITY },
        { id: "isi_worried", type: "likert", label: "assessment.step1.isi.worried", required: true, min: 0, max: 4, options: ISI_NOTICEABILITY },
        { id: "isi_interfere", type: "likert", label: "assessment.step1.isi.interfere", required: true, min: 0, max: 4, options: ISI_NOTICEABILITY }
      ]
    }
  ]
};
const NOT_SURE$4 = { value: "unsure", label: "common.not_sure" };
const step2 = {
  id: "step-2",
  label: "assessment.steps.2",
  groups: [
    {
      id: "bedroom_darkness",
      label: "assessment.step2.bedroom_darkness",
      questions: [
        {
          id: "bedroom_darkness",
          type: "single-select",
          label: "assessment.step2.bedroom_darkness.question",
          required: true,
          options: [
            { value: "complete_darkness", label: "assessment.step2.bedroom_darkness.complete_darkness" },
            { value: "outlines_shapes", label: "assessment.step2.bedroom_darkness.outlines_shapes" },
            { value: "noticeable_light", label: "assessment.step2.bedroom_darkness.noticeable_light" },
            { value: "fairly_lit", label: "assessment.step2.bedroom_darkness.fairly_lit" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "bedroom_sound",
      label: "assessment.step2.bedroom_sound",
      questions: [
        {
          id: "bedroom_sound",
          type: "single-select",
          label: "assessment.step2.bedroom_sound.question",
          required: true,
          options: [
            { value: "silent", label: "assessment.step2.bedroom_sound.silent" },
            { value: "occasional", label: "assessment.step2.bedroom_sound.occasional" },
            { value: "regular_noise", label: "assessment.step2.bedroom_sound.regular_noise" },
            { value: "partner_snores", label: "assessment.step2.bedroom_sound.partner_snores" },
            { value: "unpredictable", label: "assessment.step2.bedroom_sound.unpredictable" },
            { value: "sound_machine", label: "assessment.step2.bedroom_sound.sound_machine" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "bedroom_temp",
      label: "assessment.step2.bedroom_temp",
      questions: [
        {
          id: "bedroom_temp",
          type: "single-select",
          label: "assessment.step2.bedroom_temp.question",
          required: true,
          options: [
            { value: "comfortable", label: "assessment.step2.bedroom_temp.comfortable" },
            { value: "too_warm", label: "assessment.step2.bedroom_temp.too_warm" },
            { value: "too_cold", label: "assessment.step2.bedroom_temp.too_cold" },
            { value: "changes", label: "assessment.step2.bedroom_temp.changes" },
            { value: "cant_control", label: "assessment.step2.bedroom_temp.cant_control" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "bedroom_comfort",
      label: "assessment.step2.bedroom_comfort",
      questions: [
        {
          id: "bedroom_comfort",
          type: "single-select",
          label: "assessment.step2.bedroom_comfort.question",
          required: true,
          options: [
            { value: "comfortable", label: "assessment.step2.bedroom_comfort.comfortable" },
            { value: "acceptable", label: "assessment.step2.bedroom_comfort.acceptable" },
            { value: "stiff_sore", label: "assessment.step2.bedroom_comfort.stiff_sore" },
            { value: "uncomfortable", label: "assessment.step2.bedroom_comfort.uncomfortable" },
            { value: "old_mattress", label: "assessment.step2.bedroom_comfort.old_mattress" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "bedroom_air",
      label: "assessment.step2.bedroom_air",
      questions: [
        {
          id: "bedroom_air",
          type: "single-select",
          label: "assessment.step2.bedroom_air.question",
          required: true,
          options: [
            { value: "fresh", label: "assessment.step2.bedroom_air.fresh" },
            { value: "stuffy", label: "assessment.step2.bedroom_air.stuffy" },
            { value: "congested", label: "assessment.step2.bedroom_air.congested" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "bed_sharing",
      label: "assessment.step2.bed_sharing",
      questions: [
        {
          id: "bed_sharing",
          type: "single-select",
          label: "assessment.step2.bed_sharing.question",
          required: true,
          options: [
            { value: "alone", label: "assessment.step2.bed_sharing.alone" },
            { value: "partner_no_issue", label: "assessment.step2.bed_sharing.partner_no_issue" },
            { value: "partner_disrupts", label: "assessment.step2.bed_sharing.partner_disrupts" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "pets",
      label: "assessment.step2.pets",
      questions: [
        {
          id: "pets",
          type: "single-select",
          label: "assessment.step2.pets.question",
          required: true,
          options: [
            { value: "no_pets", label: "assessment.step2.pets.no_pets" },
            { value: "pets_no_issue", label: "assessment.step2.pets.pets_no_issue" },
            { value: "pets_wake_me", label: "assessment.step2.pets.pets_wake_me" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "evening_activities",
      label: "assessment.step2.evening_activities",
      questions: [
        {
          id: "evening_activities",
          type: "multi-select",
          label: "assessment.step2.evening_activities.question",
          required: true,
          options: [
            { value: "tv", label: "assessment.step2.evening_activities.tv" },
            { value: "phone", label: "assessment.step2.evening_activities.phone" },
            { value: "computer", label: "assessment.step2.evening_activities.computer" },
            { value: "book_physical", label: "assessment.step2.evening_activities.book_physical" },
            { value: "book_device", label: "assessment.step2.evening_activities.book_device" },
            { value: "talking", label: "assessment.step2.evening_activities.talking" },
            { value: "physical", label: "assessment.step2.evening_activities.physical" },
            { value: "combination", label: "assessment.step2.evening_activities.combination" }
          ]
        }
      ]
    },
    {
      id: "evening_content",
      label: "assessment.step2.evening_content",
      questions: [
        {
          id: "evening_content",
          type: "single-select",
          label: "assessment.step2.evening_content.question",
          required: true,
          options: [
            { value: "relaxing", label: "assessment.step2.evening_content.relaxing" },
            { value: "engaging", label: "assessment.step2.evening_content.engaging" },
            { value: "news", label: "assessment.step2.evening_content.news" },
            { value: "social_media", label: "assessment.step2.evening_content.social_media" },
            { value: "work", label: "assessment.step2.evening_content.work" },
            { value: "stressful", label: "assessment.step2.evening_content.stressful" },
            { value: "no_screens", label: "assessment.step2.evening_content.no_screens" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "evening_lighting",
      label: "assessment.step2.evening_lighting",
      questions: [
        {
          id: "evening_lighting",
          type: "single-select",
          label: "assessment.step2.evening_lighting.question",
          required: true,
          options: [
            { value: "bright_overhead", label: "assessment.step2.evening_lighting.bright_overhead" },
            { value: "dimmed", label: "assessment.step2.evening_lighting.dimmed" },
            { value: "dark_screens_only", label: "assessment.step2.evening_lighting.dark_screens_only" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "bed_activities",
      label: "assessment.step2.bed_activities",
      questions: [
        {
          id: "bed_activities",
          type: "single-select",
          label: "assessment.step2.bed_activities.question",
          required: true,
          options: [
            { value: "sleep_only", label: "assessment.step2.bed_activities.sleep_only" },
            { value: "work_in_bed", label: "assessment.step2.bed_activities.work_in_bed" },
            { value: "eat_in_bed", label: "assessment.step2.bed_activities.eat_in_bed" },
            { value: "watch_in_bed", label: "assessment.step2.bed_activities.watch_in_bed" },
            { value: "multiple", label: "assessment.step2.bed_activities.multiple" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "environment_noise",
      label: "assessment.step2.environment_noise",
      questions: [
        {
          id: "environment_noise",
          type: "single-select",
          label: "assessment.step2.environment_noise.question",
          required: true,
          options: [
            { value: "quiet", label: "assessment.step2.environment_noise.quiet" },
            { value: "moderate", label: "assessment.step2.environment_noise.moderate" },
            { value: "noisy", label: "assessment.step2.environment_noise.noisy" },
            NOT_SURE$4
          ]
        }
      ]
    },
    {
      id: "shift_work",
      label: "assessment.step2.shift_work",
      questions: [
        {
          id: "shift_work",
          type: "single-select",
          label: "assessment.step2.shift_work.question",
          required: true,
          options: [
            { value: "no", label: "assessment.step2.shift_work.no" },
            { value: "yes_rotating", label: "assessment.step2.shift_work.yes_rotating" },
            { value: "yes_nights", label: "assessment.step2.shift_work.yes_nights" },
            { value: "yes_early", label: "assessment.step2.shift_work.yes_early" },
            NOT_SURE$4
          ]
        }
      ]
    }
  ]
};
const NOT_SURE$3 = { value: "unsure", label: "common.not_sure" };
const step3 = {
  id: "step-3",
  label: "assessment.steps.3",
  groups: [
    {
      id: "physical_profile",
      label: "assessment.step3.physical_profile",
      questions: [
        {
          id: "age_range",
          type: "single-select",
          label: "assessment.step3.physical_profile.age_range",
          required: true,
          options: [
            { value: "18_25", label: "assessment.step3.physical_profile.age_range.18_25" },
            { value: "26_35", label: "assessment.step3.physical_profile.age_range.26_35" },
            { value: "36_45", label: "assessment.step3.physical_profile.age_range.36_45" },
            { value: "46_55", label: "assessment.step3.physical_profile.age_range.46_55" },
            { value: "56_65", label: "assessment.step3.physical_profile.age_range.56_65" },
            { value: "over_65", label: "assessment.step3.physical_profile.age_range.over_65" }
          ]
        },
        {
          id: "biological_sex",
          type: "single-select",
          label: "assessment.step3.physical_profile.biological_sex",
          required: true,
          options: [
            { value: "male", label: "assessment.step3.physical_profile.biological_sex.male" },
            { value: "female", label: "assessment.step3.physical_profile.biological_sex.female" },
            { value: "intersex", label: "assessment.step3.physical_profile.biological_sex.intersex" },
            { value: "prefer_not_say", label: "assessment.step3.physical_profile.biological_sex.prefer_not_say" }
          ]
        },
        {
          id: "height",
          type: "number-input",
          label: "assessment.step3.physical_profile.height",
          min: 100,
          max: 250,
          step: 1,
          placeholder: "cm"
        },
        {
          id: "weight",
          type: "number-input",
          label: "assessment.step3.physical_profile.weight",
          min: 30,
          max: 300,
          step: 1,
          placeholder: "kg"
        },
        {
          id: "neck_size",
          type: "single-select",
          label: "assessment.step3.physical_profile.neck_size",
          required: true,
          options: [
            { value: "small", label: "assessment.step3.physical_profile.neck_size.small" },
            { value: "medium", label: "assessment.step3.physical_profile.neck_size.medium" },
            { value: "large", label: "assessment.step3.physical_profile.neck_size.large" },
            NOT_SURE$3
          ]
        },
        {
          id: "weight_distribution",
          type: "single-select",
          label: "assessment.step3.physical_profile.weight_distribution",
          required: true,
          options: [
            { value: "neck_midsection", label: "assessment.step3.physical_profile.weight_distribution.neck_midsection" },
            { value: "evenly", label: "assessment.step3.physical_profile.weight_distribution.evenly" },
            NOT_SURE$3
          ]
        }
      ]
    },
    {
      id: "breathing",
      label: "assessment.step3.breathing",
      questions: [
        {
          id: "snoring",
          type: "single-select",
          label: "assessment.step3.breathing.snoring",
          required: true,
          options: [
            { value: "no", label: "assessment.step3.breathing.snoring.no" },
            { value: "light", label: "assessment.step3.breathing.snoring.light" },
            { value: "loud", label: "assessment.step3.breathing.snoring.loud" },
            NOT_SURE$3
          ]
        },
        {
          id: "witnessed_apnea",
          type: "single-select",
          label: "assessment.step3.breathing.witnessed_apnea",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.breathing.witnessed_apnea.yes" },
            { value: "no", label: "assessment.step3.breathing.witnessed_apnea.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "choking",
          type: "single-select",
          label: "assessment.step3.breathing.choking",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.breathing.choking.yes" },
            { value: "sometimes", label: "assessment.step3.breathing.choking.sometimes" },
            { value: "no", label: "assessment.step3.breathing.choking.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "morning_symptoms",
          type: "multi-select",
          label: "assessment.step3.breathing.morning_symptoms",
          required: true,
          options: [
            { value: "dry_mouth", label: "assessment.step3.breathing.morning_symptoms.dry_mouth" },
            { value: "sore_throat", label: "assessment.step3.breathing.morning_symptoms.sore_throat" },
            { value: "headache", label: "assessment.step3.breathing.morning_symptoms.headache" },
            { value: "none", label: "assessment.step3.breathing.morning_symptoms.none", exclusive: true },
            { value: "unsure", label: "common.not_sure", exclusive: true }
          ]
        },
        {
          id: "mouth_breathing",
          type: "single-select",
          label: "assessment.step3.breathing.mouth_breathing",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.breathing.mouth_breathing.yes" },
            { value: "sometimes", label: "assessment.step3.breathing.mouth_breathing.sometimes" },
            { value: "no", label: "assessment.step3.breathing.mouth_breathing.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "teeth_grinding",
          type: "single-select",
          label: "assessment.step3.breathing.teeth_grinding",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.breathing.teeth_grinding.yes" },
            { value: "suspected", label: "assessment.step3.breathing.teeth_grinding.suspected" },
            { value: "no", label: "assessment.step3.breathing.teeth_grinding.no" },
            NOT_SURE$3
          ]
        }
      ]
    },
    {
      id: "movement",
      label: "assessment.step3.movement",
      questions: [
        {
          id: "restless_legs",
          type: "single-select",
          label: "assessment.step3.movement.restless_legs",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.movement.restless_legs.yes" },
            { value: "sometimes", label: "assessment.step3.movement.restless_legs.sometimes" },
            { value: "no", label: "assessment.step3.movement.restless_legs.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "restless_relief",
          type: "single-select",
          label: "assessment.step3.movement.restless_relief",
          required: true,
          condition: { questionId: "restless_legs", operator: "not-equals", value: "no" },
          options: [
            { value: "yes", label: "assessment.step3.movement.restless_relief.yes" },
            { value: "no", label: "assessment.step3.movement.restless_relief.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "leg_jerking",
          type: "single-select",
          label: "assessment.step3.movement.leg_jerking",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.movement.leg_jerking.yes" },
            { value: "no", label: "assessment.step3.movement.leg_jerking.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "dream_acting",
          type: "single-select",
          label: "assessment.step3.movement.dream_acting",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.movement.dream_acting.yes" },
            { value: "sometimes", label: "assessment.step3.movement.dream_acting.sometimes" },
            { value: "no", label: "assessment.step3.movement.dream_acting.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "sleepwalking",
          type: "single-select",
          label: "assessment.step3.movement.sleepwalking",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.movement.sleepwalking.yes" },
            { value: "sometimes", label: "assessment.step3.movement.sleepwalking.sometimes" },
            { value: "no", label: "assessment.step3.movement.sleepwalking.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "sleep_paralysis",
          type: "single-select",
          label: "assessment.step3.movement.sleep_paralysis",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.movement.sleep_paralysis.yes" },
            { value: "sometimes", label: "assessment.step3.movement.sleep_paralysis.sometimes" },
            { value: "no", label: "assessment.step3.movement.sleep_paralysis.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "hypnagogic",
          type: "single-select",
          label: "assessment.step3.movement.hypnagogic",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.movement.hypnagogic.yes" },
            { value: "sometimes", label: "assessment.step3.movement.hypnagogic.sometimes" },
            { value: "no", label: "assessment.step3.movement.hypnagogic.no" },
            NOT_SURE$3
          ]
        }
      ]
    },
    {
      id: "internal_clock",
      label: "assessment.step3.internal_clock",
      questions: [
        { id: "natural_sleep_time", type: "time-input", label: "assessment.step3.internal_clock.natural_sleep_time", required: true },
        { id: "natural_wake_time", type: "time-input", label: "assessment.step3.internal_clock.natural_wake_time", required: true },
        {
          id: "peak_alertness",
          type: "single-select",
          label: "assessment.step3.internal_clock.peak_alertness",
          required: true,
          options: [
            { value: "early_morning", label: "assessment.step3.internal_clock.peak_alertness.early_morning" },
            { value: "late_morning", label: "assessment.step3.internal_clock.peak_alertness.late_morning" },
            { value: "afternoon", label: "assessment.step3.internal_clock.peak_alertness.afternoon" },
            { value: "evening", label: "assessment.step3.internal_clock.peak_alertness.evening" },
            { value: "night", label: "assessment.step3.internal_clock.peak_alertness.night" },
            NOT_SURE$3
          ]
        },
        {
          id: "adaptability",
          type: "single-select",
          label: "assessment.step3.internal_clock.adaptability",
          required: true,
          options: [
            { value: "easy", label: "assessment.step3.internal_clock.adaptability.easy" },
            { value: "moderate", label: "assessment.step3.internal_clock.adaptability.moderate" },
            { value: "difficult", label: "assessment.step3.internal_clock.adaptability.difficult" },
            NOT_SURE$3
          ]
        },
        {
          id: "vacation_sleep",
          type: "single-select",
          label: "assessment.step3.internal_clock.vacation_sleep",
          required: true,
          options: [
            { value: "much_better", label: "assessment.step3.internal_clock.vacation_sleep.much_better" },
            { value: "somewhat_better", label: "assessment.step3.internal_clock.vacation_sleep.somewhat_better" },
            { value: "same", label: "assessment.step3.internal_clock.vacation_sleep.same" },
            { value: "worse", label: "assessment.step3.internal_clock.vacation_sleep.worse" },
            NOT_SURE$3
          ]
        },
        {
          id: "schedule_gap",
          type: "single-select",
          label: "assessment.step3.internal_clock.schedule_gap",
          required: true,
          options: [
            { value: "no_gap", label: "assessment.step3.internal_clock.schedule_gap.no_gap" },
            { value: "small", label: "assessment.step3.internal_clock.schedule_gap.small" },
            { value: "large", label: "assessment.step3.internal_clock.schedule_gap.large" },
            { value: "huge", label: "assessment.step3.internal_clock.schedule_gap.huge" },
            NOT_SURE$3
          ]
        }
      ]
    },
    {
      id: "hormonal",
      label: "assessment.step3.hormonal",
      questions: [
        {
          id: "cortisol_surge",
          type: "single-select",
          label: "assessment.step3.hormonal.cortisol_surge",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.hormonal.cortisol_surge.yes" },
            { value: "sometimes", label: "assessment.step3.hormonal.cortisol_surge.sometimes" },
            { value: "no", label: "assessment.step3.hormonal.cortisol_surge.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "early_waking_pattern",
          type: "single-select",
          label: "assessment.step3.hormonal.early_waking_pattern",
          required: true,
          options: [
            { value: "yes_alert", label: "assessment.step3.hormonal.early_waking_pattern.yes_alert" },
            { value: "yes_groggy", label: "assessment.step3.hormonal.early_waking_pattern.yes_groggy" },
            { value: "no", label: "assessment.step3.hormonal.early_waking_pattern.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "post_meal_drowsy",
          type: "single-select",
          label: "assessment.step3.hormonal.post_meal_drowsy",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.hormonal.post_meal_drowsy.yes" },
            { value: "sometimes", label: "assessment.step3.hormonal.post_meal_drowsy.sometimes" },
            { value: "no", label: "assessment.step3.hormonal.post_meal_drowsy.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "afternoon_crash",
          type: "single-select",
          label: "assessment.step3.hormonal.afternoon_crash",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.hormonal.afternoon_crash.yes" },
            { value: "sometimes", label: "assessment.step3.hormonal.afternoon_crash.sometimes" },
            { value: "no", label: "assessment.step3.hormonal.afternoon_crash.no" },
            NOT_SURE$3
          ]
        }
      ]
    },
    {
      id: "hormonal_women",
      label: "assessment.step3.hormonal_women",
      condition: { questionId: "biological_sex", operator: "equals", value: "female" },
      questions: [
        {
          id: "cycle_sleep",
          type: "single-select",
          label: "assessment.step3.hormonal_women.cycle_sleep",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.hormonal_women.cycle_sleep.yes" },
            { value: "somewhat", label: "assessment.step3.hormonal_women.cycle_sleep.somewhat" },
            { value: "no", label: "assessment.step3.hormonal_women.cycle_sleep.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "perimenopause",
          type: "single-select",
          label: "assessment.step3.hormonal_women.perimenopause",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.hormonal_women.perimenopause.yes" },
            { value: "possibly", label: "assessment.step3.hormonal_women.perimenopause.possibly" },
            { value: "no", label: "assessment.step3.hormonal_women.perimenopause.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "pregnant",
          type: "single-select",
          label: "assessment.step3.hormonal_women.pregnant",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.hormonal_women.pregnant.yes" },
            { value: "recent_baby", label: "assessment.step3.hormonal_women.pregnant.recent_baby" },
            { value: "no", label: "assessment.step3.hormonal_women.pregnant.no" }
          ]
        }
      ]
    },
    {
      id: "hormonal_men",
      label: "assessment.step3.hormonal_men",
      condition: { questionId: "biological_sex", operator: "equals", value: "male" },
      questions: [
        {
          id: "nocturia",
          type: "single-select",
          label: "assessment.step3.hormonal_men.nocturia",
          required: true,
          options: [
            { value: "none", label: "assessment.step3.hormonal_men.nocturia.none" },
            { value: "once", label: "assessment.step3.hormonal_men.nocturia.once" },
            { value: "twice", label: "assessment.step3.hormonal_men.nocturia.twice" },
            { value: "three_plus", label: "assessment.step3.hormonal_men.nocturia.three_plus" },
            NOT_SURE$3
          ]
        },
        {
          id: "energy_changes",
          type: "single-select",
          label: "assessment.step3.hormonal_men.energy_changes",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.hormonal_men.energy_changes.yes" },
            { value: "somewhat", label: "assessment.step3.hormonal_men.energy_changes.somewhat" },
            { value: "no", label: "assessment.step3.hormonal_men.energy_changes.no" },
            NOT_SURE$3
          ]
        }
      ]
    },
    {
      id: "thyroid_everyone",
      label: "assessment.step3.thyroid_everyone",
      questions: [
        {
          id: "cold_sluggish",
          type: "single-select",
          label: "assessment.step3.thyroid_everyone.cold_sluggish",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.thyroid_everyone.cold_sluggish.yes" },
            { value: "somewhat", label: "assessment.step3.thyroid_everyone.cold_sluggish.somewhat" },
            { value: "no", label: "assessment.step3.thyroid_everyone.cold_sluggish.no" },
            NOT_SURE$3
          ]
        },
        {
          id: "warm_wired",
          type: "single-select",
          label: "assessment.step3.thyroid_everyone.warm_wired",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.thyroid_everyone.warm_wired.yes" },
            { value: "somewhat", label: "assessment.step3.thyroid_everyone.warm_wired.somewhat" },
            { value: "no", label: "assessment.step3.thyroid_everyone.warm_wired.no" },
            NOT_SURE$3
          ]
        }
      ]
    },
    {
      id: "family",
      label: "assessment.step3.family",
      questions: [
        {
          id: "family_sleep_problems",
          type: "single-select",
          label: "assessment.step3.family.family_sleep_problems",
          required: true,
          options: [
            { value: "yes", label: "assessment.step3.family.family_sleep_problems.yes" },
            { value: "possibly", label: "assessment.step3.family.family_sleep_problems.possibly" },
            { value: "no", label: "assessment.step3.family.family_sleep_problems.no" },
            NOT_SURE$3
          ]
        }
      ]
    }
  ]
};
const NOT_SURE$2 = { value: "unsure", label: "common.not_sure" };
const TRIED_OPTIONS = [
  { value: "helped", label: "assessment.step4.previous_attempts.helped" },
  { value: "didnt_help", label: "assessment.step4.previous_attempts.didnt_help" },
  { value: "helped_then_stopped", label: "assessment.step4.previous_attempts.helped_then_stopped" },
  { value: "never_tried", label: "assessment.step4.previous_attempts.never_tried" }
];
const step4 = {
  id: "step-4",
  label: "assessment.steps.4",
  groups: [
    {
      id: "medications",
      label: "assessment.step4.medications",
      questions: [
        {
          id: "medication_text",
          type: "textarea",
          label: "assessment.step4.medication_text",
          placeholder: "assessment.step4.medication_text.placeholder"
        },
        {
          id: "medication_categories",
          type: "multi-select",
          label: "assessment.step4.medication_categories",
          options: [
            { value: "depression_anxiety", label: "assessment.step4.medication_categories.depression_anxiety" },
            { value: "sleep_aids", label: "assessment.step4.medication_categories.sleep_aids" },
            { value: "blood_pressure", label: "assessment.step4.medication_categories.blood_pressure" },
            { value: "steroids", label: "assessment.step4.medication_categories.steroids" },
            { value: "adhd", label: "assessment.step4.medication_categories.adhd" },
            { value: "thyroid", label: "assessment.step4.medication_categories.thyroid" },
            { value: "pain", label: "assessment.step4.medication_categories.pain" },
            { value: "allergy", label: "assessment.step4.medication_categories.allergy" },
            { value: "reflux", label: "assessment.step4.medication_categories.reflux" },
            { value: "cholesterol", label: "assessment.step4.medication_categories.cholesterol" },
            { value: "hormonal", label: "assessment.step4.medication_categories.hormonal" },
            { value: "sleep_supplements", label: "assessment.step4.medication_categories.sleep_supplements" },
            { value: "none", label: "assessment.step4.medication_categories.none", exclusive: true }
          ]
        }
      ]
    },
    {
      id: "caffeine",
      label: "assessment.step4.caffeine",
      questions: [
        {
          id: "caffeine_type",
          type: "multi-select",
          label: "assessment.step4.caffeine_type",
          options: [
            { value: "coffee", label: "assessment.step4.caffeine_type.coffee" },
            { value: "tea", label: "assessment.step4.caffeine_type.tea" },
            { value: "energy_drinks", label: "assessment.step4.caffeine_type.energy_drinks" },
            { value: "cola", label: "assessment.step4.caffeine_type.cola" },
            { value: "none", label: "assessment.step4.caffeine_type.none", exclusive: true }
          ]
        },
        {
          id: "caffeine_amount",
          type: "single-select",
          label: "assessment.step4.caffeine_amount",
          options: [
            { value: "one", label: "assessment.step4.caffeine_amount.one" },
            { value: "two_three", label: "assessment.step4.caffeine_amount.two_three" },
            { value: "four_plus", label: "assessment.step4.caffeine_amount.four_plus" },
            NOT_SURE$2
          ]
        },
        {
          id: "caffeine_timing",
          type: "single-select",
          label: "assessment.step4.caffeine_timing",
          options: [
            { value: "morning_only", label: "assessment.step4.caffeine_timing.morning_only" },
            { value: "before_noon", label: "assessment.step4.caffeine_timing.before_noon" },
            { value: "afternoon", label: "assessment.step4.caffeine_timing.afternoon" },
            { value: "evening", label: "assessment.step4.caffeine_timing.evening" },
            NOT_SURE$2
          ]
        }
      ]
    },
    {
      id: "alcohol",
      label: "assessment.step4.alcohol",
      questions: [
        {
          id: "alcohol_frequency",
          type: "single-select",
          label: "assessment.step4.alcohol_frequency",
          options: [
            { value: "never", label: "assessment.step4.alcohol_frequency.never" },
            { value: "rarely", label: "assessment.step4.alcohol_frequency.rarely" },
            { value: "weekly", label: "assessment.step4.alcohol_frequency.weekly" },
            { value: "most_days", label: "assessment.step4.alcohol_frequency.most_days" },
            { value: "daily", label: "assessment.step4.alcohol_frequency.daily" },
            NOT_SURE$2
          ]
        },
        {
          id: "alcohol_timing",
          type: "single-select",
          label: "assessment.step4.alcohol_timing",
          options: [
            { value: "not_applicable", label: "assessment.step4.alcohol_timing.not_applicable" },
            { value: "with_dinner", label: "assessment.step4.alcohol_timing.with_dinner" },
            { value: "after_dinner", label: "assessment.step4.alcohol_timing.after_dinner" },
            { value: "close_to_bed", label: "assessment.step4.alcohol_timing.close_to_bed" },
            NOT_SURE$2
          ]
        },
        {
          id: "alcohol_sleep_pattern",
          type: "single-select",
          label: "assessment.step4.alcohol_sleep_pattern",
          options: [
            { value: "helps_fall_asleep_worse_later", label: "assessment.step4.alcohol_sleep_pattern.helps_fall_asleep_worse_later" },
            { value: "no_effect", label: "assessment.step4.alcohol_sleep_pattern.no_effect" },
            { value: "makes_everything_worse", label: "assessment.step4.alcohol_sleep_pattern.makes_everything_worse" },
            { value: "not_applicable", label: "assessment.step4.alcohol_sleep_pattern.not_applicable" },
            NOT_SURE$2
          ]
        }
      ]
    },
    {
      id: "nicotine",
      label: "assessment.step4.nicotine",
      questions: [
        {
          id: "nicotine_use",
          type: "single-select",
          label: "assessment.step4.nicotine_use",
          options: [
            { value: "never", label: "assessment.step4.nicotine_use.never" },
            { value: "former", label: "assessment.step4.nicotine_use.former" },
            { value: "cigarettes", label: "assessment.step4.nicotine_use.cigarettes" },
            { value: "vaping", label: "assessment.step4.nicotine_use.vaping" },
            { value: "other", label: "assessment.step4.nicotine_use.other" },
            NOT_SURE$2
          ]
        },
        {
          id: "nicotine_timing",
          type: "single-select",
          label: "assessment.step4.nicotine_timing",
          options: [
            { value: "not_applicable", label: "assessment.step4.nicotine_timing.not_applicable" },
            { value: "morning", label: "assessment.step4.nicotine_timing.morning" },
            { value: "throughout_day", label: "assessment.step4.nicotine_timing.throughout_day" },
            { value: "close_to_bed", label: "assessment.step4.nicotine_timing.close_to_bed" },
            NOT_SURE$2
          ]
        }
      ]
    },
    {
      id: "cannabis",
      label: "assessment.step4.cannabis",
      questions: [
        {
          id: "cannabis_use",
          type: "single-select",
          label: "assessment.step4.cannabis_use",
          options: [
            { value: "never", label: "assessment.step4.cannabis_use.never" },
            { value: "rarely", label: "assessment.step4.cannabis_use.rarely" },
            { value: "regularly", label: "assessment.step4.cannabis_use.regularly" },
            { value: "daily", label: "assessment.step4.cannabis_use.daily" },
            NOT_SURE$2
          ]
        },
        {
          id: "cannabis_for_sleep",
          type: "single-select",
          label: "assessment.step4.cannabis_for_sleep",
          options: [
            { value: "yes", label: "assessment.step4.cannabis_for_sleep.yes" },
            { value: "sometimes", label: "assessment.step4.cannabis_for_sleep.sometimes" },
            { value: "no", label: "assessment.step4.cannabis_for_sleep.no" },
            { value: "not_applicable", label: "assessment.step4.cannabis_for_sleep.not_applicable" },
            NOT_SURE$2
          ]
        }
      ]
    },
    {
      id: "physical_symptoms",
      label: "assessment.step4.physical_symptoms",
      questions: [
        {
          id: "pain_at_night",
          type: "single-select",
          label: "assessment.step4.pain_at_night",
          options: [
            { value: "yes", label: "assessment.step4.pain_at_night.yes" },
            { value: "sometimes", label: "assessment.step4.pain_at_night.sometimes" },
            { value: "no", label: "assessment.step4.pain_at_night.no" },
            NOT_SURE$2
          ]
        },
        {
          id: "gerd",
          type: "single-select",
          label: "assessment.step4.gerd",
          options: [
            { value: "yes", label: "assessment.step4.gerd.yes" },
            { value: "sometimes", label: "assessment.step4.gerd.sometimes" },
            { value: "no", label: "assessment.step4.gerd.no" },
            NOT_SURE$2
          ]
        },
        {
          id: "breathing_difficulty",
          type: "single-select",
          label: "assessment.step4.breathing_difficulty",
          options: [
            { value: "yes", label: "assessment.step4.breathing_difficulty.yes" },
            { value: "sometimes", label: "assessment.step4.breathing_difficulty.sometimes" },
            { value: "no", label: "assessment.step4.breathing_difficulty.no" },
            NOT_SURE$2
          ]
        },
        {
          id: "headaches",
          type: "single-select",
          label: "assessment.step4.headaches",
          options: [
            { value: "morning", label: "assessment.step4.headaches.morning" },
            { value: "afternoon", label: "assessment.step4.headaches.afternoon" },
            { value: "evening", label: "assessment.step4.headaches.evening" },
            { value: "varied", label: "assessment.step4.headaches.varied" },
            { value: "rarely", label: "assessment.step4.headaches.rarely" },
            NOT_SURE$2
          ]
        },
        {
          id: "neuropathy",
          type: "single-select",
          label: "assessment.step4.neuropathy",
          options: [
            { value: "yes", label: "assessment.step4.neuropathy.yes" },
            { value: "sometimes", label: "assessment.step4.neuropathy.sometimes" },
            { value: "no", label: "assessment.step4.neuropathy.no" },
            NOT_SURE$2
          ]
        },
        {
          id: "fatigue_sensitivity",
          type: "single-select",
          label: "assessment.step4.fatigue_sensitivity",
          options: [
            { value: "yes", label: "assessment.step4.fatigue_sensitivity.yes" },
            { value: "somewhat", label: "assessment.step4.fatigue_sensitivity.somewhat" },
            { value: "no", label: "assessment.step4.fatigue_sensitivity.no" },
            NOT_SURE$2
          ]
        }
      ]
    },
    {
      id: "blood_work",
      label: "assessment.step4.blood_work",
      questions: [
        {
          id: "recent_bloodwork",
          type: "single-select",
          label: "assessment.step4.recent_bloodwork",
          options: [
            { value: "normal", label: "assessment.step4.recent_bloodwork.normal" },
            { value: "iron_low", label: "assessment.step4.recent_bloodwork.iron_low" },
            { value: "vitamin_d_low", label: "assessment.step4.recent_bloodwork.vitamin_d_low" },
            { value: "thyroid_issue", label: "assessment.step4.recent_bloodwork.thyroid_issue" },
            { value: "sugar_issue", label: "assessment.step4.recent_bloodwork.sugar_issue" },
            { value: "multiple_issues", label: "assessment.step4.recent_bloodwork.multiple_issues" },
            { value: "no_recent", label: "assessment.step4.recent_bloodwork.no_recent" },
            NOT_SURE$2
          ]
        }
      ]
    },
    {
      id: "previous_attempts",
      label: "assessment.step4.previous_attempts",
      renderMode: "likert-batch",
      questions: [
        { id: "tried_melatonin", type: "likert", label: "assessment.step4.tried_melatonin", options: TRIED_OPTIONS },
        { id: "tried_prescription", type: "likert", label: "assessment.step4.tried_prescription", options: TRIED_OPTIONS },
        { id: "tried_routine", type: "likert", label: "assessment.step4.tried_routine", options: TRIED_OPTIONS },
        { id: "tried_caffeine_cut", type: "likert", label: "assessment.step4.tried_caffeine_cut", options: TRIED_OPTIONS },
        { id: "tried_exercise", type: "likert", label: "assessment.step4.tried_exercise", options: TRIED_OPTIONS },
        { id: "tried_meditation", type: "likert", label: "assessment.step4.tried_meditation", options: TRIED_OPTIONS },
        { id: "tried_therapy", type: "likert", label: "assessment.step4.tried_therapy", options: TRIED_OPTIONS },
        { id: "tried_sleep_study", type: "likert", label: "assessment.step4.tried_sleep_study", options: TRIED_OPTIONS },
        { id: "tried_cpap", type: "likert", label: "assessment.step4.tried_cpap", options: TRIED_OPTIONS }
      ]
    },
    {
      id: "previous_attempts_notes",
      label: "assessment.step4.what_stopped_working",
      questions: [
        {
          id: "what_stopped_working",
          type: "textarea",
          label: "assessment.step4.what_stopped_working",
          placeholder: "assessment.step4.what_stopped_working.placeholder"
        }
      ]
    }
  ]
};
const NOT_SURE$1 = { value: "unsure", label: "common.not_sure" };
const PHQ_OPTIONS = [
  { value: "0", label: "assessment.step5.phq.not_at_all" },
  { value: "1", label: "assessment.step5.phq.several_days" },
  { value: "2", label: "assessment.step5.phq.more_than_half" },
  { value: "3", label: "assessment.step5.phq.nearly_every_day" }
];
const step5 = {
  id: "step-5",
  label: "assessment.steps.5",
  groups: [
    {
      id: "phq2",
      label: "assessment.step5.phq2",
      intro: "assessment.step5.intro",
      renderMode: "likert-batch",
      questions: [
        { id: "little_interest", type: "likert", label: "assessment.step5.little_interest", required: true, min: 0, max: 3, options: PHQ_OPTIONS },
        { id: "feeling_down", type: "likert", label: "assessment.step5.feeling_down", required: true, min: 0, max: 3, options: PHQ_OPTIONS }
      ]
    },
    {
      id: "gad2",
      label: "assessment.step5.gad2",
      renderMode: "likert-batch",
      questions: [
        { id: "nervous_anxious", type: "likert", label: "assessment.step5.nervous_anxious", required: true, min: 0, max: 3, options: PHQ_OPTIONS },
        { id: "cant_stop_worrying", type: "likert", label: "assessment.step5.cant_stop_worrying", required: true, min: 0, max: 3, options: PHQ_OPTIONS }
      ]
    },
    {
      id: "sleep_emotions",
      label: "assessment.step5.sleep_emotions",
      questions: [
        {
          id: "bedtime_dread",
          type: "single-select",
          label: "assessment.step5.bedtime_dread",
          options: [
            { value: "yes", label: "assessment.step5.bedtime_dread.yes" },
            { value: "sometimes", label: "assessment.step5.bedtime_dread.sometimes" },
            { value: "no", label: "assessment.step5.bedtime_dread.no" },
            NOT_SURE$1
          ]
        },
        {
          id: "racing_mind",
          type: "single-select",
          label: "assessment.step5.racing_mind",
          options: [
            { value: "yes", label: "assessment.step5.racing_mind.yes" },
            { value: "sometimes", label: "assessment.step5.racing_mind.sometimes" },
            { value: "no", label: "assessment.step5.racing_mind.no" },
            NOT_SURE$1
          ]
        },
        {
          id: "clock_watching",
          type: "single-select",
          label: "assessment.step5.clock_watching",
          options: [
            { value: "yes", label: "assessment.step5.clock_watching.yes" },
            { value: "sometimes", label: "assessment.step5.clock_watching.sometimes" },
            { value: "no", label: "assessment.step5.clock_watching.no" },
            NOT_SURE$1
          ]
        },
        {
          id: "trying_hard",
          type: "single-select",
          label: "assessment.step5.trying_hard",
          options: [
            { value: "yes", label: "assessment.step5.trying_hard.yes" },
            { value: "sometimes", label: "assessment.step5.trying_hard.sometimes" },
            { value: "no", label: "assessment.step5.trying_hard.no" },
            NOT_SURE$1
          ]
        },
        {
          id: "easier_elsewhere",
          type: "single-select",
          label: "assessment.step5.easier_elsewhere",
          options: [
            { value: "yes", label: "assessment.step5.easier_elsewhere.yes" },
            { value: "sometimes", label: "assessment.step5.easier_elsewhere.sometimes" },
            { value: "no", label: "assessment.step5.easier_elsewhere.no" },
            NOT_SURE$1
          ]
        },
        {
          id: "avoidance_scrolling",
          type: "single-select",
          label: "assessment.step5.avoidance_scrolling",
          options: [
            { value: "yes", label: "assessment.step5.avoidance_scrolling.yes" },
            { value: "sometimes", label: "assessment.step5.avoidance_scrolling.sometimes" },
            { value: "no", label: "assessment.step5.avoidance_scrolling.no" },
            NOT_SURE$1
          ]
        }
      ]
    },
    {
      id: "stressors",
      label: "assessment.step5.stressors",
      questions: [
        {
          id: "main_stressor",
          type: "multi-select",
          label: "assessment.step5.main_stressor",
          options: [
            { value: "work", label: "assessment.step5.main_stressor.work" },
            { value: "financial", label: "assessment.step5.main_stressor.financial" },
            { value: "relationship", label: "assessment.step5.main_stressor.relationship" },
            { value: "grief", label: "assessment.step5.main_stressor.grief" },
            { value: "health", label: "assessment.step5.main_stressor.health" },
            { value: "purposelessness", label: "assessment.step5.main_stressor.purposelessness" },
            { value: "loneliness", label: "assessment.step5.main_stressor.loneliness" },
            { value: "caregiving", label: "assessment.step5.main_stressor.caregiving" },
            { value: "none", label: "assessment.step5.main_stressor.none", exclusive: true },
            { value: "rather_not_say", label: "assessment.step5.main_stressor.rather_not_say", exclusive: true }
          ]
        },
        {
          id: "stress_level",
          type: "scale",
          label: "assessment.step5.stress_level",
          min: 1,
          max: 10,
          required: true,
          minLabel: "assessment.step5.stress_level.low",
          maxLabel: "assessment.step5.stress_level.high"
        },
        {
          id: "coping_pattern",
          type: "single-select",
          label: "assessment.step5.coping_pattern",
          options: [
            { value: "push_through", label: "assessment.step5.coping_pattern.push_through" },
            { value: "replay_analyze", label: "assessment.step5.coping_pattern.replay_analyze" },
            { value: "talk_to_someone", label: "assessment.step5.coping_pattern.talk_to_someone" },
            { value: "no_pattern", label: "assessment.step5.coping_pattern.no_pattern" },
            NOT_SURE$1
          ]
        }
      ]
    },
    {
      id: "life_context",
      label: "assessment.step5.life_context",
      questions: [
        {
          id: "recent_changes",
          type: "textarea",
          label: "assessment.step5.recent_changes",
          placeholder: "assessment.step5.recent_changes.placeholder"
        },
        {
          id: "upcoming_anxiety",
          type: "textarea",
          label: "assessment.step5.upcoming_anxiety",
          placeholder: "assessment.step5.upcoming_anxiety.placeholder"
        }
      ]
    },
    {
      id: "trauma",
      label: "assessment.step5.trauma",
      questions: [
        {
          id: "nightmares",
          type: "single-select",
          label: "assessment.step5.nightmares",
          options: [
            { value: "yes_frequent", label: "assessment.step5.nightmares.yes_frequent" },
            { value: "yes_recurring", label: "assessment.step5.nightmares.yes_recurring" },
            { value: "sometimes", label: "assessment.step5.nightmares.sometimes" },
            { value: "no", label: "assessment.step5.nightmares.no" },
            NOT_SURE$1
          ]
        },
        {
          id: "safety_at_night",
          type: "single-select",
          label: "assessment.step5.safety_at_night",
          options: [
            { value: "yes", label: "assessment.step5.safety_at_night.yes" },
            { value: "sometimes", label: "assessment.step5.safety_at_night.sometimes" },
            { value: "no", label: "assessment.step5.safety_at_night.no" },
            NOT_SURE$1
          ]
        },
        {
          id: "startle_response",
          type: "single-select",
          label: "assessment.step5.startle_response",
          options: [
            { value: "yes", label: "assessment.step5.startle_response.yes" },
            { value: "sometimes", label: "assessment.step5.startle_response.sometimes" },
            { value: "no", label: "assessment.step5.startle_response.no" },
            NOT_SURE$1
          ]
        }
      ]
    }
  ]
};
const NOT_SURE = { value: "unsure", label: "common.not_sure" };
const step6 = {
  id: "step-6",
  label: "assessment.steps.6",
  groups: [
    {
      id: "physical_safety",
      label: "assessment.step6.physical_safety",
      intro: "assessment.step6.intro",
      questions: [
        {
          id: "body_lets_go",
          type: "single-select",
          label: "assessment.step6.body_lets_go",
          options: [
            { value: "yes", label: "assessment.step6.body_lets_go.yes" },
            { value: "partially", label: "assessment.step6.body_lets_go.partially" },
            { value: "no", label: "assessment.step6.body_lets_go.no" },
            NOT_SURE
          ]
        },
        {
          id: "home_safety",
          type: "single-select",
          label: "assessment.step6.home_safety",
          options: [
            { value: "yes_completely", label: "assessment.step6.home_safety.yes_completely" },
            { value: "mostly", label: "assessment.step6.home_safety.mostly" },
            { value: "not_really", label: "assessment.step6.home_safety.not_really" },
            { value: "no", label: "assessment.step6.home_safety.no" }
          ]
        },
        {
          id: "housing_stability",
          type: "single-select",
          label: "assessment.step6.housing_stability",
          options: [
            { value: "stable", label: "assessment.step6.housing_stability.stable" },
            { value: "uncertain", label: "assessment.step6.housing_stability.uncertain" },
            NOT_SURE
          ]
        },
        {
          id: "neighborhood_safety",
          type: "single-select",
          label: "assessment.step6.neighborhood_safety",
          options: [
            { value: "safe", label: "assessment.step6.neighborhood_safety.safe" },
            { value: "mostly_safe", label: "assessment.step6.neighborhood_safety.mostly_safe" },
            { value: "not_safe", label: "assessment.step6.neighborhood_safety.not_safe" },
            NOT_SURE
          ]
        },
        {
          id: "lock_checking",
          type: "single-select",
          label: "assessment.step6.lock_checking",
          options: [
            { value: "once", label: "assessment.step6.lock_checking.once" },
            { value: "multiple", label: "assessment.step6.lock_checking.multiple" },
            { value: "no", label: "assessment.step6.lock_checking.no" },
            NOT_SURE
          ]
        }
      ]
    },
    {
      id: "relational",
      label: "assessment.step6.relational",
      questions: [
        {
          id: "cohabitant_tension",
          type: "single-select",
          label: "assessment.step6.cohabitant_tension",
          options: [
            { value: "yes", label: "assessment.step6.cohabitant_tension.yes" },
            { value: "sometimes", label: "assessment.step6.cohabitant_tension.sometimes" },
            { value: "no", label: "assessment.step6.cohabitant_tension.no" },
            { value: "live_alone", label: "assessment.step6.cohabitant_tension.live_alone" },
            NOT_SURE
          ]
        },
        {
          id: "partner_effect",
          type: "single-select",
          label: "assessment.step6.partner_effect",
          options: [
            { value: "more_safe", label: "assessment.step6.partner_effect.more_safe" },
            { value: "more_alert", label: "assessment.step6.partner_effect.more_alert" },
            { value: "neutral", label: "assessment.step6.partner_effect.neutral" },
            { value: "no_partner", label: "assessment.step6.partner_effect.no_partner" },
            NOT_SURE
          ]
        },
        {
          id: "caregiving_role",
          type: "single-select",
          label: "assessment.step6.caregiving_role",
          options: [
            { value: "yes", label: "assessment.step6.caregiving_role.yes" },
            { value: "sometimes", label: "assessment.step6.caregiving_role.sometimes" },
            { value: "no", label: "assessment.step6.caregiving_role.no" },
            NOT_SURE
          ]
        }
      ]
    },
    {
      id: "financial",
      label: "assessment.step6.financial",
      questions: [
        {
          id: "financial_in_bed",
          type: "single-select",
          label: "assessment.step6.financial_in_bed",
          options: [
            { value: "yes", label: "assessment.step6.financial_in_bed.yes" },
            { value: "sometimes", label: "assessment.step6.financial_in_bed.sometimes" },
            { value: "no", label: "assessment.step6.financial_in_bed.no" },
            NOT_SURE
          ]
        },
        {
          id: "financial_security",
          type: "single-select",
          label: "assessment.step6.financial_security",
          options: [
            { value: "secure", label: "assessment.step6.financial_security.secure" },
            { value: "manageable", label: "assessment.step6.financial_security.manageable" },
            { value: "significant_stress", label: "assessment.step6.financial_security.significant_stress" },
            { value: "crisis", label: "assessment.step6.financial_security.crisis" },
            NOT_SURE
          ]
        }
      ]
    },
    {
      id: "digital",
      label: "assessment.step6.digital",
      questions: [
        {
          id: "last_phone_content",
          type: "single-select",
          label: "assessment.step6.last_phone_content",
          options: [
            { value: "relaxing", label: "assessment.step6.last_phone_content.relaxing" },
            { value: "stimulating", label: "assessment.step6.last_phone_content.stimulating" },
            { value: "stressful", label: "assessment.step6.last_phone_content.stressful" },
            { value: "no_phone", label: "assessment.step6.last_phone_content.no_phone" },
            NOT_SURE
          ]
        },
        {
          id: "evening_news",
          type: "single-select",
          label: "assessment.step6.evening_news",
          options: [
            { value: "yes_activating", label: "assessment.step6.evening_news.yes_activating" },
            { value: "yes_neutral", label: "assessment.step6.evening_news.yes_neutral" },
            { value: "no", label: "assessment.step6.evening_news.no" },
            NOT_SURE
          ]
        },
        {
          id: "work_email_check",
          type: "single-select",
          label: "assessment.step6.work_email_check",
          options: [
            { value: "yes", label: "assessment.step6.work_email_check.yes" },
            { value: "sometimes", label: "assessment.step6.work_email_check.sometimes" },
            { value: "no", label: "assessment.step6.work_email_check.no" },
            NOT_SURE
          ]
        },
        {
          id: "doomscrolling",
          type: "single-select",
          label: "assessment.step6.doomscrolling",
          options: [
            { value: "yes", label: "assessment.step6.doomscrolling.yes" },
            { value: "sometimes", label: "assessment.step6.doomscrolling.sometimes" },
            { value: "no", label: "assessment.step6.doomscrolling.no" },
            NOT_SURE
          ]
        }
      ]
    },
    {
      id: "nervous_system",
      label: "assessment.step6.nervous_system",
      questions: [
        {
          id: "body_state",
          type: "single-select",
          label: "assessment.step6.body_state",
          options: [
            { value: "calm_ready", label: "assessment.step6.body_state.calm_ready" },
            { value: "tired_wired", label: "assessment.step6.body_state.tired_wired" },
            { value: "heart_elevated", label: "assessment.step6.body_state.heart_elevated" },
            { value: "muscles_tense", label: "assessment.step6.body_state.muscles_tense" },
            { value: "alert_scanning", label: "assessment.step6.body_state.alert_scanning" },
            { value: "numb_disconnected", label: "assessment.step6.body_state.numb_disconnected" },
            NOT_SURE
          ]
        },
        {
          id: "safety_rituals",
          type: "multi-select",
          label: "assessment.step6.safety_rituals",
          options: [
            { value: "door_closed", label: "assessment.step6.safety_rituals.door_closed" },
            { value: "door_open", label: "assessment.step6.safety_rituals.door_open" },
            { value: "light_on", label: "assessment.step6.safety_rituals.light_on" },
            { value: "complete_darkness", label: "assessment.step6.safety_rituals.complete_darkness" },
            { value: "phone_near", label: "assessment.step6.safety_rituals.phone_near" },
            { value: "specific_side", label: "assessment.step6.safety_rituals.specific_side" },
            { value: "partner_present", label: "assessment.step6.safety_rituals.partner_present" },
            { value: "alone", label: "assessment.step6.safety_rituals.alone" },
            { value: "audio_playing", label: "assessment.step6.safety_rituals.audio_playing" },
            { value: "silence", label: "assessment.step6.safety_rituals.silence" },
            { value: "other", label: "assessment.step6.safety_rituals.other" }
          ]
        },
        {
          id: "sleep_away_from_home",
          type: "single-select",
          label: "assessment.step6.sleep_away_from_home",
          options: [
            { value: "better", label: "assessment.step6.sleep_away_from_home.better" },
            { value: "worse", label: "assessment.step6.sleep_away_from_home.worse" },
            { value: "same", label: "assessment.step6.sleep_away_from_home.same" },
            NOT_SURE
          ]
        }
      ]
    }
  ]
};
const formConfig = {
  steps: [step1, step2, step3, step4, step5, step6]
};
const common = { "app_name": "Better Sleep", "begin_assessment": "Begin the assessment", "back": "Back", "continue": "Continue", "not_sure": "I'm not sure", "skip_section": "Skip this section", "step_of": "Step {current} of {total}", "required": "Required", "optional": "Optional", "loading": "Loading...", "error": "Something went wrong", "privacy_note": "Everything runs in your browser. Nothing is stored or transmitted until you choose to register.", "disclaimer": "This is an educational screening tool, not a diagnostic instrument. It does not replace professional medical evaluation." };
const nav = { "home": "Home", "assessment": "Assessment", "language": "Language" };
const landing = { "title": "You know this feeling", "hook": "It's 3am. You're staring at the ceiling again. The alarm is set for 6:30 and your mind is already calculating — three and a half hours, if you fall asleep right now. But you won't fall asleep right now. You know that. Your body is exhausted but something in you won't let go.", "hook_2": "Or maybe it's the fog at 2pm that no amount of coffee cuts through. The short temper with someone you love over something trivial. The alarm that goes off when it feels like you just closed your eyes. You know something is wrong with your sleep. You just don't know what, or where to start.", "section_body_title": "Your body at night", "section_body": "Deep sleep is your body's maintenance window. Growth hormone release, tissue repair, immune recalibration, cardiovascular recovery, metabolic regulation. This isn't optional recovery — it's work your body literally cannot do while you're awake. Chronic sleep deprivation produces measurable increases in inflammatory markers, insulin resistance, and cortisol dysregulation. The damage accumulates silently and compounds.", "section_emotional_title": "Your emotional life", "section_emotional": "The amygdala becomes roughly 60% more reactive after sleep deprivation while the prefrontal cortex — the part that keeps your reactions proportionate — becomes less active. This isn't a metaphor; it's measurable on brain imaging. Irritability that feels disproportionate, emotional reactions you can't explain, reduced empathy, difficulty navigating conflict. Many people treating anxiety or mood instability are actually treating a sleep problem they haven't identified.", "section_cognitive_title": "Your mind at work", "section_cognitive": "Working memory, executive function, creative problem-solving, learning consolidation — all degrade with poor sleep. After 17-19 hours awake, cognitive impairment is equivalent to a blood alcohol level of 0.05%. The critical detail: unlike alcohol, sleep deprivation doesn't come with self-awareness of impairment. You make worse decisions and don't notice.", "section_financial_title": "Your financial reality", "section_financial": "Sleep-deprived professionals show measurable productivity losses, worse negotiation outcomes, poorer strategic decisions. For anyone whose livelihood depends on thinking clearly, every foggy morning is diminished earning capacity.", "what_this_does_title": "What this tool does", "what_this_does": "A structured self-assessment built on validated clinical screening instruments. It examines six dimensions of your life that affect sleep: your environment, your biology, your health history, your personal habits, your emotional state, and your sense of safety. It identifies patterns, explains the mechanisms, and gives you a prioritized action plan for your specific situation." };
const assessment = /* @__PURE__ */ JSON.parse(`{"steps":{"1":"Your Sleep Right Now","2":"Your Sleep Environment","3":"Your Body","4":"Your Health & Substances","5":"Your Emotional Landscape","6":"Safety & Security"},"step1":{"schedule":"Your sleep schedule","bedtime_work":"What time do you usually get into bed on a work night?","bedtime_free":"What about nights when you have no obligations the next morning?","waketime_work":"What time do you usually try to wake up on work days?","waketime_free":"What about free days?","onset":"Falling asleep","sleep_onset":"Once you're in bed and trying to sleep, roughly how long does it take before you actually fall asleep?","sleep_onset.immediate":"I fall asleep almost immediately","sleep_onset.10_20":"Around 10-20 minutes","sleep_onset.20_40":"It usually takes 20-40 minutes","sleep_onset.40_60":"Often 40 minutes to an hour","sleep_onset.over_60":"Regularly more than an hour","wakings":"Night wakings","night_wakings":"How many times do you typically wake up during the night?","night_wakings.0":"I don't wake up during the night","night_wakings.1_2":"Once or twice","night_wakings.3_4":"Three or four times","night_wakings.5_plus":"Five or more times","total_sleep":"Total sleep","sleep_hours":"How many hours of actual sleep do you think you're getting on a typical night?","sleep_hours.under_4":"Less than 4 hours","sleep_hours.4_5":"4-5 hours","sleep_hours.5_6":"5-6 hours","sleep_hours.6_7":"6-7 hours","sleep_hours.7_8":"7-8 hours","sleep_hours.over_8":"More than 8 hours","sleep_hours.no_idea":"I honestly have no idea","primary_complaint":"Your main struggle","main_struggle":"Which of these best describes your main struggle with sleep?","main_struggle.cant_fall_asleep":"I can't fall asleep. I lie there awake.","main_struggle.wake_during_night":"I fall asleep fine but keep waking up during the night.","main_struggle.wake_too_early":"I wake up way too early and can't get back to sleep.","main_struggle.unrestorative":"I sleep through the night but wake up feeling like I didn't sleep at all.","main_struggle.excessive_sleepiness":"I'm unbearably sleepy during the day no matter how much I sleep.","main_struggle.parasomnias":"Strange things happen while I sleep — movements, walking, talking, vivid acting-out of dreams.","main_struggle.irregular_schedule":"My sleep schedule is all over the place. I can't get into a rhythm.","main_struggle.multiple":"Several of these apply to me.","duration_frequency":"How long and how often","duration":"How long has this been going on?","duration.weeks":"Just the last couple of weeks","duration.months":"A few months","duration.6_12_months":"Six months to a year","duration.over_year":"Over a year","duration.always":"As long as I can remember","frequency":"How many nights per week does this happen?","frequency.every_night":"Every single night","frequency.most_nights":"Most nights (3-5 per week)","frequency.couple_nights":"A couple of nights a week","frequency.unpredictable":"It comes and goes unpredictably","isi":"How your sleep problem affects you","isi.intro":"These next questions help us gauge the severity of what you're experiencing. Answer based on the last two weeks.","isi.falling_asleep":"How difficult has it been to fall asleep recently?","isi.staying_asleep":"How much trouble have you had staying asleep?","isi.waking_early":"Do you have a problem waking up too early?","isi.satisfaction":"How satisfied or dissatisfied are you with your current sleep?","isi.noticeable":"How noticeable to others do you think your sleep problem is, in terms of affecting your quality of life?","isi.worried":"How worried or distressed are you about your sleep right now?","isi.interfere":"How much does your sleep problem interfere with your daily functioning — energy, relationships, mood, concentration, memory, ability to work?","isi.none":"None","isi.mild":"Mild","isi.moderate":"Moderate","isi.severe":"Severe","isi.very_severe":"Very severe","isi.very_satisfied":"Very satisfied","isi.satisfied":"Satisfied","isi.neutral":"Neutral","isi.dissatisfied":"Dissatisfied","isi.very_dissatisfied":"Very dissatisfied","isi.not_at_all":"Not at all","isi.a_little":"A little","isi.somewhat":"Somewhat","isi.much":"Much","isi.very_much":"Very much"},"step2":{"bedroom_darkness":"Bedroom darkness","bedroom_darkness.question":"When you're lying in bed at night with the lights off, how dark is the room?","bedroom_darkness.complete_darkness":"It's completely dark — I can't see my hand in front of my face","bedroom_darkness.outlines_shapes":"I can see outlines and shapes but it's quite dark","bedroom_darkness.noticeable_light":"There's noticeable light from streetlights, devices, or gaps in curtains","bedroom_darkness.fairly_lit":"The room stays fairly lit — screens, hallway light, or no curtains","bedroom_sound":"Bedroom sound","bedroom_sound.question":"What's the sound environment like in your bedroom at night?","bedroom_sound.silent":"It's essentially silent","bedroom_sound.occasional":"Occasional sounds but nothing that regularly wakes me","bedroom_sound.regular_noise":"Regular noise from traffic, neighbors, or household","bedroom_sound.partner_snores":"My partner snores or makes noise","bedroom_sound.unpredictable":"Unpredictable noises that startle me awake","bedroom_sound.sound_machine":"I use a sound machine or fan for background noise","bedroom_temp":"Bedroom temperature","bedroom_temp.question":"How would you describe the temperature in your bedroom at night?","bedroom_temp.comfortable":"Comfortable — I don't think about it","bedroom_temp.too_warm":"Usually too warm","bedroom_temp.too_cold":"Usually too cold","bedroom_temp.changes":"It changes through the night — I wake up hot or cold","bedroom_temp.cant_control":"I can't control it well","bedroom_comfort":"Mattress and bedding","bedroom_comfort.question":"How comfortable is your mattress and bedding?","bedroom_comfort.comfortable":"Very comfortable — I look forward to getting into bed","bedroom_comfort.acceptable":"Acceptable but not great","bedroom_comfort.stiff_sore":"I wake up stiff or sore","bedroom_comfort.uncomfortable":"It's uncomfortable but I'm used to it","bedroom_comfort.old_mattress":"My mattress is old and needs replacing","bedroom_air":"Air quality","bedroom_air.question":"How is the air quality in your bedroom?","bedroom_air.fresh":"Fresh — I keep a window open or have good ventilation","bedroom_air.stuffy":"It gets stuffy by morning","bedroom_air.congested":"I often wake up congested or with a dry throat","bed_sharing":"Bed sharing","bed_sharing.question":"Do you share your bed with anyone?","bed_sharing.alone":"I sleep alone","bed_sharing.partner_no_issue":"With a partner — they don't disrupt my sleep","bed_sharing.partner_disrupts":"With a partner — their movements, snoring, or schedule disrupts me","pets":"Pets","pets.question":"Do pets sleep in your bedroom?","pets.no_pets":"No pets in the bedroom","pets.pets_no_issue":"Yes, but they don't disturb my sleep","pets.pets_wake_me":"Yes, and they sometimes wake me up","evening_activities":"Evening wind-down","evening_activities.question":"What do you typically do in the hour before bed? (Select all that apply)","evening_activities.tv":"Watch TV","evening_activities.phone":"Browse phone or tablet","evening_activities.computer":"Use a computer","evening_activities.book_physical":"Read a physical book","evening_activities.book_device":"Read on a device","evening_activities.talking":"Talk with family or partner","evening_activities.physical":"Physical activity or exercise","evening_activities.combination":"A combination that changes nightly","evening_content":"Evening content","evening_content.question":"What kind of content do you typically consume in the evening?","evening_content.relaxing":"Light, relaxing content","evening_content.engaging":"Engaging shows, games, or deep reading","evening_content.news":"News and current events","evening_content.social_media":"Social media scrolling","evening_content.work":"Work-related material","evening_content.stressful":"Content that often leaves me activated or upset","evening_content.no_screens":"I mostly avoid screens in the evening","evening_lighting":"Evening lighting","evening_lighting.question":"What's the lighting like in your home in the evening?","evening_lighting.bright_overhead":"Bright overhead lights stay on until bedtime","evening_lighting.dimmed":"I dim lights or switch to lamps in the evening","evening_lighting.dark_screens_only":"It's mostly dark except for screens","bed_activities":"Bed association","bed_activities.question":"What do you use your bed for besides sleep?","bed_activities.sleep_only":"Sleep and intimacy only","bed_activities.work_in_bed":"I often work in bed","bed_activities.eat_in_bed":"I eat in bed","bed_activities.watch_in_bed":"I watch shows or scroll in bed","bed_activities.multiple":"Multiple activities — my bed is my main living space","environment_noise":"Neighborhood noise","environment_noise.question":"How noisy is your living environment overall?","environment_noise.quiet":"Quiet neighborhood","environment_noise.moderate":"Moderate — some traffic or neighbor noise","environment_noise.noisy":"Noisy — regular disturbances from outside","shift_work":"Shift work","shift_work.question":"Do you do shift work or have irregular work hours?","shift_work.no":"No — I work roughly the same hours each day","shift_work.yes_rotating":"Yes — rotating shifts","shift_work.yes_nights":"Yes — regular night shifts","shift_work.yes_early":"Yes — very early morning starts"},"step3":{"physical_profile":"Your physical profile","physical_profile.age_range":"What is your age range?","physical_profile.age_range.18_25":"18-25","physical_profile.age_range.26_35":"26-35","physical_profile.age_range.36_45":"36-45","physical_profile.age_range.46_55":"46-55","physical_profile.age_range.56_65":"56-65","physical_profile.age_range.over_65":"Over 65","physical_profile.biological_sex":"What is your biological sex?","physical_profile.biological_sex.male":"Male","physical_profile.biological_sex.female":"Female","physical_profile.biological_sex.intersex":"Intersex","physical_profile.biological_sex.prefer_not_say":"Prefer not to say","physical_profile.height":"Height (cm)","physical_profile.weight":"Weight (kg)","physical_profile.neck_size":"How would you describe your neck size?","physical_profile.neck_size.small":"Small or average","physical_profile.neck_size.medium":"Medium — shirt collars feel snug","physical_profile.neck_size.large":"Large — I need larger collar sizes","physical_profile.weight_distribution":"Where do you tend to carry extra weight?","physical_profile.weight_distribution.neck_midsection":"Around my neck and midsection","physical_profile.weight_distribution.evenly":"Evenly distributed or not applicable","breathing":"Breathing and airway","breathing.snoring":"Has anyone told you that you snore?","breathing.snoring.no":"No, or I've been told I don't snore","breathing.snoring.light":"Light snoring occasionally","breathing.snoring.loud":"Loud or frequent snoring","breathing.witnessed_apnea":"Has anyone noticed you stop breathing during sleep?","breathing.witnessed_apnea.yes":"Yes — someone has told me this","breathing.witnessed_apnea.no":"No, or I don't know","breathing.choking":"Do you ever wake up gasping or choking?","breathing.choking.yes":"Yes, this happens regularly","breathing.choking.sometimes":"It's happened a few times","breathing.choking.no":"No","breathing.morning_symptoms":"Do you wake up with any of these? (Select all that apply)","breathing.morning_symptoms.dry_mouth":"Dry mouth","breathing.morning_symptoms.sore_throat":"Sore throat","breathing.morning_symptoms.headache":"Morning headache","breathing.morning_symptoms.none":"None of these","breathing.mouth_breathing":"Do you breathe through your mouth during sleep?","breathing.mouth_breathing.yes":"Yes — I'm a mouth breather at night","breathing.mouth_breathing.sometimes":"Sometimes","breathing.mouth_breathing.no":"No — I breathe through my nose","breathing.teeth_grinding":"Do you grind your teeth at night?","breathing.teeth_grinding.yes":"Yes — confirmed by a dentist or partner","breathing.teeth_grinding.suspected":"I suspect I do — jaw pain or worn teeth","breathing.teeth_grinding.no":"No","movement":"What your body does while you sleep","movement.restless_legs":"Do you get an uncomfortable urge to move your legs when lying down?","movement.restless_legs.yes":"Yes — it's a strong, uncomfortable sensation","movement.restless_legs.sometimes":"Sometimes, especially when I'm tired","movement.restless_legs.no":"No","movement.restless_relief":"Does moving your legs relieve the sensation?","movement.restless_relief.yes":"Yes — movement helps temporarily","movement.restless_relief.no":"No — it doesn't really help","movement.leg_jerking":"Has anyone told you your legs jerk or kick during sleep?","movement.leg_jerking.yes":"Yes","movement.leg_jerking.no":"No, or I don't know","movement.dream_acting":"Do you physically act out your dreams — punching, kicking, falling out of bed?","movement.dream_acting.yes":"Yes — this happens regularly","movement.dream_acting.sometimes":"It's happened a few times","movement.dream_acting.no":"No","movement.sleepwalking":"Do you sleepwalk, sleep-talk, or do complex things while asleep?","movement.sleepwalking.yes":"Yes — regularly","movement.sleepwalking.sometimes":"It's happened occasionally","movement.sleepwalking.no":"No","movement.sleep_paralysis":"Do you ever wake up unable to move your body?","movement.sleep_paralysis.yes":"Yes — it's terrifying and happens regularly","movement.sleep_paralysis.sometimes":"It's happened a few times","movement.sleep_paralysis.no":"No","movement.hypnagogic":"Do you see or hear things while falling asleep or waking up that aren't there?","movement.hypnagogic.yes":"Yes — vivid images, sounds, or presences","movement.hypnagogic.sometimes":"Occasionally","movement.hypnagogic.no":"No","internal_clock":"Your internal clock","internal_clock.natural_sleep_time":"If you had no obligations, what time would you naturally fall asleep?","internal_clock.natural_wake_time":"And what time would you naturally wake up?","internal_clock.peak_alertness":"When do you feel most alert and productive?","internal_clock.peak_alertness.early_morning":"Early morning (6-9am)","internal_clock.peak_alertness.late_morning":"Late morning (9am-12pm)","internal_clock.peak_alertness.afternoon":"Afternoon (12-5pm)","internal_clock.peak_alertness.evening":"Evening (5-9pm)","internal_clock.peak_alertness.night":"Late night (after 9pm)","internal_clock.adaptability":"How easily do you adjust to schedule changes?","internal_clock.adaptability.easy":"Easily — I'm flexible","internal_clock.adaptability.moderate":"It takes me a few days","internal_clock.adaptability.difficult":"I struggle significantly with any shift","internal_clock.vacation_sleep":"How do you sleep on vacation or when obligations are removed?","internal_clock.vacation_sleep.much_better":"Much better — I sleep like a different person","internal_clock.vacation_sleep.somewhat_better":"Somewhat better","internal_clock.vacation_sleep.same":"About the same","internal_clock.vacation_sleep.worse":"Actually worse — unfamiliar environments bother me","internal_clock.schedule_gap":"How different is your sleep schedule on work days vs. free days?","internal_clock.schedule_gap.no_gap":"No real difference","internal_clock.schedule_gap.small":"About 1 hour difference","internal_clock.schedule_gap.large":"2-3 hours different","internal_clock.schedule_gap.huge":"More than 3 hours different","hormonal":"Hormonal patterns","hormonal.cortisol_surge":"Do you wake up between 2-4am feeling suddenly alert or anxious?","hormonal.cortisol_surge.yes":"Yes — this is a regular pattern","hormonal.cortisol_surge.sometimes":"It happens occasionally","hormonal.cortisol_surge.no":"No","hormonal.early_waking_pattern":"When you wake too early, do you feel alert or groggy?","hormonal.early_waking_pattern.yes_alert":"Alert — my mind switches on immediately","hormonal.early_waking_pattern.yes_groggy":"Groggy — I want to sleep but can't","hormonal.early_waking_pattern.no":"I don't wake too early","hormonal.post_meal_drowsy":"Do you feel extremely drowsy after meals?","hormonal.post_meal_drowsy.yes":"Yes — I sometimes need to nap after eating","hormonal.post_meal_drowsy.sometimes":"Occasionally, especially after large meals","hormonal.post_meal_drowsy.no":"No — meals don't affect my alertness much","hormonal.afternoon_crash":"Do you experience a strong afternoon energy crash?","hormonal.afternoon_crash.yes":"Yes — it's debilitating","hormonal.afternoon_crash.sometimes":"Sometimes","hormonal.afternoon_crash.no":"No — my energy stays relatively stable","hormonal_women":"Hormonal factors (for women)","hormonal_women.cycle_sleep":"Does your menstrual cycle affect your sleep?","hormonal_women.cycle_sleep.yes":"Yes — noticeably worse at certain times","hormonal_women.cycle_sleep.somewhat":"Somewhat — I notice a mild pattern","hormonal_women.cycle_sleep.no":"No — or not applicable","hormonal_women.perimenopause":"Are you experiencing perimenopause or menopause symptoms?","hormonal_women.perimenopause.yes":"Yes — hot flashes, night sweats, or cycle changes","hormonal_women.perimenopause.possibly":"Possibly — I'm not sure","hormonal_women.perimenopause.no":"No","hormonal_women.pregnant":"Are you pregnant or recently postpartum?","hormonal_women.pregnant.yes":"Yes — currently pregnant","hormonal_women.pregnant.recent_baby":"Recently had a baby","hormonal_women.pregnant.no":"No","hormonal_men":"Hormonal factors (for men)","hormonal_men.nocturia":"How often do you wake up to urinate at night?","hormonal_men.nocturia.none":"I don't wake up for this","hormonal_men.nocturia.once":"Once per night","hormonal_men.nocturia.twice":"Twice per night","hormonal_men.nocturia.three_plus":"Three or more times","hormonal_men.energy_changes":"Have you noticed changes in energy, motivation, or body composition?","hormonal_men.energy_changes.yes":"Yes — noticeable decline","hormonal_men.energy_changes.somewhat":"Somewhat — subtle changes","hormonal_men.energy_changes.no":"No","thyroid_everyone":"Thyroid indicators","thyroid_everyone.cold_sluggish":"Do you often feel cold, sluggish, or have unexplained weight gain?","thyroid_everyone.cold_sluggish.yes":"Yes — several of these","thyroid_everyone.cold_sluggish.somewhat":"Somewhat","thyroid_everyone.cold_sluggish.no":"No","thyroid_everyone.warm_wired":"Do you feel wired, warm, or have unexplained weight loss?","thyroid_everyone.warm_wired.yes":"Yes — several of these","thyroid_everyone.warm_wired.somewhat":"Somewhat","thyroid_everyone.warm_wired.no":"No","family":"Family patterns","family.family_sleep_problems":"Do immediate family members have sleep problems?","family.family_sleep_problems.yes":"Yes — diagnosed or obvious sleep disorders","family.family_sleep_problems.possibly":"Possibly — some family members sleep poorly","family.family_sleep_problems.no":"Not that I know of"},"step4":{"medications":"Medications and supplements","medication_text":"List any medications or supplements you take regularly","medication_text.placeholder":"e.g., sertraline 50mg, melatonin 3mg, ibuprofen as needed...","medication_categories":"Which categories apply? (Select all that apply)","medication_categories.depression_anxiety":"Antidepressants or anti-anxiety medication","medication_categories.sleep_aids":"Prescription sleep aids","medication_categories.blood_pressure":"Blood pressure medication","medication_categories.steroids":"Steroids or corticosteroids","medication_categories.adhd":"ADHD medication or stimulants","medication_categories.thyroid":"Thyroid medication","medication_categories.pain":"Pain medication (prescription)","medication_categories.allergy":"Antihistamines or allergy medication","medication_categories.reflux":"Acid reflux medication","medication_categories.cholesterol":"Cholesterol medication (statins)","medication_categories.hormonal":"Hormone therapy or birth control","medication_categories.sleep_supplements":"Sleep supplements (melatonin, magnesium, etc.)","medication_categories.none":"I don't take any medications","caffeine":"Caffeine","caffeine_type":"What caffeine sources do you consume? (Select all that apply)","caffeine_type.coffee":"Coffee","caffeine_type.tea":"Tea","caffeine_type.energy_drinks":"Energy drinks","caffeine_type.cola":"Cola or other caffeinated sodas","caffeine_type.none":"I don't consume caffeine","caffeine_amount":"How many caffeinated drinks per day?","caffeine_amount.one":"One","caffeine_amount.two_three":"Two to three","caffeine_amount.four_plus":"Four or more","caffeine_timing":"When do you have your last caffeinated drink?","caffeine_timing.morning_only":"Morning only (before 10am)","caffeine_timing.before_noon":"Before noon","caffeine_timing.afternoon":"Afternoon (12-5pm)","caffeine_timing.evening":"Evening (after 5pm)","alcohol":"Alcohol","alcohol_frequency":"How often do you drink alcohol?","alcohol_frequency.never":"Never","alcohol_frequency.rarely":"Rarely (a few times a month)","alcohol_frequency.weekly":"Weekly (1-2 times a week)","alcohol_frequency.most_days":"Most days","alcohol_frequency.daily":"Daily","alcohol_timing":"When do you usually drink relative to bedtime?","alcohol_timing.not_applicable":"Not applicable — I don't drink","alcohol_timing.with_dinner":"With dinner (3+ hours before bed)","alcohol_timing.after_dinner":"After dinner (1-3 hours before bed)","alcohol_timing.close_to_bed":"Close to bedtime (within 1 hour)","alcohol_sleep_pattern":"How does alcohol affect your sleep?","alcohol_sleep_pattern.helps_fall_asleep_worse_later":"Helps me fall asleep but I sleep worse later","alcohol_sleep_pattern.no_effect":"No noticeable effect","alcohol_sleep_pattern.makes_everything_worse":"Makes everything worse","alcohol_sleep_pattern.not_applicable":"Not applicable","nicotine":"Nicotine","nicotine_use":"Do you use nicotine?","nicotine_use.never":"Never","nicotine_use.former":"Former user","nicotine_use.cigarettes":"Cigarettes","nicotine_use.vaping":"Vaping","nicotine_use.other":"Other nicotine products","nicotine_timing":"When do you last use nicotine?","nicotine_timing.not_applicable":"Not applicable","nicotine_timing.morning":"Morning only","nicotine_timing.throughout_day":"Throughout the day","nicotine_timing.close_to_bed":"Close to bedtime","cannabis":"Cannabis","cannabis_use":"Do you use cannabis?","cannabis_use.never":"Never","cannabis_use.rarely":"Rarely","cannabis_use.regularly":"Regularly","cannabis_use.daily":"Daily","cannabis_for_sleep":"Do you use cannabis specifically to help with sleep?","cannabis_for_sleep.yes":"Yes — it's my main sleep aid","cannabis_for_sleep.sometimes":"Sometimes","cannabis_for_sleep.no":"No — I use it for other reasons","cannabis_for_sleep.not_applicable":"Not applicable","physical_symptoms":"Physical symptoms","pain_at_night":"Does physical pain interfere with your sleep?","pain_at_night.yes":"Yes — pain regularly disrupts my sleep","pain_at_night.sometimes":"Sometimes","pain_at_night.no":"No","gerd":"Do you experience acid reflux or heartburn at night?","gerd.yes":"Yes — it's a regular problem","gerd.sometimes":"Occasionally","gerd.no":"No","breathing_difficulty":"Do you have difficulty breathing when lying down?","breathing_difficulty.yes":"Yes — I need to prop myself up","breathing_difficulty.sometimes":"Occasionally","breathing_difficulty.no":"No","headaches":"When do you typically get headaches?","headaches.morning":"Morning — I wake up with them","headaches.afternoon":"Afternoon","headaches.evening":"Evening","headaches.varied":"Varies — no clear pattern","headaches.rarely":"I rarely get headaches","neuropathy":"Do you experience tingling, numbness, or burning in your extremities?","neuropathy.yes":"Yes — regularly","neuropathy.sometimes":"Occasionally","neuropathy.no":"No","fatigue_sensitivity":"Do you feel exhausted regardless of how much sleep you get?","fatigue_sensitivity.yes":"Yes — sleep never feels restorative","fatigue_sensitivity.somewhat":"Somewhat — even good nights don't fully recharge me","fatigue_sensitivity.no":"No — when I sleep well, I feel refreshed","blood_work":"Blood work","recent_bloodwork":"What did your most recent blood work show?","recent_bloodwork.normal":"Everything was normal","recent_bloodwork.iron_low":"Low iron or ferritin","recent_bloodwork.vitamin_d_low":"Low vitamin D","recent_bloodwork.thyroid_issue":"Thyroid abnormality","recent_bloodwork.sugar_issue":"Blood sugar or insulin issues","recent_bloodwork.multiple_issues":"Multiple abnormalities","recent_bloodwork.no_recent":"I haven't had blood work done recently","previous_attempts":"What you've already tried","previous_attempts.helped":"Helped","previous_attempts.didnt_help":"Didn't help","previous_attempts.helped_then_stopped":"Helped then stopped working","previous_attempts.never_tried":"Never tried","tried_melatonin":"Melatonin","tried_prescription":"Prescription sleep medication","tried_routine":"Sleep hygiene routine","tried_caffeine_cut":"Cutting caffeine","tried_exercise":"Regular exercise","tried_meditation":"Meditation or relaxation techniques","tried_therapy":"Therapy or counseling","tried_sleep_study":"Sleep study","tried_cpap":"CPAP machine","what_stopped_working":"Is there anything else you've tried? What worked, what didn't?","what_stopped_working.placeholder":"Share anything about what you've tried and how it went..."},"step5":{"intro":"Over the last 2 weeks, how often have you been bothered by the following? This section uses validated clinical screening questions. Your honest answers help us understand the emotional dimension of your sleep.","phq2":"Mood screening (PHQ-2)","phq.not_at_all":"Not at all","phq.several_days":"Several days","phq.more_than_half":"More than half the days","phq.nearly_every_day":"Nearly every day","little_interest":"Little interest or pleasure in doing things","feeling_down":"Feeling down, depressed, or hopeless","gad2":"Anxiety screening (GAD-2)","nervous_anxious":"Feeling nervous, anxious, or on edge","cant_stop_worrying":"Not being able to stop or control worrying","sleep_emotions":"Sleep-specific emotions","bedtime_dread":"Do you dread going to bed?","bedtime_dread.yes":"Yes — I avoid it or put it off","bedtime_dread.sometimes":"Sometimes — it depends on the night","bedtime_dread.no":"No — bedtime is neutral or pleasant","racing_mind":"Does your mind race when you lie down?","racing_mind.yes":"Yes — it's like a switch flips on","racing_mind.sometimes":"Sometimes","racing_mind.no":"No — my mind is usually quiet","clock_watching":"Do you check the time during the night?","clock_watching.yes":"Yes — and it makes everything worse","clock_watching.sometimes":"Sometimes","clock_watching.no":"No — I've stopped looking or removed clocks","trying_hard":"Do you feel like you're trying too hard to sleep?","trying_hard.yes":"Yes — the harder I try, the less it works","trying_hard.sometimes":"Sometimes","trying_hard.no":"No — I don't feel that pressure","easier_elsewhere":"Do you sleep better in places other than your own bed?","easier_elsewhere.yes":"Yes — hotels, couch, other people's homes","easier_elsewhere.sometimes":"Sometimes","easier_elsewhere.no":"No — my bed is where I sleep best","avoidance_scrolling":"Do you stay up late scrolling or watching to avoid lying awake?","avoidance_scrolling.yes":"Yes — it's easier than facing the dark","avoidance_scrolling.sometimes":"Sometimes","avoidance_scrolling.no":"No","stressors":"Current stressors","main_stressor":"What are your main sources of stress right now? (Select all that apply)","main_stressor.work":"Work or career","main_stressor.financial":"Financial pressure","main_stressor.relationship":"Relationship difficulties","main_stressor.grief":"Grief or loss","main_stressor.health":"Health concerns (yours or someone close)","main_stressor.purposelessness":"Feeling of purposelessness or stagnation","main_stressor.loneliness":"Loneliness or isolation","main_stressor.caregiving":"Caregiving responsibilities","main_stressor.none":"No significant stressors right now","main_stressor.rather_not_say":"I'd rather not say","stress_level":"Overall stress level (1 = minimal, 10 = overwhelming)","stress_level.low":"Minimal","stress_level.high":"Overwhelming","coping_pattern":"How do you typically cope with stress?","coping_pattern.push_through":"Push through — I just keep going","coping_pattern.replay_analyze":"Replay and analyze — I go over things in my head","coping_pattern.talk_to_someone":"Talk to someone","coping_pattern.no_pattern":"No clear pattern — it depends","life_context":"Life context","recent_changes":"Have there been any significant life changes in the past year that might affect your sleep?","recent_changes.placeholder":"e.g., new job, move, breakup, loss, new baby, retirement...","upcoming_anxiety":"Is there anything you're dreading or anxious about that keeps you up?","upcoming_anxiety.placeholder":"e.g., upcoming deadline, health results, difficult conversation...","trauma":"Trauma and safety","trauma.title":"Continue to trauma-related questions","trauma.intro":"The following questions touch on experiences related to trauma and safety. These factors can significantly affect sleep. You can skip this section entirely if you prefer — it won't affect the rest of your results.","nightmares":"Do you have nightmares?","nightmares.yes_frequent":"Yes — frequent and distressing","nightmares.yes_recurring":"Yes — the same nightmare keeps recurring","nightmares.sometimes":"Occasionally, but not a major issue","nightmares.no":"Rarely or never","safety_at_night":"Do you feel physically safe when you go to sleep?","safety_at_night.yes":"Yes — completely","safety_at_night.sometimes":"Usually, but not always","safety_at_night.no":"No — I don't feel safe","startle_response":"Do you startle easily at sounds during the night?","startle_response.yes":"Yes — I'm on high alert","startle_response.sometimes":"Sometimes","startle_response.no":"No — sounds don't usually bother me"},"step6":{"intro":"This final section explores how safe and secure you feel in your life. These factors profoundly affect sleep quality, often more than people realize. Answer honestly — there are no wrong answers.","physical_safety":"Physical safety","body_lets_go":"When you lie down, does your body actually relax?","body_lets_go.yes":"Yes — I feel my body let go","body_lets_go.partially":"Partially — some parts stay tense","body_lets_go.no":"No — I stay rigid or tense","home_safety":"Do you feel safe in your home?","home_safety.yes_completely":"Yes — completely safe","home_safety.mostly":"Mostly safe","home_safety.not_really":"Not really","home_safety.no":"No — I don't feel safe at home","housing_stability":"Is your housing situation stable?","housing_stability.stable":"Yes — stable and secure","housing_stability.uncertain":"No — uncertain or at risk","neighborhood_safety":"How safe is your neighborhood?","neighborhood_safety.safe":"Safe — I don't worry about it","neighborhood_safety.mostly_safe":"Mostly safe, but some concerns","neighborhood_safety.not_safe":"Not safe — I'm aware of risks","lock_checking":"Do you check locks or windows before bed?","lock_checking.once":"Once — normal routine","lock_checking.multiple":"Multiple times — I need to be sure","lock_checking.no":"No — I don't think about it","relational":"Relational safety","cohabitant_tension":"Is there tension with anyone you live with?","cohabitant_tension.yes":"Yes — significant tension","cohabitant_tension.sometimes":"Sometimes — it comes and goes","cohabitant_tension.no":"No — relationships at home are good","cohabitant_tension.live_alone":"I live alone","partner_effect":"Does your partner's presence affect your ability to sleep?","partner_effect.more_safe":"Yes — I feel safer and sleep better with them","partner_effect.more_alert":"Yes — I feel more alert or guarded","partner_effect.neutral":"Neutral — no real effect","partner_effect.no_partner":"I don't have a partner","caregiving_role":"Do you have caregiving responsibilities that interrupt your sleep?","caregiving_role.yes":"Yes — children, aging parents, or dependents","caregiving_role.sometimes":"Sometimes — but not most nights","caregiving_role.no":"No","financial":"Financial security","financial_in_bed":"Do financial worries keep you awake at night?","financial_in_bed.yes":"Yes — it's a major source of nighttime anxiety","financial_in_bed.sometimes":"Sometimes","financial_in_bed.no":"No — finances aren't a sleep concern","financial_security":"How would you describe your overall financial security?","financial_security.secure":"Secure — I have savings and stability","financial_security.manageable":"Manageable — some stress but stable","financial_security.significant_stress":"Significant financial stress","financial_security.crisis":"Crisis — facing immediate financial problems","digital":"Digital exposure","last_phone_content":"What's typically the last thing you see on your phone before sleep?","last_phone_content.relaxing":"Something relaxing — light reading or a podcast","last_phone_content.stimulating":"Something stimulating — games, engaging content","last_phone_content.stressful":"Something stressful — work emails, news, arguments","last_phone_content.no_phone":"I don't use my phone before bed","evening_news":"Do you consume news or social media in the evening?","evening_news.yes_activating":"Yes — and it activates or upsets me","evening_news.yes_neutral":"Yes — but it doesn't affect me much","evening_news.no":"No — I avoid it in the evening","work_email_check":"Do you check work email or messages after work hours?","work_email_check.yes":"Yes — I'm always connected","work_email_check.sometimes":"Sometimes — when something is urgent","work_email_check.no":"No — I disconnect after work","doomscrolling":"Do you catch yourself doomscrolling when you should be sleeping?","doomscrolling.yes":"Yes — regularly","doomscrolling.sometimes":"Sometimes","doomscrolling.no":"No","nervous_system":"Your nervous system state","body_state":"When you get into bed at night, how does your body feel?","body_state.calm_ready":"Calm and ready for sleep","body_state.tired_wired":"Tired but wired — exhausted yet can't settle","body_state.heart_elevated":"Heart rate feels elevated","body_state.muscles_tense":"Muscles tense, jaw clenched","body_state.alert_scanning":"Alert and scanning — listening for sounds","body_state.numb_disconnected":"Numb or disconnected from my body","safety_rituals":"What conditions do you need to fall asleep? (Select all that apply)","safety_rituals.door_closed":"Door must be closed","safety_rituals.door_open":"Door must be open","safety_rituals.light_on":"Some light on","safety_rituals.complete_darkness":"Complete darkness","safety_rituals.phone_near":"Phone within reach","safety_rituals.specific_side":"Specific side of the bed","safety_rituals.partner_present":"Partner present","safety_rituals.alone":"Must be alone","safety_rituals.audio_playing":"Audio playing (podcast, music, TV)","safety_rituals.silence":"Complete silence","safety_rituals.other":"Other specific conditions","sleep_away_from_home":"How do you sleep away from home?","sleep_away_from_home.better":"Better — I feel less pressure or more relaxed","sleep_away_from_home.worse":"Worse — unfamiliar places make it harder","sleep_away_from_home.same":"About the same"}}`);
const en = {
  common,
  nav,
  landing,
  assessment
};
function translate(key) {
  const parts = key.split(".");
  let current = en;
  for (let i = 0; i < parts.length; i++) {
    if (typeof current !== "object" || current === null) return key;
    const record = current;
    const flatKey = parts.slice(i).join(".");
    if (flatKey in record) {
      const val = record[flatKey];
      if (typeof val === "string") return val;
    }
    if (parts[i] in record) {
      current = record[parts[i]];
      continue;
    }
    return key;
  }
  return typeof current === "string" ? current : key;
}
function _page($$renderer) {
  $$renderer.push(`<div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"><div class="mx-auto max-w-4xl"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900">Better Sleep Assessment</h1> <p class="mt-2 text-gray-600">A comprehensive sleep health evaluation — 6 steps</p></div> `);
  {
    $$renderer.push("<!--[-1-->");
    MultiStepForm($$renderer, { config: formConfig, translate });
  }
  $$renderer.push(`<!--]--></div></div>`);
}
export {
  _page as default
};
