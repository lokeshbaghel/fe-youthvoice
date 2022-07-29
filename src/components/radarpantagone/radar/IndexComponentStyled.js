import styled from "styled-components";


function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }

  const images = importAll(require.context('../../../assets/img/', false, /\.(png|jpe?g|svg)$/));


export default styled.div`


.apexcharts-xaxis text {
	font-size: 18px !important;
	color: #333333 !important;
	font-family: "ProximaSoft-Bold", sans-serif !important;
	
}

.apexcharts-legend {
    position: absolute !important;
    right: 0 !important;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    
}

foreignObject {
	height: 120px !important;
}

.apexcharts-datalabels {
  opacity: 0;
  transition: all 0.3s ease;
}

.mixed-chart:hover .apexcharts-datalabels{
  opacity: 1;
}


.apexcharts-legend.position-bottom.apexcharts-align-center, .apexcharts-legend.position-top.apexcharts-align-center {
	
}

   


`;