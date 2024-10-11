import React from 'react'

const BasicButton = ({text, onClick, className =''}) => {
    return (
        <button
            className={`p-2 border-[1px] border-gray-400 rounded-md text-gray-700 text-sm hover:bg-gray-700 hover:text-white transition-[300] ${className}`}
            onClick={onClick}>
            {text}
        </button>
    )
}

export default BasicButton