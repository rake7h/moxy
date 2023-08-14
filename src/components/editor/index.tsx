import React, { useEffect, useRef, Suspense, useState } from 'react'
import AceEditor from "react-ace";
import type { IAnnotation, IAceEditorProps } from 'react-ace';
import S from './styles.module.css';
import "ace-builds/src-noconflict/mode-json";
import beautify from 'ace-builds/src-noconflict/ext-beautify';
import json5 from "json5";
import './global.css';

interface Props {
    name: string
    value: string
    onChange: (v: string) => void
    className: string
    readOnly: boolean
    defaultValue?: string
    onValidate: IAceEditorProps['onValidate']
}

interface CursorPosition {
    column: number,
    row: number
}

const CONFIG = {
    tabSize: 2
}

const JsonEditor: React.FC<Props> = ({ name, value, onChange, className, readOnly, defaultValue, onValidate }) => {
    const editorRef = useRef<any>();
    const [annotations, setAnnotations] = useState<IAnnotation>()

    useEffect(() => {
        beautify.beautify(editorRef?.current?.editor?.session);
    }, []);

    const handleOnChange = (v: string) => {
        handleValidate(v)
        onChange(v)
    }

    const handleValidate = (v: string) => {
        try {
            json5.parse(v);
            setAnnotations(undefined)
        } catch (error: unknown) {
            const annotationsError =
            {
                row: error.lineNumber > 2 ? error.lineNumber - 2 : error.lineNumber,
                column: error.columnNumber,
                text: error.message,
                type: 'error',
            }
            setAnnotations(annotationsError);
        }
    };

    return (
        <Suspense fallback={"Loading"}>
            <AceEditor
                className={className || S.aceEditorOverwrites}
                readOnly={readOnly}
                mode="json"
                theme="tomorrow"
                name={name}
                defaultValue={JSON.stringify(defaultValue, null, CONFIG.tabSize)}
                value={value}
                onChange={handleOnChange}
                fontSize={15}
                showPrintMargin={true}
                onValidate={onValidate} // Attach the validation callback
                showGutter={true}
                highlightActiveLine={true}
                commands={beautify.commands}
                annotations={annotations ? [annotations] : []}
                ref={editorRef}
                wrapEnabled={true}
                placeholder=""
                setOptions={{
                    showLineNumbers: true,
                    tabSize: CONFIG.tabSize,
                }}
                editorProps={{ $blockScrolling: true }}
                focus={true}

            />
        </Suspense>
    )
}

export { JsonEditor }