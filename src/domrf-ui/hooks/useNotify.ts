export const useNotify = () => {
  return {
    notifyLoading: (message: string): string => {
      return 'notify-id';
    },
    notifyStop: (id: string) => {},
    notificationNotify: (options: { type: string; title: string; autoClose?: number }) => {},
  };
};
