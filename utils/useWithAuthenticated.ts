import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDrawerNavigation } from "../hooks/useDrawerNavigation";
import { Screen } from "../screens";

export const useWithAuthenticated = (currentScreen: Screen) => {

    const { isLogged, setNextScreen } = useAuth();
    const { navigate } = useDrawerNavigation();

    useEffect(() => {

        if (!isLogged) {
            setNextScreen(currentScreen);
            navigate(Screen.Auth);
        }

    }, [isLogged]);

}