

const Text = () => {
  return (
    <div className='flex  flex-col items-center mt-20'>
      <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-center max-w-3xl mx-auto">
        Magically simplify personal finance
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-500 text-center max-w-xl mx-auto leading-relaxed">
        Track expenses. Monitor income. <br /> Get instant clarity. Set up in minutes.
      </p>
      <div className="flex items-center gap-8 mt-7">
        <button className='bg-blue-500 text-white text-lg px-6 py-2 rounded-lg hover:bg-blue-600'>Get Started</button>
        <p className=" text-lg md:text-xl  text-gray-800 text-center max-w-xl mx-auto leading-relaxed">Setup in  min</p>
      </div>
    </div>
  )
}

export default Text