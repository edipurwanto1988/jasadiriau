import Resource from "frexp/lib/Resource";

export default class ValidationResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      operatorId: +this.operatorId || null,
      operatorName: this.operatorName,
      targetType: this.targetType,
      targetId: +this.targetId,
      action: this.action,
      note: this.note,
      validatedAt: this.validatedAt,
      createdAt: this.createdAt,
    };
  }
}
