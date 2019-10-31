export default function createElementWrapper(elementName = 'div', attributes = {}, props={}, parentElement = null){
  const ELEMENT = document.createElement(elementName);
  for (let attribute in attributes) {
    ELEMENT[attribute] = attributes[attribute];
  }
  ELEMENT.props = props;
  if(this || parentElement){
    (this || parentElement).appendChild(ELEMENT);
  }
  return ELEMENT;
}