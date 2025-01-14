import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import {   ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  close: () => void;
  title: string;
  description?:string
}
export default function Modal({ isOpen, close, children, title ,description  }: IProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
         {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-gray-300/50 backdrop-opacity-15"  />
        <div className="fixed inset-0 backdrop-blur-sm m-auto" aria-hidden="true">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            /> */}

 
            {/* <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              />  */}
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {title && (
                    <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {title}
                    </DialogTitle>
                  )}
                  {description && <p className="text-sm text-gray-500 mt-3">{description}</p>}

              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
