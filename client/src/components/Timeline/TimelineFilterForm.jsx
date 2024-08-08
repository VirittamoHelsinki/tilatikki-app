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

const TimelineFilterForm = ({ form }) => {
  return (
    <FormProvider {...form}>
    <div className="grid grid-cols-4 gap-5 mb-5">

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
                <SelectItem value="Rakennus A">Rakennus A</SelectItem>
                <SelectItem value="Rakennus B">Rakennus B</SelectItem>
                <SelectItem value="Rakennus C">Rakennus C</SelectItem>
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
            <Select onValueChange={field.onChange} defaultValue={field.value} required={true}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Valitse kerros" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1. kerros">1. kerros</SelectItem>
                <SelectItem value="2. kerros">2. kerros</SelectItem>
                <SelectItem value="3. kerros">3. kerros</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

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


    </div>
  </FormProvider>
  )
}

export default TimelineFilterForm