export default function Loader({ ...rest }) {
  return (
    <div className="p-[6px] " {...rest}>
      <div className="flex space-x-1 animate-pulse justify-center">
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  )
}
