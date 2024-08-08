import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormProvider, useForm } from "react-hook-form"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { setDefaultOptions, format } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fi } from "date-fns/locale"
import { useEffect, useRef } from "react"

import dayjs from "dayjs"

const TimelineFilterForm = ({ schoolData, form }) => {

  const buildings = schoolData.buildings

  const selectedBuilding = form.watch("building")
  const selectedFloor = form.watch("floor")
  const selectedDate = form.watch("date")

  // Set floor to first floor of building whenever building changes
  // setValue doesn't seem to work?
  useEffect(() => {
    const building = buildings.find((building) => building._id === selectedBuilding)
    const firstFloor = building?.floors.find((floor) => floor.number === 1)
    
    form.setValue("floor", firstFloor?._id)
  }, [ selectedBuilding ])

  console.log({ selectedBuilding, selectedFloor, selectedDate });
  

  return (
    <FormProvider {...form}>
    <div className="grid grid-cols-4 gap-5 mb-5">

      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Päivämäärä*</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? format(field.value, "PPP") : <span>Valitse päivämäärä</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  locale={fi}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="building"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rakennus*</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value} required={true}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Valitse rakennus" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>

                {
                  buildings.map((building) => (
                    <SelectItem value={building._id}>{building.name}</SelectItem>
                  ))
                }

              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="floor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kerros*</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value} required={true} disabled={!selectedBuilding}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Valitse kerros" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {
                  selectedBuilding
                  && buildings.find((building) => building._id === selectedBuilding).floors.map((floor, index) => (
                    <SelectItem value={floor._id}>{floor.number}. kerros</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />



    </div>
  </FormProvider>
  )
}

export default TimelineFilterForm