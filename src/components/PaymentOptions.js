class PaymentOptions extends HTMLElement {
  constructor(){
    super();
    this.paymentOptionsData = window.sessionStorage.getItem('paymentOptionsData') 
                                ? JSON.parse(window.sessionStorage.getItem('paymentOptionsData')) 
                                  : {};
  }
  
  connectedCallback(){
    const onSubmitHandler=(e)=>{
      e.preventDefault();
      const nextStep =  document.querySelector('#step-btn-4');
      nextStep.removeAttribute('disabled');
      nextStep.click();
      const {callVisitDate, paymentOption} = e.target.elements;
      const formData = {callVisitDate, paymentOption};
      for(let field in formData) {
        this.paymentOptionsData[field] = formData[field].value;
      }
      window.sessionStorage.setItem('paymentOptionsData', JSON.stringify(this.paymentOptionsData));

      const currentStep =  document.querySelector('#step-container-3');
      currentStep.classList.add("completed");
    }

    const onResetHandler=(e)=>{
      document.querySelector('#step-btn-4').setAttribute('disabled', true);
      window.sessionStorage.removeItem('paymentOptionsData');

      const currentStep =  document.querySelector('#step-container-3');
      currentStep.classList.remove("completed");
    }

    const dateGenerator = (date)=>{
      const d = new Date(date).getDate();
      const y = new Date(date).getFullYear();
      const m = ((new Date(date).getMonth()+1) > 9) ? (new Date(date).getMonth()+1) : '0'+(new Date(date).getMonth()+1);

      return `${y}-${m}-${d}`;
    }

    const init=()=>{
      document.querySelector('#callVisitDate').setAttribute('max', dateGenerator(new Date()));
      const paymentOptions = document.querySelector('#paymentOptions');
      for(let field in this.paymentOptionsData) {
        paymentOptions.elements[field].value = this.paymentOptionsData[field];
      }

      paymentOptions.addEventListener('change',function(e){
        const nextStep = document.querySelector('#step-btn-4');
        if(paymentOptions.checkValidity()){
          nextStep.removeAttribute('disabled');
        }else{
          nextStep.setAttribute('disabled', true);
        }
      });

      paymentOptions.addEventListener('submit',onSubmitHandler);
      paymentOptions.addEventListener('reset',onResetHandler);

      const nextStep = document.querySelector('#step-btn-4');
      const currentStep =  document.querySelector('#step-container-3');

      if(paymentOptions.checkValidity()){
        nextStep.removeAttribute('disabled');
        currentStep.classList.add("completed");
      }else{
        nextStep.setAttribute('disabled', true);
        currentStep.classList.remove("completed");
      }
    }

    this.innerHTML=`
    <div class="col-md-12">
      <form role="form" id="paymentOptions" class="jumbotron">
        <h3>Slot & Payment Selection</h3>
        <div class="form-group">
          <label class="control-label">Select Date for Call/Visit : </label>
          <input id='callVisitDate' class="form-control" type="date" name="callVisitDate" placeholder='DD/MM/YYYY' required="required">
        </div>
      
        <div class="form-group">
          <label class="control-label">Payment Option</label>
          <select class="form-control" name="paymentOption" placeholder='Payment Option' required="required">
            <option value="cash" selected>Cash</option>
            <option value="online">Online</option>
            <option value="card">Card</option>
          </select>
        </div>

        <button class="btn btn-danger nextBtn btn-sm pull-right" type="reset">Reset</button>
        <button class="btn btn-primary nextBtn btn-sm pull-right" type="submit">Next</button>
      </form>
    </div>
    `;

    init();
  }
}

customElements.define('payment-options', PaymentOptions);