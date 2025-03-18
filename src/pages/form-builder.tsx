import {useEffect, useState} from 'react'

import {Input} from '@/components/ui/input'
import {cn} from '@/lib/utils'
import {toast} from 'sonner'

import {Label} from '@/components/ui/label'
import {
  CheckboxSection,
  DropDown,
  RadioSection,
} from '@/components/form-builder/multiple-options-fields'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Save} from 'lucide-react'
import FieldsConstructor from '@/components/form-builder/field-constructor'
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'

export type FieldType = {
  label: string
  type: string
  rules: {
    required: boolean
    pattern?: string
  }
  value: string
  options?: string[]
}

export type FieldsType = {fields: FieldType[]}

const defultJson: FieldsType = {
  fields: [
    {label: 'Full Name', type: 'text', rules: {required: true}, value: ''},
    {
      label: 'Email',
      type: 'email',
      rules: {required: true, pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'},
      value: '',
    },
    {label: 'Age', type: 'number', rules: {required: false}, value: ''},
    {
      label: 'Gender',
      type: 'checkbox',
      options: ['Male', 'Female'],
      value: '',
      rules: {required: false},
    },
    {
      label: 'Skills',
      type: 'radio',
      options: ['HTML', 'CSS', 'JavaScript'],
      value: '',
      rules: {required: false},
    },
    {
      label: 'Location',
      type: 'dropdown',
      rules: {required: false},
      options: ['New York', 'London', 'Paris'],
      value: '',
    },
  ],
}

export default function FormBuilder() {
  const [jsonData, setJasonData] = useState<FieldsType>(defultJson)
  const [formState, setFormState] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [rules, setRules] = useState<Record<string, any>>({})

  const getFieldElement = (field: FieldType, isInvalid: boolean) => {
    const parsedKey = field.label.replace(' ', '').toLowerCase()
    const onChange = (e: any) => {
      setFormState((prev: any) => ({...prev, [parsedKey]: e.target?.value ?? e}))
    }

    const onChangeCHeckbox = (value: string[]) => {
      setFormState((prev: any) => ({...prev, [parsedKey]: value}))
    }

    switch (field.type) {
      case 'email':
        return (
          <Input
            aria-invalid={isInvalid}
            type="email"
            value={formState[parsedKey] || ''}
            onChange={onChange}
          />
        )
      case 'number':
        return (
          <Input
            aria-invalid={isInvalid}
            type="number"
            value={formState[parsedKey] || ''}
            onChange={onChange}
          />
        )
      case 'checkbox':
        return (
          <CheckboxSection
            field={field}
            value={formState[parsedKey] || []}
            onChange={onChangeCHeckbox}
          />
        )
      case 'radio':
        return <RadioSection field={field} value={formState[parsedKey] || ''} onChange={onChange} />
      case 'dropdown':
        return <DropDown field={field} value={formState[parsedKey] || ''} onChange={onChange} />
      default:
        return (
          <Input
            aria-invalid={isInvalid}
            type="text"
            value={formState[parsedKey] || ''}
            onChange={onChange}
          />
        )
    }
  }

  const getInitialFormState = () => {
    const fields = {}
    const _rules = {}

    jsonData.fields.forEach((field: any) => {
      const parsedKey = field.label.replace(' ', '').toLowerCase()
      // @ts-ignore
      fields[parsedKey] = field.value || ''
      // @ts-ignore
      _rules[parsedKey] = field.rules
    })
    setFormState(fields)
    setRules(_rules)
  }

  useEffect(() => {
    getInitialFormState()
  }, [jsonData.fields])

  const onSubmit = () => {
    const keys = Object.keys(formState)
    let hasErrors = false
    setErrors({})
    keys.forEach((key: any) => {
      if (rules[key].required && !formState[key]) {
        setErrors((prev: any) => ({...prev, [key]: 'Field is required'}))
        hasErrors = true
      }

      if (formState[key] && rules[key]?.pattern && !formState[key].match(rules[key]?.pattern)) {
        setErrors((prev: any) => ({...prev, [key]: 'Field is invalid'}))
        hasErrors = true
      }
    })
    if (hasErrors) return
    toast.success('Form saved successfully')
    getInitialFormState()
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="w-full space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Form Builder</h1>
        <p className="text-muted-foreground">
          Create custom forms with our intuitive drag-and-drop form builder. Add fields, customize
          validation, and preview your form in real-time. Export your form as JSON or integrate it
          directly into your application.
        </p>
      </div>

      <div className="w-full flex flex-col justify-center gap-8 md:flex-row">
        <Card className="border shadow-sm w-full">
          <CardHeader className="border-b bg-muted/40 px-5 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Custom Form</CardTitle>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline">Edit Fields</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <FieldsConstructor isDrawer jsonData={jsonData} setJasonData={setJasonData} />
                  </SheetContent>
                </Sheet>
                <Button variant="default" size="sm" type="button" onClick={onSubmit}>
                  <Save className="h-4 w-4 mr-1" />
                  Save Form
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <form className="w-full grid grid-cols-12 gap-6 shadow-md rounded-md border border-border bg-background p-6">
              {jsonData.fields.map((field, index) => {
                // @ts-ignore
                const error = errors[field.label.replace(' ', '').toLowerCase()]
                return (
                  <div
                    key={`field-${index}`}
                    className={cn('col-span-full md:col-span-6', {
                      'md:col-span-full': field.type === 'checkbox' || field.type === 'radio',
                    })}
                  >
                    <div className="space-y-2">
                      <Label htmlFor={field.label} className={error ? 'text-destructive' : ''}>
                        {field.label}{' '}
                        {field.rules.required && (
                          <span className="text-destructive leading-0 text-lg">*</span>
                        )}
                      </Label>
                      {getFieldElement(field, !!error)}
                      {error && (
                        <span className="text-destructive text-sm">
                          {/* @ts-ignore */}
                          {error}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </form>
          </CardContent>
        </Card>

        <div className="max-lg:hidden w-full lg:w-5/12">
          <FieldsConstructor jsonData={jsonData} setJasonData={setJasonData} />
        </div>
      </div>
    </div>
  )
}
