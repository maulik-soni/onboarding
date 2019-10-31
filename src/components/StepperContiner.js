import createElementWrapper from './../wrappers/createElementWrapper';
import './TabContainer';

class StepperContiner extends HTMLElement {
  connectedCallback(){
    this.innerHTML=`
      <div class='container'>
        <div id='patient-data-input-form'/>
      </div>
    `;

    const formContainer = document.getElementById('patient-data-input-form');
    const props = {tabs: 4};
    createElementWrapper.call(null, 'tab-container', {}, props, formContainer);
  }
}
customElements.define('stepper-container', StepperContiner);