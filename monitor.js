// Graph data storage
const graphData = {
    moisture: [],
    temp: [],
    humidity: [],
    npk: { n: [], p: [], k: [] },
    par: []
};

// Graph configurations
const graphConfigs = {
    moisture: { min: 0, max: 100, unit: '%', color: '#2196F3', label: 'Soil Moisture' },
    temp: { min: 15, max: 35, unit: '°C', color: '#FF5722', label: 'Temperature' },
    humidity: { min: 0, max: 100, unit: '%', color: '#00BCD4', label: 'Humidity' },
    par: { min: 0, max: 600, unit: 'µmol/m²/s', color: '#FFC107', label: 'PAR Light' }
};

// Initialize graph data with some starting values
function initializeGraphData() {
    const now = Date.now();
    const dataPoints = 50;
    
    // Initialize moisture (70-80%)
    for (let i = 0; i < dataPoints; i++) {
        graphData.moisture.push({
            time: now - (dataPoints - i) * 60000,
            value: 70 + Math.random() * 10
        });
    }
    
    // Initialize temperature (22-27°C)
    for (let i = 0; i < dataPoints; i++) {
        graphData.temp.push({
            time: now - (dataPoints - i) * 60000,
            value: 22 + Math.random() * 5
        });
    }
    
    // Initialize humidity (60-70%)
    for (let i = 0; i < dataPoints; i++) {
        graphData.humidity.push({
            time: now - (dataPoints - i) * 60000,
            value: 60 + Math.random() * 10
        });
    }
    
    // Initialize NPK
    for (let i = 0; i < dataPoints; i++) {
        graphData.npk.n.push({
            time: now - (dataPoints - i) * 60000,
            value: 60 + Math.random() * 10
        });
        graphData.npk.p.push({
            time: now - (dataPoints - i) * 60000,
            value: 35 + Math.random() * 8
        });
        graphData.npk.k.push({
            time: now - (dataPoints - i) * 60000,
            value: 50 + Math.random() * 10
        });
    }
    
    // Initialize PAR Light (400-450)
    for (let i = 0; i < dataPoints; i++) {
        graphData.par.push({
            time: now - (dataPoints - i) * 60000,
            value: 400 + Math.random() * 50
        });
    }
}

