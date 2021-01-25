import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    };
    // generate shades - set as empty array initially
    for (let level of levels) {
        newPalette.colors[level] = [];
    }
    // loop through colors in passed in palette
    for (let color of starterPalette.colors) {
        // get 10 shades, getScale returns dark to light so you must reverse to match levels [50, 100, ....900]
        let scale = getScale(color.color, 10).reverse();
        // for each shade... add to new palette
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                // remove spaces if present - will be used for routes later
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i],
                // chroma function to convert hex to rgb
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)')
            })
        }
    }
    return newPalette;
}

// darkened but not completely black... else too dark
// generates array with 3 color values. dark - middle - light
function getRange(hexColor) {
    const end = "#fff";
    return [
        chroma(hexColor)
            .darken(1.4)
            .hex(),
        hexColor,
        end
    ]
}

function getScale(hexColor, numberOfColors) {
    // mode lab makes color gradient better - no grayish colors
    return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePalette, getScale, levels };