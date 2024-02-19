import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box3, Color, Group, Object3DEventMap, Shape, Sphere } from "three";
import { SVGLoader } from "three-stdlib";
import { MapControls, Html, useProgress } from "@react-three/drei";
import { Canvas, useLoader, extend } from "@react-three/fiber";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  CheckIcon,
  PlusCircleIcon,
  CircleIcon,
  TimerIcon,
  CheckCircleIcon,
  XCircleIcon,
  Users,
  Coffee,
  X,
} from "lucide-react";
import { Button } from "~/@/components/ui/button";
import { Calendar } from "~/@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/@/components/ui/popover";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/@/components/ui/tabs";
import { useLocation, useParams } from "react-router-dom";
import { Badge } from "~/@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Separator } from "~/@/components/ui/separator";
import { fi } from "date-fns/locale";
import { Input } from "~/@/components/ui/input";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "~/@/components/ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/@/components/ui/dialog";
import { Label } from "~/@/components/ui/label";
import { Textarea } from "~/@/components/ui/textarea";
import { useTypedSelector } from "~/hooks/useTypedSelector";
import { usePremiseAction } from "~/hooks/usePremise";

extend({ SVGLoader });

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const hoveredCursor =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyNi41IiBmaWxsPSJibGFjayIgc3Ryb2tlPSJibGFjayIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzIgMzJMMzIgNDVIMzNMMzMgMzJINDVWMzFIMzNWMTlIMzJWMzFIMTlWMzJIMzJaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xLjk2MjMxIDEuOTYyMzFMMTMuNzAzMyA1LjEwODI5TDUuMTA4MjkgMTMuNzAzM0wxLjk2MjMxIDEuOTYyMzFaIiBmaWxsPSJibGFjayIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IndoaXRlIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+";
const defaultCursor =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyNi41IiBzdHJva2U9ImJsYWNrIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAzMkw0MS4xOTI0IDQxLjE5MjRMNDEuODk5NSA0MC40ODUzTDMyLjcwNzEgMzEuMjkyOUw0MS4xOTI0IDIyLjgwNzZMNDAuNDg1MyAyMi4xMDA1TDMyIDMwLjU4NThMMjMuNTE0NyAyMi4xMDA1TDIyLjgwNzYgMjIuODA3NkwzMS4yOTI5IDMxLjI5MjlMMjIuMTAwNSA0MC40ODUzTDIyLjgwNzYgNDEuMTkyNEwzMiAzMloiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTUuMzY3MTEgMTIuNzM3M0wyLjY2OTQyIDIuNjY5NDJMMTIuNzM3MyA1LjM2NzExTDUuMzY3MTEgMTIuNzM3M1oiIHN0cm9rZT0iYmxhY2siLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==";

function RoomHover({ x, y }: { x: number; y: number }) {
  return (
    <Html
      scale={100}
      rotation={[Math.PI / 1, Math.PI / 1, 0]}
      position={[x - 50, y - 50, 1]}
      transform
      occlude
      className="flex items-center justify-center"
    >
      <div className="flex h-14 w-14 grow flex-col items-center justify-center rounded-md bg-lime-950">
        <p className="text-xs text-lime-100">x: {x}</p>
        <p className="text-xs text-lime-100">y: {y}</p>
      </div>
    </Html>
  );
}

function Cell({
  color,
  shape,
  fillOpacity,
}: {
  color: Color;
  shape: Shape;
  fillOpacity: number;
}) {
  const [room, setRoom] = useState(false);
  const [hovered, hover] = useState(false);
  useEffect(() => {
    return void ((
      document.querySelector("#ref-body") as HTMLDivElement
    ).style.cursor = hovered
      ? `url('${hoveredCursor}'), pointer`
      : `url('${defaultCursor}'), auto`);
  }, [hovered]);
  return (
    <mesh
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      onClick={() => {
        console.log(
          `uuid: ${shape.uuid}, x: ${shape.getPoint(0).x}, y:${
            shape.getPoint(0).y
          }`,
        );
        setRoom(!room);
      }}
      rotation={[0, 0, Math.PI / 1]}
    >
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial
        color={hovered ? "hotpink" : color}
        opacity={fillOpacity}
        depthWrite={false}
        transparent
      />
      {room && <RoomHover x={shape.getPoint(0).x} y={shape.getPoint(0).y} />}
    </mesh>
  );
}

