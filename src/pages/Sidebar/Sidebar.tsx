import { FilterIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useState } from "react";

interface SidebarProps extends React.PropsWithChildren {}

export function Sidebar({ children }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen ? (
                <div className="absolute top-0 right-0 bottom-0 left-0 h-screen w-screen flex flex-col gap-2 p-3 z-10 bg-white bg-opacity-70">
                    <ScrollArea className="w-full h-full">
                        <aside className="flex flex-col gap-2">
                            {children}
                        </aside>
                    </ScrollArea>
                </div>
            ) : (
                <ScrollArea className="h-screen min-w-min hidden md:block">
                    <aside className="flex flex-col max-w-sm gap-2">
                        {children}
                    </aside>
                </ScrollArea>
            )}

            <Button
                className="absolute bottom-4 right-4 md:hidden z-20"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <FilterIcon />
            </Button>
        </>
    );
}
