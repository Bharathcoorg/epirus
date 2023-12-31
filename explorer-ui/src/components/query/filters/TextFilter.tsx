import React, { useState } from "react"
import { FilterProps } from "../Filters"
import Chip from "./Chip"

export const activityMethodFilter = textFilterOf(
  {
    selector: "method",
    label: "Method Name",
    template: value => (
      { decodedActivity: { name_eq: value } }
    ),
    placeholder: "E.g. transfer",
    inputTransformer: (input) => input.toLowerCase()
  }
)

export function textFilterOf (
  { label, selector, template, placeholder = "", inputTransformer } :{
  label: string,
  selector: string,
  template: (value : string) => any,
  placeholder?: string,
  inputTransformer?: (input: string) => string
}) {
  return function TextFilterOf (props: any) {
    return (<TextFilter
      label={label}
      selector={selector}
      template={template}
      placeholder={placeholder}
      inputTransformer={inputTransformer}
      {...props}
    />)
  }
}

interface Props extends FilterProps {
  label:string,
  selector: string,
  template: (value : string) => any,
  placeholder?: string,
  inputTransformer?: (input: string) => string
}

export default function TextFilter ({
  filterQuery,
  setFilterQuery,
  label,
  selector,
  placeholder,
  template,
  inputTransformer
} : Props) {
  const initialState = filterQuery[selector]?.data || ""
  const [value, setValue] = useState<string>(initialState)

  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-sm">{label}</h3>
      <input
        className="input w-full"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={event => {
          const data = event.target.value
          if (data === "") {
            delete filterQuery[selector]
            setFilterQuery({ ...filterQuery })
          } else {
            const transformedData = inputTransformer ? inputTransformer(data) : data
            setFilterQuery({
              ...filterQuery,
              [selector]: {
                chip: <Chip key={`chip-${selector}`} label={label}/>,
                clauses: template(transformedData),
                data: transformedData
              }
            })
          }

          setValue(data)
        }
        } />
    </div>
  )
}
