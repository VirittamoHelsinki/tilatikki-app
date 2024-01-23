import {
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
  HelpCircleIcon,
  XCircleIcon,
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
import { useLocation } from "react-router-dom";
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
    value: "backlog",
    label: "Backlog",
    icon: HelpCircleIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: TimerIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircleIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircleIcon,
  },
];

const facet = new Set<string>([
  "backlog",
  "todo",
  "in progress",
  "done",
  "canceled",
]);

function FilterMe() {
  const [selectedValues, setSelectedValues] = useState<Set<string>>(
    new Set(facet),
  );
  // const selectedValues = new Set(facet);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Filtered by
          {selectedValues?.size > 0 && (
            <>
              {/* <Separator orientation="vertical" className="mx-2 h-4" /> */}
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    // .filter((option) => selectedValues. ===(option.value))
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
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from<string>(selectedValues);
                      setSelectedValues(
                        filterValues.length ? filterValues[0] : undefined,
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        !selectedValues
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
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedValues(undefined)}
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

const premiseSchema = z.object({
  roomName: z.string(),
  dateTime: z.date(),
  startTime: z.string(),
  endTime: z.string(),
});

export function Premise() {
  const { pathname } = useLocation();
  const [floor, setFloor] = useState("1.kerros");
  const form = useForm<z.infer<typeof premiseSchema>>({
    resolver: zodResolver(premiseSchema),
  });

  function premiseOutline(): string {
    if (floor === "1.kerros") {
      return `/assets/${pathname}/kerros1-outline.svg`;
    } else if (floor === "2.kerros") {
      return `/assets/${pathname}/kerros2-outline.svg`;
    } else {
      return `/assets/${pathname}/kerros3-outline.svg`;
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
  return (
    <main className="flex flex-1 flex-col sm:min-h-0">
      <div className="grid flex-1 grid-cols-1 grid-rows-3 gap-4 p-4 sm:min-h-0 sm:grid-cols-10 sm:grid-rows-1 sm:gap-8 sm:px-8 sm:py-4">
        <Card className="col-span-1 row-span-3 sm:col-span-3 sm:row-span-1">
          <CardHeader>
            <CardTitle>{pathname} koulu</CardTitle>
            <CardDescription>
              Kolmikerrosinen koulu rakennus, jossa on noin 150 opetustilaa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={floor}
              onValueChange={setFloor}
              className="w-full 2xl:w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="1.kerros">1.kerros</TabsTrigger>
                <TabsTrigger value="2.kerros">2.kerros</TabsTrigger>
                <TabsTrigger value="3.kerros">3.kerros</TabsTrigger>
              </TabsList>
              <TabsContent value="1.kerros">
                <FilterMe />
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-start gap-5"
                  >
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
                                  <SelectItem value="A12345">A12345</SelectItem>
                                  <SelectItem value="A12347">A12347</SelectItem>
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
                                    format(field.value, "PP")
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
                    <Button>Varaa Aika</Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="2.kerros">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-start gap-5"
                  >
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
                                  <SelectItem value="A12345">A12345</SelectItem>
                                  <SelectItem value="A12347">A12347</SelectItem>
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
                                    format(field.value, "PP")
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
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>Päivämäärä...</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                              <SelectTrigger className="w-[180px]">
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
                              <SelectTrigger className="w-[180px]">
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
                    <Button>Varaa Aika</Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="3.kerros">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-start gap-5"
                  >
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
                                  <SelectItem value="A12345">A12345</SelectItem>
                                  <SelectItem value="A12347">A12347</SelectItem>
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
                                    format(field.value, "PP")
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
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>Päivämäärä...</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                              <SelectTrigger className="w-[180px]">
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
                              <SelectTrigger className="w-[180px]">
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
                    <Button>Varaa Aika</Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card
          id="ref-body"
          className="col-span-1 h-full w-full rounded sm:col-span-7 sm:row-span-1"
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
              <BackgroundLayer url={premiseOutline()} floor={floor} />
            </Suspense>
            <MapControls enableRotate={false} />
          </Canvas>
        </Card>
      </div>
    </main>
  );
}
