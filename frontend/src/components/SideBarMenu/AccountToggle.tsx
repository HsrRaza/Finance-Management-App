

const AccountToggle = () => {
  return (
    <div className="border-b mb-2 mt-2 pb-2 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200  rounded transition-colors gap-2 w-full items-center">
        <img src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Felix" alt="avatar"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold  block">Hsr@Raza</span>
          <span className="text-xs block text-stone-500">Hsr@hover</span>
        </div>

      </button>
    </div>
  )
}

export default AccountToggle