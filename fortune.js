// 运势计算核心逻辑
function calculateFortune(name, birthdate) {
    // 将生日转换为数字
    const birthdateObj = new Date(birthdate);
    const year = birthdateObj.getFullYear();
    const month = birthdateObj.getMonth() + 1;
    const day = birthdateObj.getDate();
    
    // 计算生命数字（简化的紫微斗数计算）
    const lifeNumber = calculateLifeNumber(year, month, day);
    
    // 计算姓名数理（简化的易经算法）
    const nameNumber = calculateNameNumber(name);
    
    // 结合当前时间计算运势
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    
    // 计算综合运势分数（0-100）
    const score = calculateScore(lifeNumber, nameNumber, currentYear, currentMonth, currentDay);
    
    // 确定运势等级
    const level = determineLevel(score);
    
    // 生成运势详情
    return generateFortuneDetails(score, level, lifeNumber, nameNumber);
}

// 计算生命数字
function calculateLifeNumber(year, month, day) {
    const sum = year + month + day;
    return sum % 9 || 9; // 1-9的生命数字
}

// 计算姓名数理
function calculateNameNumber(name) {
    let total = 0;
    for (let i = 0; i < name.length; i++) {
        total += name.charCodeAt(i);
    }
    return total % 9 || 9;
}

// 计算综合分数
function calculateScore(lifeNumber, nameNumber, currentYear, currentMonth, currentDay) {
    const baseScore = ((lifeNumber * 11 + nameNumber * 7) % 20) + 60; // 基础分60-80
    const timeInfluence = (currentYear % 10 + currentMonth + currentDay) % 20; // 时间影响0-20
    return baseScore + timeInfluence;
}

// 确定运势等级
function determineLevel(score) {
    if (score >= 90) return "大吉";
    if (score >= 80) return "吉";
    if (score >= 70) return "小吉";
    if (score >= 60) return "平";
    if (score >= 50) return "小凶";
    return "凶";
}

// 生成运势详情
function generateFortuneDetails(score, level, lifeNumber, nameNumber) {
    const details = {
        score: score,
        level: level,
        summary: `您的运势评级为「${level}」，综合分数为${score}分。`,
        analysis: {
            lifeNumber: `您的生命数字为${lifeNumber}，显示您具有${getLifeNumberTraits(lifeNumber)}的特质。`,
            nameNumber: `您的姓名数理为${nameNumber}，暗示您在事业上${getNameNumberTraits(nameNumber)}。`
        },
        recommendations: generateRecommendations(level),
        lucky: generateLuckyItems(score),
        unlucky: generateUnluckyItems(score)
    };
    
    return details;
}

// 获取生命数字特质
function getLifeNumberTraits(number) {
    const traits = {
        1: "领导力和独立性",
        2: "合作与和谐",
        3: "创造力和表达力",
        4: "稳重和务实",
        5: "适应力和自由",
        6: "责任心和关怀",
        7: "智慧和洞察力",
        8: "权威和物质成就",
        9: "博爱和奉献精神"
    };
    return traits[number];
}

// 获取姓名数理特质
function getNameNumberTraits(number) {
    const traits = {
        1: "适合独立创业",
        2: "善于团队合作",
        3: "具有艺术天赋",
        4: "擅长技术工作",
        5: "适合销售或传媒",
        6: "适合服务行业",
        7: "适合研究工作",
        8: "适合金融管理",
        9: "适合公益事业"
    };
    return traits[number];
}

// 生成建议
function generateRecommendations(level) {
    const recommendations = {
        "大吉": [
            "可以大胆推进重要计划",
            "适合开展新的事业",
            "是投资理财的有利时机",
            "人际关系将有显著提升"
        ],
        "吉": [
            "适合稳步推进既定计划",
            "可以考虑适度投资",
            "注意把握人际交往机会",
            "适合学习新技能"
        ],
        "小吉": [
            "维持现状为宜",
            "小心谨慎推进计划",
            "适合巩固既有成果",
            "注意身心健康调养"
        ],
        "平": [
            "以稳为主，避免冒险",
            "做好风险防范",
            "适当调整节奏",
            "保持良好心态"
        ],
        "小凶": [
            "谨慎行事，避免冒险",
            "推迟重要决定",
            "注意人际关系处理",
            "加强健康防护"
        ],
        "凶": [
            "暂缓重要决策",
            "避免投资理财",
            "注意安全防护",
            "保持低调行事"
        ]
    };
    return recommendations[level];
}

// 生成吉利事项
function generateLuckyItems(score) {
    const items = [
        "谈判签约", "投资理财",
        "出行旅游", "求职应聘",
        "开展业务", "学习进修",
        "人际交往", "装修搬家",
        "婚恋交友", "健康养生"
    ];
    
    // 根据分数选择2-4个吉利事项
    const count = Math.floor(score / 30) + 1;
    const selected = [];
    for (let i = 0; i < count; i++) {
        const index = (score + i) % items.length;
        selected.push(items[index]);
    }
    return selected;
}

// 生成忌讳事项
function generateUnluckyItems(score) {
    const items = [
        "重大投资", "争执冲突",
        "冒险活动", "大额支出",
        "重要决策", "远途旅行",
        "医疗手术", "搬家装修",
        "签订合同", "改变现状"
    ];
    
    // 根据分数选择2-3个忌讳事项
    const count = Math.floor((100 - score) / 30) + 1;
    const selected = [];
    for (let i = 0; i < count; i++) {
        const index = ((100 - score) + i) % items.length;
        selected.push(items[index]);
    }
    return selected;
}

// 当页面加载完成时添加表单提交事件监听
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fortuneForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const birthdate = document.getElementById('birthdate').value;
            
            const fortune = calculateFortune(name, birthdate);
            
            // 创建结果展示的模态框
            showFortuneResult(fortune);
        });
    }
});

// 展示运势结果
function showFortuneResult(fortune) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const content = document.createElement('div');
    content.className = 'bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-90vh overflow-y-auto';
    
    content.innerHTML = `
        <h2 class="text-2xl font-bold mb-6 text-center">运势分析报告</h2>
        <div class="space-y-6">
            <div class="text-center">
                <div class="text-4xl font-bold text-purple-800 mb-2">${fortune.level}</div>
                <div class="text-xl">综合分数：${fortune.score}分</div>
            </div>
            
            <div class="border-t pt-4">
                <h3 class="font-bold mb-2">命理分析</h3>
                <p class="text-gray-600">${fortune.analysis.lifeNumber}</p>
                <p class="text-gray-600 mt-2">${fortune.analysis.nameNumber}</p>
            </div>
            
            <div class="border-t pt-4">
                <h3 class="font-bold mb-2">吉利事项</h3>
                <ul class="list-disc list-inside text-gray-600">
                    ${fortune.lucky.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="border-t pt-4">
                <h3 class="font-bold mb-2">忌讳事项</h3>
                <ul class="list-disc list-inside text-gray-600">
                    ${fortune.unlucky.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="border-t pt-4">
                <h3 class="font-bold mb-2">运势建议</h3>
                <ul class="list-disc list-inside text-gray-600">
                    ${fortune.recommendations.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="mt-8 text-center">
            <button class="bg-purple-800 text-white px-6 py-2 rounded-lg hover:bg-purple-700" onclick="this.closest('.fixed').remove()">
                关闭
            </button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
}