import { ReactEditorProps } from 'react-editor-js';
import { Ref } from 'react';

declare module 'react-editor-js' {
    interface EditorProps extends ReactEditorProps {
        placeholder?: string;
        id?: string;
        minHeight?: number;
    }

    const Editor: React.ForwardRefExoticComponent<EditorProps & React.RefAttributes<any>>;

    export default Editor;
}

declare module '@editorjs/embed' {
    const Embed: any;
    export default Embed;
}

declare module '@editorjs/table' {
    const Table: any;
    export default Table;
}

declare module '@editorjs/list' {
    const List: any;
    export default List;
}

declare module '@editorjs/code' {
    const Code: any;
    export default Code;
}

declare module '@editorjs/image' {
    const Image: any;
    export default Image;
}

declare module '@editorjs/raw' {
    const Raw: any;
    export default Raw;
}

declare module '@editorjs/header' {
    const Header: any;
    export default Header;
}

declare module '@editorjs/marker' {
    const Marker: any;
    export default Marker;
}

declare module '@editorjs/checklist' {
    const CheckList: any;
    export default CheckList;
}

declare module '@editorjs/inline-code' {
    const InlineCode: any;
    export default InlineCode;
}

declare module '@editorjs/simple-image' {
    const SimpleImage: any;
    export default SimpleImage;
}
