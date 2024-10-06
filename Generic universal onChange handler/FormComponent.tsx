import { handleInputChange } from "@/utils/miscelaneous"
import { useState } from "react"

/* Application of the onChange handler in form componentFr */
export default function FormComponent() {
  /* Form State */
  const [ formData, setFormData ] = useState({
    fullname: "",
    location: {
      include: true,
      place: {
        name: "",
      },
      geometry: {
        coordinates: [0,0]
      }
    }
  })
  console.log(formData)
  /* Usage with various data structures in JSX markup */
  return (
    <form>
      <input
        value={formData.fullname}
        onChange={(e) => handleInputChange(e, formData, setFormData)}
        name="fullname"
      />
      <input
        type="checkbox"
        checked={formData.location.include}
        onChange={(e) => handleInputChange(e, formData, setFormData)}
        name="location.include"
      />
      <input
        value={formData.location.place.name}
        onChange={(e) => handleInputChange(e, formData, setFormData)}
        name="location.place.name"
      />
      {
        formData.location.geometry.coordinates.map((_, index) => (
          <input
            key={`coordinte-index-${index}`}
            value={formData.location.geometry.coordinates[index]}
            onChange={(e) => handleInputChange(e, formData, setFormData)}
            name={`location.geometry.coordinates.${index}`}
          />
        ))
      }
      <button>Submit</button>
    </form>
  )
}