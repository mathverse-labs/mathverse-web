import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: { value: number; label: string };
  className?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-brand-500",
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-100 bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 font-sarabun">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-gray-400 font-sarabun">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "mt-1 text-xs font-medium font-sarabun",
                trend.value >= 0 ? "text-emerald-600" : "text-red-500"
              )}
            >
              {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn("rounded-lg bg-brand-50 p-2", iconColor)}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
