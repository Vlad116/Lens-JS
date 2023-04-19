export class Lens {
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
  //в метрах
  getFocalLength() {
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
  //в диоптриях
  getOpticalPower() {
    return 1 / this.getFocalLength();
  }
  //в метрах
  getImageScale(distanceToObj: number) {
    const s2 = this.getFocalLength() / (distanceToObj - this.getFocalLength());
    return s2;
  }
  //в диоптриях
  getCombinedOpticalPower(lenses: any) {
    let totalOpticalPower = lenses[0].opticalPower;
    for (let i = 0; i < lenses.length; i++) {
      const lens = lenses[i];
      const rangeToPreviousLens = lens.rangeToPreviousLens;
      const opticalPower = lens.opticalPower;
      if (i != 0) {
        if (rangeToPreviousLens == 0) {
          totalOpticalPower += opticalPower;
        } else {
          totalOpticalPower =
            totalOpticalPower * opticalPower -
            rangeToPreviousLens * totalOpticalPower * opticalPower;
        }
      }
    }
    return totalOpticalPower;
  }
}
