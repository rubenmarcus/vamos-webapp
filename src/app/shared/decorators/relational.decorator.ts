import 'reflect-metadata';

export function Relational() {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const type = Reflect.getMetadata('design:type', target, propertyKey);

    descriptor.set = function(this: any, value: any) {
      this[`_${propertyKey}`] = new type(value);
    };

    descriptor.get = function(this: any) {
      return this[`_${propertyKey}`] === undefined ? new type() : this[`_${propertyKey}`];
    };

  };
}

export function RelationalList() {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const type = Reflect.getMetadata('design:type', target, propertyKey);

    descriptor.set = function(this: any, list: Array<any>) {
      this[`_${propertyKey}`] = [];
      list.forEach((value) => {
        this[`_${propertyKey}`].push(new type(value));
      });
    };

  };
}

export function RelationalAbstract() {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const type = Reflect.getMetadata('design:type', target, propertyKey);

    descriptor.set = function(this: any, value: any) {
      if (value) {
        const current = type.getType(value.type);
        this[`_${propertyKey}`] = new current(value);
      }
    };

  };
}

