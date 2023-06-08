import { LensCalculator } from "./LensCalculator";

//оптическая сила измеряется в диоптриях, расстояние считается в метрах
const firstTestLens = new LensCalculator(1.5, 1, 0.03, 0.1, 0.1);
const secondTestLens = new LensCalculator(1.5, 1, 0.04, 0.25, 0.25);
const thirdTestLens = new LensCalculator(1.5, 1, 0.05, 0.15, 0.15);
console.log(
  `Фокусное расстояние первой линзы: ${firstTestLens.getFocalLength()} м`
);
console.log(
  `Фокусное расстояние второй линзы: ${secondTestLens.getFocalLength()} м`
);
console.log(
  `Фокусное расстояние третьей линзы: ${thirdTestLens.getFocalLength()} м`
);
console.log(
  `Масштаб изображения первой линзы с расстоянием до объекта 100cм: ${firstTestLens.getImageScale(
    100
  )}`
);
console.log(
  `Оптическая сила первой линзы: ${firstTestLens.getOpticalPower()} дптр`
);
console.log(
  `Оптическая сила второй линзы: ${secondTestLens.getOpticalPower()} дптр`
);
console.log(
  `Оптическая сила третьей линзы: ${thirdTestLens.getOpticalPower()} дптр`
);
let combinedOpticalPower = firstTestLens.getCombinedOpticalPower([
  { opticalPower: firstTestLens.getOpticalPower(), rangeToPreviousLens: 0 },
  { opticalPower: secondTestLens.getOpticalPower(), rangeToPreviousLens: 0.05 },
  { opticalPower: thirdTestLens.getOpticalPower(), rangeToPreviousLens: 0 },
]);
console.log(
  `Оптическая сила комбинации трех линз равна: ${combinedOpticalPower} дптр`
);
