import React from "react";
import { cn } from "../../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-white shadow-sm border border-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn("p-6 flex flex-col space-y-1.5", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <p
      className={cn("text-sm text-gray-500", className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent = ({
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
};