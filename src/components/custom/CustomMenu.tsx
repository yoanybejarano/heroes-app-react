import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {NavLink} from "react-router";
import {cn} from "cn";

const CustomMenu = () => {

    return (
        <NavigationMenu className="py-5">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavLink
                        to="/"
                        end
                        className={({isActive}) =>
                            cn("rounded-md p-2", isActive ? "bg-slate-200" : "")}>
                        Home
                    </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavLink
                        to="/search"
                        className={({isActive}) =>
                            cn("rounded-md p-2", isActive ? "bg-slate-200" : "")}>
                        Search
                    </NavLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default CustomMenu;