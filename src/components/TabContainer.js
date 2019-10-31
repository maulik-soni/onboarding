import createElementWrapper from '../wrappers/createElementWrapper';
import removeElementWrapper from '../wrappers/removeElementWrapper';

import './PatientDetails';
import './PaymentOptions';
import './ReviewContainer';
import './SymptomsContainer';

class TabContiner extends HTMLElement {
  constructor(){
    super();
  }

  connectedCallback(){
    document.querySelectorAll('.stepper-tab').forEach((ele)=>{
      ele.addEventListener('click', (e)=>{
        const activeTabNumber = e.target.getAttribute("data-attribute");

        document.querySelectorAll('.stepper-tab').forEach((element)=>{
          if(element.getAttribute("data-attribute") == activeTabNumber){
            element.classList.add("active");
            element.classList.remove("hidden");
          }else{
            element.classList.remove("active");
            element.classList.add("hidden");
          }
        })
        
        document.querySelectorAll('.tab-container').forEach((element)=>{
          if(element.getAttribute("data-attribute") === `${activeTabNumber}`){
            element.classList.add("active");
            element.classList.remove("hidden");

            !document.querySelector('review-container') 
              && createElementWrapper.call(null, 'review-container', {}, {}, document.querySelector('#step-4'));
          }else{
            element.classList.remove("active");
            element.classList.add("hidden");

            document.querySelector('review-container') 
              && removeElementWrapper(document.querySelector('review-container'));
          }
        })
      });
    })

    createElementWrapper.call(null, 'patient-details', {}, {}, document.querySelector('#step-1'));
    createElementWrapper.call(null, 'symptoms-container', {}, {}, document.querySelector('#step-2'));
    createElementWrapper.call(null, 'payment-options', {}, {}, document.querySelector('#step-3'));
  }

  set props(props) {
    const {tabs} = props;
    let tabNumbers = '';
    let tabContainers = '';

    for(let i=0; i<tabs; i++){
      tabNumbers += `
        <div class="stepwizard-step" id='step-container-${i+1}'>
          <button 
            type="button" 
            class="btn btn-primary btn-lg btn-circle stepper-tab ${i+1===1 ? 'active' : 'hidden'}"
            data-attribute='${i+1}'
            id='step-btn-${i+1}'
            ${!(i+1===1) && 'disabled'}
          >
            ${i+1}
          </button>
          <p>Step ${i+1}</p>
        </div>
      `;

      tabContainers += `
      <div class="row setup-content tab-container ${i+1===1 ? 'active' : 'hidden'}" data-attribute="${i+1}">
        <div class="col-xs-6 col-md-offset-3" id='step-${i+1}'>
        </div>
      </div>
      `;
    }

    this.innerHTML = `
      <div class="stepwizard col-md-offset-3">
        <div class="stepwizard-row setup-panel">
          ${tabNumbers}
        </div>
      </div>
      ${tabContainers}
    `;
  }
}

customElements.define('tab-container', TabContiner);