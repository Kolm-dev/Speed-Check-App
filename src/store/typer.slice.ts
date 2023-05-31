import {createSlice} from "@reduxjs/toolkit"
import type {PayloadAction} from "@reduxjs/toolkit"

interface TyperState {
	texts: string[]
	text: string
	status: boolean
	timeStart: number
	completed: boolean
	countCharacters: number
	inputText: string
	time: number
	progress: number
	correctWords: string[]
}

const initialState: TyperState = {
	completed: false,
	inputText: "",
	text: "",
	progress: 0,
	correctWords: [],
	texts: [
		`You never read a book on psychology, Tippy. You didn't need to. You knew by some divine instinct that you can make more friends in two months by becoming genuinely interested in other people than you can in two years by trying to get other people interested in you.`,
		`I know more about the private lives of celebrities than I do about any governmental policy that will actually affect me. I'm interested in things that are none of my business, and I'm bored by things that are important to know.`,
		`A spider's body consists of two main parts: an anterior portion, the prosoma (or cephalothorax), and a posterior part, the opisthosoma (or abdomen).`,
		`As customers of all races, nationalities, and cultures visit the Dekalb Farmers Market by the thousands, I doubt that many stand in awe and contemplate the meaning of its existence. But in the capital of the Sunbelt South, the quiet revolution of immigration and food continues to upset and redefine the meanings of local, regional, and global identity.`,
		`Outside of two men on a train platform there's nothing in sight. They're waiting for spring to come, smoking down the track. The world could come to an end tonight, but that's alright. She could still be there sleeping when I get back.`,
		`I'm a broke-nose fighter. I'm a loose-lipped liar. Searching for the edge of darkness. But all I get is just tired. I went looking for attention. In all the wrong places. I was needing a redemption. And all I got was just cages.`,
	],
	timeStart: 0,
	countCharacters: 0,
	time: 0,
	status: false,
}

const typerSlice = createSlice({
	name: "typer",
	initialState,
	reducers: {
		startTyping(state) {
			const text = state.texts[Math.floor(Math.random() * state.texts.length)]
			state.text = text
			state.status = true
			state.timeStart = Date.now()
			state.progress = 0
			state.time = 0
		},
		stopTyping(state) {
			state.status = !state.status
		},

		inputHandler(state, action: PayloadAction<string>) {
			state.inputText = state.inputText.concat(action.payload).trim()
		},

		updateProgress(state) {
			state.progress = (state.inputText.length / state.text.length) * 100
		},
		updateCountPerMinute(state, action: PayloadAction<number>) {
			state.countCharacters = action.payload
		},
		updateTimeDuration(state) {
			state.time += 1
		},

		handlerCorrectWords(state, action: PayloadAction<string>) {
			const words = state.correctWords
			words.push(action.payload)
		},
	},
})

export default typerSlice.reducer
export const {
	startTyping,
	handlerCorrectWords,
	updateProgress,
	updateTimeDuration,
	stopTyping,
	inputHandler,
	updateCountPerMinute,
} = typerSlice.actions
