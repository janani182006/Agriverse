// Sikkim-specific crop recommendations database
const sikkimRecommendations = {
    // Low altitude (0-1000m)
    low: {
        seasons: {
            spring: {
                crops: ['Rice', 'Maize', 'Vegetables (Tomato, Cabbage, Cauliflower)', 'Pulses'],
                timing: 'March to May - Best for early season crops. Start sowing in late February for vegetables.',
                tips: 'Ensure proper irrigation as spring can be dry. Use organic compost for better yield.'
            },
            summer: {
                crops: ['Rice', 'Maize', 'Cucumber', 'Okra', 'Bottle Gourd'],
                timing: 'June to August - Monsoon season. Ideal for paddy cultivation. Start nursery in May.',
                tips: 'Monitor waterlogging. Use raised beds for vegetables. Protect from heavy rains.'
            },
            autumn: {
                crops: ['Wheat', 'Mustard', 'Potato', 'Radish', 'Carrot'],
                timing: 'September to November - Post-monsoon period. Best for rabi crops.',
                tips: 'Soil should be well-drained. Apply organic fertilizers before sowing.'
            },
            winter: {
                crops: ['Wheat', 'Barley', 'Mustard', 'Peas', 'Spinach', 'Cabbage'],
                timing: 'December to February - Cool season. Start sowing in November for winter crops.',
                tips: 'Protect from frost. Use mulching to retain soil moisture and temperature.'
            }
        }
    },
    // Medium altitude (1000-2000m)
    medium: {
        seasons: {
            spring: {
                crops: ['Potato', 'Maize', 'Vegetables (Cabbage, Cauliflower, Broccoli)', 'Beans'],
                timing: 'March to May - Moderate temperature. Ideal for temperate vegetables.',
                tips: 'Use terrace farming techniques. Ensure good drainage. Start early for better yield.'
            },
            summer: {
                crops: ['Maize', 'Potato', 'Tomato', 'Capsicum', 'Cabbage'],
                timing: 'June to August - Rainy season. Good for maize and vegetables.',
                tips: 'Protect from excessive rain. Use organic mulching. Monitor for pests.'
            },
            autumn: {
                crops: ['Wheat', 'Barley', 'Mustard', 'Potato', 'Carrot', 'Radish'],
                timing: 'September to November - Cool and dry. Perfect for rabi crops.',
                tips: 'Prepare soil well. Use organic manure. Ensure proper spacing.'
            },
            winter: {
                crops: ['Wheat', 'Barley', 'Mustard', 'Peas', 'Lettuce', 'Spinach'],
                timing: 'December to February - Cold season. Start in late October.',
                tips: 'Protect from heavy frost. Use greenhouses for sensitive crops. Maintain soil moisture.'
            }
        }
    },
    // High altitude (2000m+)
    high: {
        seasons: {
            spring: {
                crops: ['Potato', 'Barley', 'Buckwheat', 'Vegetables (Cabbage, Radish)', 'Beans'],
                timing: 'March to May - Short growing season. Start as soon as snow melts.',
                tips: 'Use cold-resistant varieties. Short duration crops work best. Protect from late frost.'
            },
            summer: {
                crops: ['Potato', 'Barley', 'Buckwheat', 'Cabbage', 'Radish', 'Turnip'],
                timing: 'June to August - Main growing season at high altitude.',
                tips: 'Use organic fertilizers. Ensure good drainage. Monitor temperature fluctuations.'
            },
            autumn: {
                crops: ['Barley', 'Buckwheat', 'Potato (early varieties)', 'Radish', 'Turnip'],
                timing: 'September to October - Short window before winter. Harvest early.',
                tips: 'Choose early-maturing varieties. Prepare for early winter. Store crops properly.'
            },
            winter: {
                crops: ['Protected cultivation only', 'Greenhouse vegetables'],
                timing: 'November to February - Too cold for outdoor farming.',
                tips: 'Use greenhouses or polyhouses. Focus on storage of harvested crops. Plan for next season.'
            }
        }
    }
};

