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
  button1Text?: string;
  button2Text: string;
  buttonOnClick?: () => void;
  Icon: React.ReactNode | null;
  button1?: boolean;
}

export default function Modal({
  open,
  onOpenChange,
  title,
  description,
  button1Text,
  button2Text,
  buttonOnClick,
  Icon,
  button1 = true
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[320px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle> {/* Use title prop here */}
        </DialogHeader>
        <DialogFooter>
          <DialogDescription>{description}</DialogDescription>
          {button1 && (
            <DialogClose asChild>
              <GlassButton
                onClick={() => {}}
                onMouseDown={e => e.stopPropagation()}
                text={button1Text ?? 'No Thanks'}
                className="modal-button justify-center"
                width="full"
              />
            </DialogClose>
          )}
          <GlassButton
            onClick={() => {
              buttonOnClick?.();
            }}
            onMouseDown={e => e.stopPropagation()}
            text={button2Text}
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
