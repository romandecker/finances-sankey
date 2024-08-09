import { Checkbox } from "../../components/ui/checkbox";
import { Category, getName } from "../../utils/ingest/Category";

interface CategoryFilterProps {
    root: Category;
}

export function CategoryFilter({ root }: CategoryFilterProps) {
    const name = getName(root);
    return (
        <>
            <div className="flex items-center space-x-2 mb-1">
                <Checkbox
                    id={name}
                    onChange={(e) => {
                        console.log("onChange", e);
                    }}
                    // onCheckedChange={(checkedState) =>
                    //     onChange?.(checkedState === true, id)
                    // }
                    // checked={isChecked}
                />
                <label
                    htmlFor={name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {root.names}
                </label>
            </div>
            <div className="ml-2">
                {root.children.map((child) => (
                    <CategoryFilter key={getName(child)} root={child} />
                ))}
            </div>
        </>
    );
    return;
}
