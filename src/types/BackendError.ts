export type BackendError = {
    id: string;
    message: string;
    messages?: string[];
    timestamp: string;
};

export function isBackendError(obj: any): obj is BackendError {
    return (
        'id' in obj && ('message' in obj || 'messages' in obj) && 'timestamp' in obj
    );
}
