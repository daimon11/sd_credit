import React from 'react';

interface FileLoaderPopUpProps {
    onCancel: () => void;
    onSubmit: () => void;
}

export const FileLoaderPopUp: React.FC<FileLoaderPopUpProps> = ({ onCancel, onSubmit }) => {
    return (
        <div>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};
