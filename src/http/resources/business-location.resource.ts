import Resource from "frexp/lib/Resource";

export default class BusinessLocationResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      provinceId: +this.provinceId,
      provinceName: this.province.name,
      regencyId: +this.regencyId,
      regencyName: this.regency.name,
      districtId: +this.districtId,
      districtName: this.district.name,
      address: this.address
    };
  }
}
