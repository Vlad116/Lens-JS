import { ILense } from "./types/types";

export class LensCalculator {
  refractiveIndexOfLens: number;
  refractiveIndexOfMedium: number;
  thickness: number;
  r1: number;
  r2: number;

  constructor(
    refractiveIndexOfLens: number,
    refractiveIndexOfMedium: number,
    thickness: number,
    r1: number,
    r2: number
  ) {
    this.refractiveIndexOfLens = refractiveIndexOfLens;
    this.refractiveIndexOfMedium = refractiveIndexOfMedium;
    this.thickness = thickness;
    this.r1 = r1;
    this.r2 = r2;
  }

  //в диоптриях
  getOpticalPower() {
    return (
      (this.refractiveIndexOfLens - this.refractiveIndexOfMedium) *
        (1 / this.r1 - 1 / this.r2) +
      ((this.refractiveIndexOfLens - this.refractiveIndexOfMedium) *
        this.thickness) /
        (this.refractiveIndexOfLens *
          this.refractiveIndexOfMedium *
          this.r1 *
          this.r2)
    );
  }

  //в метрах
  getFocalLength() {
    return this.refractiveIndexOfMedium / this.getOpticalPower();
  }

  //в метрах(расстояние до предмета от линзы)
  getImageScale(distanceToObj: number) {
    const s2 = this.getFocalLength() / (distanceToObj - this.getFocalLength());
    return s2;
  }

  //в диоптриях
  getCombinedOpticalPower(lenses: Array<ILense> ) {
    let totalOpticalPower = lenses[0].opticalPower;

    lenses.forEach((lense, index) => {
      const rangeToPreviousLens = lense.rangeToPreviousLens;
      const opticalPower = lense.opticalPower;
      if (index != 0) {
        if (rangeToPreviousLens == 0) {
          totalOpticalPower += opticalPower;
        } else {
          totalOpticalPower += (opticalPower - rangeToPreviousLens * totalOpticalPower * opticalPower);
        }
      }
    })

    return totalOpticalPower;
  }
}
