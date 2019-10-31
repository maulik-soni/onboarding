class SymptomsContainer extends HTMLElement {
  constructor(){
    super();

    this.patientSymptomsData = 
        window.sessionStorage.getItem('patientSymptomsData') 
          ? JSON.parse(window.sessionStorage.getItem('patientSymptomsData')) 
            : {};

    this.symptomsData = this.patientSymptomsData && this.patientSymptomsData.symptoms && this.patientSymptomsData.symptoms.length 
                          ? this.patientSymptomsData.symptoms 
                            : [];
  }
  
  connectedCallback(){
    const onSubmitHandler=(e)=>{
      e.preventDefault();
      const nextStep =  document.querySelector('#step-btn-3');
      nextStep.removeAttribute('disabled');
      nextStep.click();
      const {customSymptoms, unhealthyDays} = e.target.elements;
      const formData = {customSymptoms, unhealthyDays};
      for(let field in formData) {
        this.patientSymptomsData[field] = formData[field].value;
      }
      this.patientSymptomsData['symptoms'] = this.symptomsData;
      window.sessionStorage.setItem('patientSymptomsData', JSON.stringify(this.patientSymptomsData));

      const currentStep =  document.querySelector('#step-container-2');
      currentStep.classList.add("completed");
    }

    const onResetHandler=(e)=>{
      document.querySelector('#step-btn-3').setAttribute('disabled', true);
      window.sessionStorage.removeItem('patientSymptomsData');

      const currentStep =  document.querySelector('#step-container-2');
      currentStep.classList.remove("completed");
    }

    const init=()=>{
      document.querySelector('#symptoms').addEventListener('change',(e)=>{
        const multiSelect = e.target;
        this.symptomsData = [];
        for (let i = 0; i < multiSelect.options.length; i++) {
          if(multiSelect.options[i].selected === true){
            this.symptomsData.push(multiSelect.options[i].value);
          }
        }
      });

      const symptomsContainer = document.querySelector('#symptomsContainer');
      for(let field in this.patientSymptomsData) {
        if(field !== 'symptoms'){
          symptomsContainer.elements[field].value = this.patientSymptomsData[field];
        }else{
          const multiSelect = document.querySelector('#symptoms');
          for (let i = 0; i < multiSelect.length; i++) {
            if(!!~this.symptomsData.indexOf(multiSelect.options[i].value)){
              multiSelect.options[i].selected = true;
            }
          }
        }
      }

      symptomsContainer.addEventListener('keyup',function(e){
        const nextStep = document.querySelector('#step-btn-3');
        if(symptomsContainer.checkValidity()){
          nextStep.removeAttribute('disabled');
        }else{
          nextStep.setAttribute('disabled', true);
        }
      });

      symptomsContainer.addEventListener('submit',onSubmitHandler);
      symptomsContainer.addEventListener('reset',onResetHandler);

      const nextStep = document.querySelector('#step-btn-3');
      const currentStep =  document.querySelector('#step-container-');

      if(symptomsContainer.checkValidity()){
        nextStep.removeAttribute('disabled');
        currentStep.classList.add("completed");
      }else{
        nextStep.setAttribute('disabled', true);
        currentStep.classList.remove("completed");
      }
    }

    this.innerHTML=`
    <div class="col-md-12">
      <form role="form" id="symptomsContainer" class="jumbotron">
        <h4>Disease Symptoms</h4>
        <div class="form-group">
          <label class="control-label">Symptoms</label>
          <select class="form-control" id="symptoms" name="symptoms" required="required" multiple>
            <option value="fever">Fever</option>
            <option value="cold">Cold</option>
            <option value="vomiting">Vomiting</option>
            <option value="nausea">Nausea</option>
          </select>
        </div>

        <div class="form-group">
          <label class="control-label">Any other Symptoms</label>
          <textarea class="form-control" type='number' name='customSymptoms' placeholder='Enter your any other symptoms'></textarea>
        </div>


        <div class="form-group">
          <label class="control-label">Not well since</label>
          <input class="form-control" type='number' placeholder='In days' name='unhealthyDays' required="required"/>
        </div>

        <button class="btn btn-danger nextBtn btn-sm pull-right" type="reset">Reset</button>
        <button class="btn btn-primary nextBtn btn-sm pull-right" type="submit">Next</button>
      </form>
    </div>
    `;

    init();
  }
}

customElements.define('symptoms-container', SymptomsContainer);