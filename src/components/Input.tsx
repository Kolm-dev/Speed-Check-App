import React, {useEffect, useState} from "react"
import "./styles/Input.scss"
import {useAppDispatch, useAppSelector} from "../hooks/hooks"
import CapsLockIndicator from "./CapsLockIndicator"
import {Input as InputText} from "semantic-ui-react"
import {
	updateProgress,
	inputHandler,
	updateCountPerMinute,
} from "../store/typer.slice"
import {debounce} from "lodash"

type TypeInput = {
	setPrintedText: (value: string) => void
	text: string
}

const Input = ({setPrintedText, text}: TypeInput) => {
	const {status, time, timeStart} = useAppSelector((state) => state.typer)

	const dispatch = useAppDispatch()
	const [inputedCount, setInputedCount] = useState(0)
	const handlerCountCh = () => {
		const elapsedTime = (Date.now() - timeStart) / 1000
		const cpr = (inputedCount / elapsedTime) * 60
		dispatch(updateCountPerMinute(cpr))
	}

	const calculateProgress = () => {
		debounce(() => {
			dispatch(updateProgress())
		}, 800)()
	}

	useEffect(() => {
		handlerCountCh()
	}, [time * 1.5])

	const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value) {
			debounce(
				() => dispatch(inputHandler(value.charAt(value.length - 1))),
				500
			)()
			calculateProgress()
		}
		debounce(() => setInputedCount(value.length), 1000)()
		handlerCountCh()

		let newPrintedText = ""
		for (let i = 0; i < text.length; i++) {
			if (i < value.length) {
				if (text[i] === value[i]) {
					newPrintedText += `<span class='correct'>${text[i]}</span>`
				} else {
					newPrintedText += `<span class='text-bg-danger'>${text[i]}</span>`
				}
			} else {
				newPrintedText += text[i]
			}
		}
		setPrintedText(newPrintedText)
	}
	return (
		<div className="wrapperInput">
			<CapsLockIndicator />
			<InputText
				className="textInput"
				onChange={inputOnChange}
				type="text"
				size="massive"
				disabled={!status}
			/>
		</div>
	)
}

export default Input
