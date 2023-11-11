import { useState } from "react";
import { styles } from "./styles";

const useSwitch = () => {
    const [isActivePumpIn, setIsActivePumpIn] = useState<boolean>(false);
    const [isActivePumpOut, setIsActivePumpOut] = useState<boolean>(false);
    const [isActiveSubdivision1, setIsActiveSubdivision1] = useState<boolean>(false);
    const [isActiveSubdivision2, setIsActiveSubdivision2] = useState<boolean>(false);
    const [isActiveSubdivision3, setIsActiveSubdivision3] = useState<boolean>(false);
    const [isActiveSolution1, setIsActiveSolution1] = useState<boolean>(false);
    const [isActiveSolution2, setIsActiveSolution2] = useState<boolean>(false);
    const [isActiveSolution3, setIsActiveSolution3] = useState<boolean>(false);

    const [activeStylePumpIn, setActiveStylePumpIn] = useState<any>({
        button: styles.button_green,
    });
    const [activeStylePumpOut, setActiveStylePumpOut] = useState<any>({
        button: styles.button_green,
    });
    const [activeStyleSubdivision1, setActiveStyleSubdivision1] = useState<any>({
        button: styles.button_purple,
    });
    const [activeStyleSubdivision2, setActiveStyleSubdivision2] = useState<any>({
        button: styles.button_purple,
    });
    const [activeStyleSubdivision3, setActiveStyleSubdivision3] = useState<any>({
        button: styles.button_purple,
    });
    const [activeStyleSolution1, setActiveStyleSolution1] = useState<any>({
        button: styles.button_blue,
    });
    const [activeStyleSolution2, setActiveStyleSolution2] = useState<any>({
        button: styles.button_blue,
    });
    const [activeStyleSolution3, setActiveStyleSolution3] = useState<any>({
        button: styles.button_blue,
    });

    return {

    };
}
