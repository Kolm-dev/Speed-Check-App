import React from "react"
import {useAppDispatch, useAppSelector} from "../hooks/hooks"
import Input from "./Input"
import TypeStatistics from "./TypeStatistics"
import {startTyping, updateTimeDuration} from "../store/typer.slice"
import "./styles/Tester.scss"

const Tester: React.FC = () => {
	const [printedText, setPrintedText] = React.useState("")
	const text = useAppSelector(({typer: {text}}) => text)
	const status = useAppSelector((state) => state.typer.status)
	// const time = useAppSelector((state) => state.typer.time)
	const dispatch = useAppDispatch()

	const intervalIdRef = React.useRef<number>(0)

	const timer = () => {
		if (status) {
			return
		}

		intervalIdRef.current = setInterval(() => {
			dispatch(updateTimeDuration())
		}, 1000)
	}

	const startHandler = () => {
		dispatch(startTyping())
		timer()
	}

	const stopHandler = () => {
		clearInterval(intervalIdRef.current)
	}

	return (
		<div className="testWrapper">
			<p
				style={{display: status ? "block" : "none"}}
				className="textForTest font-weight-normal  p-1 border-end text-bg-dark"
				dangerouslySetInnerHTML={{
					__html: !printedText ? text : printedText,
				}}
			/>
			<TypeStatistics />
			<Input text={text} setPrintedText={setPrintedText} />
			<div className="controls">
				<button
					className="btn btn-success text-uppercase"
					onClick={startHandler}>
					{status ? "Restart" : "Start"}
				</button>
				<button className="btn btn-danger text-uppercase" onClick={stopHandler}>
					Stop
				</button>
			</div>
		</div>
	)
}

export default Tester
