class Lens {
    constructor(refractiveIndexOfLens, refractiveIndexOfMedium, thickness, r1, r2) {
      this.refractiveIndexOfLens = refractiveIndexOfLens;
      this.refractiveIndexOfMedium = refractiveIndexOfMedium;
      this.thickness = thickness;
      this.r1 = r1;
      this.r2 = r2;
    }
    //в метрах
    getFocalLength() {
      return (this.refractiveIndexOfLens - this.refractiveIndexOfMedium) * (1 / this.r1 - 1 / this.r2) + ((this.refractiveIndexOfLens - this.refractiveIndexOfMedium) * this.thickness) / (this.refractiveIndexOfLens * this.refractiveIndexOfMedium * this.r1 * this.r2);
    }
    //в диоптриях
    getOpticalPower() {
      return 1 / this.getFocalLength();
    }
    //в метрах
    getImageScale(distanceToObj) {
      const s2 = this.getFocalLength()/(distanceToObj - this.getFocalLength());
      return s2;
    }
    //в диоптриях
    getCombinedOpticalPower(lenses) {
        let totalOpticalPower = lenses[0].opticalPower;
        for (let i = 0; i < lenses.length; i++) {
          const lens = lenses[i];
          const rangeToPreviousLens = lens.rangeToPreviousLens;
          const opticalPower = lens.opticalPower;
          if(i!=0) {
            if(rangeToPreviousLens == 0) {
                totalOpticalPower += opticalPower;
            } else {
                totalOpticalPower = totalOpticalPower * opticalPower - rangeToPreviousLens * totalOpticalPower * opticalPower;
            }
          }
        }
        return totalOpticalPower;
      }
  }
  
//оптическая сила измеряется в диоптриях, расстояние считается в метрах
  const firstTestLens = new Lens(1.5, 1, 0.03, 0.10, 0.10);
  const secondTestLens = new Lens(1.5, 1, 0.04, 0.25, 0.25);
  const thirdTestLens = new Lens(1.5, 1, 0.05, 0.15, 0.15);
  console.log(`Фокусное расстояние первой линзы: ${firstTestLens.getFocalLength()} м`);
  console.log(`Фокусное расстояние второй линзы: ${secondTestLens.getFocalLength()} м`);
  console.log(`Фокусное расстояние третьей линзы: ${thirdTestLens.getFocalLength()} м`);
  console.log(`Масштаб изображения первой линзы с расстоянием до объекта 100cм: ${firstTestLens.getImageScale(100)}`);
  console.log(`Оптическая сила первой линзы: ${firstTestLens.getOpticalPower()} дптр`);
  console.log(`Оптическая сила второй линзы: ${secondTestLens.getOpticalPower()} дптр`);
  console.log(`Оптическая сила третьей линзы: ${thirdTestLens.getOpticalPower()} дптр`);
  let combinedOpticalPower = firstTestLens.getCombinedOpticalPower([{opticalPower: firstTestLens.getOpticalPower(), rangeToPreviousLens: 0}, {opticalPower: secondTestLens.getOpticalPower(), rangeToPreviousLens: 0.05}, {opticalPower: thirdTestLens.getOpticalPower(), rangeToPreviousLens: 0}]);
  console.log(`Оптическая сила комбинации трех линз равна: ${combinedOpticalPower} дптр`);