import { writable, readable } from 'svelte/store';
// import { writable as internal, get } from "svelte/store";


import gridHelp from "svelte-grid/build/helper/index.mjs";

import ModelEditor          from "../UI/editors/ModelEditor.svelte";
import GrammarEditor        from "../UI/editors/GrammarEditor.svelte";
import LiveCodeEditor       from "../UI/editors/LiveCodeEditor.svelte";
import LiveCodeParseOutput  from "../UI/widgets/LiveCodeParseOutput.svelte";
import GrammarCompileOutput from "../UI/widgets/GrammarCompileOutput.svelte";
import Oscilloscope         from "../UI/widgets/Oscilloscope.svelte";
import Spectrogram          from "../UI/widgets/Spectrogram.svelte";
import StoreDebugger        from "../UI/widgets/StoreDebugger.svelte";

import default_grammar from "../../assets/language/defaultGrammar.ne";
import gabber_grammar  from "../../assets/language/gabber.ne";
import nibble_grammar  from "../../assets/language/nibble.ne";

import default_liveCode from "../../assets/language/defaultLiveCode.sem";
import gabber_liveCode  from "../../assets/language/gabber.sem";
import nibble_liveCode  from "../../assets/language/nibble.sem";

import hello_world_code_example           from "../machineLearning/tfjs/hello-world/hello-world.tf";
import two_layer_non_linear_code_example  from "../machineLearning/tfjs/non-linear/two-layer-non-linear.tf";
import binary_classification_code_example from "../machineLearning/tfjs/non-linear/binary-classification.tf";
import echo_state_network_code_example    from "../machineLearning/tfjs/echo-state/echo-state-network.tf";
import lstm_txt_gen_code_example          from "../machineLearning/tfjs/rnn/lstm-txt-gen.tf";
import music_rnn_example                  from "../machineLearning/magenta/music-rnn.tf";


const id = () =>
	"_" +
	Math.random()
		.toString(36)
		.substr(2, 9);

const originalItems = [
	{
		...gridHelp.item({ x: 7, y: 0, w: 7, h: 3, id: id() }),
		...{
			type: "liveCodeEditor",
			name: "hello-world",
			background: "#151515",
			lineNumbers: true,
			hasFocus: false,
			background: "#151515",
			theme: "icecoder",
			component: LiveCodeEditor,
			data: default_liveCode
		}
	},

	{
		...gridHelp.item({ x: 7, y: 8, w: 3, h: 7, id: id() }),
		...{
			name: "hello world",
			type: "liveCodeParseOutput",
			lineNumbers: false,
			hasFocus: false,
			theme: "shadowfox",
			background: "#ebdeff",
			component: LiveCodeParseOutput,
			data: ""
		}
	},

	{
		...gridHelp.item({ x: 7, y: 0, w: 4, h: 30, id: id() }),
		...{
			name: "hello world",
			type: "storeDebugger",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#f0f0f0",
			component: StoreDebugger,
			data: ""
		}
	},

	{
		...gridHelp.item({ x: 5, y: 15, w: 8, h: 2, id: id() }),
		...{
			name: "hello world",
			type: "grammarCompileOutput",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#d1d5ff",
			component: GrammarCompileOutput,
			data: ""
		}
	},

	{
		...gridHelp.item({ x: 10, y: 2, w: 5, h: 5, id: id() }),
		...{
			name: "hello world",
			type: "grammarEditor",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#AAAAAA",
			component: GrammarEditor,
			data: default_grammar
		}
	},

	{
		...gridHelp.item({ x: 0, y: 4, w: 7, h: 4, id: id() }),
		...{
			name: "hello world",
			type: "modelEditor",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#f0f0f0",
			component: ModelEditor,
			data: hello_world_code_example
		}
	},

	{
		...gridHelp.item({ x: 0, y: 8, w: 3, h: 4, id: id() }),
		...{
			name: "hello world",
			type: "oscilloscope",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#f0f0f0",
			component: Oscilloscope,
			data: ""
		}
	},

	{
		...gridHelp.item({ x: 7, y: 8, w: 3, h: 4, id: id() }),
		...{
			name: "hello world",
			type: "spectrogram",
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			background: "#f0f0f0",
			component: Spectrogram,
			data: ""
		}
	}
];






// let createItemNestedStore = () => {
//   return	{
// 		...gridHelp.item({ x: 7, y: 0, w: 7, h: 3, id: id() }),
// 		...{
// 			type: "liveCodeEditor",
// 			name: "hello-world",
// 			background: "#151515",
// 			lineNumbers: true,
// 			hasFocus: false,
// 			background: "#151515",
// 			theme: "icecoder",
// 			component: LiveCodeEditor,
// 			data: writable(default_liveCode)
// 		}
// 	}
// };

