interface ModalProps {
  handleClose: () => void
}

export const ModalUser = ({ handleClose }: ModalProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
      <form
        className="flex w-96 flex-col gap-4 rounded-lg bg-neutral-100 p-4"
        onSubmit={handleSubmit}
      >
        <button
          onClick={handleClose}
          type="button"
          className="rounded-lg border border-fuchsia-400 px-5 py-1.5 text-center text-sm font-medium uppercase text-fuchsia-400 hover:border-fuchsia-800 hover:bg-fuchsia-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:border-fuchsia-400 dark:text-blue-500 dark:hover:bg-fuchsia-600 dark:hover:text-white dark:focus:ring-fuchsia-800"
        >
          sair
        </button>
      </form>
    </div>
  )
}
