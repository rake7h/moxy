import React, { useEffect, useRef, Suspense, useState } from 'react'
import AceEditor from "react-ace";
import type { IAnnotation, IAceEditorProps } from 'react-ace';
import S from './styles.module.css';
import json5 from "json5";
import './global.css';
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-html";
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-searchbox';
import beautify from 'ace-builds/src-noconflict/ext-beautify';

interface Props {
    name: string
    value: string
    onChange: (v: string) => void
    className: string
    readOnly: boolean
    defaultValue?: string
    onValidate: IAceEditorProps['onValidate']
    mode: IAceEditorProps['mode']
}

const CONFIG = {
    tabSize: 2
}

const Editor: React.FC<Props> = ({ name, value, onChange, className, readOnly, defaultValue, onValidate, mode }) => {
    const editorRef = useRef<any>();
    const [annotations, setAnnotations] = useState<IAnnotation>()

    useEffect(() => {
        beautify.beautify(editorRef?.current?.editor?.session);
        handleValidate(value)
    }, [mode, value]);

    const handleOnChange = (v: string) => {
        handleValidate(value)
        onChange(v)
    }

    const handleValidate = (v: string) => {
        if (mode === 'json') {
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
        }
        else {
            setAnnotations(undefined)
        }
    };

    const preFillValue = () =>{
        if(mode === 'json') {
            return JSON.stringify(defaultValue, null, CONFIG.tabSize)
        }
        return defaultValue;
    }

    return (
        <Suspense fallback={"Loading"}>
            <AceEditor
                className={className || S.aceEditorOverwrites}
                readOnly={readOnly}
                mode={mode}
                theme="tomorrow"
                name={name}
                defaultValue={preFillValue()}
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

export { Editor }