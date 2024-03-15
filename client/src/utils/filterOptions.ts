import { CheckCircleIcon, CircleIcon, TimerIcon, XCircleIcon } from "lucide-react";

export type FilterOption = {
  value: string;
  label: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const filterOptions: FilterOption[] = [
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
