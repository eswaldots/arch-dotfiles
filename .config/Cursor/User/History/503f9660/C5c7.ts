import { Theme } from "@/constants/theme";
import { getTheme } from "@/services/theme.service";
import { useEffect, useState } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState<Theme | undefined>(undefined);

    useEffect(() => {
        getTheme().then((theme) => {
            setTheme(theme);
        });
    }, []);
    

    return {
        theme
    }
}