// Draw a line graph on canvas
function drawGraph(canvasId, data, config, isMultiLine = false, multiData = null) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set padding
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding.top + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 5; i++) {
        const x = padding.left + (graphWidth / 5) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
        ctx.stroke();
    }
    
    if (data.length === 0) return;
    
    // Find min and max values
    let minVal, maxVal;
    if (isMultiLine && multiData) {
        const allValues = [...data.map(d => d.value), ...multiData.n.map(d => d.value), 
                          ...multiData.p.map(d => d.value), ...multiData.k.map(d => d.value)];
        minVal = Math.min(...allValues);
        maxVal = Math.max(...allValues);
    } else {
        minVal = Math.min(...data.map(d => d.value));
        maxVal = Math.max(...data.map(d => d.value));
        // Add some padding
        const range = maxVal - minVal;
        minVal = Math.max(0, minVal - range * 0.1);
        maxVal = maxVal + range * 0.1;
    }
    
    // Draw single line graph
    if (!isMultiLine) {
        ctx.strokeStyle = config.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = padding.left + (graphWidth / (data.length - 1)) * index;
            const y = padding.top + graphHeight - ((point.value - minVal) / (maxVal - minVal)) * graphHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Fill area under curve
        ctx.fillStyle = config.color + '20';
        ctx.lineTo(width - padding.right, height - padding.bottom);
        ctx.lineTo(padding.left, height - padding.bottom);
        ctx.closePath();
        ctx.fill();
        
        // Draw points
        ctx.fillStyle = config.color;
        data.forEach((point, index) => {
            const x = padding.left + (graphWidth / (data.length - 1)) * index;
            const y = padding.top + graphHeight - ((point.value - minVal) / (maxVal - minVal)) * graphHeight;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
    } else {
        // Draw multi-line graph for NPK
        const colors = ['#4CAF50', '#FF9800', '#9C27B0'];
        const datasets = [
            { data: multiData.n, label: 'N' },
            { data: multiData.p, label: 'P' },
            { data: multiData.k, label: 'K' }
        ];
        
        datasets.forEach((dataset, idx) => {
            ctx.strokeStyle = colors[idx];
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            dataset.data.forEach((point, index) => {
                const x = padding.left + (graphWidth / (dataset.data.length - 1)) * index;
                const y = padding.top + graphHeight - ((point.value - minVal) / (maxVal - minVal)) * graphHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
            
            // Draw points
            ctx.fillStyle = colors[idx];
            dataset.data.forEach((point, index) => {
                const x = padding.left + (graphWidth / (dataset.data.length - 1)) * index;
                const y = padding.top + graphHeight - ((point.value - minVal) / (maxVal - minVal)) * graphHeight;
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            });
        });
    }
    
    // Draw Y-axis labels
    ctx.fillStyle = '#666';
    ctx.font = '10px Inter';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = minVal + (maxVal - minVal) * (1 - i / 5);
        const y = padding.top + (graphHeight / 5) * i;
        ctx.fillText(value.toFixed(1), padding.left - 10, y + 3);
    }
    
    // Draw X-axis time labels (last 5 points)
    ctx.textAlign = 'center';
    const labelCount = 5;
    for (let i = 0; i < labelCount; i++) {
        const index = Math.floor((data.length - 1) * (i / (labelCount - 1)));
        const x = padding.left + (graphWidth / (data.length - 1)) * index;
        const time = new Date(data[index].time);
        const timeStr = time.getHours() + ':' + String(time.getMinutes()).padStart(2, '0');
        ctx.fillText(timeStr, x, height - padding.bottom + 15);
    }
}

// Update graph data with new values
function updateGraphData() {
    const now = Date.now();
    
    // Update moisture (70-80% with slight variation)
    const lastMoisture = graphData.moisture[graphData.moisture.length - 1].value;
    graphData.moisture.push({
        time: now,
        value: Math.max(65, Math.min(85, lastMoisture + (Math.random() - 0.5) * 2))
    });
    if (graphData.moisture.length > 50) graphData.moisture.shift();
    
    // Update temperature (22-27°C)
    const lastTemp = graphData.temp[graphData.temp.length - 1].value;
    graphData.temp.push({
        time: now,
        value: Math.max(20, Math.min(30, lastTemp + (Math.random() - 0.5) * 1))
    });
    if (graphData.temp.length > 50) graphData.temp.shift();
    
    // Update humidity (60-70%)
    const lastHumidity = graphData.humidity[graphData.humidity.length - 1].value;
    graphData.humidity.push({
        time: now,
        value: Math.max(55, Math.min(75, lastHumidity + (Math.random() - 0.5) * 2))
    });
    if (graphData.humidity.length > 50) graphData.humidity.shift();
    
    // Update NPK
    const lastN = graphData.npk.n[graphData.npk.n.length - 1].value;
    graphData.npk.n.push({
        time: now,
        value: Math.max(55, Math.min(70, lastN + (Math.random() - 0.5) * 1))
    });
    if (graphData.npk.n.length > 50) graphData.npk.n.shift();
    
    const lastP = graphData.npk.p[graphData.npk.p.length - 1].value;
    graphData.npk.p.push({
        time: now,
        value: Math.max(30, Math.min(45, lastP + (Math.random() - 0.5) * 1))
    });
    if (graphData.npk.p.length > 50) graphData.npk.p.shift();
    
    const lastK = graphData.npk.k[graphData.npk.k.length - 1].value;
    graphData.npk.k.push({
        time: now,
        value: Math.max(45, Math.min(60, lastK + (Math.random() - 0.5) * 1))
    });
    if (graphData.npk.k.length > 50) graphData.npk.k.shift();
    
    // Update PAR Light (400-450)
    const lastPar = graphData.par[graphData.par.length - 1].value;
    graphData.par.push({
        time: now,
        value: Math.max(380, Math.min(480, lastPar + (Math.random() - 0.5) * 10))
    });
    if (graphData.par.length > 50) graphData.par.shift();
}

// Update current values display
function updateCurrentValues() {
    if (graphData.moisture.length > 0) {
        document.getElementById('moistureValue').textContent = 
            graphData.moisture[graphData.moisture.length - 1].value.toFixed(1) + '%';
    }
    if (graphData.temp.length > 0) {
        document.getElementById('tempValue').textContent = 
            graphData.temp[graphData.temp.length - 1].value.toFixed(1) + '°C';
    }
    if (graphData.humidity.length > 0) {
        document.getElementById('humidityValue').textContent = 
            graphData.humidity[graphData.humidity.length - 1].value.toFixed(1) + '%';
    }
    if (graphData.npk.n.length > 0) {
        const n = Math.round(graphData.npk.n[graphData.npk.n.length - 1].value);
        const p = Math.round(graphData.npk.p[graphData.npk.p.length - 1].value);
        const k = Math.round(graphData.npk.k[graphData.npk.k.length - 1].value);
        document.getElementById('npkValue').textContent = `${n}/${p}/${k}`;
    }
    if (graphData.par.length > 0) {
        document.getElementById('parValue').textContent = 
            Math.round(graphData.par[graphData.par.length - 1].value) + ' µmol/m²/s';
    }
}

// Draw all graphs
function drawAllGraphs() {
    drawGraph('moistureChart', graphData.moisture, graphConfigs.moisture);
    drawGraph('tempChart', graphData.temp, graphConfigs.temp);
    drawGraph('humidityChart', graphData.humidity, graphConfigs.humidity);
    // Draw NPK graph (multi-line)
    const npkCanvas = document.getElementById('npkChart');
    if (npkCanvas) {
        const ctx = npkCanvas.getContext('2d');
        const width = npkCanvas.width = npkCanvas.offsetWidth;
        const height = npkCanvas.height = npkCanvas.offsetHeight;
        
        ctx.clearRect(0, 0, width, height);
        
        const padding = { top: 20, right: 20, bottom: 30, left: 40 };
        const graphWidth = width - padding.left - padding.right;
        const graphHeight = height - padding.top - padding.bottom;
        
        // Draw grid
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (graphHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
        }
        for (let i = 0; i <= 5; i++) {
            const x = padding.left + (graphWidth / 5) * i;
            ctx.beginPath();
            ctx.moveTo(x, padding.top);
            ctx.lineTo(x, height - padding.bottom);
            ctx.stroke();
        }
        
        if (graphData.npk.n.length > 0) {
            const allValues = [...graphData.npk.n.map(d => d.value), 
                              ...graphData.npk.p.map(d => d.value), 
                              ...graphData.npk.k.map(d => d.value)];
            const minVal = Math.min(...allValues);
            const maxVal = Math.max(...allValues);
            const range = maxVal - minVal;
            const adjustedMin = Math.max(0, minVal - range * 0.1);
            const adjustedMax = maxVal + range * 0.1;
            
            const colors = ['#4CAF50', '#FF9800', '#9C27B0'];
            const datasets = [
                { data: graphData.npk.n, label: 'N' },
                { data: graphData.npk.p, label: 'P' },
                { data: graphData.npk.k, label: 'K' }
            ];
            
            datasets.forEach((dataset, idx) => {
                ctx.strokeStyle = colors[idx];
                ctx.lineWidth = 2;
                ctx.beginPath();
                
                dataset.data.forEach((point, index) => {
                    const x = padding.left + (graphWidth / (dataset.data.length - 1)) * index;
                    const y = padding.top + graphHeight - ((point.value - adjustedMin) / (adjustedMax - adjustedMin)) * graphHeight;
                    
                    if (index === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                });
                
                ctx.stroke();
                
                ctx.fillStyle = colors[idx];
                dataset.data.forEach((point, index) => {
                    const x = padding.left + (graphWidth / (dataset.data.length - 1)) * index;
                    const y = padding.top + graphHeight - ((point.value - adjustedMin) / (adjustedMax - adjustedMin)) * graphHeight;
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fill();
                });
            });
            
            // Draw Y-axis labels
            ctx.fillStyle = '#666';
            ctx.font = '10px Inter';
            ctx.textAlign = 'right';
            for (let i = 0; i <= 5; i++) {
                const value = adjustedMin + (adjustedMax - adjustedMin) * (1 - i / 5);
                const y = padding.top + (graphHeight / 5) * i;
                ctx.fillText(value.toFixed(0), padding.left - 10, y + 3);
            }
            
            // Draw X-axis time labels
            ctx.textAlign = 'center';
            const labelCount = 5;
            for (let i = 0; i < labelCount; i++) {
                const index = Math.floor((graphData.npk.n.length - 1) * (i / (labelCount - 1)));
                const x = padding.left + (graphWidth / (graphData.npk.n.length - 1)) * index;
                const time = new Date(graphData.npk.n[index].time);
                const timeStr = time.getHours() + ':' + String(time.getMinutes()).padStart(2, '0');
                ctx.fillText(timeStr, x, height - padding.bottom + 15);
            }
        }
    }
    drawGraph('parChart', graphData.par, graphConfigs.par);
}

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
    // Initialize graph data
    initializeGraphData();
    
    // Draw initial graphs
    drawAllGraphs();
    updateCurrentValues();
    
    // Update graphs every 2 seconds
    setInterval(() => {
        updateGraphData();
        drawAllGraphs();
        updateCurrentValues();
    }, 2000);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        drawAllGraphs();
    });
    
    // Tab switching
    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
        });
    });
    
    // Time selection switching
    document.querySelectorAll(".time-btn").forEach(time => {
        time.addEventListener("click", () => {
            document.querySelectorAll(".time-btn").forEach(t => t.classList.remove("active"));
            time.classList.add("active");
            // You can adjust data range based on selection here
        });
    });
});

// Navigation to other pages
function navigate(page) {
    window.location.href = page;
}




