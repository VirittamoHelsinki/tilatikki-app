import React, { PropsWithChildren, useState } from 'react'
import { useTypedSelector } from "~/hooks/useTypedSelector";
import { useReservationAction } from "~/hooks/useReservation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/@/components/ui/dialog";
import {
  CalendarIcon,
  Users,
  Coffee,
} from "lucide-react";
import { Label } from "~/@/components/ui/label";
import { Input } from "~/@/components/ui/input";
import AddMember from './addMember';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/@/components/ui/popover";
import { Button } from "~/@/components/ui/button";
import { Calendar } from "~/@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/@/components/ui/select";
import { cn } from "~/@/lib/utils";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import { Textarea } from "~/@/components/ui/textarea";

interface ReservationDialogProps extends PropsWithChildren {
  availabilityId: string;
}

const ReservationDialog: React.FC<ReservationDialogProps> = ({ availabilityId, children }) => {
  const user = useTypedSelector((state) => state.user.currentUser);
  const { createReservation } = useReservationAction();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  // TODO: Handle unused variables, start and end
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [start, setStart] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [end, setEnd] = useState<string>();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[578px]">
        <DialogHeader>
          <DialogTitle>A1234</DialogTitle>
          <DialogDescription>
            Kolmikerrosinen koulu rakennus, jossa on noin 150 opetustilaa
          </DialogDescription>
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Users className="" />
              10 / 100
            </div>
            <div>
              <Coffee />
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="">
              Otsikko
            </Label>
            <Input id="name" placeholder="Yrittajyys kurssi" className="" />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="add-user" className="">
              Lisaa jasen
            </Label>
            <AddMember />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="member-count" className="">
              Ryhman koko
            </Label>
            <Input id="member-count" placeholder="10" className="" />
          </div>
          <div className="flex items-end gap-4">
            <div className="flex w-full flex-1 flex-col gap-4">
              <Label htmlFor="add-user" className="">
                Aloitus
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full flex-1 justify-start text-left font-normal",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP", { locale: fi })
                    ) : (
                      <span>Valitse päivämäärä</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    locale={fi}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Select
              // value={start}
              onValueChange={setStart}
            >
              <SelectTrigger className="w-full flex-1">
                <SelectValue placeholder="Valitse aloitusaika" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Aloitusaika</SelectLabel>
                  <SelectItem value="12:00">12:00</SelectItem>
                  <SelectItem value="12:45">12:45</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-4">
            <div className="flex w-full flex-1 flex-col gap-4">
              <Label htmlFor="add-user" className="">
                Lopetus
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PP", { locale: fi })
                    ) : (
                      <span className="w-full">Valitse päivämäärä</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    locale={fi}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Select
              // value={start}
              onValueChange={setEnd}
            >
              <SelectTrigger className="w-full flex-1">
                <SelectValue placeholder="Valitse aloitusaika" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lopetusaika</SelectLabel>
                  <SelectItem value="13:00">13:00</SelectItem>
                  <SelectItem value="13:45">13:45</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full flex-1 flex-col gap-4">
            <Label htmlFor="add-user" className="">
              Toituva
            </Label>
            <Select
              // value={start}
              onValueChange={setEnd}
            >
              <SelectTrigger className="w-full flex-1">
                <SelectValue placeholder="Valitse Toistuva" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Toistuva</SelectLabel>
                  <SelectItem value="everyday">Joka paiva</SelectItem>
                  <SelectItem value="every-week">Joka viikko</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full flex-1 flex-col gap-4">
            <Label htmlFor="add-user" className="">
              Lisatietoa
            </Label>
            <Textarea placeholder="Kirjoita viesti" />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="submit"
            onClick={() => {
              createReservation(startDate!, endDate!, availabilityId);
            }}
          >
            Varaa Tila
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReservationDialog
