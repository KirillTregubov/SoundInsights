import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { useDebounce } from 'lib/hooks'

interface InputProps {
  setValue: React.Dispatch<string>
  placeholder: string
}

const Input: React.FC<InputProps> = ({ setValue, placeholder }) => {
  const [search, setSearch] = useState('')
  useDebounce(
    () => {
      setValue(search)
    },
    [search],
    400
  )

  return (
    <>
      <div className="group my-2 flex items-center rounded-full border border-neutral-400 px-3 py-1 focus-within:border-neutral-500 focus-within:bg-neutral-100 dark:border-neutral-500 dark:focus-within:bg-neutral-800">
        <MagnifyingGlassIcon
          className={`h-5 w-5 ${
            search.length > 0
              ? ''
              : 'text-neutral-400 group-focus-within:text-neutral-500 dark:text-neutral-600'
          }`}
        />
        <input
          name="Search"
          aria-label="Search"
          className="w-full select-none bg-inherit px-2 py-1 placeholder:text-neutral-400 focus:outline-none group-focus-within:placeholder:text-neutral-500 dark:placeholder:text-neutral-600"
          placeholder={placeholder}
          autoComplete="off"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    </>
  )
}

export default Input
