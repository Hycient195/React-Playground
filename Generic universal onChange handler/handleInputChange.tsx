import { ChangeEvent } from "react";

export function handleInputChange<T>(
  e: ChangeEvent<
    HTMLInputElement | 
    HTMLSelectElement |
    HTMLTextAreaElement |
    any
  >,
  formData: T,
  setFormData: React.Dispatch<React.SetStateAction<T>>
): void {
  const { name, type, checked, value } = e.target;

  const inputValue = (type === 'checkbox') ? checked : value;

  const setNestedValue = (obj: any, path: string[], value: any): any => {
    const [ first, ...rest ] = path;

    if (rest.length === 0) {
      obj[first] = value;
    } else {
      const arrayMatch = first.match(/(\w+)\[(\d+)\]/);
      if (arrayMatch) {
        const [, key, index] = arrayMatch;
        obj[key][Number(index)] = setNestedValue(obj[key][Number(index)], rest, value);
      } else {
        obj[first] = setNestedValue(obj[first] || {}, rest, value);
      }
    }

    return obj;
  };

  const path = name.split('.');

  const newFormData = { ...formData };
  setNestedValue(newFormData, path, inputValue);

  setFormData(newFormData);
}        

