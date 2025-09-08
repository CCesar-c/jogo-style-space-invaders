function Textarea(props) {
    return (
        <textarea type="text" className='p-4 text-left resize-none text-blue-800 h-110 w-200 border-4 border-black rounded-sm ' onChange={props.onChange} />
    )
}

function Button(props) {
    return (
        <button
            className="bg-amber-400 text-black border border-black rounded-md h-10 w-20"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
export { Button, Textarea };