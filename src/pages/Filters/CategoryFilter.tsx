import { Checkbox } from "../../components/ui/checkbox";
import { Category, collect, getName } from "../../utils/ingest/Category";

interface CategoryFilterProps {
    category: Category;
    isRoot?: boolean;
    onChange?: (isChecked: boolean, categoryNames: string[]) => void;
    activeCategories?: string[];
}

export function CategoryFilter({
    category,
    isRoot = false,
    onChange,
    activeCategories = [],
}: CategoryFilterProps) {
    const children = category.children.map((child) => (
        <CategoryFilter
            key={getName(child)}
            category={child}
            activeCategories={activeCategories}
            onChange={onChange}
        />
    ));

    if (isRoot) {
        return children;
    }

    const name = getName(category);

    return (
        <>
            <div className={`flex items-center space-x-2 mb-1`}>
                <Checkbox
                    id={name}
                    onCheckedChange={(checkedState) => {
                        const categories = collect(category).map(getName);

                        onChange?.(checkedState === true, categories);
                    }}
                    checked={activeCategories.includes(name)}
                />
                <label
                    htmlFor={name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {getName(category)}
                    {/* &nbsp;
                    <div
                        style={
                            {
                                "--category-color": pickColor(
                                    getName(category)
                                ),
                            } as CSSProperties
                        }
                        className={`w-3 h-3 inline-block ${styles.colorIndicator}`}
                    /> */}
                </label>
            </div>
            <div className="ml-2">{children}</div>
        </>
    );
    return;
}
