import { ScrollArea } from "../../components/ui/scroll-area";

interface SidebarProps extends React.PropsWithChildren {}

export function Sidebar({ children }: SidebarProps) {
    return (
        <ScrollArea className="h-screen">
            <aside className="flex flex-col max-w-sm gap-2 p-4">
                {children}
            </aside>
        </ScrollArea>
    );
}
