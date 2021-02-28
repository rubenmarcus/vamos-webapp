export function convertModelToFormData(model: any, form: FormData = null, namespace = '', remap: boolean = true): FormData {
  let formData = form || new FormData();
  let formKey;

  for (let propertyName in model) {
    if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue;
    let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
    if (model[propertyName] instanceof Date){
      formData.append(formKey, model[propertyName].toISOString());
    }else if (model[propertyName] instanceof Array) {
      model[propertyName].forEach((element, index) => {
        if(remap){
          const tempFormKey = `${formKey}[${index}]`;
          convertModelToFormData(element, formData, tempFormKey);
        } else {
          formData.append(`${formKey}[]`, element);
        }
      });
    }else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)){
      convertModelToFormData(model[propertyName], formData, formKey);
    }else{
      formData.append(formKey, model[propertyName].toString());
    }
  }
  return formData;
}
