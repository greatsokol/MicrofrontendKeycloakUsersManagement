export class SharedValuesService {
  private values: Map<string, any> = new Map();

  public setValue(key: string, value: any) {
    this.values.set(key, value);
  }

  public getValue(key: string): any {
    return this.values.get(key);
  }
}
