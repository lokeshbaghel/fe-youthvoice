import styled from "styled-components";
export default styled.div`


.apexcharts-legend {
    position: absolute !important;
    right: 0 !important;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

foreignObject {
	height: 70px !important;
}

.apexcharts-toolbar {
	z-index: 0 !important;
}


.white-curve-box .sc-iCfLBT.dUlUq {
    width: 100% !important;
}

.mixed-chart {
    font-size: 18px;
    color: #333333;
    font-weight: bold;
}

.apexcharts-title-text {
    display: none;
}

.apexcharts-datalabels {
    opacity: 0;
    transition: all 0.3s ease;
}

.mixed-chart:hover .apexcharts-datalabels{
    opacity: 1;
}

.apexcharts-xaxis text {
    font-size: 17px;
    font-weight: bold;
}

@media print {
    .white-curve-box {
      border: 1px solid #4e4e4e !important;
      min-height: 530px;
      margin: 0 0 75px;
      width: 100% !important;
    }
    .custom-radar:nth-child(5), 
    .custom-radar:nth-child(6) {
        margin-top: 28px;
    }
    
}

`;