// Soil type specific tips
const soilTips = {
    'Loamy': 'Best soil type for most crops. Good drainage and water retention. Ideal for vegetables and grains.',
    'Clay': 'Retains water well but may need drainage improvement. Good for rice and paddy. Add organic matter.',
    'Sandy': 'Fast drainage, needs frequent irrigation. Good for root vegetables. Add compost regularly.',
    'Sandy Loam': 'Excellent for most crops. Balanced drainage and retention. Ideal for vegetables.',
    'Clay Loam': 'Good water retention. Suitable for rice, wheat, and vegetables. May need organic amendments.',
    'Red Soil': 'Rich in iron, good for pulses and oilseeds. May need pH adjustment. Add organic matter.'
};

// Region specific information
const regionInfo = {
    'East Sikkim': {
        description: 'Moderate climate, suitable for diverse crops',
        specialCrops: ['Cardamom', 'Ginger', 'Turmeric', 'Oranges']
    },
    'West Sikkim': {
        description: 'Varied altitude, good for temperate crops',
        specialCrops: ['Potato', 'Ginger', 'Cardamom', 'Oranges']
    },
    'North Sikkim': {
        description: 'High altitude, cold climate, limited growing season',
        specialCrops: ['Potato', 'Barley', 'Buckwheat', 'Apples']
    },
    'South Sikkim': {
        description: 'Moderate to high altitude, good for mixed farming',
        specialCrops: ['Cardamom', 'Ginger', 'Potato', 'Vegetables']
    }
};

// Get current season based on month
function getCurrentSeason() {
    const month = new Date().getMonth() + 1; // 1-12
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
}

// Get altitude category
function getAltitudeCategory(altitude) {
    if (altitude < 1000) return 'low';
    if (altitude < 2000) return 'medium';
    return 'high';
}

// Get recommendations based on inputs
function getRecommendations(region, altitude, soilType) {
    const altitudeCat = getAltitudeCategory(altitude);
    const season = getCurrentSeason();
    const recommendations = sikkimRecommendations[altitudeCat].seasons[season];
    const regionData = regionInfo[region];
    
    return {
        season: season.charAt(0).toUpperCase() + season.slice(1),
        seasonInfo: recommendations,
        regionData: regionData,
        soilTip: soilTips[soilType] || 'Use organic fertilizers and maintain proper soil health.',
        altitudeCategory: altitudeCat
    };
}

// Format recommendations for display
function displayRecommendations(data) {
    const { season, seasonInfo, regionData, soilTip, altitudeCategory } = data;
    
    // Season information
    document.getElementById('seasonInfo').textContent = 
        `${season} season (${altitudeCategory} altitude zone) - ${regionData.description}`;
    
    // Crops
    const cropsContainer = document.getElementById('cropsInfo');
    cropsContainer.innerHTML = '';
    
    // Main recommended crops
    seasonInfo.crops.forEach(crop => {
        const badge = document.createElement('span');
        badge.className = 'crop-badge';
        badge.textContent = crop;
        cropsContainer.appendChild(badge);
    });
    
    // Add special crops for the region
    if (regionData.specialCrops) {
        regionData.specialCrops.forEach(crop => {
            if (!seasonInfo.crops.some(c => c.includes(crop))) {
                const badge = document.createElement('span');
                badge.className = 'crop-badge';
                badge.textContent = crop;
                badge.style.background = '#fff3cd';
                badge.style.color = '#856404';
                cropsContainer.appendChild(badge);
            }
        });
    }
    
    // Timing
    document.getElementById('timingInfo').textContent = seasonInfo.timing;
    
    // Tips
    const tips = [
        seasonInfo.tips,
        `Soil: ${soilTip}`,
        `Region: ${regionData.description}. Consider growing ${regionData.specialCrops.join(', ')} as specialty crops.`
    ].join('\n\n');
    document.getElementById('tipsInfo').textContent = tips;
    
    // Show recommendations section
    document.getElementById('recommendations').style.display = 'block';
    
    // Smooth scroll to recommendations
    document.getElementById('recommendations').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('advisoryForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const region = document.getElementById('region').value;
        const altitude = parseInt(document.getElementById('altitude').value);
        const soilType = document.getElementById('soilType').value;
        
        if (!region || !altitude || !soilType) {
            alert('Please fill in all fields');
            return;
        }
        
        if (altitude < 0 || altitude > 5000) {
            alert('Please enter a valid altitude (0-5000 meters)');
            return;
        }
        
        const recommendations = getRecommendations(region, altitude, soilType);
        displayRecommendations(recommendations);
    });
    
    // Navigation function
    window.navigate = function(page) {
        window.location.href = page;
    };
});

