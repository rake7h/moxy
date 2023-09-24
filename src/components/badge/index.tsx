import React from "react";
import S from './style.module.css';

interface Props {
    type: string
}

const Badge:React.FC<Props> = (props) =>{
    const {type} = props;

    const badgeClass = () => {
        if(type === 'json') return S.badgeJSON
        if(type === 'html') return S.badgeHTML
    }
    
    return <span className={badgeClass()}>{type}</span>
}

export {Badge}