function Svg({
  url,
  ref,
}: {
  url: string;
  ref: React.MutableRefObject<Group<Object3DEventMap>>;
}) {
  const { paths } = useLoader(SVGLoader, url);
  const shapes = useMemo(
    () =>
      paths.flatMap((p) =>
        p.toShapes(true).map((shape) => ({
          shape,
          color: p.color,
          fillOpacity: p.userData?.style.fillOpacity,
        })),
      ),
    [paths],
  );

  return (
    <group ref={ref}>
      {shapes.map((props) => (
        <Cell
          key={props.shape.uuid}
          color={props.color}
          shape={props.shape}
          fillOpacity={props.fillOpacity}
        />
      ))}
    </group>
  );
}

function Outline({ shape }: { shape: Shape }) {
  return (
    <mesh rotation={[0, 0, Math.PI / 1]}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial depthWrite={false} color="#f8f8f8" />
    </mesh>
  );
}

function BackgroundLayer({ url, floor }: { url: string; floor: string }) {
  const { pathname } = useLocation();
  const { paths } = useLoader(SVGLoader, url);
  const shapes = useMemo(
    () =>
      paths.flatMap((p) =>
        p.toShapes(true).map((shape) => ({
          shape,
          color: p.color,
        })),
      ),
    [paths],
  );

  function premiseFloor(): string {
    if (floor === "1.kerros") {
      return `/assets/${pathname}/kerros1-rooms.svg`;
    } else if (floor === "2.kerros") {
      return `/assets/${pathname}/kerros2-rooms.svg`;
    } else {
      return `/assets/${pathname}/kerros3-rooms.svg`;
    }
  }

  const ref = useRef<Group>(null!);

  useLayoutEffect(() => {
    const sphere = new Box3()
      .setFromObject(ref.current!)
      .getBoundingSphere(new Sphere());
    ref.current?.position.set(-sphere.center.x, -sphere.center.y, 0);
  }, []);

  return (
    <group ref={ref} scale={1} rotation={[0, 0, Math.PI / 360]}>
      {shapes.map((props) => (
        <Outline key={props.shape.uuid} shape={props.shape} />
      ))}
      <Svg url={premiseFloor()} ref={ref} />
    </group>
  );
}

const options = [
  {
    value: "varattu",
    label: "Varattu",
    icon: CheckCircleIcon,
  },
  {
    value: "vapaa",
    label: "Vapaa",
    icon: CircleIcon,
  },
  {
    value: "arto special",
    label: "Arto Special",
    icon: TimerIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircleIcon,
  },
];

