
class PatientDetails extends HTMLElement {
  constructor(){
    super();
    this.patientDetailsData = 
        window.sessionStorage.getItem('patientDetailsData') 
          ? JSON.parse(window.sessionStorage.getItem('patientDetailsData')) 
            : {};
  }
  
  connectedCallback(){
    const onSubmitHandler=(e)=>{
      e.preventDefault();
      
      const nextStep =  document.querySelector('#step-btn-2');
      nextStep.removeAttribute('disabled');
      nextStep.click();

      const currentStep =  document.querySelector('#step-container-1');
      currentStep.classList.add("completed");

      const {fullName, mobile, email, address, age, gender, allergies} = e.target.elements;
      const formData = {fullName, mobile, email, address, age, gender, allergies};
      for(let field in formData) {
        this.patientDetailsData[field] = formData[field].value;
      }
      window.sessionStorage.setItem('patientDetailsData', JSON.stringify(this.patientDetailsData));
    }
    
    const onResetHandler=(e)=>{
      document.querySelector('#step-btn-2').setAttribute('disabled', true);
      
      const currentStep =  document.querySelector('#step-container-1');
      currentStep.classList.remove("completed");

      window.sessionStorage.removeItem('patientDetailsData');
    }
    
    const init=()=>{
      const patientDetails = document.querySelector('#patientDetails');
      for(let field in this.patientDetailsData) {
        patientDetails.elements[field].value = this.patientDetailsData[field];
      }
      
      patientDetails.addEventListener('keyup',function(e){
        const nextStep = document.querySelector('#step-btn-2');
        if(patientDetails.checkValidity()){
          nextStep.removeAttribute('disabled');
        }else{
          nextStep.setAttribute('disabled', true);
        }
      });
      
      patientDetails.addEventListener('submit',onSubmitHandler);
      patientDetails.addEventListener('reset',onResetHandler);

      const nextStep = document.querySelector('#step-btn-2');
      const currentStep =  document.querySelector('#step-container-1');

      if(patientDetails.checkValidity()){
        nextStep.removeAttribute('disabled');
        currentStep.classList.add("completed");
      }else{
        nextStep.setAttribute('disabled', true);
        currentStep.classList.remove("completed");
      }
    }

    this.innerHTML=`
    <div class="col-md-12">
      <form role="form" id="patientDetails" class="jumbotron">
        <h4>Personal Details</h4>
        <div class="form-group">
          <label class="control-label">Name</label>
          <input class="form-control" type='text' placeholder='Full Name' name='fullName' required="required"/>
        </div>

        <div class="form-group">
          <label class="control-label">Mobile</label>
          <input class="form-control" type='number' placeholder='+91 1234567890' name='mobile' required="required"/>
        </div>

        <div class="form-group">
          <label class="control-label">Email</label>
          <input class="form-control" type='email' placeholder='abc@xyz.com' name='email' required="required"/>
        </div>

        <div class="form-group">
          <label class="control-label">Address</label>
          <textarea class="form-control" name='address' placeholder="Enter your address (Room No., Building, Street, Area, Pin code)"></textarea>
        </div>
        
        <div class="form-group">
          <label class="control-label">Age</label>
          <input class="form-control" type='number' name='age' placeholder='Enter your Age in Years' required="required"/>
        </div>

        <div class="form-group">
          <label class="control-label">Gender&nbsp;:</label>
          <label class="radio-inline"><input type="radio" name="gender" value="female" checked>&nbsp;&nbsp;Female</label>
          <label class="radio-inline"><input type="radio" name="gender" value="male">&nbsp;&nbsp;Male</label>
        </div>

        <div class="form-group">
          <label class="control-label">Allergies</label>
          <textarea class="form-control" name='allergies' placeholder="Enter your allergies here..."></textarea>
        </div>

        <button class="btn btn-danger nextBtn btn-sm pull-right" type="reset">Reset</button>
        <button class="btn btn-primary nextBtn btn-sm pull-right" type="submit">Next</button>
      </form>
    </div>
    `;

    init();
  }
}

customElements.define('patient-details', PatientDetails);