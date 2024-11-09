import React from "react"

export const Button = (props: { invariant?: string, children: React.ReactNode, handleClick?: () => void }) => {
    let classes = "px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-black border-2 border-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    switch (props.invariant) {
        case "white": {
            classes = "px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300 border-2 border-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            break;

        }
        case "black": {
            classes = "px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 border-2 border-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            break;
        }
        case "golden": {
            classes = "px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300 border-2 border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            break
        }

    }
    return (
        <button className={classes} onClick={props.handleClick}>
            {props.children}
        </button>
    )
}
