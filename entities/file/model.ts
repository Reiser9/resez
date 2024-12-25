export type File = {
    success: number;
    file: FileInfo;
};

export type FileInfo = {
    url: string;
    name: string;
    type: string;
    size: number;
};
