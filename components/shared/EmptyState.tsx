import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="mb-4 rounded-full bg-gray-100 p-4">
          <Icon size={32} className="text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-700 font-sarabun">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-gray-500 font-sarabun">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
