import { JSDOM } from "jsdom"


export namespace MediatorPattern {
  export const { window } = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <head></head>
      <body></body>
    </html>
  `)
  export const { document } = window

  export interface LocationResult {
    country: string
    province: string
    city: string
  }

  export class LocationPicker {
    country: HTMLSelectElement = document.createElement("select")
    province: HTMLSelectElement = document.createElement("select")
    city: HTMLSelectElement = document.createElement("select")
    element: HTMLDivElement = document.createElement("div")

    constructor() {
      LocationPicker.setOptions(this.country, [ "-", "country1", "country2" ])
      LocationPicker.setOptions(this.province, [ "-" ])
      LocationPicker.setOptions(this.city, [ "-" ])

      this.country.addEventListener("change", this.updateProvinceOptions)
      this.province.addEventListener("change", this.updateCityOptions)

      this.element.appendChild(this.country)
      this.element.appendChild(this.province)
      this.element.appendChild(this.city)
      document.body.appendChild(this.element)
    }

    get value(): LocationResult {
      return {
        country: this.country.value,
        province: this.province.value,
        city: this.city.value
      }
    }

    private updateProvinceOptions = () => {
      const country: string = this.country.value
      const provinces: string[] = LocationPicker.getProvincesByCountry(country)
      LocationPicker.setOptions(this.province, provinces)
      this.city.value = "-"
    }

    private updateCityOptions = () => {
      // something...
    }

    private static setOptions(select: HTMLSelectElement, values: string[]) {
      select.innerHTML = ""

      if (values.length === 0) return

      const fragment = document.createDocumentFragment()
      values.forEach(value => {
        const option = document.createElement("option")
        option.value = value
        option.innerText = value
        fragment.appendChild(option)
      })
      select.appendChild(fragment)
    }

    private static getProvincesByCountry(country: string): string[] {
      const provinces = [ "-" ]
      if (country === "-") {
        return provinces
      }
      if (country === "country1") {
        return provinces.concat([ "country1-province1", "country1-province2" ])
      }
      return provinces.concat([ "country2-province1", "country2-province2" ])
    }
  }
}


const locationPicker = new MediatorPattern.LocationPicker()
console.log(MediatorPattern.document.body.innerHTML)
locationPicker.country.value = "country1"
locationPicker.country.dispatchEvent(new MediatorPattern.window.CustomEvent("change"))
console.log(MediatorPattern.document.body.innerHTML)
