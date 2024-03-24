import React, { MouseEventHandler  } from 'react';
import BarChartComponent from './BarChartComponent';

interface DisplayGraphProps {
    scaleLabels: string[];
    inputData: number[];
    containerClassName?: string;
    handleWeekClick: MouseEventHandler<HTMLButtonElement>;
    handleMonthClick: MouseEventHandler<HTMLButtonElement>;
    handleRefreshClick: MouseEventHandler<HTMLButtonElement>;
}

const DisplayGraphComponent: React.FC<DisplayGraphProps> = ( { scaleLabels, inputData, containerClassName,
    handleWeekClick, handleMonthClick, handleRefreshClick }) => {

    return(
        <div>
            <div className={containerClassName}>
                <div className="button-wrapper">
                    <button type='submit' onClick={handleWeekClick}>Week</button>
                </div>
                <div className="button-wrapper">
                    <button type='submit' onClick={handleMonthClick}>Month</button>
                </div>
                <div className="button-wrapper">
                    <button type='submit' onClick={handleRefreshClick}>
                        <img src="/refreshIcon.JPG" alt="Refresh" style={{ width: '18px', height: '16px' }} /> 
                    </button>
                </div>
            </div>
            <br/>
            <BarChartComponent labelsData={scaleLabels} inputData={inputData}/>
        </div>
    );
}

export default DisplayGraphComponent;