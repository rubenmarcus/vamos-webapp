interface String {
  snakeToCamel(): string;
  firstLetterUpperCase(): string;
  firstLetterLowercase(): string;
}

String.prototype.snakeToCamel = function(this: string) {
  const str = this;
  return str.replace(/_\w/g, function(m) {
    return m[1].toUpperCase();
  });
};


String.prototype.firstLetterUpperCase = function(this: string) {
  const str = this;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

String.prototype.firstLetterLowercase = function(this: string) {
  const str = this;
  return str.charAt(0).toLowerCase() + str.slice(1);
};


