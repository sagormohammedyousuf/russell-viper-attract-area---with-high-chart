(async () => {
    const topology = await fetch('./district.geojson')
        .then(response => response.json());

    let data = [
        ['4001', 0], ['2003', 0], ['1004', 0], ['1006', 0], ['1009', 0], 
        ['5010', 0], ['2012', 0], ['2013', 0], ['2015', 0], ['4018', 0], 
        ['2019', 0], ['2022', 0], ['3026', 0], ['5527', 0], ['3029', 0], 
        ['2030', 0], ['5532', 0], ['3033', 0], ['3035', 0], ['6036', 0], 
        ['4539', 0], ['4041', 0], ['1042', 0], ['4044', 0], ['5038', 0], 
        ['2046', 0], ['4047', 0], ['3048', 0], ['5549', 0], ['4050', 0], 
        ['2051', 0], ['5552', 0], ['3054', 0], ['4055', 0], ['3056', 0], 
        ['4057', 0], ['6058', 0], ['3059', 0], ['4561', 0], ['5064', 0], 
        ['4065', 0], ['3067', 0], ['3068', 0], ['5069', 0], ['5070', 0], 
        ['4572', 0], ['5573', 0], ['2075', 0], ['5076', 0], ['5577', 0], 
        ['1078', 0], ['1079', 0], ['3082', 0], ['5081', 0], ['2084', 0], 
        ['5585', 0], ['4087', 0], ['3086', 0], ['4589', 0], ['5088', 0], 
        ['6090', 0], ['6091', 0], ['3093', 0], ['5594', 0]
    ];

    Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: 'Montserrat, sans-serif'
            }
        }
    });

    const chart = Highcharts.mapChart('container', {
        chart: {
            map: topology,
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: "Russell's Viper in Bangladesh",
            style: {
                fontSize: '30px'
            }
        },
        subtitle: {
            text: '<a href="https://code.highcharts.com/mapdata/countries/bd/bd-all.topo.json">Bangladesh District map</a>',
            style: {
                fontSize: '14px'
            }
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        colorAxis: {
            min: 0,
            max: 20,
            minColor: '#A0937D', 
            maxColor: '#FF0000' 
        },
        series: [{
            data: data,
            joinBy: ['ADM2_PCODE', 'hc-key'], // Ensure the data joins correctly
            name: 'Random data',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.properties.ADM2_EN}' // Display district name
            },
        }]
    });

    const searchInput = document.getElementById('searchInput');
    const regionSelect = document.getElementById('regionSelect');
    const foundButton = document.getElementById('foundButton');

    // Load stored data from localStorage
    const storedData = JSON.parse(localStorage.getItem('regionData')) || {};

    // Update data with stored values
    Object.keys(storedData).forEach(key => {
        const index = data.findIndex(item => item[0] === key);
        if (index !== -1) {
            data[index][1] = storedData[key];
        }
    });

    // Update chart with initial data
    chart.series[0].setData(data);

    searchInput.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const options = regionSelect.options;
        for (const option of options) {
            const optionText = option.text.toLowerCase();
            option.style.display = optionText.includes(filter) ? '' : 'none';
        }
        
    });

    searchInput.addEventListener('keydown', function(event) {

 
        foundButton.style.background = "#cbdcf8";
        if (event.key === 'Enter') {

            foundButton.classList.add('show-before'); 
            const options = regionSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].style.display !== 'none') {
                    regionSelect.selectedIndex = i;
                    foundButton.click();
                    break;
                }
            }
            event.preventDefault();
        }
    });

    foundButton.addEventListener('click', () => {
        const selectedValue = regionSelect.value;
        const selectedIndex = data.findIndex(item => item[0] === selectedValue);



        if (selectedIndex !== -1) {
            data[selectedIndex][1] = 20; 
            chart.series[0].setData(data); 

            // Update localStorage
            storedData[selectedValue] = 20;
            localStorage.setItem('regionData', JSON.stringify(storedData));
        }
    });
})();





