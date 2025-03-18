import {Checkbox} from '@/components/ui/checkbox'
import {Label} from '@/components/ui/label'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {FieldType} from '@/pages/form-builder'
import {RadioGroup, RadioGroupItem} from '../ui/radio-group'

export function RadioSection({
  field,
  value,
  onChange,
}: {
  field: FieldType
  value: any
  onChange: (e: any) => void
}) {
  if (!field.options) return null

  return (
    <RadioGroup defaultValue={value} className="mt-1.5" onChange={onChange}>
      {field.options.map((option, index) => (
        <div key={`${field.label}-${index}`} className="flex items-center space-x-2">
          <RadioGroupItem value={option} id={option} />
          <Label htmlFor={option}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}

export function CheckboxSection({
  field,
  value,
  onChange,
}: {
  field: FieldType
  value: any
  onChange: (e: any) => void
}) {
  if (!field.options) return null

  return (
    <div className="flex flex-col mt-1.5 gap-1">
      {field.options.map((option, index) => (
        <div key={`${field.label}-${index}`} className="flex items-center gap-2">
          <Checkbox
            checked={value?.includes(option)}
            onCheckedChange={checked => {
              return checked
                ? onChange([...value, option])
                : onChange(value?.filter((val: string) => val !== option))
            }}
          />
          <Label htmlFor={option}>{option}</Label>
        </div>
      ))}
    </div>
  )
}

export function DropDown({
  field,
  value,
  onChange,
}: {
  field: FieldType
  value: any
  onChange: (e: any) => void
}) {
  if (!field.options) return null

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option" defaultValue={value} />
      </SelectTrigger>
      <SelectContent>
        {field.options.map((option, index) => (
          <SelectItem key={`${field.label}-${index}`} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
