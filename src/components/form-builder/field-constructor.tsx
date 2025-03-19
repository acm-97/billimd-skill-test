import {useEffect, useRef, useState} from 'react'
import {JsonEditor} from 'json-edit-react'
import {Input} from '@/components/ui/input'
import {Checkbox} from '@/components/ui/checkbox'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {ScrollArea} from '@/components/ui/scroll-area'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {Button} from '@/components/ui/button'
import {Plus, Trash} from 'lucide-react'
import {Separator} from '@/components/ui/separator'
import {FieldsType, FieldType} from '@/pages/form-builder'
import {zodResolver} from '@hookform/resolvers/zod'
import {useFieldArray, useForm} from 'react-hook-form'
import {z} from 'zod'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form'
import {Switch} from '../ui/switch'
import {SheetClose, SheetFooter} from '../ui/sheet'
import autoAnimate from '@formkit/auto-animate'

interface FieldsConstructorProps {
  jsonData: FieldsType
  setJasonData: (data: FieldsType) => void
  isDrawer?: boolean
}

const formSchema = z.object({
  label: z.string().min(1, 'Field label is required'),
  type: z.string(),
  rules: z.object({
    required: z.boolean(),
    pattern: z.string().optional(),
  }),
  value: z.string(),
  options: z.array(z.string().min(1, 'Option label is required')),
})

export default function FieldsConstructor({
  jsonData,
  setJasonData,
  isDrawer = false,
}: FieldsConstructorProps) {
  const [newJson, setNewJson] = useState(jsonData)
  const [isJsonView, setIsJsonView] = useState<boolean>(false)
  const currentFieldsRef = useRef(null)
  const optionsFieldsRef = useRef(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    currentFieldsRef.current && autoAnimate(currentFieldsRef.current)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    optionsFieldsRef.current && autoAnimate(optionsFieldsRef.current)
  }, [optionsFieldsRef, currentFieldsRef])

  const defaultValues = {
    label: '',
    type: 'text',
    rules: {required: false},
    value: '',
    options: [],
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const {
    fields: optionsField,
    append,
    remove,
    replace,
  } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
    // @ts-ignore
    name: 'options', // unique name for your Field Array
  })

  const fieldType = form.watch('type')
  const fieldOptions = form.watch('options')

  useEffect(() => {
    if (['dropdown', 'radio', 'checkbox'].includes(fieldType)) {
      replace([])
    }
  }, [fieldType])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // @ts-ignore
    setJasonData((prev: any) => ({fields: [...prev.fields, data]}))
    form.reset()
  }

  const onSubmitJson = (e: any) => {
    e.preventDefault()
    setJasonData(newJson)
    setIsJsonView(false)
  }

  const removeFromCurrentFields = (field: FieldType) => {
    // @ts-ignore
    setJasonData((prev: any) => ({
      // @ts-ignore
      fields: prev.fields.filter((f: FieldType) => f.label !== field.label),
    }))
  }

  const onClear = () => {
    form.reset()
    setJasonData(jsonData)
    setIsJsonView(false)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={isJsonView ? onSubmitJson : form.handleSubmit(onSubmit)} className="w-full">
          <Card className="w-full border shadow-sm">
            <CardHeader className="border-b bg-muted/40 px-5 py-1">
              <CardTitle className="text-xl font-semibold">Form Constructor</CardTitle>
              <CardDescription>From here you can modify your form fields.</CardDescription>
              <div className="flex items-center space-x-2 mt-1.5">
                <Switch id="edit-json" checked={isJsonView} onCheckedChange={setIsJsonView} />
                <Label htmlFor="edit-json">Edit as JSON</Label>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100dvh-20rem)] lg:h-[calc(100dvh-38rem)] p-6">
                {isJsonView ? (
                  <JsonEditor
                    data={jsonData}
                    enableClipboard={false}
                    // @ts-ignore
                    onUpdate={({newData}) => setNewJson(newData)}
                  />
                ) : (
                  <div className="space-y-6">
                    {jsonData?.fields?.length > 0 && (
                      <div>
                        <Label className="mb-3 font-semibold">Current Fields</Label>
                        <div className="ml-4" ref={currentFieldsRef}>
                          {jsonData.fields.map(field => (
                            <div
                              className="flex items-center gap-2 justify-between"
                              key={field.label}
                            >
                              <Label>{field.label}</Label>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={e => {
                                  e.preventDefault()
                                  removeFromCurrentFields(field)
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <Separator />
                    <FormField
                      control={form.control}
                      name="label"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Field Label</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Enter field label" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Field Type</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select field type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="checkbox">Checkbox</SelectItem>
                                <SelectItem value="radio">Radio</SelectItem>
                                <SelectItem value="dropdown">Dropdown</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Label>Rules</Label>
                    <div className="ml-4 space-y-6">
                      <FormField
                        control={form.control}
                        name="rules.required"
                        render={({field}) => (
                          <FormItem>
                            {/* <FormLabel>Rules</FormLabel> */}
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                <Label htmlFor="required-field">Required field</Label>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="rules.pattern"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Pattern</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Regex pattern" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {['dropdown', 'radio', 'checkbox'].includes(fieldType) && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <Label className="font-semibold">Options (for multi-choice fields)</Label>
                          {['dropdown', 'radio', 'checkbox'].includes(fieldType) &&
                            fieldOptions.length === 0 &&
                            form.formState.isSubmitted && (
                              <span className="text-destructive">Provide minimum 1 option</span>
                            )}
                          <div className="space-y-2" ref={optionsFieldsRef}>
                            {optionsField.map((option, index) => (
                              <div key={option.id}>
                                <FormField
                                  control={form.control}
                                  name={`options.${index}`}
                                  render={({field}) => (
                                    <FormItem>
                                      <FormControl>
                                        <div className="flex items-center space-x-2">
                                          <Input placeholder={`Option ${index + 1}`} {...field} />
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => remove(index)}
                                          >
                                            <Trash className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />{' '}
                              </div>
                            ))}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => append(`Option `)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Option
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </ScrollArea>
            </CardContent>

            {!isDrawer ? (
              <CardFooter className="border-t p-4 flex flex-col gap-2">
                <Button className="w-full" disabled={!form.formState.isDirty && !isJsonView}>
                  {isJsonView ? 'Save Changes' : 'Add Field'}
                </Button>
                <Button type="button" variant="secondary" className="w-full" onClick={onClear}>
                  Cancel
                </Button>
              </CardFooter>
            ) : (
              <SheetFooter className="border-t p-4 flex flex-col gap-2">
                <SheetClose asChild>
                  <Button className="w-full" disabled={!form.formState.isDirty && !isJsonView}>
                    {isJsonView ? 'Save Changes' : 'Add Field'}
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button type="button" variant="secondary" className="w-full" onClick={onClear}>
                    Cancel
                  </Button>
                </SheetClose>
              </SheetFooter>
            )}
          </Card>
        </form>
      </Form>
    </>
  )
}
