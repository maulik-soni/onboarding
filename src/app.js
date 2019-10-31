import './components/StepperContiner';
import createElementWrapper from './wrappers/createElementWrapper';

window.addEventListener('load', () => {
  const main = document.querySelector('main');
  createElementWrapper.call(null ,'stepper-container', {}, {}, main);
});