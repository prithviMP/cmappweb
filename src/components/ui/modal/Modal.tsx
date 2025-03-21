import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "../../../lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, size = "md", title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-white shadow-[0px_8px_24px_rgba(0,0,0,0.15)] duration-200 outline-none",
          {
            "w-[90vw] max-w-[500px]": size === "sm",
            "w-[90vw] max-w-[800px]": size === "md",
            "w-[90vw] max-w-[1200px]": size === "lg",
          }
        )}
      >
        <DialogTitle className="sr-only">
          {title || "Dialog"}
        </DialogTitle>
        <div className="relative">
          {children}
        </div>
      </DialogContent>
      <div className="fixed inset-0 bg-black/30 z-40" aria-hidden="true" />
    </Dialog>
  );
};