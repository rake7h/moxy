import React from "react";
import S from './styles.module.css';

const EndpointTableHeader = () =>{

    return(
        <div className={S.tableContainer}>
        <div className={S.tableHeader}>Route</div>
        <div className={S.tableHeader}>Target</div>
    </div>)

}

export {EndpointTableHeader}