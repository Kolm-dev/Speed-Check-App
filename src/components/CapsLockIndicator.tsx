import React from "react"
const fontSizeData = {
	fontSize: "10px",
}
const CapsLockIndicator = () => {
	const [capsLock, setCapsLock] = React.useState<boolean>()

	const handleKeyPress = (event: KeyboardEvent): void => {
		setCapsLock(event.getModifierState("CapsLock"))
	}

	React.useEffect(() => {
		document.addEventListener("keydown", handleKeyPress)
		return () => {
			document.removeEventListener("keydown", handleKeyPress)
		}
	}, [])

	if (capsLock === undefined) {
		return <p style={fontSizeData}>Press CapsLock</p>
	}

	return (
		<p style={{margin: "5px 2px 0", ...fontSizeData}}>
			CapsLock
			<span style={{...fontSizeData, color: capsLock ? "red" : "green"}}>
				{capsLock ? " OFF" : " ON"}
			</span>
		</p>
	)
}
export default CapsLockIndicator
