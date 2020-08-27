export default function formPost(action, params) {
  var FormElement = document.createElement('form');
  document.body.appendChild(FormElement);
  FormElement.method = 'post';
  FormElement.action = action;
  FormElement.target = '_blank';
  Object.keys(params).forEach(key => {
    const fieldElement = document.createElement('input');
    fieldElement.setAttribute('name', key);
    fieldElement.setAttribute('type', 'hidden');
    fieldElement.setAttribute('value', params[key]);
    FormElement.appendChild(fieldElement);
  })
  FormElement.submit();
  document.body.removeChild(FormElement);
}