function FilterMe() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const selectedValue = new Set(selectedValues as string[]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="mb-4 h-8 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Filtered by
          {selectedValue.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValue.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValue.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues?.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValue.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Filtered by" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValue.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValue.delete(option.value);
                      } else {
                        selectedValue.add(option.value);
                      }
                      const filterValues = Array.from(selectedValue);
                      setSelectedValues(filterValues);
                      console.log(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {/* {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )} */}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues?.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedValues([])}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function AddMember() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<typeof options>([]);
  return (
    <Command className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-dashed border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selectedValues.map((option) => (
            <Badge key={option.value}>
              {option.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() =>
                  setSelectedValues((prev) =>
                    prev.filter((s) => s.value !== option.value),
                  )
                }
              >
                <X className="ml-1 size-[10px]" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Lisaa jasen..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open &&
        options.filter((option) => !selectedValues?.includes(option)).length >
          0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {options
                .filter((option) => !selectedValues?.includes(option))
                .map((member) => (
                  <CommandItem
                    key={member.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelectedValues((prev) => [...prev, member]);
                    }}
                    className={"cursor-pointer"}
                  >
                    {member.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}

function ReservationDialog({ children }: { children: React.ReactNode }) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [_start, setStart] = useState<string>();
  const [_end, setEnd] = useState<string>();
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
            onClick={() => console.log("varaus onnistui W in the chat")}
          >
            Varaa Tila
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const premiseSchema = z.object({
  buildingName: z.string(),
  floorName: z.string(),
  roomName: z.string(),
  dateTime: z.date(),
  startTime: z.string(),
  endTime: z.string(),
});

function formatPremiseNameForUrl(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function Premise() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const { getPremiseById } = usePremiseAction();
  const { isLoading, premiseData, currentBuilding } = useTypedSelector(
    (state) => state.premise,
  );
  const [buildingId, setBuildingId] = useState<string | undefined>(undefined);
  const [floor, setFloor] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (id) {
      getPremiseById(id);
    }
  }, []);

  const form = useForm<z.infer<typeof premiseSchema>>({
    resolver: zodResolver(premiseSchema),
  });

  const { watch } = form;

  const watchedBuildingName = watch("buildingName");
  const watchedFloor = watch("floorName");

  useEffect(() => {
    if (!watchedBuildingName) {
      setBuildingId(undefined);
      return;
    }

    const selectedBuilding = premiseData.buildings.find(
      (building) => building.name === watchedBuildingName,
    );

    if (selectedBuilding) {
      setBuildingId(selectedBuilding._id);
    } else {
      setBuildingId(undefined);
    }
  }, [watchedBuildingName, premiseData.buildings]);

  useEffect(() => {
    if (!watchedFloor) {
      setFloor(undefined);
      return;
    }
    setFloor(watchedFloor);
  }, [watchedFloor]);

  useEffect(() => {
    const floorNumber = watchedFloor ? parseInt(watchedFloor, 10) : undefined;
    // Ensure floorNumber is a number and not NaN before calling getPremiseById
    if (buildingId && floorNumber !== undefined && !isNaN(floorNumber)) {
      getPremiseById(id!, buildingId, floorNumber);
    } else if (buildingId) {
      // Call without floorNumber if buildingId is set but floorNumber is not a valid number
      getPremiseById(id!, buildingId);
    }
  }, [buildingId, watchedFloor]);

  // function premiseOutline(): string {
  //   if (floor === "1") {
  //     return `/assets/${pathname}/kerros1-outline.svg`;
  //   } else if (floor === "2") {
  //     return `/assets/${pathname}/kerros2-outline.svg`;
  //   } else {
  //     return `/assets/${pathname}/kerros3-outline.svg`;
  //   }
  // }
  function premiseOutline(): string {
    if (floor) {
      console.log("floor", floor);
      console.log(
        `/assets/${formatPremiseNameForUrl(premiseData.name)}/kerros${floor}-outline.svg`,
      );
      return `/assets/${formatPremiseNameForUrl(premiseData.name)}/kerros${floor}-outline.svg`;
    } else {
      // Default outline if no floor is selected
      return `/assets/${pathname}/default-outline.svg`;
    }
  }

  // function premiseFloor(): string {
  //   if (floor === "1.kerros") {
  //     return `/assets/${pathname}/kerros1.svg`;
  //   } else if (floor === "2.kerros") {
  //     return `/assets/${pathname}/kerros2.svg`;
  //   } else {
  //     return `/assets/${pathname}/kerros3-rooms.svg`;
  //   }
  // }

  function onSubmit(data: z.infer<typeof premiseSchema>) {
    console.log(data);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex flex-1 flex-col p-4 sm:min-h-0 sm:px-8 sm:py-4">
      {/* <div className="grid flex-1 grid-cols-1 grid-rows-3 gap-4 p-4 sm:min-h-0 sm:grid-cols-10 sm:grid-rows-1 sm:gap-8 sm:px-8 sm:py-4"> */}
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        <ResizablePanel>
          <div className="h-full w-full">
            {/* <Card className="col-span-1 row-span-3 sm:col-span-3 sm:row-span-1"> */}
            <CardHeader>
              <CardTitle>{premiseData.name}</CardTitle>
              <CardDescription>
                Kolmikerrosinen koulu rakennus, jossa on noin 150 opetustilaa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FilterMe />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col items-start gap-5"
                >
                  <div className="flex gap-3">
                    <FormField
                      control={form.control}
                      name="buildingName"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Rakennus</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Valitse Rakennus" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Rakennus</SelectLabel>
                                  {(premiseData.buildings ?? []).map(
                                    (building, index) => (
                                      <SelectItem
                                        key={index}
                                        value={building.name}
                                      >
                                        {building.name}
                                      </SelectItem>
                                    ),
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>Opetustila mmm...</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="floorName"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Kerros</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              name="floorName"
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Valitse Kerros" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Kerros</SelectLabel>
                                  {currentBuilding &&
                                    Array.from(
                                      { length: currentBuilding.floors },
                                      (_, i) => (
                                        <SelectItem
                                          key={i}
                                          value={String(i + 1)}
                                        >
                                          {i + 1}
                                        </SelectItem>
                                      ),
                                    )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>Opetustila mmm...</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="roomName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Opetustila</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Valitse Opetustila" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Opetustilat</SelectLabel>
                                {currentBuilding && currentBuilding.space ? (
                                  currentBuilding.space.map((space, index) => (
                                    <SelectItem key={index} value={space.name}>
                                      {space.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <div>No spaces available</div>
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>Opetustila mmm...</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Päivämäärä</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PP", { locale: fi })
                                ) : (
                                  <span>Valitse päivämäärä</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              locale={fi}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>Päivämäärä...</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Aloitusaika</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Valitse Aloitusaika" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Aloitus</SelectLabel>
                                  <SelectItem value="13:00">13:00</SelectItem>
                                  <SelectItem value="15:00">15:00</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>Aloitusaika...</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Lopetusaika</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Valitse Lopetusaika" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Lopetus</SelectLabel>
                                  <SelectItem value="14:00">14:00</SelectItem>
                                  <SelectItem value="16:00">16:00</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>Lopetusaika...</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button>Hae Tilat</Button>
                </form>
              </Form>
            </CardContent>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="flex h-full w-full flex-col gap-6 p-6">
            <Input placeholder="search..." />
            {currentBuilding && currentBuilding.space ? (
              currentBuilding.space.map((space, index) => (
                <ReservationDialog key={index}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{space.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                      <Badge>{`Area: ${space.area} sqm`}</Badge>
                      {/* Additional badges or info based on space details */}
                    </CardContent>
                  </Card>
                </ReservationDialog>
              ))
            ) : (
              <div>No spaces available</div>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <Tabs defaultValue="account" className="h-full w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent
              value="account"
              id="ref-body"
              className="col-span-1 h-full w-full sm:col-span-4 sm:row-span-1"
            >
              <Canvas
                className="h-full w-full"
                frameloop="demand"
                orthographic
                camera={{
                  position: [0, 0, 200],
                  zoom: 1,
                  up: [0, 0, 1],
                  far: 10000,
                }}
              >
                <Suspense fallback={<Loader />}>
                  <BackgroundLayer
                    url={premiseOutline()}
                    floor={floor || "defaultFloor"}
                  />
                </Suspense>
                <MapControls enableRotate={false} />
              </Canvas>
            </TabsContent>
            <TabsContent value="password">
              <p>hmmm kauppa</p>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
