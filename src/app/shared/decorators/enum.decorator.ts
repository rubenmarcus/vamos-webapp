import '@clicca-webapp/shared/class/string.prototype';

export function EnumFunction(elements: Object) {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {

    for (const [value, translation] of Object.entries(elements)) {
      target[`is${value.firstLetterUpperCase()}`] = function(this: any): boolean {
        return this[`_${propertyKey}`] === value;
      };

      target[`to${value.firstLetterUpperCase()}`] = function(this: any): void {
        this[propertyKey] = value;
      };

    }

    descriptor.set = function(this: any, value: any) {
      this[`_${propertyKey}`] = value;
    };

    descriptor.get = function(this: any): string {
      return elements[this[`_${propertyKey}`]];
    };

  };
}
