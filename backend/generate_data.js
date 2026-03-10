const fs = require('fs');
const path = require('path');

const generateData = () => {
    const mobiles = [];
    const computers = [];

    // Generate 50 Mobiles
    const mobileBrands = ["Samsung", "Apple", "OnePlus", "Google", "Xiaomi", "Vivo", "Oppo", "Nothing", "Motorola", "Realme"];
    for (let i = 1; i <= 50; i++) {
        const brand = mobileBrands[Math.floor(Math.random() * mobileBrands.length)];
        mobiles.push({
            id: `mob_gen_${i}`,
            product: "Mobile",
            image: `https://picsum.photos/seed/mob${i}_1/400/500`, // Primary image
            images: [
                `https://picsum.photos/seed/mob${i}_1/400/500`,
                `https://picsum.photos/seed/mob${i}_2/400/500`,
                `https://picsum.photos/seed/mob${i}_3/400/500`
            ],
            company: brand,
            model: `${brand} Ultra Series ${i}`,
            price: (Math.random() * (1500 - 300) + 300).toFixed(2),
            category: "Mobile",
            description: `The all-new ${brand} flagship with next-gen AI processing, an incredibly vibrant display, and a versatile triple camera setup.`
        });
    }

    // Generate 50 Computers
    const laptopBrands = ["Dell", "HP", "Apple", "Lenovo", "Asus", "Acer", "MSI", "Razer", "Microsoft", "Alienware"];
    for (let i = 1; i <= 50; i++) {
        const brand = laptopBrands[Math.floor(Math.random() * laptopBrands.length)];
        computers.push({
            id: `comp_gen_${i}`,
            product: "Computer",
            image: `https://picsum.photos/seed/comp${i}_1/600/400`,
            images: [
                `https://picsum.photos/seed/comp${i}_1/600/400`,
                `https://picsum.photos/seed/comp${i}_2/600/400`,
                `https://picsum.photos/seed/comp${i}_3/600/400`
            ],
            company: brand,
            model: `${brand} ProBook Gen ${i}`,
            price: (Math.random() * (3500 - 700) + 700).toFixed(2),
            category: "Computer",
            description: `A masterclass in engineering, the ${brand} laptop delivers desktop-grade performance in an ultra-portable chassis.`
        });
    }

    return { mobiles, computers };
};

const appendToFile = (filename, newData, varName) => {
    const filePath = path.join(__dirname, '../e-mart/src/stores/data', filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Find the last closing bracket of the array
    const lastBracketIndex = content.lastIndexOf(']');

    if (lastBracketIndex !== -1) {
        // Convert new data to string, strip the outer brackets [ ]
        const newDataString = JSON.stringify(newData, null, 4);
        const innerData = newDataString.substring(1, newDataString.length - 2); // get contents without outer [ and ]

        // Ensure there is a comma before we inject new items
        let preContent = content.substring(0, lastBracketIndex).trimEnd();
        if (!preContent.endsWith(',')) {
            preContent += ',\n';
        }

        const finalContent = preContent + innerData + '\n];\n';
        fs.writeFileSync(filePath, finalContent, 'utf-8');
        console.log(`Successfully appended ${newData.length} items to ${filename}`);
    }
};

const init = () => {
    const { mobiles, computers } = generateData();
    appendToFile('mobiles.js', mobiles, 'mobileData');
    appendToFile('computers.js', computers, 'computerData');
};

init();
