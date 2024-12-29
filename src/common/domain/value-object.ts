/**
 * @description Value Objectの基底クラス
 * すべてのValue Objectはこのクラスを継承します
 */
export abstract class ValueObject<T> {
  constructor(readonly value: T) {
    this.validate(value);
  }

  /**
   * 値の検証を行う
   * @param value 検証する値
   */
  protected abstract validate(value: T): void;

  /**
   * Value Objectの等価性を比較
   * @param other 比較対象のValue Object
   */
  equals(other: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (other.constructor !== this.constructor) {
      return false;
    }
    return JSON.stringify(this.value) === JSON.stringify(other.value);
  }
}
