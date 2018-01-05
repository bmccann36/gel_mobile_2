

export default class imageInfo {
  constructor(dataObj) {
    this.rawData = dataObj
    this.highlights = []
    this.midtones = []
    this.shadows = []
    this.groupByShade(dataObj)
  }


  groupByShade(imageData) {
    const dataLength = Object.keys(imageData).length
    const ignore = []
    for (let i = 0; i < dataLength; i += 4) {
      const red = imageData[i]
      const green = imageData[i + 1]
      const blue = imageData[i + 2]
      const brightness = red + blue + green
      if (brightness < 150 || brightness > 755) {
        ignore.push(red, green, blue)
        continue;
      }
      else if (brightness < 255) {
        this.shadows.push(red, green, blue)
      }
      else if (brightness < 510) {
        this.midtones.push(red, green, blue)
      }
      else if (brightness < 755) {
        this.highlights.push(red, green, blue)
      }
    }
  }


  getTintsByShade(shade) {
   const imageData = this[shade]
    let tints = {
      red: [],
      green: [],
      blue: [],
    }
    for (let i = 0; i < imageData.length; i += 3) {
      const red = imageData[i]
      const green = imageData[i + 1]
      const blue = imageData[i + 2]
      const average = (red + green + blue) / 3
      tints.red.push(red - average)
      tints.green.push(green - average)
      tints.blue.push(blue - average)
    }

    const sumRed = tints.red.reduce((a, b) => a + b)
    tints.red = Math.round((sumRed / (imageData.length / 3)))
    const sumGreen = tints.green.reduce((a, b) => a + b)
    tints.green = Math.round((sumGreen / (imageData.length / 3)))
    const sumBlue = tints.blue.reduce((a, b) => a + b)
    tints.blue = Math.round((sumBlue / (imageData.length / 3)))
    return tints
  }
}
