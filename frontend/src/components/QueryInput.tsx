import { useState } from 'react'

const categories = ['song', 'album', 'artist']

const QueryInput: React.FC = () => {
  const [values, setValues] = useState({ 0: '', 1: '', 2: '' })

  const handleValues = (value: string, target: number) => {
    setValues({ ...values, [target]: value })
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Select setValue={(value) => handleValues(value, 0)} />
        <Select setValue={(value) => handleValues(value, 1)} />
        <Select setValue={(value) => handleValues(value, 2)} />
        <button onClick={() => alert('I will send a query')}>Search</button>
      </div>
    </div>
  )
}

interface SelectProps {
  setValue: React.Dispatch<string>
}

const Select: React.FC<SelectProps> = ({ setValue }) => {
  return (
    <select
      id="countries"
      className="block w-full max-w-[12rem] cursor-default rounded-md border border-neutral-300 py-2 pl-2 pr-5 text-sm text-neutral-900 ring-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-opacity-75"
      onChange={(e) => {
        setValue(e.target.value)
      }}>
      <option hidden>Choose a category</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  )
}

export default QueryInput
