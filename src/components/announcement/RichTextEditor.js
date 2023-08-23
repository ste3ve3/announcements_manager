import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const RichTextEditor = ({ onChange, html }) => {
    const editor = useRef(null);
    return <JoditEditor ref={editor} value={html} tabIndex={-1} onChange={onChange} />;
};

export default RichTextEditor;
