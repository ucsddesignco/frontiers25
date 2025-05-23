import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import GlassButton from './GlassButton/GlassButton';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  primaryText: string;
  secondaryText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  Icon: React.ReactNode | null;
  onlyPrimary?: boolean;
}

export default function Modal({
  open,
  onOpenChange,
  title,
  description,
  primaryText,
  secondaryText = 'No Thanks',
  onPrimaryClick,
  onSecondaryClick,
  Icon,
  onlyPrimary = false
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[320px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogDescription>{description}</DialogDescription>
          {!onlyPrimary && (
            <DialogClose asChild>
              <GlassButton
                onClick={() => {
                  onSecondaryClick?.();
                }}
                onMouseDown={e => e.stopPropagation()}
                text={secondaryText}
                className="modal-button justify-center"
                width="full"
              />
            </DialogClose>
          )}
          <GlassButton
            onClick={() => {
              onPrimaryClick?.();
            }}
            onMouseDown={e => e.stopPropagation()}
            text={primaryText}
            className="modal-button justify-center"
            color="dark"
            width="full"
          >
            {Icon}
          </GlassButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
