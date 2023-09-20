import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectInput() {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="kesto" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">12:00 - 13.00</SelectItem>
                    <SelectItem value="banana">1 h</SelectItem>
                    <SelectItem value="blueberry">1 h 45 min</SelectItem>
                    <SelectItem value="grapes">13:30 - 14:30</SelectItem>
                    <SelectItem value="pineapple">14:30 - 16:00</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}


export function DatePicker() {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}


export function Premise() {

    return (
        <main className="grid grid-cols-9 gap-[50px] grow py-[30px]">
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Pasila koulu</CardTitle>
                    <CardDescription>Kolmikerrosinen koulu rakennus, jossa on noin 150 opetustilaa</CardDescription>
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold py-3">1. kerros</h2>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">A1234</p>
                        <DatePicker />
                        <SelectInput />
                        <SelectInput />
                    </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>

            <div className="col-span-6 bg-gray-300 rounded w-full h-full">
                <div className="w-full h-full" />
            </div>
        </main>
    )
}
