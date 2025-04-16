
export type AuthToast = {
  toast: (props: {
    title: string;
    description: string;
    variant?: "default" | "destructive";
    action?: any;
  }) => void;
};

export type NavigateFunction = (to: string) => void;
