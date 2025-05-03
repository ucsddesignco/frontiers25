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
  buttonText: string;
  buttonOnClick?: () => void;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null;
}

export default function Modal({
  open,
  onOpenChange,
  title,
  description,
  buttonText,
  buttonOnClick,
  Icon
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[320px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle> {/* Use title prop here */}
        </DialogHeader>
        <DialogFooter>
          <DialogDescription>{description}</DialogDescription>
          <DialogClose asChild>
            <GlassButton
              onClick={() => {}}
              onMouseDown={e => e.stopPropagation()}
              text="No Thanks"
              className="modal-button justify-center"
              width="full"
            />
          </DialogClose>
          <GlassButton
            onClick={() => {
              buttonOnClick?.();
            }}
            onMouseDown={e => e.stopPropagation()}
            text={buttonText}
            className="modal-button justify-center"
            color="dark"
            width="full"
          >
            {Icon && <Icon />}
          </GlassButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
