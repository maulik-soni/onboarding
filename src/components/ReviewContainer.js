class ReviewContainer extends HTMLElement {
  constructor(){
    super();
  }

  connectedCallback(){
    const init=()=>{

      document.querySelector('#edit-presonal-details').addEventListener('click', ()=>{
        const nextStep = document.querySelector('#step-btn-1');
        nextStep.click();
      })

      document.querySelector('#edit-disease-symptoms').addEventListener('click', ()=>{
        const nextStep = document.querySelector('#step-btn-2');
        nextStep.click();
      })

      document.querySelector('#edit-payment-options').addEventListener('click', ()=>{
        const nextStep = document.querySelector('#step-btn-3');
        nextStep.click();
      })
    }

    const patientDetailsData = window.sessionStorage.getItem('patientDetailsData')
                                 ? JSON.parse(window.sessionStorage.getItem('patientDetailsData')) : {} ;

    const patientSymptomsData = window.sessionStorage.getItem('patientSymptomsData') 
                                  ? JSON.parse(window.sessionStorage.getItem('patientSymptomsData')) : {};

    const paymentOptionsData = window.sessionStorage.getItem('paymentOptionsData') 
                                  ? JSON.parse(window.sessionStorage.getItem('paymentOptionsData')) : {};

    const pesonalDetailsTplt=`
      <div class="jumbotron col-md-12">
        <h3>
          Personal details 
          <button 
            id='edit-presonal-details' 
            class="btn btn-sm btn-primary"
          >
            &#9998; Edit
          </button>
        </h3>

        ${!!patientDetailsData.fullName ? `<div>
          <label class="font-weight-bold">Name: </label>
          <span class="font-weight-light">${patientDetailsData.fullName}</span>
        </div>`:``}

        ${!!patientDetailsData.address ? `<div>
          <label class="font-weight-bold">Address: </label>
          <span class="font-weight-light">${patientDetailsData.address}</span>
        </div>`:``}

        ${!!patientDetailsData.email ? `<div>
          <label class="font-weight-bold">Email: </label>
          <span class="font-weight-light">${patientDetailsData.email}</span>
        </div>`:``}

        ${!!patientDetailsData.mobile ? `<div>
          <label class="font-weight-bold">Mobile: </label>
          <span class="font-weight-light">${patientDetailsData.mobile}</span>
        </div>`:``}

        ${!!patientDetailsData.gender ? `<div>
          <label class="font-weight-bold">Gender: </label>
          <span class="font-weight-light">${patientDetailsData.gender}</span>
        </div>`:``}

        ${!!patientDetailsData.age ? `<div>
          <label class="font-weight-bold">Age: </label>
          <span class="font-weight-light">${patientDetailsData.age}</span>
        </div>`:``}
        </div>
    `;

    const patientSymptomsTplt=`
      <div class="jumbotron col-md-12">
        <h3>
          Disease Symptoms 
          <button 
            id='edit-disease-symptoms' 
            class="btn btn-sm btn-primary"
          >
            &#9998; Edit
          </button>
        </h3>

        ${!!patientSymptomsData.unhealthyDays ? `<div>
          <label class="font-weight-bold">Not well since: </label>
          <span class="font-weight-light">${patientSymptomsData.unhealthyDays} Days</span>
        </div>`:``}

        ${!!patientSymptomsData.symptoms ? `<div>
          <label class="font-weight-bold">Symptoms: </label>
          <span class="font-weight-light text-capitalize">
            ${patientSymptomsData.symptoms.length>1 ? patientSymptomsData.symptoms.join(', ') : patientSymptomsData.symptoms[0]}
            ${patientSymptomsData.customSymptoms ? `, ${patientSymptomsData.customSymptoms}` : ``}
          </span>
        </div>`:``}
      </div>
    `;

    const paymentOptionsTplt=`
      <div class="jumbotron col-md-12">
        <h3>
          Slot & Payment Selection
          <button 
            id='edit-payment-options' 
            class="btn btn-sm btn-primary"
          >
            &#9998; Edit
          </button>
        </h3>

        ${!!paymentOptionsData.callVisitDate ? `<div>
          <label class="font-weight-bold">Date for Call/Visit: </label>
          <span class="font-weight-light">${paymentOptionsData.callVisitDate}</span>
        </div>`:``}

        ${!!paymentOptionsData.paymentOption ? `<div>
          <label class="font-weight-bold">Payment Option: </label>
          <span class="font-weight-light text-capitalize">By ${paymentOptionsData.paymentOption}</span>
        </div>`:``}
      </div>
    `;
    this.innerHTML=`${pesonalDetailsTplt}${patientSymptomsTplt}${paymentOptionsTplt}`;
    init();
  }
}

customElements.define('review-container', ReviewContainer);