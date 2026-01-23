import { formatSpecKey } from "@/lib/productUtils";

interface SpecsTableProps {
  specifications: Record<string, string>;
  title?: string;
}

const SpecsTable = ({ specifications, title = "Specifications" }: SpecsTableProps) => {
  const validSpecs = Object.entries(specifications).filter(
    ([_, value]) => value && value !== "x" && value !== "null"
  );

  if (validSpecs.length === 0) {
    return null;
  }

  return (
    <div className="border-2 border-border">
      <div className="bg-foreground text-background px-4 py-3">
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <div className="divide-y-2 divide-border">
        {validSpecs.map(([key, value], index) => (
          <div
            key={key}
            className={cn(
              "flex justify-between px-4 py-3",
              index % 2 === 0 ? "bg-card" : "bg-secondary"
            )}
          >
            <span className="text-muted-foreground">{formatSpecKey(key)}</span>
            <span className="font-mono font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default SpecsTable;