// let nestedStoresItems = [
// 	writable(createItemNestedStore()),
// 	writable(createItemNestedStore()),
// 	writable(createItemNestedStore()),
// 	writable(createItemNestedStore()),
// ];

export let createRandomItem = (type) => {
  const i = 2;
	const col = 2;
	const x = Math.ceil(Math.random() * 3) + 2;
	const y = Math.ceil(Math.random() * 4) + 1;


  let item = {
		...gridHelp.item({
			x: (i * 2) % col,
			y: Math.floor(i / 6) * y,
			w: x,
			h: y,
			id: id,
			name: type + id,
			type: type,
			lineNumbers: true,
			hasFocus: false,
			theme: "monokai",
			data: "value"
		})
	};  

  return item;
} 

let hydrateJSONcomponent = item => {

  switch (item.type) {
  	case "liveCodeEditor":
  		item.component = LiveCodeEditor;
  		break;
  	case "grammarEditor":
  		item.component = GrammarEditor;
  		break;
  	case "modelEditor":
  		item.component = ModelEditor;
  		break;
  	case "liveCodeParseOutput":
  		item.component = LiveCodeParseOutput;
  		break;
  	case "grammarCompileOutput":
  		item.component = GrammarCompileOutput;
  		break;
  	case "storeDebugger":
  		item.component = StoreDebugger;
  		break;
  	case "oscilloscope":
  		item.component = Oscilloscope;
  		break;
  	case "spectrogram":
  		item.component = Spectrogram;
  		break;
  	default:
  		break;
  } 
  return item;
}

export let createNewItem = (type, id, data) => {

  let component;

  switch (type) {
		case "liveCodeEditor":
			component = {
				component: LiveCodeEditor,
				background: "#151515",
				theme: "icecoder"
			};
			break;
		case "grammarEditor":
			component = {
				component: GrammarEditor,
				theme: "monokai",
				background: "#AAAAAA"
			};
			break;
		case "modelEditor":
			component = {
				component: ModelEditor,
				theme: "monokai",
				background: "#f0f0f0"
			};
			break;
		case "liveCodeParseOutput":
			component = {
				component: LiveCodeParseOutput,
				background: "#ebdeff"
			};
			break;
		case "grammarCompileOutput":
			component = {
				component: GrammarCompileOutput,
				background: "#d1d5ff"
			};
			break;
		case "storeDebugger":
			component = {
				component: StoreDebugger,
				background: "#d1d5ff"
			};
			break;
		case "oscilloscope":
			component = {
				component: Oscilloscope
			};
			break;
		case "spectrogram":
			component = {
				component: Spectrogram
			};
			break;
		default:
			break;
	}

  // return component template 
  return {
		...gridHelp.item({ x: 7, y: 0, w: 7, h: 3, id: id }),
		...{
			type: type,
			name: type + "-" + id,
			data: data,
			lineNumbers: true,
			hasFocus: false
		},
		...component
	};
};


export const loadPlaygroundItems = () => {

	if (typeof window !== "undefined") {

		const playgroundItems = window.localStorage.getItem("items");

		return ( playgroundItems === null ||
			playgroundItems === undefined ||
			playgroundItems === ""
		) ? originalItems : JSON.parse(playgroundItems)
		
	} else
    return originalItems;
};

const storePlaygroundItemsInLocalStorage = () => {
  
  if (typeof window !== "undefined") {
    window.localStorage.setItem("playgroundItems", JSON.stringify($items));
  }
};


/*
 * Wrap writable store
 */
export function storable(key, initialValue) {

	const store = writable(initialValue); // create an underlying store
	const { subscribe, set, update } = store;

	const json = localStorage.getItem(key); // get the last value from localStorage
	if (json) {
		set(JSON.parse(json).map(item => hydrateJSONcomponent(item))); // use the value from localStorage if it exists
	}

	// return an object with the same interface as svelte's writable()
	return {
		set(value) {
			localStorage.setItem(key, JSON.stringify(value));
			set(value); // capture set and write to localStorage
		},

		update(cb) {
			const value = cb(get(store));
			this.set(value); // capture updates and write to localStore
		},

		subscribe // punt subscriptions to underlying store
	};
}


// Dashboard layout in items list
// export const items = writable(originalItems); // base svelteStore
export const items = storable("items", originalItems); // localStorageWrapper
// export const items = writable(nestedStoresItems);
// export const items = writable([ hydrateJSONcomponent(createRandomItem('liveCodeEditor'))]);

// Dashboard SELECTED item which receives focus and has item controls loaded
export const focusedItem = writable({});

// Dashboard SELECTED item which receives focus and has item controls loaded
export const focusedItemControls = writable([]);
