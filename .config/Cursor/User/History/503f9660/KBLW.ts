import { Theme } from "@/constants/theme";
import { useEffect } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState<Theme>(Theme.light);
}