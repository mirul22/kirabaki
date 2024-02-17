'use client';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";

function ResetView() {
    const router = useRouter();

    const handleReset = () => {
        toast('Confirm Reset?', {
            action: {
              label: 'Reset',
              onClick: () => {
                localStorage.clear();
                router.push('/');
                toast.success("Reset All transaction and account data.");
              },
            },
            cancel: {
                label: 'Cancel',
                onClick: () => toast.dismiss("Cancel..."),
            },
          });
    }

    return (
        <div className="absolute mt-5 w-5/6 lg:max-w-screen-sm flex justify-end">
            <RotateCcw size={22} onClick={handleReset}/>
        </div>
    );
}

export default ResetView;
