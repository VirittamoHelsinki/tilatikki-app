import React, {
    FC,
    /*    useEffect,*/
    useState,
} from "react";
import {format} from "date-fns";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    CalendarIcon,
} from "lucide-react";
import {Button} from "~/@/components/ui/button";
import {Calendar} from "~/@/components/ui/calendar";
import {
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
import {cn} from "~/@/lib/utils";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/@/components/ui/form";
import {useParams} from "react-router-dom";
import {fi} from "date-fns/locale";
import {
    ResizablePanel,
} from "~/@/components/ui/resizable";
import {useTypedSelector} from "~/hooks/useTypedSelector";
import {usePremiseAction} from "~/hooks/usePremise";
import Filterme from "~/components/filterme";
import {BuildingDetails} from "~/Redux/Reducers/premiseState";

const premiseSchema = z.object({
    buildingName: z.string(),
    floorName: z.string().optional(),
    roomName: z.string().optional(),
    dateTime: z.date().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
});

interface Props {
    setCurrentSpaceId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setCurrentBuildingId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setCurrentFloor: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const PremiseFilter: FC<Props> = ({setCurrentSpaceId, setCurrentBuildingId, setCurrentFloor}) => {
    const {id} = useParams();
    // const { pathname } = useLocation();
    const {getPremiseById} = usePremiseAction();
    const {premiseData} = useTypedSelector(
        (state) => state.premise,
    );


    const [currentBuilding, setCurrentBuilding] = useState<BuildingDetails | undefined>(undefined);
    /*
        const [buildingId, setBuildingId] = useState<string | undefined>(undefined);
        const [floor, setFloor] = useState<string | undefined>(undefined);
    */
    const form = useForm<z.infer<typeof premiseSchema>>({
        resolver: zodResolver(premiseSchema),
    });

    /*    useEffect(() => {
            console.log('currentBuilding: ', currentBuilding, ' currentSpace: ', currentSpace, ' buildingId: ', buildingId)
        }, [currentBuilding,currentSpace,buildingId]);*/

    // function premiseOutline(): string {
    //   if (floor) {
    //     console.log("floor", floor);
    //     console.log(
    //       `/assets/${formatPremiseNameForUrl(premiseData.name)}/kerros${floor}-outline.svg`,
    //     );
    //     return `/assets/${formatPremiseNameForUrl(premiseData.name)}/kerros${floor}-outline.svg`;
    //   } else {
    //     // Default outline if no floor is selected
    //     return `/assets/${pathname}/default-outline.svg`;
    //   }
    // }

    function onSubmit(data: z.infer<typeof premiseSchema>) {

        const selectedBuilding = premiseData.buildings.find(
            (building) => building.name === data.buildingName
        );
        const selectedSpace = selectedBuilding?.space.find(
            (s) => s.name === data.roomName
        );

        console.log('data: ', data)
        // force buildingid state change
        const getBuildingId = selectedBuilding?._id;
        const getSpaceId = selectedSpace?._id

        setCurrentBuildingId(getBuildingId)
        setCurrentSpaceId(getSpaceId)
        setCurrentFloor(data.floorName)

        const floor = data.floorName
        const floorNumber = data.floorName ? parseInt(floor!, 10) : undefined;


        // Ensure floorNumber is a number and not NaN before calling getPremiseById
        if (getBuildingId && floorNumber !== undefined && !isNaN(floorNumber)) {
            getPremiseById(id!, getBuildingId, floorNumber);
        }
        if (id && getBuildingId) {
            // Call without floorNumber if buildingId is set but floorNumber is not a valid number
            getPremiseById(id, getBuildingId);
        }
        // form.reset();
    }

    return (
        <ResizablePanel>
            <div className="h-full w-full">
                {/* <Card className="col-span-1 row-span-3 sm:col-span-3 sm:row-span-1"> */}
                <CardHeader>
                    <CardTitle>{premiseData.name}</CardTitle>
                    <CardDescription>
                        Kolmikerroksinen koulurakennus, jossa on noin 150 opetustilaa
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Filterme/>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col items-start gap-5"
                        >
                            <div className="flex gap-3">
                                <FormField
                                    control={form.control}
                                    name="buildingName"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Rakennus</FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    const selectedBuilding = premiseData.buildings.find(
                                                        (building) => building.name === value,
                                                    );
                                                    setCurrentBuilding(selectedBuilding);
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Valitse Rakennus"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Rakennus</SelectLabel>
                                                        {premiseData.buildings.map((building) => (
                                                            <SelectItem key={building._id} value={building.name}>
                                                                {building.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>Opetustila mmm...</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="floorName"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Kerros</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Valitse Kerros"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Kerros</SelectLabel>
                                                        {currentBuilding ? (
                                                            Array.from(
                                                                {length: currentBuilding.floors},
                                                                (_, i) => (
                                                                    <SelectItem key={i} value={String(i + 1)}>
                                                                        {i + 1}
                                                                    </SelectItem>
                                                                ),
                                                            )
                                                        ) : (
                                                            <p
                                                                aria-disabled
                                                                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                            >
                                                                No floors available
                                                            </p>
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>Opetustila mmm...</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="roomName"
                                render={({field}) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Opetustila</FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Valitse Opetustila"/>
                                                </SelectTrigger>
                                            </FormControl>
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
                                                        <div
                                                            aria-disabled
                                                            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                        >
                                                            Ei ole tiloja saatavilla
                                                        </div>
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>Opetustila mmm...</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dateTime"
                                render={({field}) => (
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
                                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                                        {field.value ? (
                                                            format(field.value, "PP", {locale: fi})
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-2">
                                <FormField
                                    control={form.control}
                                    name="startTime"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Aloitusaika</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue placeholder="Valitse Aloitusaika"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Aloitus</SelectLabel>
                                                        <SelectItem value="13:00">13:00</SelectItem>
                                                        <SelectItem value="15:00">15:00</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>Aloitusaika...</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endTime"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Lopetusaika</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue placeholder="Valitse Lopetusaika"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Lopetus</SelectLabel>
                                                        <SelectItem value="14:00">14:00</SelectItem>
                                                        <SelectItem value="16:00">16:00</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>Lopetusaika...</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit">Hae Tilat</Button>
                        </form>
                    </Form>
                </CardContent>
            </div>
        </ResizablePanel>
    );
}

export default PremiseFilter
